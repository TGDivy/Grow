import React, { FC, useState } from "react";
import Task from "./Task/Task";
import { taskType } from "../Common/Types/Types";
import { v4 as uuid_v4 } from "uuid";
import { Dialog } from "@mui/material";
import { Add } from "@mui/icons-material";
import StyledButton from "../Common/ReusableComponents/StyledButton";

interface createTaskFc {
  taskListName: string;
  id?: string;
  description?: string;
  title?: string;
  noName?: boolean;
  sticker?: string;
}

const CreateTask: FC<createTaskFc> = ({
  taskListName,
  id,
  description,
  title,
  sticker,
  noName = false,
}) => {
  const createTask: taskType = {
    taskListName,
    title: title || "Create task",
    description: description || "",
    dateUpdated: new Date(),
    priority: false,
    subTasks: [],
    tags: [],
    completed: false,
    timeSpent: 0,
    sticker: sticker || "",
    dueDate: null,
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <StyledButton
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        fullWidth
        className="tut-task-create"
      >
        <Add />
        {noName ? "" : "Task"}
      </StyledButton>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        PaperProps={{
          sx: { position: "fixed", backgroundColor: "transparent" },
        }}
        sx={{
          backdropFilter: "blur(10px)",
        }}
        fullWidth
      >
        <Task
          {...createTask}
          id={id || uuid_v4()}
          createNewTask
          alwaysExpanded
          handleCreateNewTask={handleClose}
        />
      </Dialog>
    </>
  );
};

export default CreateTask;
