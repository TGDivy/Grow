import React, { FC } from "react";

import useTimerRecordsStore from "../Common/Stores/TimerRecordsStore";
import { PieChart, Pie, Sector } from "recharts";
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
  const tagStat: TagStatType = {};
  let total = 0;

  timerRecords.forEach((timerRecord) => {
    const tags = timerRecord.tags;
    if (tags && tags.length > 0) {
      tags.forEach((tag) => {
        if (tagStat[tag]) {
          tagStat[tag] += timerRecord.duration / tags.length;
        } else {
          tagStat[tag] = timerRecord.duration / tags.length;
        }
      });
    } else {
      if (tagStat["unset"]) {
        tagStat["unset"] += timerRecord.duration;
      } else {
        tagStat["unset"] = timerRecord.duration;
      }
    }
    total += timerRecord.duration;
  });

  console.log(tagStat);

  const data = [];
  for (const entry in tagStat) {
    data.push({
      tag: entry,
      time: Math.floor((tagStat[entry] / total) * 100),
    } as dataType);
  }

  return data;
};

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 20) * cos;
  const my = cy + (outerRadius + 20) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 11;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle + 5}
        endAngle={endAngle - 5}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * -5}
        y={ey - 15}
        textAnchor={textAnchor}
        fill="#333"
      >
        {payload.tag}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 8}
        y={ey + 5}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  );
};

interface Props {
  timerRecords: timerType[];
}

const TagPieStat: FC<Props> = ({ timerRecords }) => {
  // const timerRecords = useTimerRecordsStore((state) => state.timerRecords);

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

  return (
    <GraphCard title="Distribuition by Tags">
      <PieChart>
        <Pie
          data={data}
          dataKey="time"
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="80%"
          fill="#82ca9d"
          label={renderActiveShape}
          // label={(entry) => `${entry.tag} ${entry.time}%`}
          labelLine
        />
      </PieChart>
    </GraphCard>
  );
};

export default TagPieStat;
