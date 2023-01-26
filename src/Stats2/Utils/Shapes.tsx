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

  return CustomTooltip;
};

import { Sector } from "recharts";

export const renderActiveShape = (props: any) => {
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
  const fill = "#ac9172";
  const textAnchor = cos >= 0 ? "start" : "end";
  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={"#ac9172"}
        fontSize={20}
        fontWeight={500}
      >
        {payload.label}
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
        fill="#fff"
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
