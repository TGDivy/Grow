import React, { useState, useEffect } from "react";

import useTimerStore from "../Stores/TimerStore";
import useDailyStore from "../Stores/DailyStore";
import { Box, Typography, Button } from "@mui/material";

import { Stop, PlayArrow } from "@mui/icons-material";
import useCurrentUser from "../contexts/UserContext";

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
  const startTimer = useTimerStore((state) => state.startTimer);
  const stopTimer = useTimerStore((state) => state.stopTimer);
  const quoteDate = useDailyStore((state) => state.date);
  const setQuote = useDailyStore((state) => state.setQuote);
  const quote = useDailyStore((state) => state.quote);
  const author = useDailyStore((state) => state.author);

  const { user } = useCurrentUser();

  console.log(timeElapsed(quoteDate));
  if (timeElapsed(quoteDate) > 60 * 60 * 24) {
    setQuote();
  }

  const onStop = () => {
    stopTimer(user.uid);
  };

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
        <Typography variant="body2" align="center">
          {quote} - {author}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", minHeight: "7vh" }}>
        {active ? (
          <Button onClick={onStop} size="large">
            <Stop fontSize="large" />
          </Button>
        ) : (
          <Button onClick={startTimer} size="large">
            <PlayArrow fontSize="large" />
          </Button>
        )}
      </Box>
    </>
  );
};

export default Timer;
