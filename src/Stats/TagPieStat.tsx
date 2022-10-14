import React, { FC, useCallback, useState } from "react";

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
      if (tagStat["Unset"]) {
        tagStat["Unset"] += timerRecord.duration;
      } else {
        tagStat["Unset"] = timerRecord.duration;
      }
    }
  });

  console.log(tagStat);

  const data = [];
  for (const entry in tagStat) {
    data.push({
      tag: entry,
      time: tagStat[entry],
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
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    // fill,
    payload,
    percent,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 20) * cos;
  const my = cy + (outerRadius + 20) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 20 * Math.abs(sin);
  const ey = my - sin * 10;
  const fill = "#52749c";
  const textAnchor = cos >= 0 ? "start" : "end";
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.tag}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
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
        x={ex + (cos >= 0 ? 1 : -1) * 8}
        y={ey}
        textAnchor={textAnchor}
        // fill="#999"
      >
        {Math.floor(payload.time / 60 / 60)}h{" "}
        {Math.floor((payload.time / 60) % 60)}m
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 8}
        y={ey + 18}
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

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: React.SetStateAction<number>) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

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
          fill="#ac9172"
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          // label={renderActiveShape}
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </GraphCard>
  );
};

export default TagPieStat;
