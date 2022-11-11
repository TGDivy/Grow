import create from "zustand";
import { devtools } from "zustand/middleware";
import { userType } from "../Types/Types";

import { updateDoc, doc } from "firebase/firestore";
import { db } from "../Firestore/firebase-config";

interface userStoreType extends userType {
  setUser: (user: userType) => void;
  setTags: (tags: string[]) => void;
}

const updateTags = async (user_id: string, tags: string[]) => {
  const userDocRef = doc(db, "users", user_id);
  await updateDoc(userDocRef, {
    tags: tags,
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
      setUser: (user) => set({ ...user }),
      setTags: (tags) => {
        set({ tags: tags });
        updateTags(get().uid, tags);
      },
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
