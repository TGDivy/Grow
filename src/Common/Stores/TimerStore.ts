/* eslint-disable @typescript-eslint/no-unused-vars */
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { timerType } from "../Types/Types";

import {
  setDoc,
  collection,
  updateDoc,
  doc,
  increment,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../Firestore/firebase-config";
import { MAX_STOPWATCH_DURATION } from "../constants";

interface timerStoreType extends timerType {
  startTimer: () => void;
  stopTimer: (duration: number) => void;
  addTask: (id: string) => void;
  deleteTask: () => void;
  addTag: (tag: string) => void;
  deleteTag: (tag: string) => void;
  setTags: (tags: string[]) => void;
  resetTimer: () => void;
  timerMode: "stopwatch" | "timer";
  timerDuration: number;
  user_id: string;
  setTimerMode: (mode: "stopwatch" | "timer") => void;
  setTimerDuration: (duration: number) => void;
  setSticker: (sticker: string) => void;
  syncTimer: (user_id: string) => void;
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
    timerMode,
    setTimerMode,
    timerDuration,
    setTimerDuration,
    setSticker,
    syncTimer,
    user_id,
    ...timerType
  } = timerStoreType;
  return timerType;
};

const pushStudyTime = async (timer: timerType, user_id: string) => {
  const sowCollectionRef = collection(db, "users", user_id, "sow");
  const docRef = await addDoc(sowCollectionRef, timer);

  console.log("Document written with ID: ", docRef);
};

const updateTimer = async (timerStore: timerStoreType, user_id: string) => {
  const timer = {
    ...timerStoreTypeToTimerType(timerStore),
    timerDuration: timerStore.timerDuration,
  };

  // if user_id does not exist in timers collection, create a new document with user_id as id
  // if user_id exists, update the document with user_id with the new timer
  await setDoc(doc(db, "timers", user_id), {
    ...timer,
  });
};

const getTimer = async (user_id: string) => {
  // Get the document with user_id, if it exists otherwise return a dummy timer
  const docRef = doc(db, "timers", user_id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    data.startTime = data.startTime.toDate();

    return data;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return {
      active: false,
      startTime: new Date(),
      duration: 0,
      taskKey: "",
      tags: [],
      timerMode: "timer",
      timerDuration: MAX_STOPWATCH_DURATION / 3,
      sticker: "",
    };
  }
};

const useTimerStore = create<timerStoreType>()(
  devtools(
    persist(
      (set, get) => ({
        active: false,
        startTime: new Date(),
        duration: 0,
        taskKey: "",
        tags: [],
        timerMode: "timer",
        timerDuration: MAX_STOPWATCH_DURATION / 3,
        sticker: "",
        user_id: "",

        startTimer: () =>
          set((state) => {
            const startState = {
              ...state,
              active: true,
              startTime: new Date(),
            };
            updateTimer(startState, get().user_id);
            return startState;
          }),

        stopTimer: (duration: number) =>
          set((state) => {
            const endState = {
              ...state,
              active: false,
            };
            pushStudyTime(timerStoreTypeToTimerType(endState), get().user_id);
            updateTimer(endState, get().user_id);
            return endState;
          }),
        resetTimer: () =>
          set((state) => {
            const resetState = {
              ...state,
              active: false,
              startTime: new Date(),
              duration: 0,
            };
            updateTimer(resetState, get().user_id);
            return resetState;
          }),
        syncTimer: async (user_id: string) => {
          const timer = await getTimer(user_id);
          set(() => ({
            ...timer,
            user_id: user_id,
          }));
        },
        addTask: (id: string) => {
          set((state) => ({ taskKey: id }));
          updateTimer(get(), get().user_id);
        },
        deleteTask: () => {
          set((state) => ({ taskKey: "" }));
          updateTimer(get(), get().user_id);
        },
        addTag: (tag: string) => {
          set((state) => ({ tags: [...state.tags, tag] }));
          // updateTimer(get(), get().user_id);
        },
        deleteTag: (tag: string) => {
          set((state) => ({ tags: state.tags.filter((item) => item !== tag) }));
          // updateTimer(get(), get().user_id);
        },
        setTags: (tags: Array<string>) => {
          set(() => ({ tags: tags }));
          // updateTimer(get(), get().user_id);
        },
        setTimerMode: (mode: "stopwatch" | "timer") => {
          set(() => ({ timerMode: mode }));
        },
        setTimerDuration: (duration: number) =>
          set(() => ({ timerDuration: duration })),
        setSticker: (sticker: string) => set(() => ({ sticker: sticker })),
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
