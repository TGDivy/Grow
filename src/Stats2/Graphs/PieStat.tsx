import React, { FC, useCallback, useState } from "react";

import { PieChart, Pie } from "recharts";
import { timerType } from "../../Common/Types/Types";
import GraphCard from "./GraphCard";
import { getStickerPieData, getTagPieData } from "../Utils/graphRadial";
import { renderActiveShape } from "../Utils/Shapes";
import { dataType } from "../Utils/graph";

interface Props {
  timerRecords: timerType[];
  filterOn: "Tags" | "Stickers";
}

const TagPieStat: FC<Props> = ({ timerRecords, filterOn }) => {
  const [data, setData] = React.useState<dataType[]>();

  React.useEffect(() => {
    if (filterOn === "Tags") {
      getTagPieData(timerRecords).then((data) => {
        if (data) {
          setData(data);
        }
      });
    } else if (filterOn === "Stickers") {
      getStickerPieData(timerRecords).then((data) => {
        if (data) {
          setData(data);
        }
      });
    }
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
    <GraphCard title={"Distribuition by " + filterOn}>
      <PieChart>
        <Pie
          data={data}
          dataKey="time"
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="80%"
          fill="#00000088"
          stroke="#ffffff33"
          strokeWidth={2}
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </GraphCard>
  );
};

export default TagPieStat;
