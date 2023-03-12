/* eslint-disable no-case-declarations */
import create from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import {
  Timestamp,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import moment from "moment";
import {
  setDoc,
  collection,
  updateDoc,
  doc,
  increment,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../Firestore/firebase-config";
import produce from "immer";
import { UnsplashImageType, getUnsplashImageUrl } from "./Utils/Utils";
export interface FrequencyType {
  type: "day" | "week";
  repeatEvery: number;

  // If type is week, represents mon, tue, wed, thu, fri, sat, sun
  daysOfWeek?: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[];
}

export interface HabitType {
  habitId: string;
  userId?: string;

  title: string;
  description: string;

  type: "project" | "tag" | "custom";

  frequencyType: FrequencyType;

  nextDueDate: Timestamp;
  lastCompletedDate: Timestamp;

  reminder: boolean;

  createdAt: Timestamp;
  updatedAt: Timestamp;

  image?: UnsplashImageType;
  archived?: boolean;
}

// consists of various habitIds and their boolean values
export interface habitEntryType {
  [habitId: string]: boolean;
}

export interface entryType {
  date: Timestamp;
  habits: habitEntryType;
  updatedAt: Timestamp;
}

// Function to get the next due date
// based on the frequency type
const calcDiff = (a: number, b: number) => {
  const diff = b - a;
  if (diff <= 0) {
    return 7 + diff;
  }
  return diff;
};
export const getNextDueDate = (frequencyType: FrequencyType, today?: Date) => {
  today = today || new Date();
  let nextDueDate;

  switch (frequencyType.type) {
    case "day":
      // calculate the next due date take into account the repeatEvery
      // and the current date and time
      // also if it is end of the month, then add the number of days to the next month
      // and if it is end of the year, then add the number of days to the next year
      nextDueDate = moment(today).add(frequencyType.repeatEvery, "days");
      return nextDueDate.toDate();
    case "week":
      // calculate the next due date take into account the repeatEvery
      // also take into account the days of the week
      const { daysOfWeek } = frequencyType;
      if (!daysOfWeek) {
        throw new Error("Days of the week is not defined");
      }
      // Days of week is an array of strings representing the days of the week
      // Also take into account the repeatEvery

      const daysOfWeekMap = {
        sun: 0,
        mon: 1,
        tue: 2,
        wed: 3,
        thu: 4,
        fri: 5,
        sat: 6,
      };
      const daysOfWeekNum = daysOfWeek.map((day) => daysOfWeekMap[day]);
      const todayNum = today.getDay();
      const nextDueDateNum = daysOfWeekNum.reduce((a, b) =>
        calcDiff(todayNum, a) < calcDiff(todayNum, b) ? a : b
      );

      if (nextDueDateNum === todayNum) {
        nextDueDate = moment(today).add(frequencyType.repeatEvery, "weeks");
      } else {
        const repeatEvery =
          frequencyType.repeatEvery - (todayNum > nextDueDateNum ? 0 : 1);
        nextDueDate = moment(today).add(
          nextDueDateNum - todayNum + 7 * repeatEvery,
          "days"
        );
      }

      return nextDueDate.toDate();
    default:
      // throw an error
      throw new Error("Invalid Frequency Type");
  }
};

// Function to get the next due dates up until the next 30 days
export const getNextDueDates = (frequencyType: FrequencyType) => {
  const nextDueDates = [];
  const today = new Date();
  let nextDueDate = getNextDueDate(frequencyType);
  while (moment(nextDueDate).diff(today, "days") <= 31) {
    nextDueDates.push(nextDueDate);
    // add 1 day to the next due date
    // nextDueDate = moment(nextDueDate).add(1, "days").toDate();
    console.log(nextDueDate);
    nextDueDate = getNextDueDate(frequencyType, nextDueDate);
  }
  return nextDueDates;
};

interface HabitsStoreType {
  userId: string;
  habits: { [habitId: string]: HabitType };
  entries: { [date: string]: entryType };

  addHabit: (habit: HabitType) => void;
  updateHabit: (habit: HabitType) => void;
  // deleteHabit: (habitId: string) => void;

  updateEntry: (habits: habitEntryType, date: Date) => void;

  setUserId: (userId: string) => void;

  syncHabits: () => void;
  syncEntries: () => void;
}

const initialState = {
  habits: {} as { [habitId: string]: HabitType },
  entries: {} as { [date: string]: entryType },
  userId: "",
};

// update and add habit
const updateHabit = async (habit: HabitType) => {
  const habitRef = doc(db, "habits", habit.habitId);
  await setDoc(habitRef, habit);
};
// update and add entry
const updateEntry = async (entry: entryType, date: Date, userId: string) => {
  const entryRef = doc(
    db,
    "users",
    userId,
    "habit-entries",
    moment(date).format("YYYY-MM-DD")
  );
  const entrySnap = await getDoc(entryRef);
  if (entrySnap.exists()) {
    await updateDoc(entryRef, {
      date: entry.date,
      habits: entry.habits,
      updatedAt: entry.updatedAt,
      ...entry.habits,
    });
  } else {
    await setDoc(entryRef, entry);
  }
};

const deleteHabit = async (habitId: string) => {
  const habitRef = doc(db, "habits", habitId);
  await setDoc(habitRef, { archived: true });
};

// sync habits with firestore
// this function is called when the user logs in
const fetchHabits = async (
  userId: string,
  habits: { [habitId: string]: HabitType }
) => {
  const habitsRef = collection(db, "habits");
  const habitEntries = Object.entries(habits);
  const firstHabit = habitEntries[0];

  const latestHabit = await habitEntries.reduce((prev, next) => {
    if (next[1].updatedAt > prev[1].updatedAt) {
      return next;
    }
    return prev;
  }, firstHabit);

  const latestDate: Date = latestHabit
    ? latestHabit[1].updatedAt.toDate()
    : new Date(2000, 1, 1);

  const q = query(
    habitsRef,
    where("updatedAt", ">", latestDate),
    where("userId", "==", userId)
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot;
};

// sync entries with firestore
// this function is called when the user logs in
const fetchEntries = async (
  userId: string,
  entries: { [date: string]: entryType }
) => {
  const entriesRef = collection(db, "users", userId, "habit-entries");
  const entryEntries = Object.entries(entries);
  const firstEntry = entryEntries[0];

  const latestEntry = await entryEntries.reduce((prev, next) => {
    if (next[1].updatedAt > prev[1].updatedAt) {
      return next;
    }
    return prev;
  }, firstEntry);

  const latestDate: Date = latestEntry
    ? latestEntry[1].updatedAt.toDate()
    : new Date(2000, 1, 1);

  const q = query(entriesRef, where("updatedAt", ">", latestDate));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
};

// zustand store
const useHabitsStore = create<HabitsStoreType>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        addHabit: async (habit: HabitType) => {
          habit.createdAt = Timestamp.now();
          habit.updatedAt = Timestamp.now();
          // update nextDueDate
          habit.nextDueDate = Timestamp.fromDate(
            getNextDueDate(habit.frequencyType)
          );

          if (get().userId) {
            habit.userId = get().userId;
            updateHabit(habit);
          }

          set(
            produce((state) => {
              state.habits[habit.habitId] = habit;
            })
          );
        },
        updateHabit: (habit: HabitType) => {
          habit.updatedAt = Timestamp.now();
          // update nextDueDate
          habit.nextDueDate = Timestamp.fromDate(
            getNextDueDate(habit.frequencyType)
          );

          if (get().userId) {
            habit.userId = get().userId;
            updateHabit(habit);
          }

          set(
            produce((state) => {
              state.habits[habit.habitId] = habit;
            })
          );
        },
        setUserId: (userId: string) => {
          set({ userId });
        },
        syncHabits: async () => {
          if (!get().userId) return;
          const querySnapshot = await fetchHabits(get().userId, get().habits);
          set(
            produce((state) => {
              querySnapshot.forEach((doc) => {
                const habit = doc.data() as HabitType;
                state.habits[habit.habitId] = habit;
              });
            })
          );
        },
        updateEntry: async (habitEntry: habitEntryType, date: Date) => {
          const entry = {
            date: Timestamp.fromDate(date),
            habits: habitEntry,
            updatedAt: Timestamp.now(),
          } as entryType;
          entry.updatedAt = Timestamp.now();
          entry.date = Timestamp.fromDate(date);
          // check if entry exists
          // if it doesn't, create it, and update all the habits in to their nextDueDate
          // if it exists, update it, no need to update habits
          const entryRef = doc(
            db,
            "users",
            get().userId,
            "habit-entries",
            moment(date).format("YYYY-MM-DD")
          );
          const entrySnap = await getDoc(entryRef);
          if (entrySnap.exists()) {
            await updateDoc(entryRef, {
              date: entry.date,
              habits: entry.habits,
              updatedAt: entry.updatedAt,
              ...entry.habits,
            });
            console.log("updated entry");
          } else {
            await setDoc(entryRef, {
              date: entry.date,
              habits: entry.habits,
              updatedAt: entry.updatedAt,
              ...entry.habits,
            });
            const habits = get().habits;
            for (const habitId in habits) {
              const habit = habits[habitId];
              get().updateHabit({
                ...habit,
              });
            }
            console.log("created entry and updated habits");
          }

          set(
            produce((state) => {
              state.entries[moment(date).format("YYYY-MM-DD")] = entry;
              // update habits
              for (const habitId in entry.habits) {
                const habit = state.habits[habitId];
                habit.nextDueDate = Timestamp.fromDate(
                  getNextDueDate(habit.frequencyType)
                );
              }
            })
          );
        },
        syncEntries: async () => {
          if (!get().userId) return;
          const querySnapshot = await fetchEntries(get().userId, get().entries);
          set(
            produce((state) => {
              querySnapshot.forEach((doc) => {
                const entry = doc.data() as entryType;
                state.entries[
                  moment(entry.date.toDate()).format("YYYY-MM-DD")
                ] = entry;
              });
            })
          );
        },
      }),
      {
        name: "habits-storage",
        deserialize: (state: string) => {
          const parsedState = JSON.parse(state);
          try {
            for (const key in parsedState.state.entries) {
              // convert date to firebase timestamp
              const entry = parsedState.state.entries[key];
              parsedState.state.entries[key].date = new Timestamp(
                parseInt(entry.date.seconds),
                parseInt(entry.date.nanoseconds)
              );
              parsedState.state.entries[key].updatedAt = new Timestamp(
                parseInt(entry.updatedAt.seconds),
                parseInt(entry.updatedAt.nanoseconds)
              );
            }
            for (const key in parsedState.state.habits) {
              const habit = parsedState.state.habits[key];

              parsedState.state.habits[key].createdAt = new Timestamp(
                parseInt(habit.createdAt.seconds),
                parseInt(habit.createdAt.nanoseconds)
              );
              parsedState.state.habits[key].updatedAt = new Timestamp(
                parseInt(habit.updatedAt.seconds),
                parseInt(habit.updatedAt.nanoseconds)
              );
              parsedState.state.habits[key].nextDueDate = new Timestamp(
                parseInt(habit.nextDueDate.seconds),
                parseInt(habit.nextDueDate.nanoseconds)
              );
              parsedState.state.habits[key].lastCompletedDate = new Timestamp(
                parseInt(habit.lastCompletedDate.seconds),
                parseInt(habit.lastCompletedDate.nanoseconds)
              );
            }
          } catch (error) {
            console.log(error);
          }
          return parsedState;
        },
      }
    ),
    {
      name: "habits-storage-devtools",
    }
  )
);

export default useHabitsStore;
