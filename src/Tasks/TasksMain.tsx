import React, { useState } from "react";
import { Box, Container, Button, Stack } from "@mui/material";
import TasksList from "./TasksList";
import { Help } from "@mui/icons-material";
import PageTitle from "../Common/ReusableComponents/PageTitle";
import Projects from "./Projects";
import CondensedTaskList from "./CondensedTaskList";

const TasksMain = () => {
  const [taskListName] = useState("Tasks");

  return (
    <Container
      sx={{
        mt: { xs: 2, md: 2 },
      }}
    >
      <Stack spacing={2}>
        <Projects />
        <CondensedTaskList title={"All Tasks"} createTask />
      </Stack>
    </Container>
  );
};

export default TasksMain;
