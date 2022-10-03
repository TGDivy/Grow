import React from "react";

import useTimerRecordsStore from "../Common/Stores/TimerRecordsStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { timerType } from "../Common/Types/Types";
import _ from "lodash";

interface weeklyWorkStatType {
  [key: string]: number;
}

interface dataType {
  day: string;
  time: number;
}

const getWeeklyWorkStat = async (timerRecords: timerType[]) => {
  // const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weeklyWorkStat = timerRecords.reduce((acc, cur) => {
    const date = cur.startTime;
    console.log(date);
    const day = date.getDate();
    console.log("day: ", day);

    if (acc[day]) {
      acc[day] += cur.duration;
    } else {
      acc[day] = cur.duration;
    }

    return acc;
  }, {} as weeklyWorkStatType);

  console.log("weeklyWorkStat: ", weeklyWorkStat);

  const data = [];
  for (const entry in weeklyWorkStat) {
    console.log("entry: ", entry);
    data.push({
      day: entry,
      time: weeklyWorkStat[entry] / 60,
    });
  }

  console.log("data: ", data);

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

  console.log("data: ", data);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
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
