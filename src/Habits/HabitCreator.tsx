import React, { useState } from "react";

import { Add, Create, Delete, Remove, Save } from "@mui/icons-material";
import {
  Button,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
  Checkbox,
} from "@mui/material";
import StyledButton from "../Common/ReusableComponents/StyledButton";
import useHabitsStore, {
  FrequencyType,
  HabitType,
} from "../Common/Stores/HabitsStore";
import { v4 as uuidv4 } from "uuid";
import { Timestamp } from "firebase/firestore";

const HabitCreatorCore = (props: { handleClose: () => void }) => {
  const [habit, setHabit] = useState<HabitType>({
    title: "",
    description: "",
    frequencyType: {
      type: "day",
      repeatEvery: 1,
    },
    habitId: uuidv4(),
    type: "custom",

    nextDueDate: Timestamp.fromDate(new Date()),
    lastCompletedDate: Timestamp.fromDate(new Date()),

    reminder: false,

    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  });
  const addHabit = useHabitsStore((state) => state.addHabit);

  const handleSave = () => {
    addHabit(habit);
    props.handleClose();
  };

  // daily, weekly, monthly is a button group
  const handleFrequencyTypeChange = (event: React.MouseEvent<HTMLElement>) => {
    const type = (event.target as HTMLInputElement).value as "day" | "week";
    setHabit({
      ...habit,
      frequencyType: {
        type,
        repeatEvery: habit.frequencyType.repeatEvery,
      },
    });
  };

  const FrequencySelector = () => {
    return (
      <ToggleButtonGroup
        value={habit.frequencyType.type}
        exclusive
        orientation="vertical"
        style={{
          flexGrow: 1,
        }}
      >
        {["day", "week", "month"].map((type) => (
          <ToggleButton
            value={type}
            onClick={handleFrequencyTypeChange}
            key={type}
            size="small"
            disabled={type === "month"}
          >
            {type}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    );
  };

  // repeat every is number with a min of 1 with arrow buttons to increment/decrement
  const incrementRepeatEvery = () => {
    setHabit({
      ...habit,
      frequencyType: {
        ...habit.frequencyType,
        repeatEvery: habit.frequencyType.repeatEvery + 1,
      },
    });
  };

  const decrementRepeatEvery = () => {
    setHabit({
      ...habit,
      frequencyType: {
        ...habit.frequencyType,
        repeatEvery: habit.frequencyType.repeatEvery - 1,
      },
    });
  };

  const RepeatEvery = () => {
    return (
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          sx={{
            flexGrow: 1,
          }}
        >
          Repeat every
        </Typography>
        <IconButton
          onClick={decrementRepeatEvery}
          disabled={habit.frequencyType.repeatEvery === 1}
          size="small"
        >
          <Remove />
        </IconButton>
        <Typography>{habit.frequencyType.repeatEvery}</Typography>
        <IconButton onClick={incrementRepeatEvery} size="small">
          <Add />
        </IconButton>
      </Stack>
    );
  };

  // if type is weekly, then allow the user to select the days of the week
  // toggle day of the week on and off using toggle buttons
  const handleDayOfWeekChange = (event: React.MouseEvent<HTMLElement>) => {
    const day = (event.target as HTMLInputElement).value as
      | "mon"
      | "tue"
      | "wed"
      | "thu"
      | "fri"
      | "sat"
      | "sun";
    if (habit.frequencyType.daysOfWeek?.includes(day)) {
      setHabit({
        ...habit,
        frequencyType: {
          ...habit.frequencyType,
          daysOfWeek: habit.frequencyType.daysOfWeek.filter(
            (d) => d !== day
          ) as FrequencyType["daysOfWeek"],
        },
      });
    } else {
      setHabit({
        ...habit,
        frequencyType: {
          ...habit.frequencyType,
          daysOfWeek: habit.frequencyType.daysOfWeek
            ? [...habit.frequencyType.daysOfWeek, day]
            : [day],
        },
      });
    }
  };

  const DayOfWeekSelector = () => {
    return (
      <ToggleButtonGroup
        value={habit.frequencyType.daysOfWeek}
        fullWidth
        color="success"
      >
        {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
          <ToggleButton
            value={day}
            onClick={handleDayOfWeekChange}
            key={day}
            size="small"
          >
            {day}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    );
  };

  return (
    <>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        Create Habit
      </DialogTitle>
      <CardMedia
        component="img"
        image="https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        alt="Live from space album cover"
        height="140"
      />
      <CardHeader
        title={
          <TextField
            id="outlined-basic"
            label="Title"
            size="small"
            variant="filled"
            fullWidth
            value={habit.title}
            onChange={(event) => {
              setHabit({ ...habit, title: event.target.value });
            }}
            sx={{
              "& .MuiInputBase-root": {
                borderBottom: "0px solid",
                "&::before": {
                  borderBottom: "0px solid",
                },
                "&::after": {
                  borderBottom: "0px solid",
                },
              },
            }}
          />
        }
      />
      <DialogContent>
        <Stack spacing={2}>
          <Stack spacing={2} direction="row">
            <RepeatEvery />
            <FrequencySelector />
          </Stack>
          {habit.frequencyType.type === "week" && (
            <>
              Repeat on:
              <DayOfWeekSelector />
            </>
          )}
        </Stack>
      </DialogContent>
      <TextField
        // label="Description"
        placeholder="Write any additional details here..."
        margin="normal"
        variant="filled"
        value={habit.description}
        multiline
        minRows={3}
        maxRows={5}
        fullWidth
        onChange={(event) => {
          setHabit({ ...habit, description: event.target.value });
        }}
        sx={{
          "& .MuiInputBase-root": {
            borderBottom: "0px solid",
            "&::before": {
              borderBottom: "0px solid",
            },
            "&::after": {
              borderBottom: "0px solid",
            },
          },
        }}
      />

      <DialogActions>
        <Button
          variant="text"
          color="secondary"
          startIcon={<Delete />}
          fullWidth
          onClick={props.handleClose}
        >
          Cancel
        </Button>
        <StyledButton
          variant="contained"
          color="primary"
          startIcon={<Save />}
          fullWidth
          disabled={habit.title === ""}
          onClick={handleSave}
        >
          Save
        </StyledButton>
      </DialogActions>
    </>
  );
};

// Dialog for creating a new habit
const HabitCreator = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <StyledButton
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        fullWidth
        size="small"
      >
        <Create />
        Create Habit
      </StyledButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{
          sx: {
            backgroundColor: "background.default",
            backgroundImage: "none",
            color: "surface.contrastText",
            minHeight: "667px",
          },
        }}
        sx={{
          backdropFilter: "blur(10px)",
        }}
        fullWidth
        scroll="paper"
      >
        <HabitCreatorCore handleClose={handleClose} />
      </Dialog>
    </>
  );
};

export default HabitCreator;
