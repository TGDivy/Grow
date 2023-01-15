import React, { FC, useEffect, useState } from "react";
import Task from "./Task/Task";
import { taskType } from "../Common/Types/Types";
import { v4 as uuid_v4 } from "uuid";
import Transition from "../Common/Utils/Transitions";
import { Dialog, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useTour } from "@reactour/tour";
import { createTaskSteps } from "../steps";

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

  const { setIsOpen, isOpen, setSteps, setCurrentStep, steps } = useTour();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    if (isOpen) {
      setSteps(createTaskSteps);
      setCurrentStep(0);
      setIsOpen(true);
    }
  };

  // useEffect(() => {
  //   if (steps === createTaskSteps.length - 1 && showPrevNextButtons !) {
  //     showPrevNextButtons(false);
  //   }
  // }, [isOpen, steps]);

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
        className="tut-task-create"
      >
        <Add />
        {noName ? "" : "Task"}
      </Button>
      <Dialog
        open={open}
        // TransitionComponent={Transition}
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
        <span className="tut-task-overview">
          <Task
            {...createTask}
            id={id || uuid_v4()}
            createNewTask
            alwaysExpanded
            handleCreateNewTask={handleClose}
          />
        </span>
      </Dialog>
    </>
  );
};

export default CreateTask;
