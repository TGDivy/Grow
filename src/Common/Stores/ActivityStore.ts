import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { activityType, activityTypeDoc } from "../Types/Types";
import produce from "immer";

import {
  collection,
  updateDoc,
  doc,
  addDoc,
  arrayUnion,
  getDoc,
  where,
  query,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../Firestore/firebase-config";
import { Set } from "typescript";

interface activityStoreType {
  latestActivityDate: Date | null;
  activities: { [key: string]: activityType[] };
  activityTypes: string[];
  user_id: string;
  addActivity: (activity: activityType) => void;
  fetchActivities: () => void;
  setUserId: (user_id: string) => void;
}

const addActivityToDB = async (
  activity: activityType,
  user_id: string,
  activityTypes: string[]
) => {
  const activityCollectionRef = collection(db, "users", user_id, "soil");
  await addDoc(activityCollectionRef, activity);

  console.log("Document written with ID: ", activity.name);

  if (!activityTypes.includes(activity.name)) {
    const activityTypeDocRef = doc(
      db,
      "users",
      user_id,
      "soil",
      "activityTypes"
    );
    await setDoc(activityTypeDocRef, {
      activityTypes: arrayUnion(activity.name),
    });
  }
};

const fetchActivities = async (
  user_id: string,
  date: Date,
  activities: { [key: string]: activityType[] }
) => {
  const activityTypeDocRef = doc(db, "users", user_id, "soil", "activityTypes");
  const activityTypeDoc = await getDoc(activityTypeDocRef);
  const activityTypes = [] as string[];
  if (activityTypeDoc.exists()) {
    const data = activityTypeDoc.data() as activityTypeDoc;
    data.activityTypes.forEach((activityType) => {
      if (!activityTypes.includes(activityType)) {
        activityTypes.push(activityType);
      }
    });
  }

  const activityCollectionRef = collection(db, "users", user_id, "soil");

  const q = query(activityCollectionRef, where("date", ">", date));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = doc.data() as activityType;
    if (activities[data.name]) {
      activities[data.name].push(data);
    } else {
      activities[data.name] = [data];
    }
  });

  return { activities, activityTypes };
};

const useActivityStore = create<activityStoreType>()(
  devtools(
    persist(
      (set, get) => ({
        activities: {},
        activityTypes: [] as string[],
        latestActivityDate: null,
        user_id: "",
        addActivity: (activity) => {
          addActivityToDB(activity, get().user_id, get().activityTypes);
          set((state) => {
            if (state.activities[activity.name]) {
              state.activities[activity.name].push(activity);
            } else {
              state.activities[activity.name] = [activity];
            }
            if (!state.activityTypes.includes(activity.name)) {
              state.activityTypes.push(activity.name);
            }
            state.latestActivityDate = activity.date;
            return state;
          });
        },
        fetchActivities: async () => {
          fetchActivities(
            get().user_id,
            get().latestActivityDate || new Date(0),
            get().activities
          ).then(({ activities, activityTypes }) => {
            set((state) => {
              return {
                ...state,
                activities,
                activityTypes,
                user_id: state.user_id,
              };
            });
          });
        },
        setUserId: (user_id) => {
          set({ user_id });
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
          newState.state.activityTypes =
            newState.state.activityTypes || ([] as string[]);
          return newState;
        },
      }
    ),

    {
      name: "activity-storage",
    }
  )
);

export default useActivityStore;
