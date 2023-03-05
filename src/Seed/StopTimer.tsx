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
import { MIN_STOPWATCH_DURATION } from "../Common/constants";
import useTaskStore from "../Common/Stores/TaskStore";
import Transition from "../Common/ReusableComponents/Transitions";
import useUserStore from "../Common/Stores/User";
import { getFirebaseToken } from "../Common/Firestore/firebase-config";

type Props = {
  studyTime: number;
  color: string;
};

const requestPermission = (getPushToken: (pushToken: string) => void) => {
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    console.log("Notification permission granted");
  } else if (Notification.permission !== "denied") {
    console.log("Permission Denied, Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        getFirebaseToken(getPushToken);
      } else {
        console.log("Unable to get permission to notify.");
      }
    });
  }
};

const StopTimer: FC<Props> = ({ studyTime, color }) => {
  const [open, setOpen] = React.useState(false);
  const active = useTimerStore((state) => state.active);
  const startTimer = useTimerStore((state) => state.startTimer);
  const stopTimer = useTimerStore((state) => state.stopTimer);
  const resetTimer = useTimerStore((state) => state.resetTimer);

  const updateTimeSpent = useTaskStore((state) => state.updateTimeSpent);
  const taskKey = useTimerStore((state) => state.taskKey);

  const sufficientTime = studyTime > MIN_STOPWATCH_DURATION;

  const addDevice = useUserStore((state) => state.addDevice);
  const getPushToken = (pushToken: string) => {
    const device = {
      pushToken: pushToken,
      device: navigator.userAgent,
    };
    addDevice(device);
  };

  const handleClose = (end: boolean) => () => {
    if (end) {
      if (sufficientTime) {
        stopTimer(studyTime);
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
        <Button
          onClick={() => {
            setOpen(true);
            requestPermission(getPushToken);
          }}
          size="large"
          sx={{ color: color }}
        >
          <Stop fontSize="large" />
        </Button>
      );
    }
    return (
      <Button onClick={() => startTimer()} size="large" sx={{ color: color }}>
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
