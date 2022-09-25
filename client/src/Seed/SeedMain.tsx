import React from "react";
import StudyTimer from "./StudyTimer";

import { Grid, Container } from "@mui/material";
import ActiveTimer from "./ActiveTimer";
import StartTimer from "./StartTimer";

import useTimerStore from "../Stores/TimerStore";

const SeedMain = () => {
  const active = useTimerStore((state) => state.active);
  return <Container>{active ? <ActiveTimer /> : <StartTimer />}</Container>;
};

export default SeedMain;
