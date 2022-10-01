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
} from "firebase/firestore";
import { db } from "../Firestore/firebase-config";

interface taskListStoreType {
  addTask: (task: taskType, id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (task: taskType, id: string) => void;
  tasks: tasksListType;
  user_id: string;
  setUserID: (user_id: string) => void;
}

const addTask = async (task_id: string, task: taskType, user_id: string) => {
  const plowDocRef = doc(db, "users", user_id, "plow", task_id);
  await setDoc(plowDocRef, task);

  console.log("Document written with ID: ", task_id);
};

const deleteTask = async (task_id: string, user_id: string) => {
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

const useTaskStore = create<taskListStoreType>()(
  devtools(
    persist(
      (set) => ({
        user_id: "",
        tasks: {},

        addTask: (task: taskType, id: string) =>
          set(
            produce((state) => {
              addTask(id, task, state.user_id);
              state.tasks[id] = task;
              return state;
            })
          ),

        deleteTask: (id: string) =>
          set(
            produce((state) => {
              deleteTask(id, state.user_id);
              const { [id]: value, ...newState } = state.tasks;
              return { tasks: newState };
            })
          ),
        editTask: (task: taskType, id: string) =>
          set(
            produce((state) => {
              updateTask(id, state.tasks[id], task, state.user_id);
              state.tasks[id] = task;
              return state;
            })
          ),
        setUserID: (user_id: string) => set(() => ({ user_id: user_id })),
      }),
      {
        name: "task-list-storage",

        deserialize: (state) => {
          const newState = JSON.parse(state);
          for (const key in newState.state.tasks) {
            newState.state.tasks[key].dateUpdated = new Date(
              newState.state.tasks[key].dateUpdated
            );
          }
          return newState;
        },
        // serialize: (state) => {
        //     const newState = state;
        //     newState.state.dateUpdated = new Date();
        //     return JSON.stringify(newState);
        //     },
      }
    ),
    {
      name: "task-list-storage",
    }
  )
);

export default useTaskStore;
