import React, { useEffect } from "react";
import { Container, Typography, Grid, Divider } from "@mui/material";

import useCurrentUser from "../Common/Contexts/UserContext";
import { db } from "../Common/Firestore/firebase-config";
import { onSnapshot, doc } from "firebase/firestore";

import useTimerRecordsStore from "../Common/Stores/TimerRecordsStore";

import WeeklyWorkStat from "./WeeklyWorkStat";
import TagPieStat from "./TagPieStat";
import TagRadarStat from "./TagRadarStat";

const filterTimerRecords = (timerRecords, timePeriodLength, daysBack) => {
  const DAY = 24 * 60 * 60 * 1000;

  const current = new Date(Date.now() - daysBack * DAY);
  const filteredTimerRecords = timerRecords.filter(
    (timerRecord) =>
      timerRecord.startTime.getTime() >=
        current.getTime() - timePeriodLength * DAY &&
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

  const daysBack = 0;
  const timePeriodLength = 7;
  const selectedPeriod = filterTimerRecords(
    timerRecords,
    timePeriodLength,
    daysBack
  );
  const previousPeriod = filterTimerRecords(
    timerRecords,
    timePeriodLength,
    daysBack + timePeriodLength
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

        <Grid container spacing={2} alignContent="center">
          <Grid item xs={6} md={6}>
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
          </Grid>
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
        </Grid>
      </Container>
    </>
  );
};

export default Home;
