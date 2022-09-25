import React from "react";

import { Container, Grid, Stack } from "@mui/material";
import Timer from "./Timer";
import TimerTask from "./AddTask";

const SeedMain = () => {
  // Occupy full page

  return (
    <Container maxWidth="sm">
      <Stack
      // container
      // direction="column"
      // justifyContent="center"
      // spacing={2}
      // style={{ minHeight: "calc(100vh - 50px)" }}
      // border={1}
      >
        <Timer />
        <TimerTask />
      </Stack>
    </Container>
  );
};

export default SeedMain;
