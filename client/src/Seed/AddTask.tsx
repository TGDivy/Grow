import React, { useEffect, useState } from "react";

import useTimerStore from "../Stores/TimerStore";
import useTaskStore from "../Stores/TaskStore";
import { Button, Container, Grid } from "@mui/material";
import Task from "../Tasks/Task/Task";
import { taskType } from "../Stores/Types";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

const TimerTask = () => {
  const taskKey = useTimerStore((state) => state.taskKey);
  const addTask = useTimerStore((state) => state.addTask);
  const deleteTask = useTimerStore((state) => state.deleteTask);

  const tasks = useTaskStore((state) => state.tasks);

  const [task, setTask] = useState<taskType>();
  useEffect(() => {
    if (taskKey) {
      setTask(tasks[taskKey]);
    }
  }, [taskKey, tasks]);

  // Get tasks by title
  const tasksToAdd = (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        onChange={(event: SelectChangeEvent) => addTask(event.target.value)}
        label="Age"
      >
        {Object.keys(tasks).map((key) => (
          <MenuItem value={key} key={key}>
            {tasks[key].title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <>
      <Grid item xs={12}>
        {task ? <Task {...task} id={taskKey} createNewTask={false} /> : null}
      </Grid>
      <Grid item xs={12}>
        {taskKey ? (
          <Button onClick={deleteTask}>Delete Task</Button>
        ) : (
          tasksToAdd
        )}
      </Grid>
    </>
  );
};

export default TimerTask;
