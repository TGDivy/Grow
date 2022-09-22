import React, { useState, useEffect, FC } from "react";
import propTypes from "prop-types";
import { Grid } from "@mui/material";
import Task from "./Task/Task";
// import { Masonry } from "@mui/lab";
import { v4 as uuid_v4 } from "uuid";
import { task } from "./Types";
import CreateTask from "./CreateTask";

interface tasks {
  [key: string]: task;
}

interface tasksListFC {
  taskListName: string;
}

const TasksList: FC<tasksListFC> = ({ taskListName }) => {
  const [tasks, setTasks] = useState<tasks>({});

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const displayTasks = Object.entries(tasks).map(([taskKey, task_]) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={taskKey}>
      <Task
        {...task_}
        taskKey={taskKey}
        setTasks={setTasks}
        createNewTask={false}
      />
    </Grid>
  ));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <CreateTask setTasks={setTasks} taskListName={taskListName} />
      </Grid>
      {displayTasks}
    </Grid>
  );
};

export default TasksList;
