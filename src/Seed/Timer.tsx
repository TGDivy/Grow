import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Switch,
  Slider,
  styled,
  duration,
} from "@mui/material";
import useTimerStore from "../Common/Stores/TimerStore";

import ZenQuote from "./ZenQuote";
import StopTimer from "./StopTimer";
import FinishTimer from "./FinishTimer";
import { MAX_STOPWATCH_DURATION } from "../Common/constants";

const timeElapsed = (startTime: Date) => {
  return Math.ceil((new Date().getTime() - startTime.getTime()) / 1000);
};

// Format Seconds to MM:SS
const formatTime = (time_: number, mode: string, duration: number) => {
  let time = time_;
  if (mode === "timer") {
    time = duration - time;
  }
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

  const timerMode = useTimerStore((state) => state.timerMode);
  const setTimerMode = useTimerStore((state) => state.setTimerMode);
  const timerDuration = useTimerStore((state) => state.timerDuration);
  const setTimerDuration = useTimerStore((state) => state.setTimerDuration);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number" && newValue >= 10 * 60) {
      setTimerDuration(newValue as number);
    }
  };

  useEffect(() => {
    if (!active) {
      setStudyTime(0);
      return;
    }
    let interval: NodeJS.Timeout;
    if (studyTime >= timerDuration) {
      interval = setInterval(() => {
        setStudyTime(timerDuration);
      }, 200);
    } else {
      interval = setInterval(() => {
        setStudyTime(Math.ceil(timeElapsed(startTime)));
      }, 200);
    }

    return () => clearInterval(interval);
  }, [studyTime, active]);

  return (
    <>
      <Box
        sx={{
          minHeight: "5vh",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          minHeight: "10vh",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" color="#fff">
          {formatTime(studyTime, timerMode, timerDuration)}
        </Typography>
      </Box>
      <Box
        sx={{
          minHeight: "7vh",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column-reverse",
        }}
      >
        <div>
          Timer Mode
          <Switch
            checked={timerMode === "stopwatch"}
            disabled={active}
            onChange={() => {
              if (timerMode === "timer") {
                setTimerMode("stopwatch");
                setTimerDuration(MAX_STOPWATCH_DURATION);
              } else {
                setTimerMode("timer");
              }
            }}
          />
          Stop Watch
        </div>

        <Slider
          value={
            timerMode === "stopwatch" ? studyTime : timerDuration - studyTime
          }
          size="small"
          marks
          color="secondary"
          onChange={handleSliderChange}
          min={0}
          max={2 * 60 * 60}
          step={5 * 60}
          disabled={active || timerMode === "stopwatch"}
          sx={{
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${"rgb(255 255 255 / 16%)"}`,
              },
              "&.Mui-active": {
                width: 16,
                height: 16,
              },
            },
            "& .MuiSlider-mark": {
              // backgroundColor: "#000",
              height: 8,
              opacity: 0.5,
              // width: 1,
              "&.MuiSlider-markActive": {
                opacity: 1,
                backgroundColor: "currentColor",
              },
            },
          }}
        />
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
      <FinishTimer studyTime={studyTime} maxDuration={timerDuration} />
    </>
  );
};

export default Timer;
