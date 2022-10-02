import React, { memo, FC } from "react";
import { Check, Close, PlayArrow, Stop } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import useTimerStore from "../Common/Stores/TimerStore";
import useCurrentUser from "../Common/Contexts/UserContext";
import { MIN_STOPWATCH_DURATION } from "../Common/constants";
import useTaskStore from "../Common/Stores/TaskStore";
import Transition from "../Common/Utils/Transitions";

type Props = {
  studyTime: number;
};

const StopTimer: FC<Props> = ({ studyTime }) => {
  const [open, setOpen] = React.useState(false);
  const active = useTimerStore((state) => state.active);
  const startTimer = useTimerStore((state) => state.startTimer);
  const stopTimer = useTimerStore((state) => state.stopTimer);
  const resetTimer = useTimerStore((state) => state.resetTimer);
  const { user } = useCurrentUser();

  const updateTimeSpent = useTaskStore((state) => state.updateTimeSpent);
  const taskKey = useTimerStore((state) => state.taskKey);

  const sufficientTime = studyTime > MIN_STOPWATCH_DURATION;

  const handleClose = (end: boolean) => () => {
    if (end) {
      if (sufficientTime) {
        stopTimer(user.uid, studyTime);
        updateTimeSpent(taskKey, studyTime);
      } else {
        resetTimer();
      }
    }
    setOpen(false);
  };

  const StartStopFailButton = () => {
    if (active) {
      return (
        <Button onClick={() => setOpen(true)} size="large">
          <Stop fontSize="large" />
        </Button>
      );
    }
    return (
      <Button onClick={startTimer} size="large">
        <PlayArrow fontSize="large" />
      </Button>
    );
  };

  return (
    <>
      <StartStopFailButton />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose(false)}
        PaperProps={{
          sx: { position: "fixed", top: "20%" },
        }}
        sx={{
          backdropFilter: "blur(5px)",
        }}
      >
        <DialogTitle>
          {sufficientTime
            ? "Are You Sure To Stop Now ?"
            : "Are You Sure To Give Up ?"}
        </DialogTitle>
        {!sufficientTime && (
          <DialogContent>
            <DialogContentText>
              {
                "On StopWatch Mode, if you stop within 10 minutes, your work won't be recorded."
              }
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose(false)} variant="contained">
            <Close />
          </Button>
          <Button onClick={handleClose(true)} variant="contained">
            <Check />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default memo(StopTimer);