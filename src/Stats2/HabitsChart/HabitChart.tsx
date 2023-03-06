import React from "react";
import { Box } from "@mui/material";
import Cell, { cellProps } from "./Cell";
import { v4 as uuidv4 } from "uuid";
interface habitDate {
  [key: string]: boolean | undefined;
}

type Props = {
  data: habitDate;
  yearGridData: (cellProps | null)[][]; // This is the grid of cells for the year.
  // We need to populate it with the habit data.
};

const yearGrid = (yearGrid: (cellProps | null)[][], data: habitDate) => {
  // make a copy of the yearGrid
  const newYearGrid = yearGrid.map((row) => row.map((cell) => cell));

  // populate the newYearGrid with the habit data
  for (let i = 0; i < newYearGrid.length - 1; i++) {
    for (let j = 1; j < newYearGrid[i].length; j++) {
      const cell = newYearGrid[i][j];
      if (cell == null) {
        continue;
      }
      const date = cell.date?.toDateString() || "";
      const habit = data[date];
      cell.habit = habit;
    }
  }

  return newYearGrid;
};

const HabitChart = (dataProps: Props) => {
  const { data, yearGridData } = dataProps;
  const grid = yearGrid(yearGridData, data);

  const GridContainer = () => {
    const BoxRow = (props: { row: (cellProps | null)[] }) => {
      const { row } = props;

      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            gap: 0.4,
            width: "90%",
          }}
        >
          {row.map((cellProps) => (
            <Cell props={cellProps} key={uuidv4()} />
          ))}
        </Box>
      );
    };

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
          gap: 0.2,
        }}
      >
        {grid.map((row) => (
          <BoxRow row={row} key={uuidv4()} />
        ))}
      </Box>
    );
  };

  return <GridContainer />;
};

export default HabitChart;
