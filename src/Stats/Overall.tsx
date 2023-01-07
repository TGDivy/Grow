import React, { FC, useState } from "react";
import useTimerRecordsStore from "../Common/Stores/TimerRecordsStore";
import { filterTimerRecords } from "./StatsMain";

import {
  LineChart,
  Line,
  YAxis,
  Tooltip,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import { JournalDicType, JournalType, timerType } from "../Common/Types/Types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  ClickAwayListener,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import GraphCard from "./GraphCard";
import useJournalStore from "../Common/Stores/JournalStore";
import { ArrowBack, ArrowForward, ExpandMore } from "@mui/icons-material";

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
        cur.startTime.getTime() -
          5 * 60 * 60 * 1000 +
          diff * 24 * 60 * 60 * 1000
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

interface Props {
  timerRecords: timerType[];
  previousRecords: timerType[];
  journalRecords: JournalType[];
  previousJournalRecords: JournalType[];
  dayDiff: number;
  timePeriodLength: number;
  handleChange: any;
  handlePeriodBack: any;
  periodBack: number;
}

const OverallStats: FC<Props> = ({
  timerRecords,
  previousRecords,
  journalRecords,
  previousJournalRecords,
  dayDiff,
  timePeriodLength,
  handleChange,
  handlePeriodBack,
  periodBack,
}) => {
  // const timerRecords = useTimerRecordsStore((state) => state.timerRecords);

  const [data, setData] = React.useState<dataType[]>();
  const [dataJournal, setDataJournal] = React.useState<dataTypeJournal[]>();
  const [expanded, setExpanded] = useState(false);

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

  const displayPeriod = () => {
    const DAY = 24 * 60 * 60 * 1000;
    const current = new Date(Date.now() - periodBack * DAY * timePeriodLength);

    // Display current date in a pretty way
    return (
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          alignSelf: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {current.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </Typography>
    );
  };

  return (
    <ClickAwayListener onClickAway={() => setExpanded(false)}>
      <Card
        sx={{
          ":hover": {
            boxShadow: 20,
          },
          backgroundColor: "#00000088",
          color: "#ffffff",
        }}
        onClick={() => setExpanded(true)}
        className="tut-home-progress"
      >
        {/* Center the header */}
        <CardHeader
          title={
            <Typography variant="h5" color="primary">
              Overall Stats
            </Typography>
          }
          action={
            <IconButton aria-label="settings" onClick={() => setExpanded(true)}>
              <ExpandMore />
            </IconButton>
          }
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            height: "30vh",
            width: "100%",
            backgroundColor: "#ffffff00",
          }}
        >
          <ResponsiveContainer>
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

              <YAxis
                axisLine={false}
                width={30}
                orientation="left"
                ticks={[20, 40, 60, 80, 100]}
                tickLine={false}
                tick={{ fill: "#ffffffbb" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <XAxis
                dataKey="day"
                fontSize={14}
                axisLine={false}
                tickLine={false}
                dy={7}
                dx={-5}
                tick={{ fill: "#ffffffbb" }}
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
          </ResponsiveContainer>
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent
            sx={{
              //   marginBottom: 0,
              paddingTop: 0,
              backgroundColor: "#00000000",
            }}
          >
            <Grid
              container
              spacing={2}
              alignContent="center"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} md={6}>
                <Tabs
                  value={timePeriodLength}
                  onChange={handleChange}
                  textColor="primary"
                  indicatorColor="primary"
                  variant="fullWidth"
                >
                  <Tab
                    value={3}
                    label="3 Day"
                    sx={{
                      color: "#ffffffbb",
                    }}
                  />
                  <Tab
                    value={7}
                    label="Week"
                    sx={{
                      color: "#ffffffbb",
                    }}
                  />
                  <Tab
                    value={14}
                    label="Fortnight"
                    sx={{
                      color: "#ffffffbb",
                    }}
                  />
                  <Tab
                    value={30}
                    label="Month"
                    sx={{
                      color: "#ffffffbb",
                    }}
                  />
                </Tabs>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2} alignContent="center">
                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handlePeriodBack("backward")}
                      size="small"
                    >
                      <ArrowBack />
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    {displayPeriod()}
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handlePeriodBack("forward")}
                      disabled={periodBack === 0}
                      size="small"
                    >
                      <ArrowForward />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    </ClickAwayListener>
  );
};

const Overall = () => {
  const timerRecords = useTimerRecordsStore((state) => state.timerRecords);
  const journalRecords = useJournalStore((state) => state.documents);

  const [periodBack, setPeriodBack] = React.useState(0);
  const [timePeriodLength, setTimePeriodLength] = React.useState(7);

  // Display selected period, and change daysBack to change the period
  const handlePeriodBack = (direction: string) => {
    if (direction === "forward" && periodBack > 0) {
      setPeriodBack(periodBack - 1);
    } else if (direction === "backward") {
      setPeriodBack(periodBack + 1);
    }
  };

  const handleChange = (event: any, newValue: any) => {
    setPeriodBack(0);
    setTimePeriodLength(newValue);
  };

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

  return (
    <OverallStats
      timerRecords={selectedPeriod}
      previousRecords={previousPeriod}
      dayDiff={timePeriodLength}
      journalRecords={selectedJournalPeriod}
      previousJournalRecords={previousJournalPeriod}
      periodBack={periodBack}
      timePeriodLength={timePeriodLength}
      handlePeriodBack={handlePeriodBack}
      handleChange={handleChange}
    />
  );
};

export default Overall;
