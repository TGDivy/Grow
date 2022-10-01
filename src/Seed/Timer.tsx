import React, { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";
import useTimerStore from "../Stores/TimerStore";

import ZenQuote from "./ZenQuote";
import StopTimer from "./StopTimer";

const timeElapsed = (startTime: Date) => {
  return Math.ceil((new Date().getTime() - startTime.getTime()) / 1000);
};

// Format Seconds to MM:SS
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  if (seconds < 10) {
    return `${minutes}:0${seconds}`;
  }

  return `${minutes}:${seconds}`;
};

const Timer = () => {
  const startTime = useTimerStore((state) => state.startTime);
  const [studyTime, setStudyTime] = useState<number>(timeElapsed(startTime));
  const active = useTimerStore((state) => state.active);

  useEffect(() => {
    if (!active) {
      setStudyTime(0);
      return;
    }
    const interval = setInterval(() => {
      setStudyTime(Math.ceil(timeElapsed(startTime)));
    }, 200);

    return () => clearInterval(interval);
  }, [studyTime, active]);

  return (
    <>
      <Box
        sx={{
          minHeight: "5vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", minHeight: "10vh" }}
      >
        <Typography variant="h1">{formatTime(studyTime)}</Typography>
      </Box>
      <Box
        sx={{
          minHeight: "5vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ZenQuote />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", minHeight: "7vh" }}>
        <StopTimer studyTime={studyTime} />
      </Box>
    </>
  );
};

export default Timer;
