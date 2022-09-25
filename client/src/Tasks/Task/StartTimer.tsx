import React, { FC } from "react";
import { Box, Button } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import useTimerStore from "../../Stores/TimerStore";
interface startTimerProps {
  id: string;
}

const StartTimer: FC<startTimerProps> = ({ id }) => {
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
      }}
    >
      <Button variant="contained" fullWidth onClick={handleStart}>
        <PlayArrow fontSize="small" />
      </Button>
    </Box>
  );
};

export default StartTimer;
