import React from "react";

import { Container, Grid } from "@mui/material";
import Timer from "./Timer";
import TimerTask from "./AddTask";

const SeedMain = () => {
  return (
    <Container>
      <Grid
        container
        spacing={0}
        justifyContent="center"
        direction="column"
        alignItems="center"
      >
        <Timer />
        <TimerTask />
      </Grid>
    </Container>
  );
};

export default SeedMain;
