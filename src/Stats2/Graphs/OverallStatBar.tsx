import React, { FC } from "react";

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { JournalType, timerType } from "../../Common/Types/Types";
import GraphCard from "./GraphCard";
import { timePeriod } from "../Utils/utils";
import { periodYAxisLabelFunction, getXAxisTicks } from "../Utils/graph";
import { CustomTooltipWrapper } from "../Utils/Shapes";
import useThemeStore from "../../Common/Stores/ThemeStore";
import { getOverallStats, dataType } from "../Utils/overall";
import { Paper, Typography, Divider } from "@mui/material";

interface Props {
  journalRecords: JournalType[];
  journalRecords2: JournalType[];
  period: timePeriod;
  tabs: React.ReactElement;
}

const OverallStatBar: FC<Props> = ({
  journalRecords,
  journalRecords2,
  period,
  tabs,
}) => {
  const [data, setData] = React.useState<dataType[]>();
  const [previousData, setPreviousData] = React.useState<dataType[]>(); // for comparison
  const colors = useThemeStore((state) => state.colors);

  React.useEffect(() => {
    getOverallStats(journalRecords, period).then((data) => {
      if (data) {
        setData(data);
      }
    });
  }, [journalRecords]);

  React.useEffect(() => {
    getOverallStats(journalRecords2, period).then((data) => {
      if (data) {
        setPreviousData(data);
      }
    });
  }, [journalRecords2]);

  if (!data || !previousData) {
    return null;
  }

  const data2Dict = previousData.reduce((acc, cur) => {
    acc[cur.label] =
      cur.workScore + cur.exerciseScore + cur.mealScore + cur.habitScore;
    return acc;
  }, {} as { [key: string]: number });

  const combinedData = data.map((entry) => {
    return {
      label: entry.label,
      workScore: entry.workScore,
      exerciseScore: entry.exerciseScore,
      mealScore: entry.mealScore,
      habitScore: entry.habitScore,
      previousScore:
        data2Dict[entry.label] -
        entry.workScore -
        entry.mealScore -
        entry.habitScore,
      previousScoreGhost:
        data2Dict[entry.label] >
        entry.workScore + entry.mealScore + entry.habitScore
          ? data2Dict[entry.label] -
            entry.workScore -
            entry.mealScore -
            entry.habitScore
          : 0,
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active) {
      const workScore = Math.floor(payload[0].value);
      const exerciseScore = Math.floor(payload[1].value);
      const mealScore = Math.floor(payload[2].value);
      const habitScore = Math.floor(payload[3].value);
      const previousScore =
        Math.floor(payload[5].value) +
        workScore +
        exerciseScore +
        mealScore +
        habitScore;
      const score = workScore + exerciseScore + mealScore + habitScore;
      return (
        <>
          <Paper
            sx={{
              padding: "10px",
              border: "2px solid #aaaaaa",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body1" textAlign="center">
              {label}
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                margin: "0px 10px",
                borderRight: "2px solid #aaaaaa",
              }}
            />

            <Typography variant="body1">
              Score: {`${score}`.padStart(2, "0")}
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                margin: "0px 10px",
                borderRight: "2px solid #aaaaaa",
              }}
            />
            <Typography variant="body1">
              Prev: {`${previousScore}`.padStart(2, "0")}
            </Typography>
          </Paper>
          <Paper
            sx={{
              padding: "10px",
              border: "2px solid #aaaaaa",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body1">Work: {workScore}</Typography>
            <Typography variant="body1">Exercise: {exerciseScore}</Typography>
            <Typography variant="body1">Meal: {mealScore}</Typography>
            <Typography variant="body1">Habits: {habitScore}</Typography>
          </Paper>
        </>
      );
    }

    return null;
  };

  const color = colors.tertiary;
  const props = {
    stroke: "#000000",
    strokeWidth: 1,
    stackId: "aa",
    fill: color,
  };

  return (
    <GraphCard title={tabs} height="310px">
      <BarChart
        data={combinedData}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <Tooltip content={<CustomTooltip />} />

        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="label"
          interval={"preserveStart"}
          fontSize={14}
          dy={10}
          ticks={getXAxisTicks(period)}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          axisLine={false}
          width={30}
          orientation="left"
          tickLine={false}
          // tickCount={5}
          ticks={[0, 20, 40, 60, 80, 100]}
          domain={[0, 100]}
          allowDataOverflow={true}
        />
        <Tooltip />
        <Bar dataKey="workScore" {...props} minPointSize={5} />
        <Bar dataKey="exerciseScore" {...props} />
        <Bar dataKey="mealScore" {...props} />
        <Bar dataKey="habitScore" {...props} />
        <Bar dataKey="previousScoreGhost" fill={`${color}55`} stackId="aa" />
        <Bar dataKey="previousScore" fill={`${color}00`} stackId="aa" />
      </BarChart>
    </GraphCard>
  );
};

export default OverallStatBar;
