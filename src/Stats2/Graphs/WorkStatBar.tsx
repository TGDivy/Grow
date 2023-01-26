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
  period: timePeriod;
}

const WorkStatBar: FC<Props> = ({ timerRecords, period }) => {
  const [data, setData] = React.useState<dataType[]>();

  React.useEffect(() => {
    getTimePeriods(timerRecords, period).then((data) => {
      if (data) {
        console.log(data);
        setData(data);
      }
    });
  }, [timerRecords]);

  if (!data) {
    return null;
  }

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
        data={data}
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
        <Bar dataKey="time" fill="#ac9172" />
      </BarChart>
    </GraphCard>
  );
};

export default WorkStatBar;
