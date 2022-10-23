import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { JournalType } from "../Types/Types";

interface JournalStoreType extends JournalType {
  updateJournal: (journal: JournalType) => void;
  user_id: string;
  setUserId: (user_id: string) => void;
}

const useJournalStore = create<JournalStoreType>()(
  devtools(
    persist(
      (set) => ({
        user_id: "",
        date: new Date(),
        title: "",
        entry: "",
        plansForTomorrow: "",
        tasksForTomorrow: [],
        mood: [],
        workDone: 0,
        exercised: false,
        meals: 0,
        noMB: false,
        setUserId: (user_id: string) => set(() => ({ user_id })),
        updateJournal: (journal: JournalType) => set(() => ({ ...journal })),
      }),
      {
        name: "journal-storage",
        getStorage: () => localStorage,
      }
    ),
    {
      name: "journal-storage",
    }
  )
);

export default useJournalStore;
