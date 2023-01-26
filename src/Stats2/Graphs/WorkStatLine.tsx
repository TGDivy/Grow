import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { timerType } from "../../Common/Types/Types";
import GraphCard from "./GraphCard";
import { timePeriod } from "../Utils/utils";
import {
  getTimePeriods,
  dataType,
  periodYAxisLabelFunction,
  getXAxisTicks,
} from "../Utils/graph";
import { CustomTooltipWrapper } from "../Utils/Shapes";

type Props = {
  timerRecords: timerType[];
  selectedTimerRecords2: timerType[];
  period: timePeriod;
  date?: Date;
  date2?: Date;
};

const WorkStatLine = ({
  timerRecords,
  period,
  date,
  date2,
  selectedTimerRecords2,
}: Props) => {
  const [data, setData] = React.useState<dataType[]>();
  const [previousData, setPreviousData] = React.useState<dataType[]>(); // for comparison

  React.useEffect(() => {
    getTimePeriods(timerRecords, period, date).then((data) => {
      if (data) {
        setData(data);
      }
    });
  }, [timerRecords]);

  React.useEffect(() => {
    getTimePeriods(selectedTimerRecords2, period, date2).then((data) => {
      if (data) {
        setPreviousData(data);
      }
    });
  }, [selectedTimerRecords2]);

  if (!data || !previousData) {
    return null;
  }

  const data2Dict = previousData.reduce((acc, cur) => {
    acc[cur.label] = cur.time;
    return acc;
  }, {} as { [key: string]: number });

  const combinedData = data.map((entry) => {
    return {
      label: entry.label,
      time: entry.time,
      previousTime: data2Dict[entry.label],
    };
  });

  const CustomTooltip = CustomTooltipWrapper(period);

  return (
    <GraphCard title="Focused Time Distribuition">
      <LineChart
        data={combinedData}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="label"
          interval={"preserveStart"}
          fontSize={14}
          ticks={getXAxisTicks(period)}
          dy={10}
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          width={30}
          orientation="left"
          tickFormatter={periodYAxisLabelFunction[period]}
          tickLine={false}
          tickCount={5}
          domain={[0, "auto"]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="previousTime"
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
