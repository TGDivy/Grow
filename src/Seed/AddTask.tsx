import React, { useEffect, useState } from "react";

import useTimerStore from "../Common/Stores/TimerStore";
import useTaskStore from "../Common/Stores/TaskStore";
import { Button, Box, Card } from "@mui/material";
import Task from "../Tasks/Task/Task";
import { taskType } from "../Common/Types/Types";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import _ from "lodash";
import CreateTask from "../Tasks/CreateTask";

const TimerTask = () => {
  const active = useTimerStore((state) => state.active);
  const taskKey = useTimerStore((state) => state.taskKey);
  const addTask = useTimerStore((state) => state.addTask);
  const deleteTask = useTimerStore((state) => state.deleteTask);

  const tasks = useTaskStore((state) => state.tasks);
  const completedTasks = _.flow(
    Object.entries,
    (arr) => arr.filter(([, task]) => task.completed === false),
    Object.fromEntries
  )(tasks);

  const [task, setTask] = useState<taskType | null>(null);
  useEffect(() => {
    if (taskKey) {
      setTask(tasks[taskKey]);
    } else {
      setTask(null);
    }
  }, [taskKey, tasks]);

  // Get tasks by title
  const tasksToAdd = (
    <Card
      sx={{
        ":hover": {
          boxShadow: 20,
        },
        backgroundColor: "#00000088",
        color: "primary.main",
        width: "800px",
        maxWidth: "100%",
        minHeight: "200px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel color="primary">Select Task</InputLabel>
        <Select
          onChange={(event: SelectChangeEvent) => addTask(event.target.value)}
          defaultValue=""
        >
          {Object.keys(completedTasks).map((key) => (
            <MenuItem value={key} key={key}>
              {tasks[key].title}
            </MenuItem>
          ))}
          {Object.keys(completedTasks).length === 0 && (
            <MenuItem value="" disabled>
              No tasks to add
            </MenuItem>
          )}
        </Select>
        <CreateTask taskListName={"Tasks"} />
      </FormControl>
    </Card>
  );

  const TaskOrAdd = () => {
    if (task) {
      return (
        <>
          <Task {...task} id={taskKey} createNewTask={false} alwaysExpanded />

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {taskKey && !active && (
              <Button onClick={deleteTask} variant="contained">
                Remove Task
              </Button>
            )}
          </Box>
        </>
      );
    } else {
      return <>{tasksToAdd}</>;
    }
  };

  return <>{TaskOrAdd()}</>;
};

export default TimerTask;
