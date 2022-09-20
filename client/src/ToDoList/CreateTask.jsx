import React, { forwardRef, useState } from "react";
import propTypes from "prop-types";
import { Card, CardHeader, Skeleton } from "@mui/material";
import { IconButton } from "@mui/material";
import { CardContent, Typography } from "@mui/material";
import { Favorite, Add } from "@mui/icons-material";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TaskSkeletonButton = ({ onClick }) => {
  return (
    <Card height="100%">
      <CardHeader
        title={<Typography variant="h5">Create Task</Typography>}
        action={
          <IconButton onClick={onClick} aria-label="settings">
            <Add />
          </IconButton>
        }
      />
      <CardContent>
        <Skeleton animation={false} disable>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          </Typography>
          <IconButton aria-label="add to favorites">
            <Favorite />
            <Favorite />
            <Favorite />
          </IconButton>
        </Skeleton>
      </CardContent>
    </Card>
  );
};

TaskSkeletonButton.propTypes = {
  onClick: propTypes.func.isRequired,
};

export const CreateTask = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <TaskSkeletonButton onClick={handleClickOpen} />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Disagree</Button>
          <Button onClick={() => setOpen(false)}>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

CreateTask.propTypes = {};

export default CreateTask;
