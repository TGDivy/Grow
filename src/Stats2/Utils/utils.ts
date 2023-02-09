import moment from "moment";
import { timerType } from "../../Common/Types/Types";

/**
 * Given today's date, get date of Monday of the week and date of Sunday of the week
 * @param date: Date
 * @returns { firstDay, lastDay} : {Date, Date}
 */
// export const getWeek = (date: Date) => {
//   const day = date.getDay();
//   const diff = date.getDate() - day + (day === 0 ? -6 : 1);
//   const firstDay = new Date(date.setDate(diff)); // Monday
//   const lastDay = new Date(date.setDate(diff + 6)); // Sunday
//   return { firstDay, lastDay };
// };

// same as getWeek but with a different start day, Sunday
export const getWeek = (date: Date) => {
  const day = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const diff = date.getDate() - day;
  // check if monday is in the previous month
  if (diff < 0) {
    const firstDay = new Date(
      date.getFullYear(),
      date.getMonth() - 1,
      // days in previous month - diff
      moment(date).subtract(1, "month").daysInMonth() + diff
    );
    const lastDay = new Date(date.getFullYear(), date.getMonth(), 6 + diff);
    return { firstDay, lastDay };
  }
  const firstDay = new Date(date.setDate(diff)); // Sunday
  const lastDay = new Date(date.setDate(diff + 7)); // Saturday
  firstDay.setHours(0, 0, 0, 0);
  lastDay.setHours(0, 0, 0, 0);
  return { firstDay, lastDay };
};

/**
 * Given today's date, get date of the first day of the month and date of the last day of the month
 * @param date
 * @returns { firstDay, lastDay} : {Date, Date}
 */
export const getMonth = (date: Date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  firstDay.setHours(0, 0, 0, 0);
  lastDay.setHours(0, 0, 0, 0);
  return { firstDay, lastDay };
};

/**
 * Given today's date, get date of the first day of the quarter and date of the last day of the quarter
 * @param date: Date
 * @returns { firstDay, lastDay} : {Date, Date}
 */
export const getQuarter = (date: Date) => {
  const firstDay = new Date(
    date.getFullYear(),
    Math.floor(date.getMonth() / 3) * 3,
    1
  );
  const lastDay = new Date(
    date.getFullYear(),
    Math.floor(date.getMonth() / 3) * 3 + 3,
    0
  );

  firstDay.setHours(0, 0, 0, 0);
  lastDay.setHours(0, 0, 0, 0);
  return { firstDay, lastDay };
};

/**
 * Given today's date, get date of the first day of the year and date of the last day of the year
 * @param date: Date
 * @returns { firstDay, lastDay} : {Date, Date}
 */
export const getYear = (date: Date) => {
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const lastDay = new Date(date.getFullYear(), 11, 31);
  return { firstDay, lastDay };
};

/**
 * Given today's date, get 12am of today and 11:59pm of today
 * @param date: Date
 * @returns { firstDay, lastDay} : {Date, Date}
 */
export const getDay = (date: Date) => {
  const firstDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - 1,
    22,
    0
  );
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59
  );
  return { firstDay, lastDay };
};

export enum timePeriod {
  day = "day",
  week = "week",
  month = "month",
  quarter = "quarter",
  year = "year",
}

/**
 * Get timer records between two dates
 * Optionally, pad the timer records with empty units of time.
 * @param timerRecords: timerType[]
 * @param startDate: Date
 * @param endDate: Date
 * @param pad: timePeriod
 * @returns timerType[]
 */
export const getTimerRecordsBetween = (
  timerRecords: timerType[],
  startDate: Date,
  endDate: Date,
  pad?: timePeriod
) => {
  const filteredTimerRecords = timerRecords.filter(
    (timerRecord) =>
      timerRecord.startTime.getTime() > startDate.getTime() &&
      timerRecord.startTime.getTime() < endDate.getTime()
  );

  if (pad) {
    const emptyRecord = {
      startTime: new Date(),
      duration: 0,
      tags: [],
      taskKey: "",
      sticker: "",
      active: false,
    };

    if (pad === timePeriod.day) {
      // pad each hour from startdate to enddate
      for (let i = 0; i < 24; i++) {
        const newDate = new Date(endDate);
        newDate.setHours(i);
        const newRecord = { ...emptyRecord, startTime: newDate };
        filteredTimerRecords.push(newRecord);
      }
    } else if (pad === timePeriod.week || pad === timePeriod.month) {
      // pad each day from startdate to enddate

      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      for (let i = 0; i < diffDays; i++) {
        const newDate = new Date(startDate);
        newDate.setDate(newDate.getDate() + i);
        const newRecord = { ...emptyRecord, startTime: newDate };
        filteredTimerRecords.push(newRecord);
      }
    } else if (pad === timePeriod.quarter) {
      // pad each week from startdate to enddate
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
      for (let i = 0; i < diffWeeks; i++) {
        const newDate = new Date(startDate);
        newDate.setDate(newDate.getDate() + i * 7);
        const newRecord = { ...emptyRecord, startTime: newDate };
        filteredTimerRecords.push(newRecord);
      }
    } else if (pad === timePeriod.year) {
      // pad each month from startdate to enddate
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
      for (let i = 0; i < diffMonths; i++) {
        const newDate = new Date(startDate);
        newDate.setMonth(newDate.getMonth() + i);
        const newRecord = { ...emptyRecord, startTime: newDate };
        filteredTimerRecords.push(newRecord);
      }
    }
  }

  return filteredTimerRecords;
};

/**
 * Given timePeriod, and number of timePeriods to go back, get the start and end date
 * @param period: timePeriod
 * @param numPeriods: number
 * @returns { firstDay, lastDay } : {Date, Date}
 * @example
 * getStartAndEndDate(timePeriod.day, 1) // returns {firstDay: Date, lastDay: Date}
 */
export const getStartAndEndDate = (period: timePeriod, numPeriods: number) => {
  const today = new Date();
  const timePeriodsAgo = new Date();

  switch (period) {
    case timePeriod.day:
      timePeriodsAgo.setDate(today.getDate() - numPeriods);
      return getDay(timePeriodsAgo);

    case timePeriod.week:
      timePeriodsAgo.setDate(today.getDate() - numPeriods * 7);
      return getWeek(timePeriodsAgo);

    case timePeriod.month:
      timePeriodsAgo.setMonth(today.getMonth() - numPeriods);
      return getMonth(timePeriodsAgo);

    case timePeriod.quarter:
      timePeriodsAgo.setMonth(today.getMonth() - numPeriods * 3);
      return getQuarter(timePeriodsAgo);

    case timePeriod.year:
      timePeriodsAgo.setFullYear(today.getFullYear() - numPeriods);
      return getYear(timePeriodsAgo);
  }
};

/**
 * Given start and end date, and timePeriod, return the display name of the timePeriod between the two dates
 * @param startDate: Date
 * @param endDate: Date
 * @param period: timePeriod
 * @returns string
 */
export const getPeriodName = (
  startDate: Date,
  endDate: Date,
  period: timePeriod
) => {
  // For day, return: Month day, Year
  // For week, return: Month Day - Day
  // For month, return: Month Year
  // For quarter, return: Quarter Year
  // For year, return: Year
  switch (period) {
    case timePeriod.day:
      return `${endDate.toLocaleString("default", {
        month: "short",
      })} ${endDate.getDate()}, ${endDate.getFullYear()}`;
    case timePeriod.week:
      return `${startDate.toLocaleString("default", {
        month: "short",
      })} ${startDate.getDate()} - ${endDate.getDate()}`;
    case timePeriod.month:
      return `${startDate.toLocaleString("default", {
        month: "long",
      })} ${startDate.getFullYear()}`;
    case timePeriod.quarter:
      return `Q${
        Math.floor(startDate.getMonth() / 3) + 1
      } ${startDate.getFullYear()}`;
    case timePeriod.year:
      return `${startDate.getFullYear()}`;
  }
};

import { JournalDicType, JournalType } from "../../Common/Types/Types";
/**
 * Get journal records between start and end date
 * @param journals: JournalDicType
 * @param startDate: Date
 * @param endDate: Date
 * @param pad: timePeriod
 * @returns JournalType[]
 */
export const getJournalRecords = (
  journals: JournalDicType,
  startDate: Date,
  endDate: Date,
  pad: timePeriod
): JournalType[] => {
  // change start date and end date to be 5 hours later
  const newStartDate = moment(startDate).add(5, "hours").toDate();
  const newEndDate = moment(endDate).add(5, "hours").add(1, "day").toDate();

  const filteredJournals = Object.values(journals).filter((journal) => {
    const journalDate = new Date(journal.date);
    return (
      journalDate.getTime() >= newStartDate.getTime() &&
      journalDate.getTime() <= newEndDate.getTime()
    );
  });

  const emptyRecord: JournalType = {
    date: new Date(),
    entry: "",
    exercised: false,
    meals: [],
    mood: [],
    nextDayNotes: "",
    tasksForTomorrow: [],
    title: "",
    workDone: 0,
    tagHabits: {},
    customBoolHabits: {},
  };

  if (pad) {
    // get the days between start and end date
    const dates_with_records = new Set(
      filteredJournals.map((journal) => {
        // subtract 5 hours to get the correct date
        const corrected = moment(journal.date).subtract(5, "hours");
        // get day without time
        const day = corrected.startOf("day").toDate();
        return day.toString();
      })
    );

    // pad each day from startdate to enddate
    // using moment to get next day

    for (
      let i = 0;
      i < moment(newEndDate).diff(moment(newStartDate), "days");
      i++
    ) {
      const newDate = moment(startDate).add(i, "days").toDate();
      if (dates_with_records.has(newDate.toString())) {
        continue;
      }

      const newRecord = {
        ...emptyRecord,
        date: moment(newDate).add(5, "hours").toDate(),
      };
      filteredJournals.push(newRecord);
    }
  }

  // sort by date
  filteredJournals.sort((a, b) => {
    return a.date.getTime() - b.date.getTime();
  });

  // change the date back to original
  filteredJournals.forEach((journal) => {
    journal.date = moment(journal.date).subtract(5, "hours").toDate();
  });

  return filteredJournals;
};

/**
 * Given start and end date, timerType[], and journal records, and pad, return the journal records between the two dates by populating the workDone field
 * @param startDate: Date
 * @param endDate: Date
 * @param period: timePeriod
 * @param journals: JournalDicType
 * @param pad: timePeriod
 * @returns JournalType[]
 */
export const getJournalRecordsWithWorkDone = (
  startDate: Date,
  endDate: Date,
  timerRecords: timerType[],
  journals: JournalDicType,
  pad: timePeriod
): JournalType[] => {
  const deepJournals = JSON.parse(JSON.stringify(journals)) as JournalDicType;
  Object.values(deepJournals).forEach((journal) => {
    journal.date = new Date(journal.date);
  });
  const journalRecords = getJournalRecords(
    deepJournals,
    startDate,
    endDate,
    pad
  );

  // The above code is correct, but we don't want to iterate through all the timer records every time we want to get the work done for a journal record
  // Instead, we want to iterate through the timer records once, and then use the date as a key to get the work done for each journal record
  const timerRecordsByDate = timerRecords.reduce((acc, timer) => {
    const timerDate = new Date(timer.startTime);
    const dateKey = timerDate.toDateString();
    if (acc[dateKey]) {
      acc[dateKey] += timer.duration;
    } else {
      acc[dateKey] = timer.duration;
    }
    return acc;
  }, {} as { [key: string]: number });

  const journalRecordsWithWorkDone = journalRecords.map((journal) => {
    const journalDate = new Date(journal.date);
    const dateKey = journalDate.toDateString();
    const workDone = timerRecordsByDate[dateKey] || 0;
    return { ...journal, workDone };
  });

  return journalRecordsWithWorkDone;
};
