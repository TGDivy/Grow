import React from "react";
import {
  activityType,
  workoutType,
  workoutMeasurements,
} from "../../Common/Types/Types";
import { Card, CardHeader, CardActions, Button } from "@mui/material";

import useWorkoutStore from "../../Common/Stores/WorkoutStore";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const CreateWorkout = () => {
  // Create workout card
  // When clicked, open dialog
  // Dialog has text field for name of workout
  // Dialog has text field for description of workout
  // Dialog has list of exercises
  // Dialog has button to add exercise
  // An exercise has a name, and measurements
  // A measurement has a name, and a unit
  // measurements can be selected from a list of measurements
  // Dialog has button to save workout

  const addWorkout = useWorkoutStore((state) => state.addWorkout);

  const [open, setOpen] = React.useState(false);
  const [workout, setWorkout] = React.useState<workoutType>({
    name: "",
    description: "",
    activities: [],
    date: new Date(),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    addWorkout(workout);
    setOpen(false);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkout({ ...workout, name: event.target.value });
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWorkout({ ...workout, description: event.target.value });
  };

  // list of activities

  const [activity, setActivity] = React.useState<activityType>({
    name: "",
    date: new Date(),
    type: workoutMeasurements["Sets and Reps"],
  });

  const handleActivityNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setActivity({ ...activity, name: event.target.value });
  };

  // list of measurements
  const measurementTypes = Object.keys(workoutMeasurements).filter(
    (key) =>
      typeof workoutMeasurements[key as keyof typeof workoutMeasurements] ===
      "number"
  );

  const handleAddActivity = () => {
    setWorkout({ ...workout, activities: [...workout.activities, activity] });
  };

  return (
    <div>
      <Card>
        <CardHeader title="Create Workout" />
        <CardActions>
          <Button onClick={handleClickOpen}>Create</Button>
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Workout</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={workout.name}
            onChange={handleNameChange}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={workout.description}
            onChange={handleDescriptionChange}
          />
          <List>
            {workout.activities.map((activity) => (
              <ListItem key={activity.name}>
                <ListItemText primary={activity.name} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <TextField
            margin="dense"
            id="activityName"
            label="Activity Name"
            type="text"
            fullWidth
            value={activity.name}
            onChange={handleActivityNameChange}
          />
          <FormControl fullWidth>
            <InputLabel id="measurement">Measurement</InputLabel>
            <Select
              labelId="measurement"
              id="measurement"
              value={activity.type}
              label="Measurement"
              onChange={(event) =>
                setActivity({
                  ...activity,
                  type: event.target.value as workoutMeasurements,
                })
              }
            >
              {measurementTypes.map((measurement) => (
                <MenuItem key={measurement} value={measurement}>
                  {measurement}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={handleAddActivity}>Add Activity</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateWorkout;
