/* eslint-disable @typescript-eslint/no-unused-vars */
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { taskType, tasksListType, taskChangeType } from "../Types/Types";
import produce from "immer";

import {
  setDoc,
  collection,
  updateDoc,
  doc,
  increment,
  deleteDoc,
  CollectionReference,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../Firestore/firebase-config";

interface taskListStoreType {
  addTask: (task: taskType, id: string, localOnly?: boolean) => void;
  deleteTask: (id: string) => void;
  editTask: (task: taskType, id: string) => void;
  tasks: tasksListType;
  user_id: string;
  setUserID: (user_id: string) => void;
  updateTimeSpent: (id: string, timeSpent: number) => void;
  fetchNewDocs: () => void;
}

const addTaskFS = async (task_id: string, task: taskType, user_id: string) => {
  const plowDocRef = doc(db, "users", user_id, "plow", task_id);
  await setDoc(plowDocRef, task);

  console.log("Document written with ID: ", task_id);
};

const deleteTaskFS = async (task_id: string, user_id: string) => {
  const plowDocRef = doc(db, "users", user_id, "plow", task_id);

  await deleteDoc(plowDocRef);

  console.log("Document deleted with ID: ", task_id);
};

type key = keyof taskType;

const updateTask = async (
  task_id: string,
  task: taskType,
  taskUpdate: taskType,
  user_id: string
) => {
  const plowDocRef = doc(db, "users", user_id, "plow", task_id);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changes: any = {};
  (Object.keys(task as taskType) as Array<key>).forEach((key) => {
    if (task[key] !== taskUpdate[key]) {
      changes[key] = taskUpdate[key];
    }
  });

  await updateDoc(plowDocRef, changes);

  console.log("Document written with ID: ", task_id);
};

const updateTimeSpent = async (
  task_id: string,
  timeSpent: number,
  user_id: string
) => {
  const plowDocRef = doc(db, "users", user_id, "plow", task_id);

  await updateDoc(plowDocRef, {
    timeSpent: increment(timeSpent),
    dateUpdated: new Date(),
  });

  console.log("Document written with ID: ", task_id);
};

// find the latest task in tasksList
const fetchNewDocsF = async (tasks: tasksListType, user_id: string) => {
  const collectionRef = collection(db, "users", user_id, "plow");
  const tasksEntries = Object.entries(tasks);
  const initialTask = tasksEntries[0];

  const latestTask = await tasksEntries.reduce((prev, next) => {
    if (next[1].dateUpdated > prev[1].dateUpdated) {
      return next;
    }
    return prev;
  }, initialTask);

  const latestDate: Date = latestTask
    ? new Date(latestTask[1].dateUpdated)
    : new Date(2000, 1, 1);
  // Fetch tasks after the latest task date

  const q = query(collectionRef, where("dateUpdated", ">", latestDate));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
};

const useTaskStore = create<taskListStoreType>()(
  devtools(
    persist(
      (set, get) => ({
        user_id: "",
        tasks: {},

        addTask: (task: taskType, id: string, localOnly) => {
          if (!localOnly) {
            addTaskFS(id, task, get().user_id);
          }
          return set(
            produce((state) => {
              state.tasks[id] = task;
              return state;
            })
          );
        },

        deleteTask: (id: string) => {
          deleteTaskFS(id, get().user_id);
          return set(
            produce((state) => {
              const { [id]: value, ...newState } = state.tasks;
              return { tasks: newState };
            })
          );
        },
        editTask: (task: taskType, id: string) => {
          updateTask(id, get().tasks[id], task, get().user_id);
          return set(
            produce((state) => {
              state.tasks[id] = task;
              return state;
            })
          );
        },
        updateTimeSpent: (id: string, timeSpent: number) => {
          const user_id = get().user_id;
          if (user_id === "" || user_id === undefined) return;
          if (id === "" || id === undefined) return;
          if (id in get().tasks === false) return;
          updateTimeSpent(id, timeSpent, user_id);
          return set(
            produce((state) => {
              state.tasks[id].timeSpent += timeSpent;
              state.tasks[id].dateUpdated = new Date();
              return state;
            })
          );
        },
        setUserID: (user_id: string) => set(() => ({ user_id: user_id })),
        fetchNewDocs: async () => {
          const user_id = get().user_id;
          const querySnapshot = fetchNewDocsF(get().tasks, user_id);
          querySnapshot
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                const task = doc.data() as taskType;
                task.dateUpdated = doc.data().dateUpdated.toDate();
                task.dueDate = doc.data().dueDate
                  ? doc.data().dueDate.toDate()
                  : null;
                get().addTask(task, doc.id, true);
              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        },
      }),
      {
        name: "task-list-storage",

        deserialize: (state: string) => {
          const newState = JSON.parse(state);
          for (const key in newState.state.tasks) {
            newState.state.tasks[key].dateUpdated = new Date(
              newState.state.tasks[key].dateUpdated
            );
            // can be null
            const possibleDueDate = newState.state.tasks[key].dueDate;
            newState.state.tasks[key].dueDate =
              possibleDueDate == null ? null : new Date(possibleDueDate);
          }
          return newState;
        },
      }
    ),
    {
      name: "task-list-storage",
    }
  )
);

export default useTaskStore;
