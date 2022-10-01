import React, { memo, FC } from "react";
import Slide from "@mui/material/Slide";
import { Check, Close, PlayArrow, Stop } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import useTimerStore from "../Stores/TimerStore";
import useCurrentUser from "../contexts/UserContext";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  if (!props.in) {
    return <Slide direction="up" in ref={ref} {...props} />;
  }
  return <Slide direction="down" in ref={ref} {...props} />;
});

type Props = {
  studyTime: number;
};

const ConfirmDialog: FC<Props> = ({ studyTime }) => {
  const [open, setOpen] = React.useState(false);
  const active = useTimerStore((state) => state.active);
  const startTimer = useTimerStore((state) => state.startTimer);
  const stopTimer = useTimerStore((state) => state.stopTimer);
  const resetTimer = useTimerStore((state) => state.resetTimer);
  const { user } = useCurrentUser();

  const sufficientTime = studyTime > 60 * 100;

  const handleClose = (end: boolean) => () => {
    if (end) {
      if (sufficientTime) {
        stopTimer(user.uid);
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

export default memo(ConfirmDialog);
