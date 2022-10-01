/* eslint-disable @typescript-eslint/no-unused-vars */
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { tagsType, timerType } from "./Types";

import {
  setDoc,
  collection,
  updateDoc,
  doc,
  increment,
  addDoc,
} from "firebase/firestore";
import { db } from "./../firebase-config";

interface timerStoreType extends timerType {
  startTimer: () => void;
  stopTimer: (user_id: string) => void;
  addTask: (id: string) => void;
  deleteTask: () => void;
  addTag: (tag: tagsType) => void;
  deleteTag: (tag: tagsType) => void;
  resetTimer: () => void;
}

const timerStoreTypeToTimerType = (
  timerStoreType: timerStoreType
): timerType => {
  const {
    startTimer,
    stopTimer,
    addTask,
    deleteTask,
    addTag,
    deleteTag,
    resetTimer,
    ...timerType
  } = timerStoreType;
  return timerType;
};

const pushStudyTime = async (timer: timerType, user_id: string) => {
  const sowCollectionRef = collection(db, "users", user_id, "sow");
  const docRef = await addDoc(sowCollectionRef, timer);

  console.log("Document written with ID: ", docRef);
};

const useTimerStore = create<timerStoreType>()(
  devtools(
    persist(
      (set) => ({
        active: false,
        startTime: new Date(),
        endTime: new Date(),
        taskKey: "",
        tags: [],

        startTimer: () => set(() => ({ active: true, startTime: new Date() })),
        stopTimer: (user_id: string) =>
          set((state) => {
            const endState = {
              ...state,
              active: false,
              endTime: new Date(),
            };
            pushStudyTime(timerStoreTypeToTimerType(endState), user_id);
            console.log(timerStoreTypeToTimerType(endState));
            return endState;
          }),
        resetTimer: () =>
          set(() => ({
            active: false,
            startTime: new Date(),
            endTime: new Date(),
          })),
        addTask: (id: string) => set((state) => ({ taskKey: id })),
        deleteTask: () => set((state) => ({ taskKey: "" })),
        addTag: (tag: tagsType) =>
          set((state) => ({ tags: [...state.tags, tag] })),
        deleteTag: (tag: tagsType) =>
          set((state) => ({ tags: state.tags.filter((item) => item !== tag) })),
      }),
      {
        name: "timer-storage",

        deserialize: (state) => {
          const newState = JSON.parse(state);
          newState.state.startTime = new Date(newState.state.startTime);
          newState.state.endTime = new Date(newState.state.endTime);
          return newState;
        },
      }
    ),

    {
      name: "timer-storage",
    }
  )
);

export default useTimerStore;
