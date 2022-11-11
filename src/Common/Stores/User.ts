import create from "zustand";
import { devtools } from "zustand/middleware";
import { userType } from "../Types/Types";

interface userStoreType extends userType {
  setUser: (user: userType) => void;
  setTags: (tags: string[]) => void;
}

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
      setTags: (tags) => set({ tags }),
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
