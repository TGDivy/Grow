import React from "react";
import {
  Paper,
  Box,
  Grid,
  Button,
  Typography,
  Card,
  CardHeader,
} from "@mui/material";
import { Tab, Tabs } from "@mui/material";

import HabitChart from "./HabitChart";
import useJournalStore from "../../Common/Stores/JournalStore";
import { JournalDicType } from "../../Common/Types/Types";
import useUserStore from "../../Common/Stores/User";
import moment from "moment";
import { cellProps } from "./Cell";
import { LinearProgress } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import StyledCard from "../../Common/ReusableComponents/StyledCard";
import StyledButton from "../../Common/ReusableComponents/StyledButton";

interface habitDate {
  [key: string]: boolean | undefined;
}

interface habitsDate {
  [key: string]: habitDate;
}

// JournalDicType is a dictionary of JournalType objects, each of which contain habit data.
// Convert it to a more suitable format for the HabitChart component.
const convertJournalData = (journalData: JournalDicType): habitsDate => {
  const newData: habitsDate = {};
  newData["Exercise"] = {};
  Object.values(journalData).forEach((journal) => {
    // customBoolHabits is a dictionary of habit names and their boolean values.
    if (journal?.customBoolHabits) {
      const { customBoolHabits } = journal;
      // journal date - 5 hours to get the correct date
      const newString = moment(journal.date)
        .subtract(5, "hours")
        .format("ddd MMM DD YYYY");

      newData["Exercise"][newString] = journal.exercised;

      Object.keys(customBoolHabits).forEach((habitName) => {
        const habitValue = customBoolHabits[habitName];
        // Get the day, month and year from the date string.

        // If the habit name is not in the newData dictionary, add it.
        if (!newData[habitName]) {
          newData[habitName] = {};
        }
        // Add the habit value to the habit name dictionary.
        newData[habitName][newString] = habitValue;
      });
    }
  });
  return newData;
};

const createYearGrid = (year: number) => {
  // Create it as a 7xX grid.
  const grid: (cellProps | null)[][] = [];

  for (let i = 0; i < 7; i++) {
    grid.push([]);
  }
  const contentDays = " M W F"; // each letter is a cell
  for (let i = 0; i < 7; i++) {
    grid[i].push({
      habit: null,
      cellContent: contentDays[i],
      date: null,
    });
  }

  const yearStart = moment(`${year}-01-01`);
  const yearEnd = moment(`${year + 1}-01-01`);

  // pad the first row with empty cells
  if (yearStart.day() !== 0) {
    for (let i = 0; i < yearStart.day(); i++) {
      grid[i].push(null);
    }
  }

  for (let day = yearStart; day.isBefore(yearEnd); day.add(1, "day")) {
    const obj = {
      habit: null,
      // title: day.format("MMM Do"),
      date: new Date(day.format("YYYY-MM-DD")),
    };
    grid[day.day()].push(obj);
  }

  // append empty row
  grid.push([]);
  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  for (let j = 0; j < 2; j++) {
    grid[7].push(null);
  }
  for (let i = 0; i < 12; i++) {
    grid[7].push({
      habit: null,
      cellContent: monthLabels[i],
      date: null,
    });
    for (let j = 0; j < 3 + (i % 2); j++) {
      grid[7].push(null);
    }
  }

  return grid;
};

const HabitsChart = () => {
  const journalRecords = useJournalStore((state) => state.documents);
  const userHabits = useUserStore((state) => state.customBoolHabits);
  const userHabitNames = userHabits.map((habit) => habit.name);

  const [tabLabels, setTabLabels] = React.useState<string[]>([]);
  const [newData, setNewData] = React.useState<habitsDate>({});
  const [year, setYear] = React.useState<number>(new Date().getFullYear());
  const [grid, setGrid] = React.useState<(cellProps | null)[][]>([]);
  const [habitName, setHabitName] = React.useState("Exercise");

  React.useEffect(() => {
    const newDataTemp = convertJournalData(journalRecords);
    setNewData(newDataTemp);
  }, []);

  React.useEffect(() => {
    if (newData && Object.keys(newData).length === 0) {
      return;
    }
    const tempTabLabels = Object.keys(newData).filter(
      (key) => key !== "Exercise"
    );
    tempTabLabels.sort((a, b) => {
      if (userHabitNames.includes(a) && !userHabitNames.includes(b)) {
        return -1;
      }
      if (!userHabitNames.includes(a) && userHabitNames.includes(b)) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
    setTabLabels(tempTabLabels);
  }, [newData]);

  React.useEffect(() => {
    setGrid(createYearGrid(year));
  }, [year]);

  const handleYearIncrease = () => {
    setYear(year + 1);
  };

  const handleYearDecrease = () => {
    setYear(year - 1);
  };

  if (
    tabLabels.length === 0 ||
    habitName === "" ||
    Object.keys(newData).length === 0
  ) {
    return (
      <StyledCard>
        <CardHeader
          title={
            <Typography
              variant="h4"
              color="primary.main"
              align="center"
              sx={{
                fontStyle: "italic",
              }}
            >
              Habits
            </Typography>
          }
        />
        <LinearProgress />
      </StyledCard>
    );
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setHabitName(newValue);
  };

  return (
    <Paper elevation={0}>
      <CardHeader
        title={
          <Grid
            container
            spacing={0}
            alignItems="start"
            justifyContent={"space-between"}
          >
            <Grid item xs={12} md={8}>
              <Typography variant="h4" align="left">
                Habits
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <StyledButton
                    variant="contained"
                    fullWidth
                    onClick={() => handleYearDecrease()}
                    size="small"
                  >
                    <ArrowBack />
                  </StyledButton>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    textAlign="center"
                    alignItems="center"
                    justifyContent="center"
                    display="flex"
                    sx={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="h5"
                      align="center"
                      noWrap
                      justifyItems="center"
                      alignItems="center"
                    >
                      {year}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={3}>
                  <StyledButton
                    variant="contained"
                    fullWidth
                    size="small"
                    onClick={() => handleYearIncrease()}
                    disabled={year === new Date().getFullYear()}
                  >
                    <ArrowForward />
                  </StyledButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        }
      />

      <Grid container spacing={0}>
        <Grid item xs={2}>
          <Box
            sx={{
              display: "flex",
              height: 276,
            }}
          >
            <Tabs
              value={habitName}
              onChange={handleTabChange}
              orientation="vertical"
              variant="scrollable"
              sx={{
                "& .MuiTab-textColorPrimary.Mui-selected": {
                  borderLeft: "2px solid",
                  color: "surfaceVariant.contrastText",

                  backgroundColor: "surfaceVariant.main",
                },
              }}
              TabIndicatorProps={{
                style: {
                  color: "surface.contrastText",
                  backgroundColor: "#00000000",
                  border: "0px solid",
                  borderLeftColor: "#ffffff00",
                },
              }}
            >
              <Tab label={"Exercise"} value={"Exercise"} wrapped />
              {tabLabels.map((habitName) => (
                <Tab
                  label={habitName}
                  value={habitName}
                  key={habitName}
                  wrapped
                />
              ))}
            </Tabs>
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Paper
            sx={{
              backgroundColor: "surfaceVariant.main",
              color: "surfaceVariant.contrastText",
              width: "100%",
              height: "100%",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "max-content",
                overflow: "scroll",

                "&::-webkit-scrollbar": {
                  height: "0.5em",
                  width: "100%",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#00000088",
                  borderRadius: "20px",
                  border: "0.5px solid #00000000",

                  // make the scroll bar 20% of the scroll area
                  // and the rest of the scroll area is the
                  // background color
                  backgroundClip: "padding-box",

                  // make the scrollbar a bit transparent
                  // so that the background color can be seen
                  // through it
                  opacity: 0.5,

                  // make the scrollbar a bit transparent
                },
              }}
              p={2}
            >
              <HabitChart data={newData[habitName]} yearGridData={grid} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default HabitsChart;
