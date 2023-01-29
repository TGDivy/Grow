/* eslint-disable react/prop-types */
import React from "react";
import { Box, Tooltip } from "@mui/material";
import moment from "moment";

export interface cellProps {
  habit: boolean | undefined | null;
  cellContent?: string;
  date: Date | null;
}

const backGroundColorMap = (habit: boolean | undefined | null) => {
  if (habit === undefined) {
    return "#33333388";
  }
  if (habit === true) {
    return "#00B140AA";
  }
  if (habit === false) {
    return "#B00020AA";
  }
  return "transparent";
};

const CELL_SIZE = 16;

interface Props {
  props: cellProps | null;
}

const Cell = ({ props }: Props) => {
  if (props === null) {
    return (
      <Box
        sx={{
          width: CELL_SIZE,
          height: CELL_SIZE + 5,
          minHeight: CELL_SIZE + 5,
          minWidth: CELL_SIZE - 3,
          backgroundColor: "transparent",
        }}
      />
    );
  }

  const { habit, cellContent, date } = props;

  const finalTitle = moment(date).format("MMMM Do, YYYY");

  const backgroundColor = backGroundColorMap(habit);
  return (
    <Tooltip title={finalTitle} placement="top" arrow disableInteractive>
      <Box
        sx={{
          width: CELL_SIZE,
          height: CELL_SIZE + 5,
          minHeight: CELL_SIZE + 5,
          minWidth: CELL_SIZE - 3,
          backgroundColor: backgroundColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 12,
          fontWeight: "bold",

          "&:hover": {
            border: "1px solid black",
            backgroundColor: "darken(0.1, #33333388)",
          },
        }}
      >
        {cellContent}
      </Box>
    </Tooltip>
  );
};

export default Cell;
