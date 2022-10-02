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
  [key: number]: number;
}

interface dataType {
  day: string;
  time: number;
}

const getWeeklyWorkStat = async (timerRecords: timerType[]) => {
  const weeklyWorkStat = await timerRecords.reduce((acc, cur) => {
    const date = new Date(cur.startTime);
    const day = date.getDay();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const time = hour * 3600 + minute * 60 + second;

    if (acc[day]) {
      acc[day] += time;
    } else {
      acc[day] = time;
    }

    return acc;
  }, {} as weeklyWorkStatType);

  const data = _.flow(Object.entries, ([key, value]) => {
    return {
      day: key,
      time: value,
    } as unknown as dataType;
  })(weeklyWorkStat);

  return data;
};

const WeeklyWorkStat = () => {
  const timerRecords = useTimerRecordsStore((state) => state.timerRecords);

  const [data, setData] = React.useState<dataType[]>();

  React.useEffect(() => {
    const getData = async () => {
      const d = await getWeeklyWorkStat(timerRecords);
      setData(d as unknown as dataType[]);
    };

    getData();
  }, [timerRecords]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
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
