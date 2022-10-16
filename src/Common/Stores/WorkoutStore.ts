import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { workoutType } from "../Types/Types";
import produce from "immer";

import {
  collection,
  doc,
  setDoc,
  addDoc,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "../Firestore/firebase-config";

interface workoutStoreType {
  latestWorkoutTypeDate: Date | null;
  workouts: { [key: string]: workoutType[] };
  user_id: string;
  addWorkout: (workout: workoutType) => void;
  fetchWorkouts: (user_id: string) => void;
  setUserId: (user_id: string) => void;
  updateWorkout: (workout: workoutType) => void;
  deleteWorkout: (workout: workoutType) => void;
}

const addWorkoutToDB = async (
  workout_id: string,
  workout: workoutType,
  user_id: string
) => {
  const workoutCollectionRef = collection(
    db,
    "users",
    user_id,
    "workouts",
    workout_id
  );
  await addDoc(workoutCollectionRef, workout);

  console.log("Document written with ID: ", workout_id);
};

const updateWorkoutDB = async (
  workout_id: string,
  workout: workoutType,
  user_id: string
) => {
  const workoutCollectionRef = doc(
    db,
    "users",
    user_id,
    "workouts",
    workout_id
  );
  await setDoc(workoutCollectionRef, workout);

  console.log("Document updated with ID: ", workout_id);
};

const fetchWorkouts = async (user_id: string, date: Date) => {
  const workoutCollectionRef = collection(db, "users", user_id, "workouts");
  const q = query(workoutCollectionRef, where("date", ">", date));
  const querySnapshot = await getDocs(q);
  const workouts: workoutType[] = [];
  querySnapshot.forEach((doc) => {
    workouts.push(doc.data() as workoutType);
  });
  return workouts;
};

const useWorkoutStore = create<workoutStoreType>()(
  devtools(
    persist(
      (set, get) => ({
        latestWorkoutTypeDate: null,
        workouts: {},
        user_id: "",
        addWorkout: (workout) => {
          set(
            produce((state) => {
              state.workouts[workout.name] = workout;
            })
          );
          addWorkoutToDB(workout.name, workout, get().user_id);
        },
        fetchWorkouts: (user_id) => {
          set(
            produce((state) => {
              state.user_id = user_id;
            })
          );
          const workouts = fetchWorkouts(
            user_id,
            get().latestWorkoutTypeDate || new Date(0)
          );
          set(
            produce((state) => {
              state.workouts = workouts;
            })
          );
        },
        setUserId: (user_id) => {
          set(
            produce((state) => {
              state.user_id = user_id;
            })
          );
        },
        updateWorkout: (workout) => {
          set(
            produce((state) => {
              state.workouts[workout.name] = workout;
            })
          );
          updateWorkoutDB(workout.name, workout, get().user_id);
        },
        deleteWorkout: (workout) => {
          set(
            produce((state) => {
              delete state.workouts[workout.name];
            })
          );
        },
      }),
      {
        name: "workout-storage",

        deserialize: (state) => {
          const newState = JSON.parse(state);
          for (const key in newState.state.workouts) {
            newState.state.workouts[key].date = new Date(
              newState.state.workouts[key].date
            );
          }
          newState.state.latestWorkoutTypeDate = new Date(
            newState.state.latestWorkoutTypeDate
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

export default useWorkoutStore;
