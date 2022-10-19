import React, { useState } from "react";
import { Box, Container, Divider, Typography } from "@mui/material";
import SelectToDoList from "./SelectToDoList";
import TasksList from "./TasksList";

const TasksMain = () => {
  const [taskListName, setList] = useState("Tasks");

  return (
    <Container>
      <Divider textAlign="left">
        <Box pb={2} pt={2}>
          <Typography variant="h3">{taskListName}</Typography>
        </Box>
      </Divider>
      <TasksList taskListName={taskListName} />
    </Container>
  );
};

export default TasksMain;
