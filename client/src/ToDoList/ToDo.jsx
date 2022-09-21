import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { Grid } from "@mui/material";
import Task from "./Task";
import CreateTask from "./CreateTask";
import { Masonry } from "@mui/lab";

const task = {
  taskList: "Tasks",
  title: "Task 1",
  description: "This is a description of the task.",
  "Due Date": "2021-10-10",
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
  const [tasks, setTasks] = useState([task, task, task, task, task, task]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <CreateTask />
      </Grid>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Task {...task} task={task} index={index} setTasks={setTasks} />
          </Grid>
        ))
      ) : (
        <h1>There are no tasks in this list.</h1>
      )}
    </Grid>
  );
  //   <Masonry
  //     columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
  //     spacing={2}
  //     sx={{ width: "100%" }}
  //   >
  //     <CreateTask {...task} />
  //     {tasks.map((task, index) => (
  //       <Task {...task} key={index} index={index} setTasks={setTasks} />
  //     ))}
  //   </Masonry>
  // );
};

ToDo.propTypes = {
  ToDoList: propTypes.string.isRequired,
};

export default ToDo;
