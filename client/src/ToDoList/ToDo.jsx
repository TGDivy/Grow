import React from "react";
import propTypes from "prop-types";
import { Grid } from "@mui/material";
import Task from "./Task";
import CreateTask from "./CreateTask";

const task = {
  TaskList: "Tasks",
  Title: "Task 1",
  Description: "This is a description of the task",
  "Due Date": "2021-10-10",
  Priority: "High",
  subtasks: [
    ["Subtask 1", false],
    ["Subtask 2", false],
    ["Subtask 3", true],
  ],
  tags: ["Engineering", "Research"],
  completed: false,
};

const tasks_ = [task, task, task, task, task, task, task, task, task];

const ToDo = ({ ToDoList }) => {
  const tasks = tasks_.filter((task) => task.TaskList === ToDoList);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4} lg={4} key="create task">
        <CreateTask {...task} />
      </Grid>
      {tasks.map((task, index) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
          <Task {...task} />
        </Grid>
      ))}
    </Grid>
  );
};

ToDo.propTypes = {
  ToDoList: propTypes.string.isRequired,
};

export default ToDo;
