import React, { FC } from "react";
import useTimerRecordsStore from "../Common/Stores/TimerRecordsStore";
import { filterTimerRecords } from "./StatsMain";

import {
  LineChart,
  Line,
  YAxis,
  Tooltip,
  CartesianGrid,
  XAxis,
} from "recharts";
import { JournalDicType, JournalType, timerType } from "../Common/Types/Types";
import { Typography } from "@mui/material";
import GraphCard from "./GraphCard";
import useJournalStore from "../Common/Stores/JournalStore";

interface weeklyWorkStatType {
  [key: string]: number;
}

interface dataType {
  day: string;
  time: number;
  timePrev: number;
}

const getWeeklyWorkStat = async (
  timerRecords: timerType[],
  previousRecords: timerType[],
  dayDiff: number
) => {
  const months = [
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

  const getPerPeriod = (records: timerType[], diff: number) => {
    const weeklyWorkStatTemp: weeklyWorkStatType = {};

    const weeklyWorkStat = records.reduce((acc, cur) => {
      const date = new Date(
        cur.startTime.getTime() + diff * 24 * 60 * 60 * 1000
      );
      const day = date.getDate();
      const month = date.getMonth();
      const dayEntry = `${months[month]} ${day}`;

      if (acc[dayEntry]) {
        acc[dayEntry] += cur.duration;
      } else {
        acc[dayEntry] = cur.duration;
      }

      return acc;
    }, weeklyWorkStatTemp);

    return weeklyWorkStat;
  };

  const currentPeriod = getPerPeriod(timerRecords, 0);
  const previousPeriod = getPerPeriod(previousRecords, dayDiff);

  const data = [];
  for (const entry in currentPeriod) {
    data.push({
      day: entry,
      time: Math.floor(currentPeriod[entry] / 60),
      timePrev: Math.floor(previousPeriod[entry] / 60),
    });
  }

  // sort by date
  data.sort((a, b) => {
    const aDate = new Date(a.day);
    const bDate = new Date(b.day);
    return aDate.getTime() - bDate.getTime();
  });

  return data;
};

interface Props {
  timerRecords: timerType[];
  previousRecords: timerType[];
  journalRecords: JournalType[];
  previousJournalRecords: JournalType[];
  dayDiff: number;
}

export const filterJournalRecords = (
  journalRecords: JournalDicType,
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
  const filteredTimerRecords = Object.values(journalRecords).filter(
    (record) =>
      record.date.getTime() - 5 * 60 * 60 * 1000 >
        current.getTime() - (timePeriodLength - 1) * DAY &&
      record.date.getTime() - 5 * 60 * 60 * 1000 < current.getTime() + DAY
  );
  // Pad weeklyTimerRecords with empty days
  for (let i = 0; i < timePeriodLength; i++) {
    const date = new Date(current.getTime() + 5 * 60 * 60 * 1000 - i * DAY);

    filteredTimerRecords.push({
      date: date,
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
    } as JournalType);
  }

  return filteredTimerRecords;
};

interface dataTypeJournal {
  day: string;
  meals: number;
  exercised: number;
  customBoolHabits: number;
  tagHabits: number;

  mealsPrev: number;
  exercisedPrev: number;
  customBoolHabitsPrev: number;
  tagHabitsPrev: number;
}

interface weeklyHabitStatType {
  [key: string]: {
    [key: string]: number;
  };
}
const getWeeklyHabitStat = async (
  journalRecords: JournalType[],
  previousRecords: JournalType[],
  dayDiff: number
) => {
  const months = [
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

  const getPerPeriod = (records: JournalType[], diff: number) => {
    const weeklyHabitStatTemp: weeklyHabitStatType = {};

    const weeklyHabitStat = records.reduce((acc, cur) => {
      const date = new Date(
        cur.date.getTime() - 5 * 60 * 60 * 1000 + diff * 24 * 60 * 60 * 1000
      );
      const day = date.getDate();
      const month = date.getMonth();
      const dayEntry = `${months[month]} ${day}`;

      const customBoolHabits = cur?.customBoolHabits || {};
      // Calculate custom bool habits score.
      // If all habits are true, score is 1.
      // If all habits are false, score is 0.
      // if no habits, score is 0.
      const customBoolHabitsScore = Object.values(customBoolHabits).length
        ? Object.values(customBoolHabits).filter((val) => val).length /
          Object.values(customBoolHabits).length
        : 0;

      const tagHabits = cur?.tagHabits || {};
      // Calculate tag habits score.
      // If all habits are true, score is 1.
      // If all habits are false, score is 0.
      // if no habits, score is 0.
      const tagHabitsScore = Object.values(tagHabits).length
        ? Object.values(tagHabits).filter((val) => val).length /
          Object.values(tagHabits).length
        : 0;

      const mealsCount = cur?.meals.filter((meal) => meal).length || 0;

      if (acc[dayEntry]) {
        acc[dayEntry].meals += mealsCount;
        acc[dayEntry].exercised += cur.exercised ? 1 : 0;
        acc[dayEntry].customBoolHabits += customBoolHabitsScore;
        acc[dayEntry].tagHabits += tagHabitsScore;
      } else {
        acc[dayEntry] = {
          meals: mealsCount,
          exercised: cur.exercised ? 1 : 0,
          customBoolHabits: customBoolHabitsScore,
          tagHabits: tagHabitsScore,
        };
      }

      return acc;
    }, weeklyHabitStatTemp);

    return weeklyHabitStat;
  };

  const currentPeriod = getPerPeriod(journalRecords, 0);
  const previousPeriod = getPerPeriod(previousRecords, dayDiff);

  const data = [];
  for (const entry in currentPeriod) {
    data.push({
      day: entry,
      meals: currentPeriod[entry].meals,
      exercised: currentPeriod[entry].exercised,
      customBoolHabits: currentPeriod[entry].customBoolHabits,
      tagHabits: currentPeriod[entry].tagHabits,

      mealsPrev: previousPeriod[entry].meals,
      exercisedPrev: previousPeriod[entry].exercised,
      customBoolHabitsPrev: previousPeriod[entry].customBoolHabits,
      tagHabitsPrev: previousPeriod[entry].tagHabits,
    });
  }

  // sort by date
  data.sort((a, b) => {
    const aDate = new Date(a.day);
    const bDate = new Date(b.day);
    return aDate.getTime() - bDate.getTime();
  });

  return data;
};

interface scoreDataType {
  day: string;
  score: number;
  scorePrev: number;
}

const dataToDailyScore = (data: dataType[], dataJournal: dataTypeJournal[]) => {
  // Convert the time to a score from 0 to 100.
  const maxTime = 12 * 60;
  const minTime = 0;
  const maxScore = 50;
  const minScore = 0;

  // Add meals to the score
  const maxMeals = 3;
  const minMeals = 0;
  const maxScoreMeals = 15;
  const minScoreMeals = 0;

  // Add exercise to the score
  const maxExercised = 1;
  const minExercised = 0;
  const maxScoreExercised = 15;
  const minScoreExercised = 0;

  // Add tag habits to the score
  const maxTagHabits = 1;
  const minTagHabits = 0;
  const maxScoreTagHabits = 10;
  const minScoreTagHabits = 0;

  // Add custom bool habits to the score
  const maxCustomBoolHabits = 1;
  const minCustomBoolHabits = 0;
  const maxScoreCustomBoolHabits = 10;
  const minScoreCustomBoolHabits = 0;

  const scoreData: scoreDataType[] = [];

  data.forEach((entry) => {
    const time = entry.time;
    const score =
      ((time - minTime) / (maxTime - minTime)) * (maxScore - minScore) +
      minScore;

    const timePrev = entry.timePrev;
    const scorePrev =
      ((timePrev - minTime) / (maxTime - minTime)) * (maxScore - minScore) +
      minScore;

    scoreData.push({
      day: entry.day,
      score: Math.min(score, maxScore),
      scorePrev: Math.min(scorePrev, maxScore),
    });
  });

  dataJournal.forEach((entry) => {
    const meals = entry.meals;
    const scoreMeals =
      ((meals - minMeals) / (maxMeals - minMeals)) *
        (maxScoreMeals - minScoreMeals) +
      minScoreMeals;

    const mealsPrev = entry.mealsPrev;
    const scoreMealsPrev =
      ((mealsPrev - minMeals) / (maxMeals - minMeals)) *
        (maxScoreMeals - minScoreMeals) +
      minScoreMeals;

    const day = entry.day;
    const index = scoreData.findIndex((entry) => entry.day === day);

    if (index !== -1) {
      scoreData[index].score += scoreMeals;
      scoreData[index].scorePrev += scoreMealsPrev;
    }
  });

  dataJournal.forEach((entry) => {
    const customBoolHabits = entry.customBoolHabits;
    const scoreCustomBoolHabits =
      ((customBoolHabits - minCustomBoolHabits) /
        (maxCustomBoolHabits - minCustomBoolHabits)) *
        (maxScoreCustomBoolHabits - minScoreCustomBoolHabits) +
      minScoreCustomBoolHabits;

    const customBoolHabitsPrev = entry.customBoolHabitsPrev;
    const scoreCustomBoolHabitsPrev =
      ((customBoolHabitsPrev - minCustomBoolHabits) /
        (maxCustomBoolHabits - minCustomBoolHabits)) *
        (maxScoreCustomBoolHabits - minScoreCustomBoolHabits) +
      minScoreCustomBoolHabits;

    const day = entry.day;
    const index = scoreData.findIndex((entry) => entry.day === day);

    if (index !== -1) {
      scoreData[index].score += scoreCustomBoolHabits;
      scoreData[index].scorePrev += scoreCustomBoolHabitsPrev;
    }
  });

  dataJournal.forEach((entry) => {
    const tagHabits = entry.tagHabits;
    const scoreTagHabits =
      ((tagHabits - minTagHabits) / (maxTagHabits - minTagHabits)) *
        (maxScoreTagHabits - minScoreTagHabits) +
      minScoreTagHabits;

    const tagHabitsPrev = entry.tagHabitsPrev;
    const scoreTagHabitsPrev =
      ((tagHabitsPrev - minTagHabits) / (maxTagHabits - minTagHabits)) *
        (maxScoreTagHabits - minScoreTagHabits) +
      minScoreTagHabits;

    const day = entry.day;
    const index = scoreData.findIndex((entry) => entry.day === day);

    if (index !== -1) {
      scoreData[index].score += scoreTagHabits;
      scoreData[index].scorePrev += scoreTagHabitsPrev;
    }
  });

  dataJournal.forEach((entry) => {
    const exercised = entry.exercised;
    const scoreExercised =
      ((exercised - minExercised) / (maxExercised - minExercised)) *
        (maxScoreExercised - minScoreExercised) +
      minScoreExercised;

    const exercisedPrev = entry.exercisedPrev;
    const scoreExercisedPrev =
      ((exercisedPrev - minExercised) / (maxExercised - minExercised)) *
        (maxScoreExercised - minScoreExercised) +
      minScoreExercised;

    const day = entry.day;
    const index = scoreData.findIndex((entry) => entry.day === day);

    if (index !== -1) {
      scoreData[index].score += scoreExercised;
      scoreData[index].scorePrev += scoreExercisedPrev;
    }
  });

  return scoreData;
};

const OverallStats: FC<Props> = ({
  timerRecords,
  previousRecords,
  journalRecords,
  previousJournalRecords,
  dayDiff,
}) => {
  // const timerRecords = useTimerRecordsStore((state) => state.timerRecords);

  const [data, setData] = React.useState<dataType[]>();
  const [dataJournal, setDataJournal] = React.useState<dataTypeJournal[]>();

  React.useEffect(() => {
    getWeeklyWorkStat(timerRecords, previousRecords, dayDiff).then((data) => {
      if (data) {
        setData(data);
      }
    });
  }, [timerRecords, previousRecords]);

  React.useEffect(() => {
    getWeeklyHabitStat(journalRecords, previousJournalRecords, dayDiff).then(
      (data) => {
        if (data) {
          setDataJournal(data);
        }
      }
    );
  }, [journalRecords, previousJournalRecords]);

  if (!data || !dataJournal) {
    return null;
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active) {
      return (
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "0px 10px",
            border: "2px solid #bbbbbb",
          }}
        >
          <Typography variant="h6" color="text.primary">
            {`${Math.floor(payload[1].value)}`}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {`Previous ${Math.floor(payload[0].value)}`}
          </Typography>
        </div>
      );
    }

    return null;
  };

  return (
    <GraphCard title="Score (Work + Health + Habits)">
      <LineChart
        data={dataToDailyScore(data, dataJournal)}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid vertical={false} />

        {/* <XAxis dataKey="day" angle={-60} interval={0} dy={20} fontSize={14} /> */}
        <YAxis
          axisLine={false}
          width={30}
          orientation="left"
          ticks={[0, 20, 40, 60, 80, 100]}
          //   tickFormatter={(tick) => `${(tick / 60).toFixed(0)}H`}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        {/* <Legend /> */}
        <XAxis
          dataKey="day"
          angle={-20}
          interval={0}
          dy={10}
          fontSize={14}
          dx={-5}
        />

        <Line
          type="monotone"
          dataKey="scorePrev"
          name="Previous"
          stroke="#ac9172"
          strokeOpacity={0.3}
          strokeWidth={5}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="score"
          name="Current"
          stroke="#ac9172"
          strokeWidth={5}
          dot={false}
        />
      </LineChart>
    </GraphCard>
  );
};

const Overall = () => {
  const timerRecords = useTimerRecordsStore((state) => state.timerRecords);
  const journalRecords = useJournalStore((state) => state.documents);

  console.log("journalRecords", journalRecords);

  const [periodBack, setPeriodBack] = React.useState(0);
  const [timePeriodLength, setTimePeriodLength] = React.useState(7);

  const selectedPeriod = filterTimerRecords(
    timerRecords,
    timePeriodLength,
    periodBack * timePeriodLength
  );
  const previousPeriod = filterTimerRecords(
    timerRecords,
    timePeriodLength,
    periodBack * timePeriodLength + timePeriodLength
  );
  const selectedJournalPeriod = filterJournalRecords(
    journalRecords,
    timePeriodLength,
    periodBack * timePeriodLength
  );
  const previousJournalPeriod = filterJournalRecords(
    journalRecords,
    timePeriodLength,
    periodBack * timePeriodLength + timePeriodLength
  );

  console.log("selectedJournalPeriod", selectedJournalPeriod);
  console.log("selectedJournalPeriod", previousJournalPeriod);

  return (
    <OverallStats
      timerRecords={selectedPeriod}
      previousRecords={previousPeriod}
      dayDiff={timePeriodLength}
      journalRecords={selectedJournalPeriod}
      previousJournalRecords={previousJournalPeriod}
    />
  );
};

export default Overall;
