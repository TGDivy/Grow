import create from "zustand";
import { devtools } from "zustand/middleware";
import { userType } from "../Types/Types";

import { updateDoc, doc } from "firebase/firestore";
import { db } from "../Firestore/firebase-config";

interface userStoreType extends userType {
  setUser: (user: userType) => void;
  setTags: (tags: string[]) => void;
  setStickers: (stickers: string[]) => void;
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
      setUser: (user) => set({ ...user }),
      setTags: (tags) => {
        set({ tags: tags });
        updateTags(get().uid, tags);
      },
      setStickers: (stickers) => {
        set({ stickers: stickers });
        updateStickers(get().uid, stickers);
      },
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
