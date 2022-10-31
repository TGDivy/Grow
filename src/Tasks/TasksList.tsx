import React, { FC } from "react";
import { Box, Grid, Grow, Stack, Zoom } from "@mui/material";
import Task from "./Task/Task";
import CreateTask from "./CreateTask";

import useTaskStore from "../Common/Stores/TaskStore";
import _ from "lodash";

import { db } from "../Common/Firestore/firebase-config";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

interface tasksListFC {
  taskListName: string;
}

const TasksList: FC<tasksListFC> = ({ taskListName }) => {
  const tasks = useTaskStore((state) => state.tasks);
  const [tasksArray, completedArray] = _.flow(
    Object.entries,
    (arr) => arr.filter(([, task]) => task.taskListName === taskListName),
    (arr) => arr.reverse(),
    (arr) => _.partition(arr, ([, task]) => !task.completed)
    // (arr) => _.partition(arr, ([, task]) => task.completed)
  )(tasks);

  const displayTasks = tasksArray.map(([id, task], index) => (
    <Grid item xs={12} sm={6} md={4} lg={4} key={id}>
      <Grow
        in={true}
        // timeout={1000}
        style={{ transformOrigin: "0 0 0" }}
        {...{ timeout: 800 + index * 150 }}
        // timeout={400}
        // style={{ transitionDelay: `${index * 200}ms` }}
      >
        <Box>
          <Task {...task} id={id} createNewTask={false} startTimerButton />
        </Box>
      </Grow>
    </Grid>
  ));

  const completedTasks = completedArray.map(([id, task]) => (
    <Grid item xs={12} sm={6} md={4} lg={4} key={id}>
      <Task {...task} id={id} createNewTask={false} startTimerButton />
    </Grid>
  ));

  return (
    <Stack direction="column" spacing={3}>
      <CreateTask taskListName={taskListName} />
      <Box
        sx={{
          p: 2,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      >
        <Grid container spacing={2}>
          {displayTasks}
        </Grid>
      </Box>
      {completedTasks.length > 0 && (
        <Accordion
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">Completed</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {completedTasks}
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}
    </Stack>
  );
};

export default TasksList;
