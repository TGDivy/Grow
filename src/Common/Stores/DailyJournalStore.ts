import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { JournalType } from "../Types/Types";

interface JournalStoreType extends JournalType {
  user_id: string;
  setUserId: (user_id: string) => void;
  activeStep: number;
  resetStore: () => void;
  setActiveStep: (step: number) => void;
  addMood: (mood: string) => void;
  setMeals: (meals: string[]) => void;
  setNB: (nb: boolean) => void;
  lastMoodUpdated: Date;
  setEntry: (entry: string) => void;
}

const initialState = {
  date: new Date(),
  title: "",

  entry: "",
  nextDayNotes: "",

  tasksForTomorrow: [],

  mood: [],
  lastMoodUpdated: new Date(),

  workDone: 0,
  exercised: false,
  meals: [],
  noMB: false,

  user_id: "",
  activeStep: 0,
};

const useJournalStore = create<JournalStoreType>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setUserId: (user_id: string) => set(() => ({ user_id })),
        resetStore: () => set(() => ({ ...initialState })),

        setActiveStep: (step: number) => set(() => ({ activeStep: step })),
        addMood: (mood: string) =>
          set((state) => ({
            mood: [...state.mood, mood],
            lastMoodUpdated: new Date(),
          })),
        setMeals: (meals: string[]) => set(() => ({ meals })),
        setNB: (nb: boolean) => set(() => ({ noMB: nb })),
        setEntry: (entry: string) => set(() => ({ entry })),
      }),
      {
        name: "journal-storage",
        getStorage: () => localStorage,
        deserialize: (state) => {
          const newState = JSON.parse(state);

          newState.state.lastMoodUpdated = new Date(
            newState.state.lastMoodUpdated
          );

          return newState;
        },
      }
    ),
    {
      name: "journal-storage",
    }
  )
);

export default useJournalStore;
