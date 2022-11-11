import React from "react";

import { Container, Stack } from "@mui/material";
import Timer from "./Timer";
import TimerTask from "./AddTask";
import AddTags from "./AddTags";
import AddSticker from "./AddSticker";

const SeedMain = () => {
  // Occupy full page

  return (
    <Container maxWidth="sm">
      <Stack spacing={1}>
        <Timer />
        <AddSticker />
        <AddTags />
        <TimerTask />
      </Stack>
    </Container>
  );
};

export default SeedMain;
