import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { JournalType } from "../Types/Types";

interface JournalStoreType extends JournalType {
  updateJournal: (journal: JournalType) => void;
  user_id: string;
  setUserId: (user_id: string) => void;
  activeStep: number;
  resetStore: () => void;
  setActiveStep: (step: number) => void;
  addMood: (mood: string) => void;
  setMeals: (meals: string[]) => void;
  setNB: (nb: boolean) => void;
  lastMoodUpdated: Date;
}

const initialState = {
  user_id: "",
  date: new Date(),
  title: "",
  entry: "",
  plansForTomorrow: "",
  tasksForTomorrow: [],
  mood: [],
  lastMoodUpdated: new Date(),
  workDone: 0,
  exercised: false,
  meals: [],
  noMB: false,
  activeStep: 0,
};

const useJournalStore = create<JournalStoreType>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setUserId: (user_id: string) => set(() => ({ user_id })),
        updateJournal: (journal: JournalType) => set(() => ({ ...journal })),
        resetStore: () => set(() => ({ ...initialState })),

        setActiveStep: (step: number) => set(() => ({ activeStep: step })),
        addMood: (mood: string) =>
          set((state) => ({
            mood: [...state.mood, mood],
            lastMoodUpdated: new Date(),
          })),
        setMeals: (meals: string[]) => set(() => ({ meals })),
        setNB: (nb: boolean) => set(() => ({ noMB: nb })),
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
