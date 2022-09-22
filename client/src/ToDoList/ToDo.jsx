import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { Grid } from "@mui/material";
import Task from "./Task/Task";
import CreateTask from "./CreateTask";
import { Masonry } from "@mui/lab";
import { v4 as uuid_v4 } from "uuid";

const task = {
  taskList: "Tasks",
  title: "Task 1",
  description: "This is a description of the task.",
  due_date: "2021-10-10",
  priority: "High",
  subtasks: [
    ["Subtask 1", false],
    ["Subtask 2", false],
    ["Subtask 3", true],
  ],
  tags: ["Engineering", "Research"],
  completed: false,
};

const createTask = {
  taskList: "Tasks",
  title: "Create Task",
  description: "",
  due_date: "",
  priority: "Medium",
  subtasks: [],
  tags: [],
  completed: false,
};

const ToDo = ({ ToDoList }) => {
  const [tasks, setTasks] = useState({
    taskKey1: task,
    taskKey2: task,
    taskKey3: task,
  });

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

  createTask.taskList = ToDoList;

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
