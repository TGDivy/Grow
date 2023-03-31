/* eslint-disable no-case-declarations */
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import produce from "immer";
import moment from "moment";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { db } from "../Firestore/firebase-config";
import { UnsplashImageType } from "./Utils/Utils";

export interface FrequencyType {
  type: "day" | "week";
  repeatEvery: number;

  // If type is week, represents mon, tue, wed, thu, fri, sat, sun
  daysOfWeek?: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[];
}

export type HabitVariant = "project" | "tag" | "custom";

// completion criteria types
export interface numericType {
  type: "numeric";
  value: number;
  variant: "greater" | "less" | "equal";
}

export interface booleanType {
  type: "boolean";
}

export interface rangeType {
  type: "range";
  start: number;
  end: number;
}

export type completionCriteriaType = numericType | booleanType | rangeType;

export interface HabitType {
  habitId: string;
  userId?: string;

  title: string;
  description: string;

  type: HabitVariant;
  completionCriteria?: completionCriteriaType; // default is boolean

  frequencyType: FrequencyType;

  nextDueDate: Timestamp;
  lastCompletedDate: Timestamp;

  reminder: boolean;

  createdAt: Timestamp;
  updatedAt: Timestamp;

  image?: UnsplashImageType;
  archived?: boolean;
  cannotArchive?: boolean;
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
// Function to check if the habit is due today
const calcDiffToday = (a: number, b: number) => {
  const diff = b - a;
  if (diff < 0) {
    return 7 + diff;
  }
  return diff;
};
export const dueToday = (
  frequencyType: FrequencyType,
  habitStartDate: Date,
  today?: Date
) => {
  today = today || new Date();

  switch (frequencyType.type) {
    case "day":
      // calculate the next due date take into account the repeatEvery, current date, and start date
      const diff = moment(today).diff(habitStartDate, "days");
      const repeatEvery = frequencyType.repeatEvery;
      const remainder = diff % repeatEvery;
      if (remainder === 0) {
        return true;
      }
      return false;
    case "week":
      // calculate the next due date take into account the repeatEvery, and days of the week
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
        calcDiffToday(todayNum, a) < calcDiffToday(todayNum, b) ? a : b
      );
      console.log(nextDueDateNum, todayNum);
      if (nextDueDateNum === todayNum) {
        return true;
      }
      return false;
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
  deleteHabit: (habitId: string) => void;

  updateEntry: (habits: habitEntryType, date: Date) => Promise<void>;
  getTodaysEntry: () => entryType | null;

  setUserId: (userId: string) => void;

  syncHabitEntries: () => Promise<void>;
  syncHabitEntryToday: () => Promise<void>;
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
        addHabit: (habit: HabitType) => {
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
          if (dueToday(habit.frequencyType, habit.createdAt.toDate())) {
            // add habit to today's entry
            const today = new Date();
            const entry = get().entries[moment(today).format("YYYY-MM-DD")];

            if (entry) {
              // make a copy of the entry object
              const entryCopy = { ...entry };
              // make a copy of the habits object
              entryCopy.habits = { ...entryCopy.habits };
              entryCopy.habits[habit.habitId] = false;
              get().updateEntry(entryCopy.habits, today);
            }
          }
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

        deleteHabit: (habitId: string) => {
          const habit_ = get().habits[habitId];
          const habit = { ...habit_ };
          // set habit archived to true
          habit.archived = true;
          habit.updatedAt = Timestamp.now();
          if (get().userId) {
            habit.userId = get().userId;
            updateHabit(habit);
          }
          set(
            produce((state) => {
              state.habits[habitId] = habit;
            })
          );
        },
        setUserId: (userId: string) => {
          set({ userId });
        },
        updateEntry: async (habitEntry: habitEntryType, date: Date) => {
          const entry = {
            date: Timestamp.fromDate(date),
            habits: habitEntry,
            updatedAt: Timestamp.now(),
          } as entryType;
          entry.updatedAt = Timestamp.now();
          entry.date = Timestamp.fromDate(date);

          const entries = get().entries;
          const entryDate = moment(date).format("YYYY-MM-DD");
          if (entries[entryDate]) {
            // check if all values are the same
            const isSame = Object.entries(habitEntry).every(
              ([key, value]) => value === entries[entryDate].habits[key]
            );
            if (isSame) {
              return;
            }
          }

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
        getTodaysEntry: () => {
          const today = moment().format("YYYY-MM-DD");
          const entry = get().entries[today];
          if (entry) {
            return entry;
          }
          return null;
        },

        syncHabitEntries: async () => {
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

          const querySnapshot2 = await fetchHabits(get().userId, get().habits);
          set(
            produce((state) => {
              querySnapshot2.forEach((doc) => {
                const habit = doc.data() as HabitType;
                state.habits[habit.habitId] = habit;
              });
            })
          );

          // if entry for today exist, don't do anything
          // if entry for today doesn't exist, check for the latest entry.
          // if no entry exists, create a new entry with all habits due today set to false
          // if an entry exists, iterate through from the latest entry to today and create entries for each day with all habits due that day set to false,
          // Followed by creating an entry for today with all habits due today set to false
          const today = moment().format("YYYY-MM-DD");
          const todayEntry = get().entries[today];
          if (!todayEntry) {
            const entries = get().entries;
            const habits = get().habits;
            const entryDates = Object.keys(entries);
            // if no entries exist, create a new entry for today with all habits set to false
            if (entryDates.length === 0) {
              const entry = {
                date: Timestamp.fromDate(new Date()),
                habits: {},
                updatedAt: Timestamp.now(),
              } as entryType;
              for (const habitId in habits) {
                const habit = habits[habitId];
                // check if habit is due today
                if (dueToday(habit.frequencyType, habit.createdAt.toDate())) {
                  entry.habits[habitId] = false;
                }
              }
              await get().updateEntry(entry.habits, new Date());
              console.log("created entry for today", entry);
            }
            // if entries exist, iterate through from the latest entry to today and create entries for each day with all habits due that day set to false,
            else {
              // iterate throught the entry dates, to find the latest entry
              const latestEntryDate = moment(
                entryDates.reduce((a, b) => (moment(a).isAfter(b) ? a : b))
              );
              console.log("latest entry date", latestEntryDate);
              const todayDate = moment(today, "YYYY-MM-DD");
              const daysBetween = todayDate.diff(latestEntryDate, "days");
              for (let i = 1; i <= daysBetween; i++) {
                // get next day without changing latestEntryDate
                const date = moment(latestEntryDate.clone())
                  .add(i, "days")
                  .toDate();

                const entry = {
                  date: Timestamp.fromDate(date),
                  habits: {},
                  updatedAt: Timestamp.now(),
                } as entryType;
                for (const habitId in habits) {
                  const habit = habits[habitId];
                  if (
                    dueToday(
                      habit.frequencyType,
                      habit.createdAt.toDate(),
                      date
                    )
                  ) {
                    entry.habits[habitId] = false;
                  }
                }
                await get().updateEntry(entry.habits, date);
                console.log("created entry for", date, entry);
              }
            }
          }
        },
        syncHabitEntryToday: async () => {
          const todayEntry = get().getTodaysEntry();
          // if today entry exist, check for all habits due today and only update those habits that don't exist in the entry
          // if today entry doesn't exist, create a new entry with all habits due today set to false
          if (todayEntry) {
            const habits = get().habits;
            const entry = {
              date: Timestamp.fromDate(new Date()),
              habits: {},
              updatedAt: Timestamp.now(),
            } as entryType;
            for (const habitId in habits) {
              const habit = habits[habitId];
              // check if habit is due today
              if (dueToday(habit.frequencyType, habit.createdAt.toDate())) {
                entry.habits[habitId] = false;
              }
            }
            await get().updateEntry(entry.habits, new Date());
            console.log("created entry for today", entry);
          } else {
            const habits = get().habits;
            const entry = {
              date: Timestamp.fromDate(new Date()),
              habits: {},
              updatedAt: Timestamp.now(),
            } as entryType;
            for (const habitId in habits) {
              const habit = habits[habitId];
              // check if habit is due today
              if (dueToday(habit.frequencyType, habit.createdAt.toDate())) {
                entry.habits[habitId] = false;
              }
            }
            await get().updateEntry(entry.habits, new Date());
            console.log("created entry for today", entry);
          }
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
