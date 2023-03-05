import React, { useState } from "react";
import { Box, Container, Button } from "@mui/material";
import TasksList from "./TasksList";
import { Help } from "@mui/icons-material";
import PageTitle from "../Common/ReusableComponents/PageTitle";

const TasksMain = () => {
  const [taskListName] = useState("Tasks");

  return (
    <Container sx={{ position: "relative" }}>
      <PageTitle title={taskListName} />
      <Box position="absolute" p={2} top={0} right={10} zIndex={10}>
        <Button
          size="large"
          sx={{
            color: "surface.contrastText",
          }}
        >
          <Help fontSize="large" />
        </Button>
      </Box>
      <TasksList taskListName={taskListName} />
    </Container>
  );
};

export default TasksMain;
