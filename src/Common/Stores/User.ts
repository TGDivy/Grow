import create from "zustand";
import { devtools } from "zustand/middleware";
import {
  userType,
  stickerTagHabitType,
  customBoolHabitType,
} from "../Types/Types";

import { updateDoc, doc } from "firebase/firestore";
import { db } from "../Firestore/firebase-config";

interface userStoreType extends userType {
  setUser: (user: userType) => void;
  setTags: (tags: string[]) => void;
  setStickers: (stickers: string[]) => void;

  setStickerTagHabits: (stickerTagHabit: Array<stickerTagHabitType>) => void;
  setCustomBoolHabits: (customBoolHabit: Array<customBoolHabitType>) => void;

  setTutorials: (tutorials: Array<string>) => void;
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

const updateCustomBoolHabits = async (
  user_id: string,
  customBoolHabits: Array<customBoolHabitType>
) => {
  const userDocRef = doc(db, "users", user_id);
  await updateDoc(userDocRef, {
    customBoolHabits: customBoolHabits,
  });
};

const updateTutorials = async (user_id: string, tutorials: Array<string>) => {
  const userDocRef = doc(db, "users", user_id);
  await updateDoc(userDocRef, {
    tutorials: tutorials,
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
      customBoolHabits: [],
      tutorials: [],
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
      setCustomBoolHabits: (customBoolHabits) => {
        set({ customBoolHabits: customBoolHabits });
        updateCustomBoolHabits(get().uid, customBoolHabits);
      },
      setTutorials: (tutorials) => {
        set({ tutorials: tutorials });
        updateTutorials(get().uid, tutorials);
      },
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
