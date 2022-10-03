import React from "react";

import useTimerRecordsStore from "../Common/Stores/TimerRecordsStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { timerType } from "../Common/Types/Types";

interface weeklyWorkStatType {
  [key: string]: number;
}

interface dataType {
  day: string;
  time: number;
}

const getWeeklyWorkStat = async (timerRecords: timerType[]) => {
  // const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
  const weeklyWorkStat = timerRecords.reduce((acc, cur) => {
    const date = cur.startTime;
    const day = date.getDate();
    const month = date.getMonth();
    const dayEntry = `${months[month]} ${day}`;

    if (acc[dayEntry]) {
      acc[dayEntry] += cur.duration;
    } else {
      acc[dayEntry] = cur.duration;
    }

    return acc;
  }, {} as weeklyWorkStatType);

  const data = [];
  for (const entry in weeklyWorkStat) {
    data.push({
      day: entry,
      time: Math.floor(weeklyWorkStat[entry] / 60),
    });
  }

  return data;
};

const WeeklyWorkStat = () => {
  const timerRecords = useTimerRecordsStore((state) => state.timerRecords);

  const [data, setData] = React.useState<dataType[]>();

  React.useEffect(() => {
    getWeeklyWorkStat(timerRecords).then((data) => {
      if (data) {
        setData(data);
      }
    });
  }, [timerRecords]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="time" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WeeklyWorkStat;
