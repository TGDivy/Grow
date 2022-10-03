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
  if (timerRecords.length === 0) {
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }
  const latestRecordTime = timerRecords[timerRecords.length - 1].startTime;
  const q = query(collectionRef, where("startTime", ">", latestRecordTime));
  const querySnapshot = await getDocs(q);

  return querySnapshot;
};

const useTimerRecordsStore = create<timerRecordsStoreType>()(
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
                console.log(`Fetch Sow Records => ${doc.id}`);
                const timer = doc.data();
                timer.startTime = timer.startTime.toDate();
                addTimerRecord(timer as timerType);
              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        },
      }),
      {
        name: "timer-records-storage",
        deserialize: (state) => {
          const newState = JSON.parse(state);

          for (const record of newState.state.timerRecords) {
            record.startTime = new Date(record.startTime);
          }
          return newState;
        },
      }
    ),
    {
      name: "timer-records-storage",
    }
  )
);

export default useTimerRecordsStore;
