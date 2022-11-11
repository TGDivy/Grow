import create from "zustand";
import { devtools } from "zustand/middleware";
import { userType } from "../Types/Types";

import { updateDoc, doc } from "firebase/firestore";
import { db } from "../Firestore/firebase-config";

interface userStoreType extends userType {
  setUser: (user: userType) => void;
  setTags: (tags: string[]) => void;
  setStickers: (stickers: string[]) => void;

  setTagHabits: (tag_habits: Array<{ tag: string; minimum: number }>) => void;
  setStickerHabits: (
    sticker_habits: Array<{ sticker: string; minimum: number }>
  ) => void;
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

const updateTagHabits = async (
  user_id: string,
  tag_habits: Array<{ tag: string; minimum: number }>
) => {
  const userDocRef = doc(db, "users", user_id);
  await updateDoc(userDocRef, {
    tag_habits: tag_habits,
  });
};

const updateStickerHabits = async (
  user_id: string,
  sticker_habits: Array<{ sticker: string; minimum: number }>
) => {
  const userDocRef = doc(db, "users", user_id);
  await updateDoc(userDocRef, {
    sticker_habits: sticker_habits,
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
      tag_habits: [],
      sticker_habits: [],
      setUser: (user) => set({ ...user }),
      setTags: (tags) => {
        set({ tags: tags });
        updateTags(get().uid, tags);
      },
      setStickers: (stickers) => {
        set({ stickers: stickers });
        updateStickers(get().uid, stickers);
      },
      setTagHabits: (tag_habits) => {
        set({ tag_habits: tag_habits });
        updateTagHabits(get().uid, tag_habits);
      },
      setStickerHabits: (sticker_habits) => {
        set({ sticker_habits: sticker_habits });
        updateStickerHabits(get().uid, sticker_habits);
      },
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
