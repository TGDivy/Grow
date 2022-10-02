import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { timerType } from "../Types/Types";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Firestore/firebase-config";

interface timerRecordsStoreType {
  addTimerRecord: (timer: timerType) => void;
  addLatestTimerRecord: (user_id: string) => void;

  timerRecords: timerType[];
}

const getLatestTimerRecord = async (
  timerRecords: timerType[],
  user_id: string
) => {
  const collectionRef = collection(db, "users", user_id, "sow");
  const latestRecordTime = timerRecords[-1].startTime;
  const q = query(collectionRef, where("startTime", ">", latestRecordTime));
  const querySnapshot = await getDocs(q);

  return querySnapshot;
};

const useTimerStore = create<timerRecordsStoreType>()(
  devtools(
    persist(
      (set, get) => ({
        timerRecords: [],
        addTimerRecord: (timer: timerType) =>
          set((state) => ({ timerRecords: [...state.timerRecords, timer] })),
        addLatestTimerRecord: (user_id: string) => {
          const records = get().timerRecords;
          const addTimerRecord = get().addTimerRecord;
          const querySnapshot = getLatestTimerRecord(records, user_id);
          querySnapshot
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                const timer = doc.data() as timerType;
                addTimerRecord(timer);
              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        },
      }),
      {
        name: "timer-records-storage",
      }
    ),
    {
      name: "timer-records-storage",
    }
  )
);

export default useTimerStore;
