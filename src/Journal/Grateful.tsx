import { Box, Grid, Slider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import useDailyJournalStore from "../Common/Stores/DailyJournalStore";
import RTE from "./RTE/RTE";

const timeElapsed = (startTime: Date) => {
  return Math.ceil((new Date().getTime() - startTime.getTime()) / 1000);
};
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

const Reflect = () => {
  // A place to write down what you're grateful for.
  const grateful = useDailyJournalStore((state) => state.entry);
  const setGrateful = useDailyJournalStore((state) => state.setEntry);

  const [active, setActive] = useState(true);
  const [studyTime, setStudyTime] = useState(0);
  const [timerTime, setTimerTime] = useState(new Date());
  const [timerDuration, setTimerDuration] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (studyTime >= timerDuration) {
      interval = setInterval(() => {
        setStudyTime(timerDuration);
        setActive(false);
      }, 200);
    } else {
      interval = setInterval(() => {
        setStudyTime(Math.ceil(timeElapsed(timerTime)));
      }, 200);
    }

    return () => clearInterval(interval);
  }, [studyTime, active]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number" && newValue >= 10 * 60) {
      setTimerDuration(newValue as number);
    }
  };

  return (
    <Stack spacing={2}>
      <Grid
        sx={{
          minHeight: "7vh",
        }}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={10} sm={8} md={6}>
          <Slider
            value={timerDuration - studyTime}
            size="small"
            marks
            color="secondary"
            onChange={handleSliderChange}
            min={0}
            max={60}
            step={30}
            disabled={active}
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
        </Grid>
      </Grid>
      <Box
        sx={{
          position: "relative",
          height: "500px",
          width: "100%",
          "& .editor-inner": {
            height: "450px",
          },
        }}
      >
        <RTE text={grateful} setText={setGrateful} textToAdd="Good Job!" />
      </Box>
    </Stack>
  );
};

export default Reflect;
