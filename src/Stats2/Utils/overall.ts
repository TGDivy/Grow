import moment from "moment";
import { JournalType } from "../../Common/Types/Types";
import { timePeriod } from "./utils";
import { round } from "lodash";

export interface dataType {
  label: string; // hour, day, week, month
  sort?: number; // used for sorting

  workScore: number; // based on work time
  exerciseScore: number; // based on whether exercise was done
  mealScore: number; // based on whether meals were eaten (and how many)
  habitScore: number; // based on whether habits were done (and how many)
}

/**
 * Given a list of journal records, return the stats based on the time period
 * @param journalRecords: JournalType[]
 * @param period: timePeriod
 * @returns dataType[]
 */
export const getOverallStats = async (
  journalRecords: JournalType[],
  period: timePeriod
) => {
  // If dataType is week or month we want to get the stats for each day
  // If dataType is quarter we want to get the average daily stats for each week
  // If dataType is year we want to get the average daily stats for each month

  switch (period) {
    case timePeriod.week:
      return await getDays(journalRecords);
    case timePeriod.month:
      return await getDaysOfMonth(journalRecords);
    case timePeriod.quarter:
      return await getWeeks(journalRecords);
    case timePeriod.year:
      return await getMonths(journalRecords);
    default:
      return [];
  }
};

/**
 * Given a list of journal records, return the stats
 * for each day of the week
 * @param journalRecords: JournalType[]
 * @returns dataType[]
 */
export const getDays = async (journalRecords: JournalType[]) => {
  const days: dataType[] = [];

  // Get the stats for each day of the week
  for (let i = 0; i < 7; i++) {
    let day: dataType = {
      label: moment().day(i).format("ddd"),
      sort: i,
      workScore: 0,
      exerciseScore: 0,
      mealScore: 0,
      habitScore: 0,
    };

    // Get the records for the day
    const records = journalRecords.filter((record) => {
      return moment(record.date).day() === i;
    });

    // Get the stats for the day
    day = await getStats(day, records);

    days.push(day);
  }

  // console.log("days", days);

  return days;
};

/**
 * Given a list of journal records, return the stats
 * for each day of the month
 * @param journalRecords: JournalType[]
 * @returns dataType[]
 */
export const getDaysOfMonth = async (journalRecords: JournalType[]) => {
  const days: dataType[] = [];

  // Get the stats for each day of the month
  for (let i = 1; i <= 31; i++) {
    let day: dataType = {
      label: i < 10 ? `0${i}` : `${i}`,
      sort: i,
      workScore: 0,
      exerciseScore: 0,
      mealScore: 0,
      habitScore: 0,
    };

    // Get the records for the day
    const records = journalRecords.filter((record) => {
      return moment(record.date).date() === i;
    });

    // Get the stats for the day
    if (records.length > 0) {
      day = await getStats(day, records);
    }
    days.push(day);
  }

  return days;
};

/**
 * Given a list of journal records, return the stats
 * for each week of the quarter
 * @param journalRecords: JournalType[]
 * @returns dataType[]
 */
export const getWeeks = async (journalRecords: JournalType[]) => {
  const weeks: dataType[] = [];

  // Get the stats for each week of the quarter
  for (let i = 1; i <= 12; i++) {
    let week: dataType = {
      label: `W${i}`,
      sort: i,
      workScore: 0,
      exerciseScore: 0,
      mealScore: 0,
      habitScore: 0,
    };

    // get the quarter for the week

    // Get the records for the week
    const records = journalRecords.filter((record) => {
      const expanded = moment(record.date).week() % 13;

      return expanded === i;
    });

    // Get the stats for the week
    week = await getStats(week, records);

    weeks.push(week);
  }

  return weeks;
};

/**
 * Given a list of journal records, return the stats
 * for each month of the year
 * @param journalRecords: JournalType[]
 * @returns dataType[]
 *   */
export const getMonths = async (journalRecords: JournalType[]) => {
  const months: dataType[] = [];

  // Get the stats for each month of the year
  for (let i = 0; i < 12; i++) {
    let month: dataType = {
      label: moment().month(i).format("MMM"),
      sort: i,
      workScore: 0,
      exerciseScore: 0,
      mealScore: 0,
      habitScore: 0,
    };

    // Get the records for the month
    const records = journalRecords.filter((record) => {
      return moment(record.date).month() === i;
    });

    // Get the stats for the month
    month = await getStats(month, records);

    months.push(month);
  }

  return months;
};

/**
 * Given a list of journal records, return the stats
 * @param day: dataType
 * @param records: JournalType[]
 * @returns dataType
 *  */
export const getStats = async (day: dataType, records: JournalType[]) => {
  // Get the stats for the day
  day.workScore = await getWorkScore(records);
  day.exerciseScore = await getExerciseScore(records);
  day.mealScore = await getMealScore(records);
  day.habitScore = await getHabitScore(records);

  return day;
};

const maxTime = 12 * 60 * 60;
const minTime = 0;
const maxScore = 50;
const minScore = 0;
/**
 * Given a list of journal records, return the work score
 * @param records: JournalType[]
 * @returns number
 * */
export const getWorkScore = async (records: JournalType[]) => {
  // work score can be 0-50 based 0-12 hours of work done in a day
  // if multiple work records are present, take the average
  let workScore = 0;
  records.forEach((record) => {
    if (record.workDone) {
      const time = record.workDone;
      const score =
        ((time - minTime) / (maxTime - minTime)) * (maxScore - minScore) +
        minScore;

      workScore += Math.min(score, maxScore);
    }
  });
  workScore = workScore / records.length;

  return round(workScore);
};

const MAX_EXERCISE_SCORE = 15;
/**
 * Given a list of journal records, return the exercise score
 * @param records: JournalType[]
 * @returns number
 * */
export const getExerciseScore = async (records: JournalType[]) => {
  // exercise score can be 0 or 15 based on whether exercise was done or not
  // if multiple exercise records are present, take the average
  let exerciseScore = 0;
  records.forEach((record) => {
    if (record.exercised) {
      exerciseScore += MAX_EXERCISE_SCORE;
    }
  });
  exerciseScore = exerciseScore / records.length;
  return exerciseScore;
};

const MAX_MEAL_SCORE = 15;
/**
 * Given a list of journal records, return the meal score
 * @param records: JournalType[]
 * @returns number
 * */
export const getMealScore = async (records: JournalType[]) => {
  // meal score can be 0 or 15 based on whether meal was done or not
  // if multiple meal records are present, take the average
  let mealScore = 0;
  records.forEach((record) => {
    if (record.meals) {
      // record.meals is an array of meals, each meal can be "", "cooked", "restaurant"
      // for each cooked meal, add 1/3rd of the max meal score
      // for each restaurant meal, add 1/4th of the max meal score
      // for each "" meal, add 0
      record.meals.forEach((meal) => {
        if (meal === "cooked") {
          mealScore += MAX_MEAL_SCORE / 3;
        } else if (meal === "restaurant") {
          mealScore += MAX_MEAL_SCORE / 4;
        }
      });
    }
  });
  mealScore = mealScore / records.length;
  return mealScore;
};

const MAX_HABIT_SCORE = 20;
/**
 * Given a list of journal records, return the habit score
 * @param records: JournalType[]
 * @returns number
 * */
export const getHabitScore = async (records: JournalType[]) => {
  // habit score can be between 0-MAX_HABIT_SCORE based on the percentage of true habits
  // if multiple habit records are present, take the average
  let habitScore = 0;
  records.forEach((record) => {
    let habits: boolean[] = [];
    if (record.customBoolHabits) {
      habits = habits.concat(Object.values(record.customBoolHabits));
    }
    if (record.tagHabits) {
      habits = habits.concat(Object.values(record.tagHabits));
    }
    const totalHabits = habits.length || 1;
    const trueHabits = habits.filter((habit) => habit).length || 0;
    habitScore += (trueHabits / totalHabits) * MAX_HABIT_SCORE;
  });
  habitScore = habitScore / records.length;
  habitScore = round(habitScore);
  return habitScore;
};
