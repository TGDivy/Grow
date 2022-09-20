import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import SelectToDoList from "./SelectToDoList";
import ToDo from "./ToDo";

export const ToDoList = () => {
  const [list, setList] = useState("My Day");

  // Title aligned right
  return (
    <Container>
      <SelectToDoList setList={setList} listName={list} />

      <ToDo ToDoList={list} />
    </Container>
  );
};
