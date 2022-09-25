import React from "react";

import useTimerStore from "../Stores/TimerStore";
import { Button, Container, Grid } from "@mui/material";

const StartTimer = () => {
  const active = useTimerStore((state) => state.active);
  const startTimer = useTimerStore((state) => state.startTimer);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => {
              startTimer();
            }}
          >
            Start Timer
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StartTimer;
