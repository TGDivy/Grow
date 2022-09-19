import React from "react";
import propTypes from "prop-types";
import { IconButton, Grid } from "@mui/material";
import Task from "./Task";

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
  tags: ["Tag 1", "Tag 2", "Tag 3"],
};

const tasks_ = [task, task, task];

const ToDo = ({ ToDoList }) => {
  const tasks = tasks_.filter((task) => task.TaskList === ToDoList);
  return (
    <Grid container spacing={2}>
      {tasks.map((task, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
