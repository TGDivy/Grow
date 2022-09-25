import React from "react";

import { Container, Grid } from "@mui/material";
import Timer from "./Timer";
import TimerTask from "./AddTask";

const SeedMain = () => {
  return (
    <Container>
      <Grid container spacing={3} direction="column">
        <Timer />
        <TimerTask />
      </Grid>
    </Container>
  );
};

export default SeedMain;
