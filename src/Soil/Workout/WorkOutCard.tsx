import React, { FC } from "react";
import { workoutMeasurements, workoutType } from "../../Common/Types/Types";
import {
  Card,
  CardHeader,
  Typography,
  CardActions,
  Button,
  CardContent,
  Grid,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemIcon,
  IconButton,
  Toolbar,
  AppBar,
} from "@mui/material";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import VolumeUp from "@mui/icons-material/VolumeUp";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

import { Close } from "@mui/icons-material";
import Slide from "@mui/material/Slide";
import Transition from "../../Common/Utils/Transitions";

interface Props {
  workout: workoutType;
}

const activityDurationPicker = (
  activityName: string,
  duration: number,
  setActivities: React.Dispatch<React.SetStateAction<workoutType["activities"]>>
) => {
  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDuration = parseInt(event.target.value);
    setActivities((prev) => {
      const newActivities = prev.map((activity) => {
        if (activity.name === activityName) {
          return { ...activity, duration: newDuration };
        } else {
          return activity;
        }
      });
      return newActivities;
    });
  };

  const handleDurationSliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setActivities((prev) => {
      const newActivities = prev.map((activity) => {
        if (activity.name === activityName) {
          return { ...activity, duration: newValue as number };
        } else {
          return activity;
        }
      });
      return newActivities;
    });
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Typography id="input-slider" gutterBottom>
        {activityName}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={duration}
            onChange={handleDurationSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <MuiInput
            value={duration}
            margin="dense"
            onChange={handleDurationChange}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const WorkOutCard: FC<Props> = ({ workout }) => {
  const { name, description, activities: activities_ } = workout;
  const [activities, setActivities] = React.useState(activities_);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Card
        sx={{
          backgroundColor: "primary.main",
        }}
        onClick={handleClickOpen}
      >
        <CardHeader
          title={
            <Typography
              variant="h4"
              sx={{ color: "primary.contrastText", textTransform: "uppercase" }}
            >
              {name}
            </Typography>
          }
        />
        <CardContent>
          <List>
            {activities.map((activity) => {
              return (
                <ListItem
                  key={activity.name}
                  sx={{
                    backgroundColor: "primary.dark",
                    borderRadius: "5px",
                    margin: "5px",
                    padding: "0px 10px",
                    width: "max-content",
                  }}
                >
                  <ListItemText>
                    <Typography
                      variant="body1"
                      sx={{
                        // color: "primary.contrastText",
                        display: "inline-block",
                        textTransform: "capitalize",
                      }}
                    >
                      {activity.name}
                    </Typography>
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
          <Typography variant="body1" sx={{ color: "primary.contrastText" }}>
            {description}
          </Typography>
        </CardContent>
      </Card>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography
              variant="h5"
              sx={{
                ml: 2,
                flex: 1,
                color: "primary.contrastText",
                textTransform: "uppercase",
              }}
            >
              {name}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body1" sx={{ color: "primary.contrastText" }}>
              {description}
            </Typography>
          </DialogContentText>

          <Grid container spacing={2} alignItems="center">
            {activities.map((activity) => {
              if (activity.type === workoutMeasurements.Duration) {
                return activityDurationPicker(
                  activity.name,
                  activity.duration as number,
                  setActivities
                );
              }
            })}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WorkOutCard;
