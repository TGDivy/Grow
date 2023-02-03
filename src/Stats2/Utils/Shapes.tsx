import React from "react";

import { Divider, Paper, Typography } from "@mui/material";
import { timePeriod } from "./utils";
import { customTooltipTitle } from "./graph";

export const CustomTooltipWrapper = (period: timePeriod) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active) {
      const hours = Math.floor(payload[0].value / 3600);
      const minutes = Math.floor((payload[0].value % 3600) / 60);
      const title = customTooltipTitle[period as timePeriod];
      const hours2 = Math.floor((payload[1].value + payload[0].value) / 3600);
      const minutes2 = Math.floor(
        ((payload[1].value + payload[0].value) % 3600) / 60
      );
      return (
        <Paper
          sx={{
            padding: "10px",
            border: "2px solid #aaaaaa",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1">
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
          <Typography variant="body1">
            {hours ? hours + "H " : ""}
            {minutes ? minutes + "M" : ""}
            {hours === 0 && minutes === 0 ? "0M" : ""}
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
          <Typography variant="body1">
            {hours2 ? hours2 + "H " : ""}
            {minutes2 ? minutes2 + "M" : ""}
            {hours2 === 0 && minutes2 === 0 ? "0M" : ""}
          </Typography>
        </Paper>
      );
    }

    return null;
  };

  return CustomTooltip;
};

import { Sector } from "recharts";
import useThemeStore from "../../Common/Stores/ThemeStore";

export const renderActiveShape = (fill: string) => {
  const func = (props: any) => {
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

    const leftX = cx - outerRadius - 5;
    const rightX = cx + outerRadius + 5;
    const ex = cos >= 0 ? rightX : leftX;
    const topY = cy - outerRadius - 10;
    const bottomY = cy + outerRadius + 10;
    const ey = sin >= 0 ? bottomY : topY;
    // const colors = useThemeStore((state) => state.colors);
    // const fill = colors.primary;
    const mx = ((ex + sx) / 2) * 0.95;
    const my = ((ey + sy) / 2) * 1.05;
    const textAnchor = cos >= 0 ? "start" : "end";
    // console.log(cx, cy);

    // use outerRadius to find the top left corner of the pie chart

    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={0}
          textAnchor="middle"
          fill={fill}
          fontSize={20}
          fontWeight={500}
        >
          {payload.label}
        </text>
        <text x={cx} y={cy} textAnchor="middle" fill="#fff" dy={30}>
          {Math.floor(payload.time / 60 / 60)}h{" "}
          {Math.floor((payload.time / 60) % 60)}m
        </text>
        {/* <text x={cx} y={cy} textAnchor="middle" fill="#999" dy={-2}>
        {`(${(percent * 100).toFixed(0)}%)`}
      </text> */}
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
          fill="#999"
        >
          {`(${(percent * 100).toFixed(0)}%)`}
        </text>
      </g>
    );
  };
  return func;
};
