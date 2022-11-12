import create from "zustand";
import { devtools } from "zustand/middleware";
import { userType, stickerTagHabitType } from "../Types/Types";

import { updateDoc, doc } from "firebase/firestore";
import { db } from "../Firestore/firebase-config";

interface userStoreType extends userType {
  setUser: (user: userType) => void;
  setTags: (tags: string[]) => void;
  setStickers: (stickers: string[]) => void;

  setStickerTagHabits: (stickerTagHabit: Array<stickerTagHabitType>) => void;
}

const updateTags = async (user_id: string, tags: string[]) => {
  const userDocRef = doc(db, "users", user_id);
  await updateDoc(userDocRef, {
    tags: tags,
  });
};

const updateStickers = async (user_id: string, stickers: string[]) => {
  const userDocRef = doc(db, "users", user_id);
  await updateDoc(userDocRef, {
    stickers: stickers,
  });
};

const updateStickerTagHabits = async (
  user_id: string,
  stickerTagHabits: Array<stickerTagHabitType>
) => {
  const userDocRef = doc(db, "users", user_id);
  await updateDoc(userDocRef, {
    stickerTagHabits: stickerTagHabits,
  });
};

const useUserStore = create<userStoreType>()(
  devtools(
    (set, get) => ({
      created: new Date(),
      uid: "",
      email: "",
      displayName: "",
      photoURL: "",
      tags: [],
      stickers: [],
      stickerTagHabits: [],
      setUser: (user) => set({ ...user }),
      setTags: (tags) => {
        set({ tags: tags });
        updateTags(get().uid, tags);
      },
      setStickers: (stickers) => {
        set({ stickers: stickers });
        updateStickers(get().uid, stickers);
      },
      setStickerTagHabits: (stickerTagHabits) => {
        set({ stickerTagHabits: stickerTagHabits });
        updateStickerTagHabits(get().uid, stickerTagHabits);
      },
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
