import React, { FC } from "react";
import { Box, Button, Typography } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import useTimerStore from "../../Common/Stores/TimerStore";
interface startTimerProps {
  id: string;
  timeSpent?: number;
}

// timeSpent is in seconds
// if less than 10 hours, show minutes
// if greater than 10 hours, show hours
const formatTime = (time: number) => {
  if (time < 36000) {
    return `${Math.floor(time / 60)}m`;
  } else {
    return `${Math.floor(time / 3600)}h`;
  }
};

const StartTimer: FC<startTimerProps> = ({ id, timeSpent }) => {
  const active = useTimerStore((state) => state.active);
  const navigate = useNavigate();
  // const startTimer = useTimerStore((state) => state.startTimer);
  const addTask = useTimerStore((state) => state.addTask);

  const handleStart = () => {
    if (!active) {
      // startTimer();
      addTask(id);
      navigate("/Seed");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: 1,
      }}
    >
      <Button variant="outlined" fullWidth size="small">
        <Typography variant="caption">
          {timeSpent ? formatTime(timeSpent) : "0m"}
        </Typography>
      </Button>
      <Button variant="contained" fullWidth onClick={handleStart} size="small">
        <PlayArrow fontSize="small" />{" "}
      </Button>
    </Box>
  );
};

export default StartTimer;
