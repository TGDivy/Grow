import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { Grid } from "@mui/material";
import Task from "./Task/Task";
// import { Masonry } from "@mui/lab";
import { v4 as uuid_v4 } from "uuid";
import { task } from "./Types";

interface tasks {
  [key: string]: task;
}

const createTask: task = {
  taskListName: "Tasks",
  title: "Create Task",
  description: "",
  dueDate: "",
  priority: "Medium",
  subTasks: [],
  tags: [],
  completed: false,
};

const ToDo = ({ ToDoList }) => {
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

  createTask.taskListName = ToDoList;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Task
          {...createTask}
          taskKey={uuid_v4()}
          setTasks={setTasks}
          createNewTask
        />
      </Grid>
      {displayTasks}
    </Grid>
  );
};

ToDo.propTypes = {
  ToDoList: propTypes.string.isRequired,
};

export default ToDo;
