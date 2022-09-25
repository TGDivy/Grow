import React, { FC } from "react";
import { Grid } from "@mui/material";
import Task from "./Task/Task";
import CreateTask from "./CreateTask";

import useTaskStore from "../Stores/TaskStore";
import { tasksListType, taskType } from "../Stores/Types";
import _ from "lodash";

interface tasksListFC {
  taskListName: string;
}

const TasksList: FC<tasksListFC> = ({ taskListName }) => {
  let tasks = useTaskStore((state) => state.tasks);
  tasks = _.flow(
    Object.entries,
    (arr) => arr.filter(([, task]) => task.taskListName === taskListName),
    Object.fromEntries
  )(tasks);

  const displayTasks = Object.entries(tasks).map(([id, task]) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
      <Task {...task} id={id} createNewTask={false} />
    </Grid>
  ));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <CreateTask taskListName={taskListName} />
      </Grid>
      {displayTasks}
    </Grid>
  );
};

export default TasksList;
