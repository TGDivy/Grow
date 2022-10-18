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

import { Close, Add, Remove } from "@mui/icons-material";
import Transition from "../../Common/Utils/Transitions";
import { Box } from "@mui/system";

interface Props {
  workout: workoutType;
}

import useActivityStore from "../../Common/Stores/ActivityStore";

// eslint-disable-next-line @typescript-eslint/ban-types
const durationPicker = (duration: number, setDuration: Function) => {
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setDuration(newValue);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDuration(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (duration < 0) {
      setDuration(0);
    } else if (duration > 100) {
      setDuration(100);
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs>
        <Slider
          value={typeof duration === "number" ? duration : 0}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
          min={0}
          max={100}
        />
      </Grid>
      <Grid item>
        <MuiInput
          value={duration}
          margin="dense"
          onChange={handleInputChange}
          onBlur={handleBlur}
          inputProps={{
            step: 10,
            min: 0,
            max: 100,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
      </Grid>
    </Grid>
  );
};

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

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
    <Card>
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
        <DialogContent
          sx={{
            backgroundColor: "background.default",
          }}
        >
          <Typography variant="body1" sx={{ color: "primary.contrastText" }}>
            {description}
          </Typography>
          <Grid container alignItems="center" justifyContent="center">
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
              xs={12}
              sm={10}
              md={8}
              lg={6}
              xl={4}
            >
              {activities.map((activity) => {
                return (
                  <Grid
                    item
                    xs={12}
                    // sm={10}
                    // md={8}
                    // lg={6}
                    // xl={4}
                    key={activity.name}
                  >
                    <ActivityCard activity={activity} submitWorkout={submit} />
                  </Grid>
                );
              })}

              <Grid item xs={12}>
                <Button variant="contained" onClick={submitWorkout} fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WorkOutCard;
