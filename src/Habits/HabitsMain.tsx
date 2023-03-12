import { Box, Container, Fade, Stack } from "@mui/material";
import React from "react";
import HabitCreator from "./HabitCreator";
import HabitsList from "./HabitsList";
import Calendar from "./Calendar";
import HabitEntry from "./HabitEntry";

const HabitsMain = () => {
  return (
    <Container
      sx={{
        mt: { xs: 2, md: 2 },
      }}
    >
      <Stack spacing={2}>
        <HabitCreator />
        <Fade in timeout={1000}>
          <Box>
            <HabitsList />
            <HabitEntry />
          </Box>
        </Fade>
      </Stack>
    </Container>
  );
};

export default HabitsMain;
