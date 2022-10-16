import React from "react";
import { Stack, Typography, Divider } from "@mui/material";
import Workouts from "./Workout/Workouts";

const SoilMain = () => {
  return (
    <Stack>
      <Typography variant="h3">Soil</Typography>
      <Divider />
      <Workouts />
    </Stack>
  );
};

export default SoilMain;
