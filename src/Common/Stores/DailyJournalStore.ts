import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { JournalType } from "../Types/Types";
import { messagesType } from "../../Journal/ReflectAIAssisted/reflectChatAPI";

interface JournalStoreType extends JournalType {
  user_id: string;
  setUserId: (user_id: string) => void;
  activeStep: number;
  resetStore: () => void;
  setActiveStep: (step: number) => void;

  setTitle: (title: string) => void;
  setSummary: (summary: string) => void;

  setReflectionConversation: (conversation: messagesType) => void;

  setNextDayNotes: (notes: string) => void;
  setTasksForTomorrow: (tasks: Array<string>) => void;

  getJournal: () => JournalType;
}

const initialState = {
  date: new Date(),
  title: "",
  summary: "",

  reflectionConversation: [],
  nextDayNotes: "",

  tasksForTomorrow: [],

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

        setTitle: (title: string) => set(() => ({ title })),
        setSummary: (summary: string) => set(() => ({ summary })),
        setReflectionConversation: (conversation: messagesType) =>
          set(() => ({ reflectionConversation: conversation })),

        setTasksForTomorrow: (tasks: Array<string>) =>
          set(() => ({ tasksForTomorrow: tasks })),

        setNextDayNotes: (notes: string) =>
          set(() => ({ nextDayNotes: notes })),
        getJournal: () => {
          const { title, summary, nextDayNotes, tasksForTomorrow } = get();
          return {
            date: new Date(),
            title,
            summary,
            nextDayNotes,
            tasksForTomorrow,
          } as JournalType;
        },
      }),
      {
        name: "journal-storage",
        getStorage: () => localStorage,
        deserialize: (state) => {
          const newState = JSON.parse(state);

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
