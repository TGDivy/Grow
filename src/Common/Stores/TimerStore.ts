/* eslint-disable @typescript-eslint/no-unused-vars */
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { tagsType, timerType } from "../Types/Types";

import {
  setDoc,
  collection,
  updateDoc,
  doc,
  increment,
  addDoc,
} from "firebase/firestore";
import { db } from "../Firestore/firebase-config";

interface timerStoreType extends timerType {
  startTimer: () => void;
  stopTimer: (user_id: string, duration: number) => void;
  addTask: (id: string) => void;
  deleteTask: () => void;
  addTag: (tag: tagsType) => void;
  deleteTag: (tag: tagsType) => void;
  setTags: (tags: Array<tagsType>) => void;
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
    setTags,
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
        duration: 0,
        taskKey: "",
        tags: [],

        startTimer: () => set(() => ({ active: true, startTime: new Date() })),
        stopTimer: (user_id: string, duration: number) =>
          set((state) => {
            const endState = {
              ...state,
              active: false,
              duration: duration,
            };
            pushStudyTime(timerStoreTypeToTimerType(endState), user_id);
            return endState;
          }),
        resetTimer: () =>
          set(() => ({
            active: false,
            startTime: new Date(),
            duration: 0,
          })),
        addTask: (id: string) => set((state) => ({ taskKey: id })),
        deleteTask: () => set((state) => ({ taskKey: "" })),
        addTag: (tag: tagsType) =>
          set((state) => ({ tags: [...state.tags, tag] })),
        deleteTag: (tag: tagsType) =>
          set((state) => ({ tags: state.tags.filter((item) => item !== tag) })),
        setTags: (tags: Array<tagsType>) => set(() => ({ tags: tags })),
      }),
      {
        name: "timer-storage",

        deserialize: (state) => {
          const newState = JSON.parse(state);
          newState.state.startTime = new Date(newState.state.startTime);
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
