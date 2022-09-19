import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import SelectToDoList from "./SelectToDoList";

export const ToDoList = () => {
  const [list, setList] = useState("Tasks 1");

  return (
    <Container>
      <SelectToDoList setList={setList} />
      <Typography variant="h4">{list}</Typography>
    </Container>
  );
};
