import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { JournalType, taskType } from "../Types/Types";

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
  setTasksForTomorrow: (tasks: Array<string>) => void;
  setNextDayNotes: (notes: string) => void;
  getJournal: () => JournalType;
  setTagHabit: (map: Map<string, boolean>) => void;
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

  tagHabits: {},

  user_id: "",
  activeStep: 0,
};

const useDailyJournalStore = create<JournalStoreType>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        setUserId: (user_id: string) => set(() => ({ user_id })),
        resetStore: () => set(() => ({ ...initialState, date: new Date() })),

        setActiveStep: (step: number) => set(() => ({ activeStep: step })),
        addMood: (mood: string) =>
          set((state) => ({
            mood: [...state.mood, mood],
            lastMoodUpdated: new Date(),
          })),
        setMeals: (meals: string[]) => set(() => ({ meals })),
        setNB: (nb: boolean) => set(() => ({ noMB: nb })),
        setEntry: (entry: string) => set(() => ({ entry })),
        setTasksForTomorrow: (tasks: Array<string>) =>
          set(() => ({ tasksForTomorrow: tasks })),
        setNextDayNotes: (notes: string) =>
          set(() => ({ nextDayNotes: notes })),
        getJournal: () => {
          const {
            date,
            title,
            entry,
            nextDayNotes,
            tasksForTomorrow,
            mood,
            lastMoodUpdated,
            workDone,
            exercised,
            meals,
            noMB,
            tagHabits,
          } = get();
          return {
            date: new Date(),
            title,
            entry,
            nextDayNotes,
            tasksForTomorrow,
            mood,
            lastMoodUpdated,
            workDone,
            exercised,
            meals,
            noMB,
            tagHabits,
          } as JournalType;
        },
        setTagHabit: (map: Map<string, boolean>) =>
          set(() => ({ tagHabits: Object.fromEntries(map) })),
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

export default useDailyJournalStore;
