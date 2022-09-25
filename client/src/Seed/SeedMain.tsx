import React from "react";
import StudyTimer from "./StudyTimer";

import { Grid, Container } from "@mui/material";
import ActiveTimer from "./ActiveTimer";
import StartTimer from "./StartTimer";

import { timerType } from "../Stores/Types";

const SeedMain = () => {
  return (
    <Container>
      {" "}
      <StudyTimer />
    </Container>
  );
};

export default SeedMain;
