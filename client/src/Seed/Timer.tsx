import React, { useState, useEffect } from "react";

import useTimerStore from "../Stores/TimerStore";
import { IconButton, Container, Grid, Box, Typography } from "@mui/material";

import { Stop } from "@mui/icons-material";

const timeElapsed = (startTime: Date) => {
  console.log(startTime);
  console.log(typeof startTime);
  return Math.ceil((new Date().getTime() - startTime.getTime()) / 1000);
};

// Format Seconds to MM:SS
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return `${minutes}:${seconds}`;
};

const ActiveTimer = () => {
  const startTime = useTimerStore((state) => state.startTime);
  const [studyTime, setStudyTime] = useState<number>(timeElapsed(startTime));
  const stopTimer = useTimerStore((state) => state.stopTimer);

  useEffect(() => {
    const interval = setInterval(() => {
      setStudyTime(Math.ceil(timeElapsed(startTime)));
    }, 1000);

    return () => clearInterval(interval);
  }, [studyTime]);

  return (
    <Container>
      <Grid
        container
        spacing={0}
        justifyContent="center"
        direction="column"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h1">{formatTime(studyTime)}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton onClick={stopTimer}>
              <Stop />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ActiveTimer;
