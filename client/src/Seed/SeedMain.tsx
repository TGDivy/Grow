import React from "react";

import { Container } from "@mui/material";
import Timer from "./Timer";
import TimerTask from "./AddTask";

const SeedMain = () => {
  return (
    <Container>
      <Timer />
      <TimerTask />
    </Container>
  );
};

export default SeedMain;
