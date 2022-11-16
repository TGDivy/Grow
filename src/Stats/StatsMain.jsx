import React from "react";
import { Container, Typography, Grid, Divider, Box } from "@mui/material";

import useTimerRecordsStore from "../Common/Stores/TimerRecordsStore";

import { Tab, Tabs, Button } from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";

import WeeklyWorkStat from "./WeeklyWorkStat";
import WorkStatLine from "./WorkStatLine";
import TagPieStat from "./TagPieStat";
import TagRadarStat from "./TagRadarStat";
import StickerPieStat from "./StickerPieStat";
import Overall from "./Overall";

export const filterTimerRecords = (
  timerRecords,
  timePeriodLength,
  daysBack
) => {
  const DAY = 24 * 60 * 60 * 1000;

  const today = new Date(new Date().getTime() - 5 * 60 * 60 * 1000).setHours(
    0,
    0,
    0,
    0
  );
  const current = new Date(today - daysBack * DAY);
  const filteredTimerRecords = timerRecords.filter(
    (timerRecord) =>
      timerRecord.startTime.getTime() - 5 * 60 * 60 * 1000 >
        current.getTime() - (timePeriodLength - 1) * DAY &&
      timerRecord.startTime.getTime() - 5 * 60 * 60 * 1000 <
        current.getTime() + DAY
  );
  // Pad weeklyTimerRecords with empty days
  for (let i = 0; i < timePeriodLength; i++) {
    const date = new Date(current.getTime() - i * DAY);

    filteredTimerRecords.push({
      startTime: date,
      duration: 0,
      tags: [],
      description: "",
      taskKey: "",
    });
  }

  return filteredTimerRecords;
};

export const totalTimeWorked = (timerRecords) => {
  const T = Math.floor(
    timerRecords.reduce((acc, timerRecord) => {
      return acc + timerRecord.duration;
    }, 0) / 60
  );
  return T;
};

export const totalTimeWorkedByTagOrSticker = (timerRecords, name) => {
  const FilterByT = (timerRecord) => {
    return timerRecord.tags.includes(name);
  };

  const FilterByS = (timerRecord) => {
    return timerRecord.sticker === name;
  };

  const timerRecordsFiltered = timerRecords.filter(
    (timerRecord) => FilterByT(timerRecord) || FilterByS(timerRecord)
  );

  const T = Math.floor(
    timerRecordsFiltered.reduce((acc, timerRecord) => {
      return acc + timerRecord.duration;
    }, 0) / 60
  );
  return T;
};

const StatsMain = () => {
  const timerRecords = useTimerRecordsStore((state) => state.timerRecords);

  // const daysBack = -0;
  const [periodBack, setPeriodBack] = React.useState(0);
  const [timePeriodLength, setTimePeriodLength] = React.useState(7);

  const handleChange = (event, newValue) => {
    setPeriodBack(0);
    setTimePeriodLength(newValue);
  };

  const selectedPeriod = filterTimerRecords(
    timerRecords,
    timePeriodLength,
    periodBack * timePeriodLength
  );
  const previousPeriod = filterTimerRecords(
    timerRecords,
    timePeriodLength,
    periodBack * timePeriodLength + timePeriodLength
  );

  // Display selected period, and change daysBack to change the period
  const handlePeriodBack = (direction) => {
    if (direction === "forward" && periodBack > 0) {
      setPeriodBack(periodBack - 1);
    } else if (direction === "backward") {
      setPeriodBack(periodBack + 1);
    }
  };

  const displayPeriod = () => {
    const DAY = 24 * 60 * 60 * 1000;
    const current = new Date(Date.now() - periodBack * DAY * timePeriodLength);

    // Display current date in a pretty way
    return (
      <Typography variant="h6">
        {current.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </Typography>
    );
  };

  const totalTimeWorkedV = totalTimeWorked(selectedPeriod);

  return (
    <>
      <Container>
        <Divider textAlign="left">
          <Box pb={2} pt={2}>
            <Typography variant="h3">Stats</Typography>
          </Box>
        </Divider>

        <Grid
          container
          spacing={2}
          alignContent="center"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} md={8}>
            <Tabs
              value={timePeriodLength}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab value={3} label="3 Day" />
              <Tab value={7} label="Week" />
              <Tab value={14} label="Fortnight" />
              <Tab value={30} label="Month" />
            </Tabs>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={2} alignContent="center">
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handlePeriodBack("backward")}
                >
                  <ArrowBack />
                </Button>
              </Grid>
              <Grid item xs={6}>
                {displayPeriod()}
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handlePeriodBack("forward")}
                  disabled={periodBack === 0}
                >
                  <ArrowForward />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={11}>
            <Typography variant="h6">
              Total Time Worked :{" "}
              {`${Math.floor(totalTimeWorkedV / 60)}H ${
                totalTimeWorkedV % 60
              }M`}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <WeeklyWorkStat timerRecords={selectedPeriod} />
          </Grid>
          <Grid item xs={12} md={6}>
            <WorkStatLine
              timerRecords={selectedPeriod}
              previousRecords={previousPeriod}
              dayDiff={timePeriodLength}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TagPieStat timerRecords={selectedPeriod} />
          </Grid>
          <Grid item xs={12} md={6}>
            <StickerPieStat timerRecords={selectedPeriod} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TagRadarStat
              selectedPeriod={selectedPeriod}
              previousPeriod={previousPeriod}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default StatsMain;
