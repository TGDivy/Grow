import { isInteger } from "lodash";
import React, { FC } from "react";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
} from "recharts";
import { tagsType, timerType } from "../Common/Types/Types";
import GraphCard from "./GraphCard";

interface TagStatType {
  [key: string]: number;
}

interface dataType {
  tag: string;
  time: number;
  timePrev: number;
}

const getRadarData = async (
  timerRecords: timerType[],
  previousPeriod: timerType[]
) => {
  const getTagStat = (timerRecords: timerType[]) => {
    // filter into tags
    const tagStat: TagStatType = {
      Engineering: 0,
      Applications: 0,
      Study: 0,
      Planning: 0,
    };

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
        if (tagStat["Unset"]) {
          tagStat["Unset"] += timerRecord.duration;
        } else {
          tagStat["Unset"] = timerRecord.duration;
        }
      }
      total += timerRecord.duration;
    });

    return { tagStat, total };
  };
  const data = [];

  const { tagStat, total } = getTagStat(timerRecords);
  const { tagStat: tagStat2, total: total2 } = getTagStat(previousPeriod);
  // get all tags and remove duplicates
  const tags: string[] = Array.from(
    new Set([...Object.keys(tagStat), ...Object.keys(tagStat2)])
  );
  for (const tag of tags) {
    const time = tagStat[tag] ? tagStat[tag] : 0;
    const timePrev = tagStat2[tag] ? tagStat2[tag] : 0;
    data.push({
      tag: tag,
      time: Math.floor(time / 3600),
      timePrev: Math.floor(timePrev / 3600),
    } as dataType);
  }

  return data;
};

interface Props {
  selectedPeriod: timerType[];
  previousPeriod: timerType[];
}

const TagRadarStat: FC<Props> = ({ selectedPeriod, previousPeriod }) => {
  // const timerRecords = useTimerRecordsStore((state) => state.timerRecords);

  const [data, setData] = React.useState<dataType[]>();

  React.useEffect(() => {
    getRadarData(selectedPeriod, previousPeriod).then((data) => {
      if (data) {
        setData(data);
      }
    });
  }, [selectedPeriod, previousPeriod]);

  if (!data) {
    return null;
  }
  const angle = 90;
  return (
    <GraphCard title="Distribuition by Tags">
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius="90%"
        innerRadius="15%"
        // startAngle={-angle}
        // endAngle={-angle + 360}
        data={data}
        margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
      >
        <PolarGrid />
        <PolarAngleAxis
          angleAxisId={0}
          dataKey="tag"
          tick={{ fill: "#2e2e2e", fontSize: 16, fontWeight: 500 }}
        />
        <PolarRadiusAxis
          domain={[0, "dataMax"]}
          tickCount={4}
          axisLine={false}
          angle={angle}
          orientation="middle"
          tickFormatter={(tick) => {
            return `${tick} h`;
          }}
          tick={{
            fill: "#2e2e2e",
            fontSize: 14,
            fontWeight: 500,
          }}
          dy={10}
        />
        <Radar
          dataKey="timePrev"
          name="Previous"
          fill="#627368"
          fillOpacity={0.35}
          dot={false}
          activeDot={false}
        />
        <Radar dataKey="time" name="Current" fill="#21496d" fillOpacity={0.8} />
        <Tooltip
          formatter={(value, name) => {
            return [`${value} h`, name];
          }}
        />
      </RadarChart>
    </GraphCard>
  );
};

export default TagRadarStat;
