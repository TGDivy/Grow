import React from "react";

import { Divider, Paper, Typography } from "@mui/material";
import { timePeriod } from "../Utils/utils";
import { customTooltipTitle } from "../Utils/graph";

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
