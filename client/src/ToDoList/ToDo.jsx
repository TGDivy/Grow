import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { Grid } from "@mui/material";
import Task from "./Task/Task";
import CreateTask from "./CreateTask";
import { Masonry } from "@mui/lab";

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

const ToDo = ({ ToDoList }) => {
  const [tasks, setTasks] = useState({
    taskKey1: task,
    taskKey2: task,
    taskKey3: task,
  });

  // Filter tasks by completed status
  // const [completedTasks, setCompletedTasks] = useState([]);
  // const [incompleteTasks, setIncompleteTasks] = useState([]);
  // useEffect(() => {
  //   const filteredTasks = tasks.filter((task) => !task.completed);
  //   setCompletedTasks(filteredTasks);

  //   const filteredIncompleteTasks = tasks.filter((task) => task.completed);
  //   setIncompleteTasks(filteredIncompleteTasks);
  // }, [tasks]);
  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const displayTasks = Object.entries(tasks).map(([taskKey, task_]) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={taskKey}>
      <Task {...task_} taskKey={taskKey} setTasks={setTasks} />
    </Grid>
  ));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <CreateTask />
      </Grid>
      {displayTasks}
    </Grid>
  );
};

ToDo.propTypes = {
  ToDoList: propTypes.string.isRequired,
};

export default ToDo;
