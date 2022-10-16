import React from "react";
import { workoutType } from "../../Common/Types/Types";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import useWorkoutStore from "../../Common/Stores/WorkoutStore";

const CreateWorkout = () => {
  const [open, setOpen] = React.useState(false);
  const [workoutName, setWorkoutName] = React.useState("");

  const addWorkout = useWorkoutStore((state) => state.addWorkout);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);

    const workout: workoutType = {
      name: workoutName,
      activities: [],
      date: new Date(),
    };

    addWorkout(workout);
  };

  const handleWorkoutNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWorkoutName(event.target.value);
  };

  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <Typography variant="h5">Create Workout</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={handleClickOpen}>
            Create
          </Button>
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Workout</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Workout Name"
            type="text"
            fullWidth
            value={workoutName}
            onChange={handleWorkoutNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateWorkout;
