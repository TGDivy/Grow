import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Divider,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import SelectToDoList from "./SelectToDoList";
import TasksList from "./TasksList";
import { taskSteps } from "../steps";
import { useTour } from "@reactour/tour";
import { Help } from "@mui/icons-material";
import useTaskStore from "../Common/Stores/TaskStore";
import useUserStore from "../Common/Stores/User";

const TasksMain = () => {
  const [taskListName, setList] = useState("Tasks");
  const { setIsOpen, isOpen, setSteps, setCurrentStep } = useTour();
  const tasks = useTaskStore((state) => state.tasks);
  const tutorials = useUserStore((state) => state.tutorials);
  const setTutorials = useUserStore((state) => state.setTutorials);

  const handleHelp = () => {
    setSteps(taskSteps);
    setCurrentStep(0);
    setIsOpen(true);
    setTutorials([...tutorials, "tasks"]);
  };

  useEffect(() => {
    // tasks is an object, so we need to check if it's empty
    if (tasks == null || Object.keys(tasks).length === 0) {
      handleHelp();
    } else if (tutorials.includes("tasks")) return;
    else {
      handleHelp();
    }
  }, []);

  return (
    <Container sx={{ position: "relative" }}>
      <Divider textAlign="left">
        <Box pb={2} pt={2}>
          <Typography variant="h3">{taskListName}</Typography>
        </Box>
        <Box position="absolute" p={2} top={0} right={10} zIndex={10}>
          <Button onClick={handleHelp} size="large">
            <Help fontSize="large" />
          </Button>
        </Box>
      </Divider>
      <TasksList taskListName={taskListName} />
    </Container>
  );
};

export default TasksMain;
