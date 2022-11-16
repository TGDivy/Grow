import React, { FC } from "react";

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { timerType } from "../Common/Types/Types";
import { Typography } from "@mui/material";
import GraphCard from "./GraphCard";

interface weeklyWorkStatType {
  [key: string]: number;
}

interface dataType {
  day: string;
  time: number;
}

const getWeeklyWorkStat = async (timerRecords: timerType[]) => {
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

  const weeklyWorkStatTemp: weeklyWorkStatType = {};

  const weeklyWorkStat = timerRecords.reduce((acc, cur) => {
    const date = new Date(cur.startTime.getTime() - 5 * 60 * 60 * 1000);
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

  const data = [];
  for (const entry in weeklyWorkStat) {
    data.push({
      day: entry,
      time: Math.floor(weeklyWorkStat[entry] / 60),
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
}

const WeeklyWorkStat: FC<Props> = ({ timerRecords }) => {
  // const timerRecords = useTimerRecordsStore((state) => state.timerRecords);

  const [data, setData] = React.useState<dataType[]>();

  React.useEffect(() => {
    getWeeklyWorkStat(timerRecords).then((data) => {
      if (data) {
        setData(data);
      }
    });
  }, [timerRecords]);

  if (!data) {
    return null;
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
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
            {/* {`${payload[0].value} M`} */}
            {`${Math.floor(payload[0].value / 60)}H ${payload[0].value % 60}M`}
          </Typography>
        </div>
      );
    }

    return null;
  };

  return (
    <GraphCard title="Weekly Work">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid vertical={false} />

        <XAxis dataKey="day" angle={-60} interval={0} dy={20} fontSize={14} />
        <YAxis
          axisLine={false}
          width={30}
          orientation="left"
          tickCount={6}
          tickFormatter={(tick) => `${(tick / 60).toFixed(0)}H`}
          tickLine={false}
          // ticks={ticks}
        />
        <Tooltip content={<CustomTooltip />} />
        {/* <Legend /> */}
        <Bar dataKey="time" fill="#ac9172" />
      </BarChart>
    </GraphCard>
  );
};

export default WeeklyWorkStat;
