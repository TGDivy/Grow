import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { JournalType, taskType, JournalDicType } from "../Types/Types";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../Firestore/firebase-config";

interface JournalStoreType {
  // keys: JournalType[];
  documents: JournalDicType;

  user_id: string;
  setUserId: (user_id: string) => void;

  addDocument: (document: JournalType, localOnly?: boolean) => void;
  fetchDocuments: () => void;
  getLastDocumentDate: () => Date;
}

const initialState = {
  user_id: "",
  documents: {},
};

const getLatestJournalRecords = async (
  documents: JournalDicType,
  user_id: string
) => {
  const collectionRef = collection(db, "users", user_id, "journal");
  // get the latest record time
  if (Object.keys(documents).length === 0) {
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }
  const latestRecordTime =
    documents[Object.keys(documents)[Object.keys(documents).length - 1]].date;
  const q = query(collectionRef, where("date", ">", latestRecordTime));
  const querySnapshot = await getDocs(q);

  return querySnapshot;
};

const addJournalRecord = (document: JournalType, user_id: string) => {
  const docRef = doc(db, "users", user_id, "journal", document.date.toString());
  setDoc(docRef, document);

  console.log(`Add Journal Record => ${document.date}`);
};

const useJournalStore = create<JournalStoreType>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        setUserId: (user_id: string) => set(() => ({ user_id })),
        addDocument: (document: JournalType, localOnly) => {
          const user_id = get().user_id;
          document.date = new Date(document.date);
          if (!localOnly) {
            addJournalRecord(document, user_id);
          }
          set((state) => ({
            documents: {
              ...state.documents,
              [document.date.toString()]: document,
            },
          }));
        },
        fetchDocuments: () => {
          const documents = get().documents;
          const user_id = get().user_id;
          const addDocument = get().addDocument;
          const querySnapshot = getLatestJournalRecords(documents, user_id);
          querySnapshot
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                console.log(`Fetch Journal Records => ${doc.id}`);
                const document = doc.data();
                console.log(document.date);
                console.log(typeof document.date);
                document.date = document.date.toDate();
                addDocument(document as JournalType, true);
              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        },
        getLastDocumentDate: () => {
          const documents = get().documents;
          const keys = Object.keys(documents);
          if (keys.length === 0) {
            return new Date(0);
          }
          const mostRecentDate = keys.reduce((a, b) =>
            documents[a].date > documents[b].date ? a : b
          );
          return documents[mostRecentDate].date;
        },
      }),
      {
        name: "journal-storage-all",
        getStorage: () => localStorage,
        deserialize: (state) => {
          const newState = JSON.parse(state);

          Object.entries(newState.state.documents).forEach(
            ([key, value]: [string, any]) => {
              newState.state.documents[key] = {
                ...value,
                date: new Date(value.date),
              };
            }
          );

          return newState;
        },
      }
    ),
    {
      name: "journal-storage-all",
    }
  )
);

export default useJournalStore;
