import React, { memo, useEffect } from "react";
import { Check, PartyMode } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogContentText,
  DialogContent,
} from "@mui/material";
import useTimerStore from "../Stores/TimerStore";
import useCurrentUser from "../contexts/UserContext";
// import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import useWindowSize from "../Utils/useWindowSize";

type Props = {
  studyTime: number;
};

const FinishTimer = ({ studyTime }: Props) => {
  const [open, setOpen] = React.useState(false);
  const stopTimer = useTimerStore((state) => state.stopTimer);
  const { user } = useCurrentUser();

  const sufficientTime = studyTime > 30;

  const handleClose = () => {
    setOpen(false);
    stopTimer(user.uid, studyTime);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (sufficientTime) {
      handleOpen();
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
