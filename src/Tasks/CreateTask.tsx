import React, { FC, useState } from "react";
import Task from "./Task/Task";
import { taskType } from "../Common/Types/Types";
import { v4 as uuid_v4 } from "uuid";
import { Dialog, DialogTitle, useMediaQuery, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";
import StyledButton from "../Common/ReusableComponents/StyledButton";
import CreateNewTask from "./Task/CreateNewTask";

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
    title: title || "",
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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <StyledButton
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        fullWidth
        size="small"
        className="tut-task-create"
      >
        <Add />
        {noName ? "" : "Task"}
      </StyledButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        PaperProps={{
          sx: {
            backgroundColor: "background.default",
            backgroundImage: "none",
            color: "surface.contrastText",
            minHeight: "667px",
          },
        }}
        sx={{
          backdropFilter: "blur(10px)",
        }}
        fullWidth
        scroll="paper"
      >
        <CreateNewTask
          {...createTask}
          id={id || uuid_v4()}
          alwaysExpanded
          handleCreateNewTask={handleClose}
          handleExit={handleClose}
        />
      </Dialog>
    </>
  );
};

export default CreateTask;
