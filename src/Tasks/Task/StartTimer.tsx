import React, { FC } from "react";
import { Box, Button, Typography } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import useTimerStore from "../../Common/Stores/TimerStore";
interface startTimerProps {
  id: string;
  timeSpent?: number;
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  if (seconds < 10) {
    return `${minutes}:0${seconds}`;
  }

  return `${minutes}:${seconds}`;
};

const StartTimer: FC<startTimerProps> = ({ id, timeSpent }) => {
  const active = useTimerStore((state) => state.active);
  const navigate = useNavigate();
  const startTimer = useTimerStore((state) => state.startTimer);
  const addTask = useTimerStore((state) => state.addTask);

  const handleStart = () => {
    if (!active) {
      startTimer();
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
      <Button variant="outlined" fullWidth>
        <Typography variant="caption">
          {timeSpent ? formatTime(timeSpent) : "00:00"}
        </Typography>
      </Button>
      <Button variant="contained" fullWidth onClick={handleStart}>
        <PlayArrow fontSize="small" />{" "}
      </Button>
    </Box>
  );
};

export default StartTimer;
