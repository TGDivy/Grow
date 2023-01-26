import React, { FC } from "react";

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { timerType } from "../../Common/Types/Types";
import { Divider, Paper, Typography } from "@mui/material";
import GraphCard from "./GraphCard";
import { timePeriod } from "../Utils/utils";
import {
  getTimePeriods,
  dataType,
  periodYAxisLabelFunction,
  getXAxisTicks,
  customTooltipTitle,
} from "../Utils/graph";

interface Props {
  timerRecords: timerType[];
  selectedTimerRecords2: timerType[];
  period: timePeriod;
  date?: Date;
  date2?: Date;
}

const WorkStatBar: FC<Props> = ({
  timerRecords,
  period,
  date,
  date2,
  selectedTimerRecords2,
}) => {
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
      previousTime: data2Dict[entry.label] - entry.time,
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active) {
      const hours = Math.floor(payload[0].value / 3600);
      const minutes = Math.floor((payload[0].value % 3600) / 60);
      const title = customTooltipTitle[period];
      return (
        <Paper
          sx={{
            padding: "10px",
            backgroundColor: "#ffffff",
            border: "2px solid #aaaaaa",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1" color="text.primary">
            {title} {label}
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              margin: "0px 10px",
              // right border black
              borderRight: "2px solid #aaaaaa",
            }}
          />
          <Typography variant="body1" color="text.primary">
            {hours ? hours + "H " : ""}
            {minutes ? minutes + "M" : ""}
            {hours === 0 && minutes === 0 ? "0M" : ""}
          </Typography>
        </Paper>
      );
    }

    return null;
  };
  return (
    <GraphCard title="Focused Time Distribuition">
      <BarChart
        data={combinedData}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        {/* Show 4 labels */}
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
        <Bar dataKey="time" fill="#ac9172" stackId="aa" />
        <Bar dataKey="previousTime" fill="#ac917233" stackId="aa" />
      </BarChart>
    </GraphCard>
  );
};

export default WorkStatBar;
