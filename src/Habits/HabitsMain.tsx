import { Container, Stack } from "@mui/material";
import React from "react";
import HabitCreator from "./HabitCreator";

const HabitsMain = () => {
  return (
    <Container
      sx={{
        mt: { xs: 2, md: 2 },
      }}
    >
      <Stack spacing={2}>
        <HabitCreator />
      </Stack>
    </Container>
  );
};

export default HabitsMain;
