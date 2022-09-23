import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import SelectToDoList from "./SelectToDoList";
import TasksList from "./TasksList";

const TasksMain = () => {
  const [taskListName, setList] = useState("My Day");

  return (
    <Container>
      <SelectToDoList setList={setList} listName={taskListName} />
      <TasksList taskListName={taskListName} />
    </Container>
  );
};

export default TasksMain;
