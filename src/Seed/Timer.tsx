import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Switch,
  Slider,
  Card,
  CardActions,
  CircularProgress,
} from "@mui/material";
import useTimerStore from "../Common/Stores/TimerStore";

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

  const [mouseDown, setMouseDown] = useState(false);

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

  const updateTimerBasedOnMouseTouch = (
    event: React.TouchEvent | React.MouseEvent,
    bypass = false
  ) => {
    event.preventDefault();
    if (timerMode === "timer" && (mouseDown || bypass) && !active) {
      let x = 0,
        y = 0;
      if (event.type === "touchmove") {
        const { touches } = event as React.TouchEvent<HTMLDivElement>;
        x = touches[0].clientX;
        y = touches[0].clientY;
      } else if (event.type === "mousemove") {
        const { clientX, clientY } = event as React.MouseEvent<HTMLDivElement>;
        x = clientX;
        y = clientY;
      }
      const { left, top, width, height } =
        event.currentTarget.getBoundingClientRect();
      x = x - left - width / 2;
      y = y - top - height / 2;
      // calculate the angle of the mouse position
      const angle = Math.atan2(y, x);
      // convert the angle to a percentage of the circle
      let percent = (angle + Math.PI / 2) / (2 * Math.PI);
      // if negative, add 1 to make it positive
      if (percent < 0) {
        percent += 1;
      }
      // only change in intervals of 5 minutes
      percent = Math.round(percent * 24) / 24;
      // minimum of 10 minutes
      percent = Math.max(percent, 600 / 7200);
      // Don't allow the timer to jump more than 30 minutes at a time
      if (Math.abs(percent * MAX_STOPWATCH_DURATION - timerDuration) > 5400) {
        return;
      }

      setTimerDuration(Math.round(percent * MAX_STOPWATCH_DURATION));
    }
    // This solution cause the page to scroll when the user is trying to change the timer duration
  };

  return (
    <>
      <Card
        sx={{
          ":hover": {
            boxShadow: 20,
          },
          backgroundColor: "#00000088",
          color: "primary.main",
          width: "800px",
          maxWidth: "100%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "absolute",
            zIndex: 5,
            width: "30px",
            left: 5,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", height: "90%" }}>
            <Slider
              value={
                timerMode === "stopwatch"
                  ? studyTime
                  : timerDuration - studyTime
              }
              size="small"
              marks
              color="secondary"
              onChange={handleSliderChange}
              min={0}
              max={2 * 60 * 60}
              step={5 * 60}
              disabled={active || timerMode === "stopwatch"}
              orientation="vertical"
              sx={{
                color: "primary.main",
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
                  width: 12,
                  opacity: 0.4,
                  // width: 1,
                  "&.MuiSlider-markActive": {
                    opacity: 1,
                    backgroundColor: "currentColor",
                  },
                },
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            paddingTop: "1.5rem",
            paddingBottom: "0.5rem",
            width: "100%",
            position: "relative",
            touchAction: "none",
            "&:hover": {
              "& .MuiCircularProgress-root": {},
            },
          }}
          onMouseDown={
            timerMode === "timer"
              ? (event) => {
                  setMouseDown(true);
                  updateTimerBasedOnMouseTouch(event);
                }
              : undefined
          }
          onMouseMove={updateTimerBasedOnMouseTouch}
          onMouseUp={() => setMouseDown(false)}
          onTouchStart={
            timerMode === "timer"
              ? () => {
                  setMouseDown(true);
                }
              : undefined
          }
          onTouchMove={updateTimerBasedOnMouseTouch}
          onTouchEnd={() => setMouseDown(false)}
        >
          <CircularProgress
            variant="determinate"
            value={100}
            size={225}
            sx={{
              color: "#00000088",
              position: "absolute",
            }}
          />
          {/* Add a dot at the end of the bar! */}
          <CircularProgress
            variant="determinate"
            value={
              timerMode === "stopwatch"
                ? studyTime / 72
                : (timerDuration - studyTime) / 72
            }
            size={225}
            sx={{
              color: active || timerMode === "stopwatch" ? "#ffffff88" : "grey",

              "& .MuiCircularProgress-circle": {
                transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                strokeLinecap: "round",

                // Make bar stand out an svg circle
                transformOrigin: "center",
              },
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h3"
              align="center"
              color="primary.main"
              unselectable="on"
              sx={{
                userSelect: "none",
                MozUserSelect: "none",
                WebkitUserSelect: "none",
                msUserSelect: "none",
              }}
            >
              {formatTime(studyTime, timerMode, timerDuration)}
            </Typography>
          </Box>
          <Box
            sx={{
              top: 100,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            <StopTimer studyTime={studyTime} />
          </Box>
        </Box>
        <CardActions
          sx={{
            justifyContent: "center",
            userSelect: "none",
            MozUserSelect: "none",
            WebkitUserSelect: "none",
            msUserSelect: "none",
          }}
        >
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
        </CardActions>
      </Card>

      <FinishTimer
        studyTime={studyTime}
        maxDuration={
          timerMode === "stopwatch" ? MAX_STOPWATCH_DURATION : timerDuration
        }
      />
    </>
  );
};

export default Timer;
