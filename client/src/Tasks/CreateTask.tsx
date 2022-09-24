import React, { FC } from "react";
import Task from "./Task/Task";
import { taskType, priorityType } from "../Stores/Types";
import { v4 as uuid_v4 } from "uuid";

interface createTaskFc {
  taskListName: string;
}

const CreateTask: FC<createTaskFc> = ({ taskListName }) => {
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

  return <Task {...createTask} taskKey={uuid_v4()} createNewTask />;
};

export default CreateTask;
