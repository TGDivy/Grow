import React, { useEffect, useState } from "react";

import useTimerStore from "../Stores/TimerStore";
import useTaskStore from "../Stores/TaskStore";
import { Button, Box, Grid } from "@mui/material";
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
  const active = useTimerStore((state) => state.active);
  const taskKey = useTimerStore((state) => state.taskKey);
  const addTask = useTimerStore((state) => state.addTask);
  const deleteTask = useTimerStore((state) => state.deleteTask);

  const tasks = useTaskStore((state) => state.tasks);

  const [task, setTask] = useState<taskType>();
  useEffect(() => {
    if (taskKey) {
      setTask(tasks[taskKey]);
    } else {
      setTask(undefined);
    }
  }, [taskKey, tasks]);

  // Get tasks by title
  const tasksToAdd = (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">
        Select Task
      </InputLabel>
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
    <React.Fragment>
      <Grid item xs={3}>
        {task ? (
          <Task {...task} id={taskKey} createNewTask={false} alwaysExpanded />
        ) : null}
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          {taskKey && !active && (
            <Button onClick={deleteTask}>Remove Task</Button>
          )}
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {!taskKey && tasksToAdd}
        </Box>
      </Grid>
    </React.Fragment>
  );
};

export default TimerTask;
