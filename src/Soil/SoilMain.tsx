import React from "react";
import { Stack, Typography, Divider } from "@mui/material";
import Workouts from "./Workout/Workouts";
import { Container } from "@mui/system";

const SoilMain = () => {
  return (
    <Container>
      <Stack>
        <Typography variant="h3">Soil</Typography>
        <Divider />
        <Workouts />
      </Stack>
    </Container>
  );
};

export default SoilMain;
