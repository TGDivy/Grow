import React from "react";
import useTaskStore from "../../Common/Stores/TaskStore";
import { createTaskEvent } from "../../Common/GAPI/Calendar";
import {
  Button,
  Dialog,
  IconButton,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";

type Props = {
  taskId: string;
};

const CreateEvent = ({ taskId }: Props) => {
  const tasks = useTaskStore((state) => state.tasks);
  const task = taskId ? tasks[taskId] : null;
  const dueDate = task?.dueDate;

  // if no due date, ask the user to set one pop up a dialog to set a due date
  const [open, setOpen] = React.useState(false);

  const handleCreateEvent = () => {
    if (dueDate && task) {
      createTaskEvent(taskId, task);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <Button onClick={handleCreateEvent}>
        <Add />
      </Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h6">
              Please set a due date for this task in order to create a google
              calendar event.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateEvent;
