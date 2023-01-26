import moment from "moment";
import { timerType } from "../../Common/Types/Types";
import { timePeriod } from "./utils";

export interface dataType {
  label: string; // hour, day, week, month
  time: number; // duration worked
  sort?: number; // used for sorting
}

/**
 * Given timer records, and a time period, return a list of time periods and the total time worked in each time period.
 * @param timerRecords: timerType[]
 * @param period: timePeriod
 * @returns dataType[]
 */
export const getTimePeriods = async (
  timerRecords: timerType[],
  period: timePeriod,
  date?: Date
) => {
  // If dataType is day then the time period is 24 hours
  // So we want to get the total time worked in each hour
  // If dataType is week we want to get the total time worked in each day,
  // If dataType is month we want to get the total time worked in each day of the month
  // If dataType is quarter we want to get the total time worked in each week
  // If dataType is year we want to get the total time worked in each month

  switch (period) {
    case timePeriod.day:
      return await getHours(timerRecords, date);
    case timePeriod.week:
      return await getDays(timerRecords);
    case timePeriod.month:
      return await getDaysOfMonth(timerRecords);
    case timePeriod.quarter:
      return await getWeeks(timerRecords);
    case timePeriod.year:
      return await getMonths(timerRecords);
  }
};

/**
 * Get X axis ticks for a given time period
 * @param period: timePeriod
 * @returns number[]
 */
export const getXAxisTicks = (period: timePeriod) => {
  switch (period) {
    case timePeriod.day:
      return ["00:00", "06:00", "12:00", "18:00", "23:00"];
    case timePeriod.week:
      return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    case timePeriod.month:
      return ["01", "05", "10", "15", "20", "25", "30"];
    case timePeriod.quarter:
      return ["W1", "W4", "W7", "W10", "W13"];
    case timePeriod.year:
      return [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
  }
};

export const periodYAxisLabelFunction = {
  [timePeriod.day]: (tick: number) => `${(tick / 60).toFixed(0)}M`,
  [timePeriod.week]: (tick: number) => `${(tick / 3600).toFixed(0)}H`,
  [timePeriod.month]: (tick: number) => `${(tick / 3600).toFixed(0)}H`,
  [timePeriod.quarter]: (tick: number) => `${(tick / 3600).toFixed(0)}H`,
  [timePeriod.year]: (tick: number) => `${(tick / 3600).toFixed(0)}H`,
};

export const customTooltipTitle = {
  [timePeriod.day]: "",
  [timePeriod.week]: "",
  [timePeriod.month]: "Day:",
  [timePeriod.quarter]: "",
  [timePeriod.year]: "",
};

export interface dicType {
  [key: string]: number;
}

/**
 * Get the total time worked in each hour
 * @param timerRecords: timerType[]
 * @returns dataType[]
 */
const getHours = async (timerRecords: timerType[], date?: Date) => {
  const hoursDic: dicType = {};
  const forDate = date ? date : timerRecords[0].startTime;

  // Get the total time worked in each hour
  for (const timerRecord of timerRecords) {
    // a timer record can span multiple hours
    // we have the start time and the duration
    // so we can figure each hour that the timer record spans and only add the duration worked in that hour
    // it can also belong to a different day, but we only want to add the duration worked in that hour for the given day
    const startTime = timerRecord.startTime;
    const duration = timerRecord.duration;

    // if the timer record is for a different day, then we only want to add the duration worked in that hour for the given day
    if (moment(startTime).isSame(forDate, "day")) {
      // Get the hour that the timer record started
      const startHour = startTime.getHours();

      // Get the hour that the timer record ended
      let endHour = new Date(startTime.getTime() + duration * 1000).getHours();

      // If the timer record spans multiple hours
      if (startHour !== endHour) {
        // Add the duration worked in the first hour
        if (hoursDic[startHour]) {
          hoursDic[startHour] += 60 * 60 - startTime.getMinutes() * 60;
        } else {
          hoursDic[startHour] = 60 * 60 - startTime.getMinutes() * 60;
        }

        // Add the duration worked in the last hour if it is the same day
        if (endHour >= startHour) {
          if (hoursDic[endHour]) {
            hoursDic[endHour] +=
              new Date(startTime.getTime() + duration * 1000).getMinutes() * 60;
          } else {
            hoursDic[endHour] =
              new Date(startTime.getTime() + duration * 1000).getMinutes() * 60;
          }
        }

        if (endHour < startHour) {
          endHour += 24;
        }

        // Add the duration worked in the hours in between
        for (let i = startHour + 1; i < endHour; i++) {
          if (hoursDic[i]) {
            hoursDic[i] += 60 * 60;
          } else {
            hoursDic[i] = 60 * 60;
          }
        }
      } else {
        // If the timer record does not span multiple hours
        if (hoursDic[startHour]) {
          hoursDic[startHour] += duration;
        } else {
          hoursDic[startHour] = duration;
        }
      }
    } else if (moment(startTime).isBefore(forDate, "day")) {
      // If the timer record is for a day before the given day
      // then we only want to add the duration worked in that hour for the given day
      const startHour = startTime.getHours();
      let endHour = new Date(startTime.getTime() + duration * 1000).getHours();

      // If the timer record spans multiple hours
      if (startHour !== endHour) {
        // Add the duration worked in the last hour if it is the same day
        if (endHour < startHour) {
          if (hoursDic[endHour]) {
            hoursDic[endHour] +=
              new Date(startTime.getTime() + duration * 1000).getMinutes() * 60;
          } else {
            hoursDic[endHour] =
              new Date(startTime.getTime() + duration * 1000).getMinutes() * 60;
          }
        }

        if (endHour < startHour) {
          endHour += 24;
        }

        // Add the duration worked in the hours in between
        for (let i = startHour + 1; i < endHour; i++) {
          if (i >= 24) {
            if (hoursDic[i - 24]) {
              hoursDic[i - 24] += 60 * 60;
            } else {
              hoursDic[i - 24] = 60 * 60;
            }
          }
        }
      }
    }
  }

  // Convert the dictionary to an array of dataType
  const hours: dataType[] = [];
  for (const hour in hoursDic) {
    hours.push({
      label: hour?.padStart(2, "0") + ":00",
      time: hoursDic[hour] + 0,
    });
  }

  return hours;
};

/**
 * Get the total time worked in each day
 * @param timerRecords: timerType[]
 * @returns dataType[]
 *  */
const getDays = async (timerRecords: timerType[]) => {
  const days: dataType[] = [];

  // Get the total time worked in each day
  for (let i = 0; i < 7; i++) {
    const day = new Date(0, 0, i).toLocaleDateString("en-US", {
      weekday: "short",
    });

    const time = await getTotalTimeWorkedInDay(timerRecords, day);

    days.push({
      label: day,
      time,
    });
  }

  return days;
};

/**
 * Get the total time worked in day
 * @param timerRecords: timerType[]
 * @param day: string
 * @returns number
 * */
const getTotalTimeWorkedInDay = async (
  timerRecords: timerType[],
  day: string
) => {
  const time = timerRecords.reduce((acc, timerRecord) => {
    const timerRecordDay = timerRecord.startTime.toLocaleDateString("en-US", {
      weekday: "short",
    });
    if (timerRecordDay === day) {
      return acc + timerRecord.duration;
    } else {
      return acc;
    }
  }, 0);

  return time;
};

/**
 * Get the total time worked in each day of the month
 * @param timerRecords: timerType[]
 * @returns dataType[]
 * */
const getDaysOfMonth = async (timerRecords: timerType[]) => {
  const days: dataType[] = [];

  // Get the total time worked in each day of the month
  for (let i = 1; i <= 31; i++) {
    const day = i.toString();

    const time = await getTotalTimeWorkedInDayOfMonth(timerRecords, day);

    days.push({
      label: day?.padStart(2, "0"),
      time,
    });
  }

  return days;
};

/**
 * Get the total time worked in day of the month
 * @param timerRecords: timerType[]
 * @param day: string
 * @returns number
 * */
const getTotalTimeWorkedInDayOfMonth = async (
  timerRecords: timerType[],
  day: string
) => {
  const time = timerRecords.reduce((acc, timerRecord) => {
    const timerRecordDay = timerRecord.startTime.getDate().toString();
    if (timerRecordDay === day) {
      return acc + timerRecord.duration;
    } else {
      return acc;
    }
  }, 0);

  return time;
};

/**
 * Get the total time worked in each week
 * @param timerRecords: timerType[]
 * @returns dataType[]
 * */
const getWeeks = async (timerRecords: timerType[]) => {
  const weekDic: dicType = {};

  // Get the total time worked in each week
  for (const timerRecord of timerRecords) {
    const weekNumber = moment(timerRecord.startTime).week();
    const week = (weekNumber % 13) + 1;

    if (weekDic[week]) {
      weekDic[week] += timerRecord.duration;
    } else {
      weekDic[week] = timerRecord.duration;
    }
  }

  // Convert the dictionary to an array of dataType
  const weeks: dataType[] = [];
  for (const week in weekDic) {
    weeks.push({
      label: `W${week}`,
      time: weekDic[week] + 0,
      sort: parseInt(week),
    });
  }

  weeks.sort((a, b) => {
    if (!a.sort || !b.sort) return 0;
    return a.sort - b.sort;
  });

  return weeks;
};

/**
 * Get the total time worked in each month
 * @param timerRecords: timerType[]
 * @returns dataType[]
 * */
const getMonths = async (timerRecords: timerType[]) => {
  const monthDic: dicType = {};

  // Get the total time worked in each month
  for (const timerRecord of timerRecords) {
    const month = timerRecord.startTime.toLocaleDateString("en-US", {
      month: "short",
    });

    if (monthDic[month]) {
      monthDic[month] += timerRecord.duration;
    } else {
      monthDic[month] = timerRecord.duration;
    }
  }

  // Convert the dictionary to an array of dataType
  const months: dataType[] = [];
  for (const month in monthDic) {
    months.push({
      label: month,
      time: monthDic[month],
      sort: moment(month, "MMM").month() + 1,
    });
  }

  // Sort the array by month
  months.sort((a, b) => {
    if (!a.sort || !b.sort) return 0;
    return a.sort - b.sort;
  });

  return months;
};
