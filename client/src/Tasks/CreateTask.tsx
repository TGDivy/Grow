import React, { FC } from "react";
import Task from "./Task/Task";
import { task, priority } from "./Types";
import { v4 as uuid_v4 } from "uuid";

interface createTaskFc {
  setTasks: (tasks: any) => void;
  taskListName: string;
}

const CreateTask: FC<createTaskFc> = ({ setTasks, taskListName }) => {
  const createTask: task = {
    taskListName,
    title: "Create Task",
    description: "",
    dueDate: new Date(),
    priority: priority.Medium,
    subTasks: [],
    tags: [],
    completed: false,
  };

  return (
    <Task
      {...createTask}
      taskKey={uuid_v4()}
      setTasks={setTasks}
      createNewTask
    />
  );
};

export default CreateTask;
