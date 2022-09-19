import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import SelectToDoList from "./SelectToDoList";
import ToDo from "./ToDo";

export const ToDoList = () => {
  const [list, setList] = useState("My Day");

  return (
    <Container>
      <SelectToDoList setList={setList} />
      <Typography variant="h4">{list}</Typography>
      <ToDo ToDoList={list} />
    </Container>
  );
};
