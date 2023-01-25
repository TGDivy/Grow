import { timerType } from "../../Common/Types/Types";

export const filterTimerRecords = (
  timerRecords: timerType[],
  timePeriodLength: number,
  daysBack: number
) => {
  const DAY = 24 * 60 * 60 * 1000;

  const today = new Date(new Date().getTime() - 5 * 60 * 60 * 1000).setHours(
    0,
    0,
    0,
    0
  );
  const current = new Date(today - daysBack * DAY);
  const filteredTimerRecords = timerRecords.filter(
    (timerRecord) =>
      timerRecord.startTime.getTime() - 5 * 60 * 60 * 1000 >
        current.getTime() - (timePeriodLength - 1) * DAY &&
      timerRecord.startTime.getTime() - 5 * 60 * 60 * 1000 <
        current.getTime() + DAY
  );
  // Pad weeklyTimerRecords with empty days
  for (let i = 0; i < timePeriodLength - 1; i++) {
    const date = new Date(current.getTime() - i * DAY);

    filteredTimerRecords.push({
      startTime: date,
      duration: 0,
      tags: [],
      taskKey: "",
      sticker: "",
      active: false,
    });
  }

  return filteredTimerRecords;
};

export const totalTimeWorked = (timerRecords: timerType[]) => {
  const T = Math.floor(
    timerRecords.reduce((acc, timerRecord) => {
      return acc + timerRecord.duration;
    }, 0) / 60
  );
  return T;
};

export const totalTimeWorkedByTagOrSticker = (
  timerRecords: timerType[],
  name: string
) => {
  const FilterByT = (timerRecord: timerType) => {
    return timerRecord.tags.includes(name);
  };

  const FilterByS = (timerRecord: timerType) => {
    return timerRecord.sticker === name;
  };

  const timerRecordsFiltered = timerRecords.filter(
    (timerRecord) => FilterByT(timerRecord) || FilterByS(timerRecord)
  );

  const T = Math.floor(
    timerRecordsFiltered.reduce((acc, timerRecord) => {
      return acc + timerRecord.duration;
    }, 0) / 60
  );
  return T;
};
