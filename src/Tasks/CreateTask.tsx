import React, { FC, useState } from "react";
import Task from "./Task/Task";
import { taskType } from "../Common/Types/Types";
import { v4 as uuid_v4 } from "uuid";
import Transition from "../Common/Utils/Transitions";
import { Dialog, Button } from "@mui/material";
import { Add } from "@mui/icons-material";

interface createTaskFc {
  taskListName: string;
  id?: string;
}

const CreateTask: FC<createTaskFc> = ({ taskListName, id }) => {
  const createTask: taskType = {
    taskListName,
    title: "Create Task",
    description: "",
    dateUpdated: new Date(),
    priority: false,
    subTasks: [],
    tags: [],
    completed: false,
    timeSpent: 0,
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
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
        fullWidth
      >
        <Add />
        Task
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        PaperProps={{
          sx: { position: "fixed", backgroundColor: "transparent" },
        }}
        sx={{
          backdropFilter: "blur(10px)",
        }}
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
