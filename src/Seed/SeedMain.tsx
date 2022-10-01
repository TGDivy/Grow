import React from "react";

import { Container, Stack } from "@mui/material";
import Timer from "./Timer";
import TimerTask from "./AddTask";

const SeedMain = () => {
  // Occupy full page

  return (
    <Container maxWidth="sm">
      <Stack spacing={1}>
        <Timer />
        <TimerTask />
      </Stack>
    </Container>
  );
};

export default SeedMain;
