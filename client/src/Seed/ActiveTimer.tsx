import React from "react";

import useTimerStore from "../Stores/TimerStore";
import { Button, Container, Grid } from "@mui/material";

const ActiveTimer = () => {
  const active = useTimerStore((state) => state.active);
  const stopTimer = useTimerStore((state) => state.stopTimer);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => {
              stopTimer();
            }}
          >
            Stop Timer
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ActiveTimer;
