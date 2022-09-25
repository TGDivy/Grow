import React, { useEffect, useState } from "react";

import useTimerStore from "../Stores/TimerStore";
import useTaskStore from "../Stores/TaskStore";
import { Button, Container, Grid } from "@mui/material";
import Task from "../Tasks/Task/Task";
import { taskType } from "../Stores/Types";

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
  return <div>AddTask</div>;
};

export default TimerTask;
