import React, { useCallback, useState } from "react";

import useTimerRecordsStore from "../Common/Stores/TimerRecordsStore";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import { timerType } from "../Common/Types/Types";
import GraphCard from "./GraphCard";

interface TagStatType {
  [key: string]: number;
}

interface dataType {
  tag: string;
  time: number;
}

const getPieData = async (timerRecords: timerType[]) => {
  const today = new Date();
  const weeklyTimerRecords = timerRecords.filter(
    (timerRecord) =>
      timerRecord.startTime.getTime() >=
      today.getTime() - 7 * 24 * 60 * 60 * 1000
  );

  console.log(weeklyTimerRecords);
  //   console.log(timerRecords);

  const tagStat: TagStatType = {};

  weeklyTimerRecords.forEach((timerRecord) => {
    const tags = timerRecord.tags;
    if (tags && tags.length > 0) {
      tags.forEach((tag) => {
        if (tagStat[tag]) {
          tagStat[tag] += timerRecord.duration;
        } else {
          tagStat[tag] = timerRecord.duration;
        }
      });
    } else {
      if (tagStat["unset"]) {
        tagStat["unset"] += timerRecord.duration;
      } else {
        tagStat["unset"] = timerRecord.duration;
      }
    }
  });

  console.log(tagStat);

  const data = [];
  for (const entry in tagStat) {
    data.push({
      tag: entry,
      time: Math.floor(tagStat[entry] / 60),
    } as dataType);
  }

  return data;
};

const TagPieStat = () => {
  const timerRecords = useTimerRecordsStore((state) => state.timerRecords);

  const [data, setData] = React.useState<dataType[]>();

  React.useEffect(() => {
    getPieData(timerRecords).then((data) => {
      if (data) {
        setData(data);
      }
    });
  }, [timerRecords]);

  if (!data) {
    return null;
  }

  console.log(data);

  return (
    <GraphCard title="Weekly Work">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="time"
          cx="50%"
          cy="50%"
          innerRadius={90}
          outerRadius={110}
          fill="#82ca9d"
          label
        />
      </PieChart>
    </GraphCard>
  );
};

export default TagPieStat;
