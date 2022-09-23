import React, { FC } from "react";
import Task from "./Task/Task";
import { taskType, priorityType, tasksListType } from "./Types";
import { v4 as uuid_v4 } from "uuid";

interface createTaskFc {
  setTasks: (tasks: tasksListType) => void;
  taskListName: string;
}

const CreateTask: FC<createTaskFc> = ({ setTasks, taskListName }) => {
  const createTask: taskType = {
    taskListName,
    title: "Create Task",
    description: "",
    dueDate: new Date(),
    priority: priorityType.Medium,
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
