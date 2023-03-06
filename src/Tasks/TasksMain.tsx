import React, { useState } from "react";
import { Box, Container, Button } from "@mui/material";
import TasksList from "./TasksList";
import { Help } from "@mui/icons-material";
import PageTitle from "../Common/ReusableComponents/PageTitle";

const TasksMain = () => {
  const [taskListName] = useState("Tasks");

  return (
    <Container
      sx={{
        mt: { xs: 2, md: 2 },
      }}
    >
      <TasksList taskListName={taskListName} />
    </Container>
  );
};

export default TasksMain;
