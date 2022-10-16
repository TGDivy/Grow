import React, { FC } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { timerType } from "../Common/Types/Types";
import { Typography } from "@mui/material";
import GraphCard from "./GraphCard";

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
  dayDiff: number;
}

const WorkStatLine: FC<Props> = ({
  timerRecords,
  previousRecords,
  dayDiff,
}) => {
  // const timerRecords = useTimerRecordsStore((state) => state.timerRecords);

  const [data, setData] = React.useState<dataType[]>();

  React.useEffect(() => {
    getWeeklyWorkStat(timerRecords, previousRecords, dayDiff).then((data) => {
      if (data) {
        setData(data);
      }
    });
  }, [timerRecords, previousRecords]);

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
            {`${payload[1].value} M`}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {`Previous ${payload[0].value} M`}
          </Typography>
        </div>
      );
    }

    return null;
  };

  return (
    <GraphCard title="Weekly Work">
      <LineChart
        data={data}
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
          tickCount={6}
          tickFormatter={(tick) => `${tick}`}
          tickLine={false}
          // ticks={ticks}
        />
        <Tooltip content={<CustomTooltip />} />
        {/* <Legend /> */}
        <Line
          type="monotone"
          dataKey="timePrev"
          name="Previous"
          stroke="#ac9172"
          strokeOpacity={0.3}
          strokeWidth={5}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="time"
          name="Current"
          stroke="#ac9172"
          strokeWidth={5}
          dot={false}
        />
      </LineChart>
    </GraphCard>
  );
};

export default WorkStatLine;
