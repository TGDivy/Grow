import React, { useEffect } from "react";
import { Container, Typography, Grid, Divider } from "@mui/material";

import useCurrentUser from "../Common/Contexts/UserContext";
import { db } from "../Common/Firestore/firebase-config";
import { onSnapshot, doc } from "firebase/firestore";

import useTimerRecordsStore from "../Common/Stores/TimerRecordsStore";

import { Tab, Tabs, Button, IconButton } from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";

import WeeklyWorkStat from "./WeeklyWorkStat";
import WorkStatLine from "./WorkStatLine";
import TagPieStat from "./TagPieStat";
import TagRadarStat from "./TagRadarStat";

const filterTimerRecords = (timerRecords, timePeriodLength, daysBack) => {
  const DAY = 24 * 60 * 60 * 1000;

  const current = new Date(Date.now() - daysBack * DAY);
  const filteredTimerRecords = timerRecords.filter(
    (timerRecord) =>
      timerRecord.startTime.getTime() >
        current.getTime() - (timePeriodLength - 1) * DAY &&
      timerRecord.startTime.getTime() < current.getTime()
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

const Home = () => {
  const { user, setUser } = useCurrentUser();
  const addLatestTimerRecord = useTimerRecordsStore(
    (state) => state.addLatestTimerRecord
  );
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

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "users", user.uid),
      { includeMetadataChanges: true },
      (doc) => {
        setUser(doc.data());
      }
    );

    addLatestTimerRecord(user.uid);

    return unsub;
  }, []);

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

  return (
    <>
      <Container>
        <Typography variant="h3">Home</Typography>
        <Divider
          sx={{
            marginTop: 2,
            marginBottom: 2,
          }}
        />

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
          {/* <Grid item xs={6} md={6}>
            <Typography variant="h6">Total Work Time</Typography>
            <Typography variant="h4">
              {user.totalWorkTime ? user.totalWorkTime : 0} hours
            </Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography variant="h6">Total Break Time</Typography>
            <Typography variant="h4">
              {user.totalBreakTime ? user.totalBreakTime : 0} hours
            </Typography>
          </Grid> */}
          <Grid item xs={12} md={6}>
            <WeeklyWorkStat timerRecords={selectedPeriod} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TagRadarStat
              selectedPeriod={selectedPeriod}
              previousPeriod={previousPeriod}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TagPieStat timerRecords={selectedPeriod} />
          </Grid>
          <Grid item xs={12} md={6}>
            <WorkStatLine
              timerRecords={selectedPeriod}
              previousRecords={previousPeriod}
              dayDiff={timePeriodLength}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
