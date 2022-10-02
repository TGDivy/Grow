import React, { FC, useState } from "react";
import Task from "./Task/Task";
import { taskType } from "../Common/Types/Types";
import { v4 as uuid_v4 } from "uuid";
import Box from "@mui/material/Box";
import Transition from "../Common/Utils/Transitions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Add } from "@mui/icons-material";

interface createTaskFc {
  taskListName: string;
}

const CreateTask: FC<createTaskFc> = ({ taskListName }) => {
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
          // width: "100px",
          borderColor: "primary.main",
          // border: "1px solid #ac9172",
        }}
      >
        <Button
          variant="contained"
          // fullWidth
          sx={{
            alignSelf: "center",
          }}
          onClick={handleClickOpen}
        >
          <Add /> Create Task
        </Button>
      </Box>
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
          id={uuid_v4()}
          createNewTask
          alwaysExpanded
          handleCreateNewTask={handleClose}
        />
      </Dialog>
    </>
  );
};

export default CreateTask;
