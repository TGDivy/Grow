import React from "react";
import { Stack, Typography, Divider, Box } from "@mui/material";
import Workouts from "./Workout/Workouts";
import { Container } from "@mui/system";

const SoilMain = () => {
  return (
    <Container>
      <Stack>
        <Divider textAlign="left">
          <Box pb={2} pt={2}>
            <Typography variant="h3">Soil</Typography>
          </Box>
        </Divider>
        <Workouts />
      </Stack>
    </Container>
  );
};

export default SoilMain;
