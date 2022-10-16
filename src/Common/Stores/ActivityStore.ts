/* eslint-disable @typescript-eslint/no-unused-vars */
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { activityType } from "../Types/Types";
import produce from "immer";

import {
  setDoc,
  collection,
  updateDoc,
  doc,
  increment,
  addDoc,
  arrayUnion,
  getDoc,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "../Firestore/firebase-config";
import { Set } from "typescript";

interface activityStoreType {
  latestActivityDate: Date | null;
  activities: { [key: string]: activityType[] };
  activityTypes: Set<string>;
  user_id: string;
  addActivity: (activity: activityType, id: string) => void;
  fetchActivities: (user_id: string) => void;
}

const addActivityToDB = async (
  activity_id: string,
  activity: activityType,
  user_id: string,
  activityTypes: Set<string>
) => {
  const activityCollectionRef = collection(
    db,
    "users",
    user_id,
    "soil",
    activity_id
  );
  await addDoc(activityCollectionRef, activity);

  console.log("Document written with ID: ", activity_id);

  if (!activityTypes.has(activity.name)) {
    const activityTypeDocRef = doc(
      db,
      "users",
      user_id,
      "soil",
      "activityTypes"
    );
    await updateDoc(activityTypeDocRef, {
      activityTypes: arrayUnion(activity.name),
    });
  }
};

interface activityTypeDoc {
  activityTypes: string[];
}

const fetchActivities = async (
  user_id: string,
  date: Date,
  activities: { [key: string]: activityType[] }
) => {
  const activityTypeDocRef = doc(db, "users", user_id, "soil", "activityTypes");
  const activityTypeDoc = await getDoc(activityTypeDocRef);
  const activityTypes = new Set<string>();
  if (activityTypeDoc.exists()) {
    const data = activityTypeDoc.data() as activityTypeDoc;
    data.activityTypes.forEach((activityType) => {
      activityTypes.add(activityType);
    });
  }

  activityTypes.forEach(async (activityType) => {
    const activityCollectionRef = collection(
      db,
      "users",
      user_id,
      "soil",
      activityType
    );

    const q = query(activityCollectionRef, where("date", ">", date));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as activityType;
      if (activities[activityType]) {
        activities[activityType].push(data);
      } else {
        activities[activityType] = [data];
      }
    });
  });

  return { activities, activityTypes };
};

const useTimerStore = create<activityStoreType>()(
  devtools(
    persist(
      (set, get) => ({
        activities: {},
        activityTypes: new Set<string>(),
        latestActivityDate: null,
        user_id: "",
        addActivity: (activity, id) => {
          addActivityToDB(id, activity, get().user_id, get().activityTypes);
          set(
            produce((state) => {
              state.activities[id].push(activity);
              state.activityTypes.add(activity.name);
              state.latestActivityDate = activity.date;
            })
          );
        },
        fetchActivities: async (user_id) => {
          const { activities, activityTypes } = await fetchActivities(
            user_id,
            get().latestActivityDate || new Date(0),
            get().activities
          );
          set({ activities, activityTypes, user_id });
        },
      }),
      {
        name: "activity-storage",

        deserialize: (state) => {
          const newState = JSON.parse(state);
          for (const key in newState.state.activities) {
            for (const activity of newState.state.activities[key]) {
              activity.date = new Date(activity.date);
            }
          }
          newState.state.latestActivityDate = new Date(
            newState.state.latestActivityDate
          );
          return newState;
        },
      }
    ),

    {
      name: "activity-storage",
    }
  )
);

export default useTimerStore;
