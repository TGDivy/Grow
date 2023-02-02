import React, { ChangeEvent, FC, useEffect } from "react";
import {
  activityType,
  setRepType,
  workoutMeasurements,
  workoutType,
} from "../../Common/Types/Types";
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
  styled,
  Chip,
  Stack,
} from "@mui/material";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

import { Close, Add, Remove, Delete } from "@mui/icons-material";
import Transition from "../../Common/ReusableComponents/Transitions";
import { Box } from "@mui/system";

interface Props {
  workout: workoutType;
}

const secondsToTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const secs = seconds - hours * 3600 - minutes * 60;

  const hoursString = hours > 0 ? hours + "H " : "";
  const minutesString = minutes > 0 ? minutes + "M " : "";
  const secondsString = secs > 0 ? secs + "S" : "";

  return hoursString + minutesString + secondsString;
};

import useActivityStore from "../../Common/Stores/ActivityStore";
import useWorkoutStore from "../../Common/Stores/WorkoutStore";
const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});
// eslint-disable-next-line @typescript-eslint/ban-types
const durationPicker = (duration: number, setDuration: Function) => {
  const [seconds, setSeconds] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [hours, setHours] = React.useState(0);

  const handleSliderChangeSeconds = (
    event: Event,
    newValue: number | number[]
  ) => {
    setSeconds(newValue as number);
  };

  const handleSliderChangeMinutes = (
    event: Event,
    newValue: number | number[]
  ) => {
    setMinutes(newValue as number);
  };

  const handleSliderChangeHours = (
    event: Event,
    newValue: number | number[]
  ) => {
    setHours(newValue as number);
  };

  useEffect(() => {
    setDuration(seconds + minutes * 60 + hours * 3600);
  }, [seconds, minutes, hours]);

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={5}>
        <Slider
          value={seconds}
          size="small"
          marks
          onChange={handleSliderChangeSeconds}
          min={0}
          max={50}
          step={10}
          sx={{
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${"rgb(255 255 255 / 16%)"}`,
              },
              "&.Mui-active": {
                width: 16,
                height: 16,
              },
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: -2,
          }}
        >
          <TinyText>Seconds</TinyText>
          <TinyText>{seconds} S</TinyText>
        </Box>
      </Grid>

      <Grid item xs={5}>
        <Slider
          value={hours}
          size="small"
          marks
          onChange={handleSliderChangeHours}
          min={0}
          max={8}
          step={1}
          sx={{
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${"rgb(255 255 255 / 16%)"}`,
              },
              "&.Mui-active": {
                width: 16,
                height: 16,
              },
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: -2,
          }}
        >
          <TinyText>Hours</TinyText>
          <TinyText>{hours} H</TinyText>
        </Box>
      </Grid>
      <Grid
        item
        xs={10}
        sx={{
          mt: -3,
        }}
      >
        <Slider
          value={minutes}
          size="small"
          marks
          onChange={handleSliderChangeMinutes}
          min={0}
          max={60}
          step={1}
          sx={{
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${"rgb(255 255 255 / 16%)"}`,
              },
              "&.Mui-active": {
                width: 16,
                height: 16,
              },
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: -2,
          }}
        >
          <TinyText>Minutes</TinyText>
          <TinyText>{minutes} M</TinyText>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography id="Duration-SS-MM-HH" gutterBottom>
          Duration: {secondsToTime(duration)}
        </Typography>
      </Grid>
    </Grid>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-types
const setRepPicker = (setRep: Array<setRepType>, setSetRep: Function) => {
  const addNewSet = () => {
    let reps = 8;
    let weight = 24;
    if (setRep.length > 0) {
      reps = setRep[setRep.length - 1].reps;
      weight = setRep[setRep.length - 1].weight;
    }
    setSetRep([...setRep, { reps: reps, weight: weight }]);
  };

  const removeSet = (index: number) => {
    setSetRep(setRep.filter((set, i) => i !== index));
  };

  const handleSliderChange = (
    event: Event,
    newValue: number | number[],
    index: number,
    type: string
  ) => {
    const copy = [...setRep];
    copy[index] = { ...copy[index], [type]: newValue };
    setSetRep([...copy]);
  };

  return (
    <List>
      {setRep.map((set, index) => {
        return (
          <div key={index}>
            <Divider
              textAlign="left"
              sx={{
                margin: "0px 0px 0px 0px",
                padding: "0px 0px 0px 0px",
              }}
            >
              <Chip
                label={`Set ${index + 1}`}
                size="small"
                variant="outlined"
                onDelete={() => removeSet(index)}
                sx={{
                  margin: "0px 0px 0px 0px",
                  padding: "0px 0px 0px 0px",
                }}
              />
            </Divider>
            <ListItem
              sx={{
                width: "100%",
                padding: "0px",
              }}
            >
              <ListItemText>
                <Grid container spacing={0} justifyContent="space-around">
                  <Grid item xs={3}>
                    <Slider
                      value={typeof set.reps === "number" ? set.reps : 0}
                      size="small"
                      marks
                      onChange={(event, newValue) =>
                        handleSliderChange(event, newValue, index, "reps")
                      }
                      min={4}
                      max={12}
                      step={1}
                      sx={{
                        "& .MuiSlider-thumb": {
                          width: 8,
                          height: 8,
                          transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                          "&:before": {
                            boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                          },
                          "&:hover, &.Mui-focusVisible": {
                            boxShadow: `0px 0px 0px 8px ${"rgb(255 255 255 / 16%)"}`,
                          },
                          "&.Mui-active": {
                            width: 16,
                            height: 16,
                          },
                        },
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: -2,
                      }}
                    >
                      <TinyText>Reps</TinyText>
                      <TinyText>{set.reps}</TinyText>
                    </Box>
                  </Grid>
                  <Grid item xs={7}>
                    <Slider
                      size="small"
                      value={typeof set.weight === "number" ? set.weight : 0}
                      onChange={(event, newValue) =>
                        handleSliderChange(event, newValue, index, "weight")
                      }
                      min={10}
                      max={60}
                      step={1}
                      sx={{
                        "& .MuiSlider-thumb": {
                          width: 8,
                          height: 8,
                          transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                          "&:before": {
                            boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                          },
                          "&:hover, &.Mui-focusVisible": {
                            boxShadow: `0px 0px 0px 8px ${"rgb(255 255 255 / 16%)"}`,
                          },
                          "&.Mui-active": {
                            width: 16,
                            height: 16,
                          },
                        },
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: -2,
                      }}
                    >
                      <TinyText>Weight</TinyText>
                      <TinyText>{set.weight} KG</TinyText>
                    </Box>
                  </Grid>
                </Grid>
              </ListItemText>
            </ListItem>
          </div>
        );
      })}
      <Divider />
      <ListItem>
        <ListItemText>
          <Button
            onClick={addNewSet}
            fullWidth
            variant="contained"
            size="small"
          >
            Add Set
            <Add />
          </Button>
        </ListItemText>
      </ListItem>
    </List>
  );
};

interface ActivityCardProps {
  activity: activityType;
  submitWorkout: boolean;
}

const ActivityCard: FC<ActivityCardProps> = ({
  activity: activity_,
  submitWorkout,
}) => {
  const [activity, setActivity] = React.useState<activityType>(activity_);
  const addActivity = useActivityStore((state) => state.addActivity);

  useEffect(() => {
    if (submitWorkout) {
      addActivity(activity);
    }
  }, [submitWorkout]);

  const setDuration = (duration: number) => {
    setActivity({ ...activity, duration });
  };

  const setSetRep = (setRep: Array<setRepType>) => {
    setActivity({ ...activity, sets: setRep });
  };

  return (
    <Card
      sx={{
        width: "100%",
      }}
    >
      <CardHeader title={activity.name} />
      <CardContent>
        {activity?.duration !== undefined &&
          durationPicker(activity.duration, setDuration)}
        {activity?.sets !== undefined && setRepPicker(activity.sets, setSetRep)}
      </CardContent>
    </Card>
  );
};

const WorkOutCard: FC<Props> = ({ workout }) => {
  const { name, description, activities } = workout;
  const deleteWorkout = useWorkoutStore((state) => state.deleteWorkout);

  const [open, setOpen] = React.useState(false);
  const [submit, setSubmit] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    setSubmit(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const submitWorkout = () => {
    setSubmit(true);
    setOpen(false);
  };
  const handleDelete = () => {
    deleteWorkout(workout);
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
        fullWidth
        sx={{
          backdropFilter: "blur(10px)",
        }}
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
            <IconButton color="inherit" onClick={handleDelete}>
              <Delete />
            </IconButton>

            <IconButton
              // edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent
          sx={{
            backgroundColor: "background.default",
          }}
        >
          <Typography variant="body1" sx={{ color: "primary.contrastText" }}>
            {description}
          </Typography>
          <Grid container alignItems="center" justifyContent="center">
            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{
                width: "100%",
                maxWidth: 600,
              }}
            >
              {activities.map((activity) => {
                return (
                  <ActivityCard
                    activity={activity}
                    submitWorkout={submit}
                    key={activity.name}
                  />
                );
              })}

              <Button variant="contained" onClick={submitWorkout} fullWidth>
                Submit
              </Button>
            </Stack>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WorkOutCard;
