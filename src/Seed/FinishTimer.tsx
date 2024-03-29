import React, { memo, useEffect } from "react";
import { Check } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogContentText,
  DialogContent,
} from "@mui/material";
import useTimerStore from "../Common/Stores/TimerStore";
import Confetti from "react-confetti";
import useWindowSize from "../Common/useWindowSize";
import useTaskStore from "../Common/Stores/TaskStore";

type Props = {
  studyTime: number;
  maxDuration: number;
};

const FinishTimer = ({ studyTime, maxDuration }: Props) => {
  const [open, setOpen] = React.useState(false);
  const stopTimer = useTimerStore((state) => state.stopTimer);
  const active = useTimerStore((state) => state.active);
  const updateTimeSpent = useTaskStore((state) => state.updateTimeSpent);
  const taskKey = useTimerStore((state) => state.taskKey);

  const sufficientTime = studyTime >= maxDuration;

  const handleClose = () => {
    setOpen(false);
    stopTimer(studyTime);
    updateTimeSpent(taskKey, studyTime);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (sufficientTime && active) {
      handleOpen();
    } else {
      setOpen(false);
    }
  }, [sufficientTime]);

  const { width, height } = useWindowSize();

  return (
    <>
      {open && <Confetti width={width} height={height} />}
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        PaperProps={{
          sx: { position: "fixed" },
        }}
        sx={{
          backdropFilter: "blur(2px)",
        }}
      >
        <DialogTitle>Congratulations!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have completed your work session. You can now take a break or
            start another session!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            <Check />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default memo(FinishTimer);
