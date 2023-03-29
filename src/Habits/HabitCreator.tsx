import React, { useState } from "react";

import {
  Add,
  AddCircle,
  ArrowBack,
  Create,
  Delete,
  ImageAspectRatio,
  Remove,
  RemoveCircle,
  Save,
} from "@mui/icons-material";
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
  Select,
  MenuItem,
  ListSubheader,
  FormControl,
  InputLabel,
  Divider,
  InputAdornment,
  FilledInput,
} from "@mui/material";
import { LocalizationProvider, StaticTimePicker } from "@mui/lab";
import StyledButton from "../Common/ReusableComponents/StyledButton";
import useHabitsStore, {
  FrequencyType,
  HabitType,
  HabitVariant,
  booleanType,
  numericType,
} from "../Common/Stores/HabitsStore";
import { v4 as uuidv4 } from "uuid";
import { Timestamp } from "firebase/firestore";
import ImagePicker from "./ImagePicker";
import { UnsplashImageType } from "../Common/Stores/Utils/Utils";
import useUserStore from "../Common/Stores/User";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type PropsComp = {
  habit: HabitType;
  setHabit: (habit: HabitType) => void;
};
const CompletionCriteriaNumericGreater = (props: PropsComp) => {
  // If project, or tag, let user select the minimum time to spend on it
  const { habit, setHabit } = props;
  if (
    (habit.type === "project" || habit.type === "tag") &&
    habit?.completionCriteria?.type === "numeric"
  ) {
    // button to increase and decrease time, and a text field to enter the time
    const value = habit.completionCriteria.value;
    return (
      <FormControl fullWidth>
        <Stack>
          <Typography
            variant="body1"
            sx={{
              pb: 1,
            }}
          >
            Minimum time to spend on this {habit.type}:
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              size="small"
              onClick={() => {
                setHabit({
                  ...habit,
                  completionCriteria: {
                    ...habit.completionCriteria,
                    value: value + 60 * 60,
                  } as numericType,
                });
              }}
              disabled={value >= 12 * 60 * 60}
            >
              <AddCircle />
            </IconButton>
            <FilledInput
              id="outlined-basic"
              size="small"
              fullWidth
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              value={Math.floor(habit.completionCriteria.value / (60 * 60))}
              onChange={(e) => {
                const v = parseInt(e.target.value) * 60 * 60 + (value % 3600);
                const v_positive = v > 0;
                setHabit({
                  ...habit,
                  completionCriteria: {
                    ...habit.completionCriteria,
                    // just change the hour part
                    value: v && v_positive ? v : 0 + (value % 3600),
                  } as numericType,
                });
              }}
              endAdornment={
                <InputAdornment position="end">Hour</InputAdornment>
              }
              sx={{
                "&::before": {
                  borderBottom: "0px solid",
                },
                "&::after": {
                  borderBottom: "0px solid",
                },
              }}
            />
            <IconButton
              size="small"
              onClick={() => {
                setHabit({
                  ...habit,
                  completionCriteria: {
                    ...habit.completionCriteria,
                    value: value - 60 * 60,
                  } as numericType,
                });
              }}
              disabled={value < 60 * 60}
            >
              <RemoveCircle />
            </IconButton>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              size="small"
              onClick={() => {
                setHabit({
                  ...habit,
                  completionCriteria: {
                    ...habit.completionCriteria,
                    value: value + 60,
                  } as numericType,
                });
              }}
              disabled={value >= 12 * 60 * 60}
            >
              <AddCircle />
            </IconButton>
            <FilledInput
              id="outlined-basic"
              size="small"
              fullWidth
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              endAdornment={
                <InputAdornment position="end">Minute</InputAdornment>
              }
              value={Math.floor((habit.completionCriteria.value % 3600) / 60)}
              onChange={(e) => {
                // just change the minute part
                const v =
                  parseInt(e.target.value) * 60 + (value - (value % 3600));
                setHabit({
                  ...habit,
                  completionCriteria: {
                    ...habit.completionCriteria,
                    value: v ? v : 0 + (value - (value % 3600)),
                  } as numericType,
                });
              }}
              sx={{
                "&::before": {
                  borderBottom: "0px solid",
                },
                "&::after": {
                  borderBottom: "0px solid",
                },
              }}
            />
            <IconButton
              size="small"
              onClick={() => {
                setHabit({
                  ...habit,
                  completionCriteria: {
                    ...habit.completionCriteria,
                    value: value - 60,
                  } as numericType,
                });
              }}
              disabled={value <= 60}
            >
              <RemoveCircle />
            </IconButton>
          </Stack>
        </Stack>
      </FormControl>
    );
  }
  return <></>;
};

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
    completionCriteria: {
      type: "boolean",
    },

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

  const [pickingImage, setPickingImage] = useState(false);

  const handlePickImage = () => {
    setPickingImage(!pickingImage);
  };

  const imageUrls = [
    "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  ];

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

  const TypeSelector = () => {
    const types = ["custom", "project", "tag"];
    return (
      <Select
        value={habit.type}
        onChange={(e) => {
          const title_ = e.target.value !== "custom" ? "" : habit.title;
          const completionCriteria =
            e.target.value === "custom"
              ? habit.completionCriteria
              : ({
                  type: "numeric",
                  value: 60 * 60 * 2,
                  variant: "greater",
                } as numericType);
          setHabit({
            ...habit,
            type: e.target.value as HabitVariant,
            title: title_,
            completionCriteria: completionCriteria,
          });
        }}
        size="small"
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            border: "0px solid",
            borderImage: "none",
          },
          "& .MuiSelect-select": {
            paddingTop: "0px",
            paddingBottom: "0px",
          },
        }}
      >
        {types.map((type) => (
          <MenuItem value={type} key={type}>
            <Typography textTransform="capitalize" variant="body2">
              {type}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    );
  };

  const possibleTags = useUserStore((state) => state.tags);
  const possibleProjects = useUserStore((state) => state.stickers);

  const ProjectSelector = () => {
    if (habit.type !== "project") return <></>;
    if (possibleProjects.length === 0)
      return (
        <Typography variant="body1" align="center">
          No projects found. Create a project first.
        </Typography>
      );

    return (
      <FormControl fullWidth size="small" variant="filled">
        <InputLabel id="tag-label">Title</InputLabel>
        <Select
          value={habit.title}
          onChange={(e) =>
            setHabit({ ...habit, title: e.target.value as string })
          }
          label="Title"
          fullWidth
          size="small"
          variant="filled"
          sx={{
            "&::before": {
              borderBottom: "0px solid",
            },
            "&::after": {
              borderBottom: "0px solid",
            },
          }}
        >
          {possibleProjects.map((tag) => (
            <MenuItem value={tag} key={tag}>
              <Typography textTransform="capitalize" variant="body2">
                {tag}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const TagSelector = () => {
    if (habit.type !== "tag") return <></>;
    if (possibleTags.length === 0)
      return (
        <Typography variant="body1" align="center">
          No projects found. Create a project first.
        </Typography>
      );
    return (
      <FormControl fullWidth size="small" variant="filled">
        <InputLabel id="tag-label">Title</InputLabel>
        <Select
          value={habit.title}
          onChange={(e) =>
            setHabit({ ...habit, title: e.target.value as string })
          }
          label="Title"
          fullWidth
          size="small"
          variant="filled"
          sx={{
            "&::before": {
              borderBottom: "0px solid",
            },
            "&::after": {
              borderBottom: "0px solid",
            },
          }}
        >
          {possibleTags.map((tag) => (
            <MenuItem value={tag} key={tag}>
              <Typography textTransform="capitalize" variant="body2">
                {tag}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
        <TypeSelector />
      </DialogTitle>
      {!pickingImage && (
        <>
          <CardMedia
            component="img"
            image="https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt="Live from space album cover"
            height="140"
          />
          <CardHeader
            title={
              <>
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
                    display: habit.type === "custom" ? "block" : "none",
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
                <ProjectSelector />
                <TagSelector />
              </>
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
              <CompletionCriteriaNumericGreater
                habit={habit}
                setHabit={setHabit}
              />

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
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button
              variant="text"
              color="secondary"
              startIcon={<ArrowBack />}
              fullWidth
              onClick={props.handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="text"
              color="secondary"
              startIcon={<ImageAspectRatio />}
              fullWidth
              disabled={habit.title === ""}
              onClick={handlePickImage}
            >
              Pick Image
            </Button>
            <StyledButton
              variant="contained"
              color="primary"
              startIcon={<Save />}
              fullWidth
              disabled={habit.title === "" || habit.image?.url === ""}
              onClick={handleSave}
            >
              Save
            </StyledButton>
          </DialogActions>
        </>
      )}

      {pickingImage && (
        <>
          <DialogContent>
            <ImagePicker
              search={habit.title}
              setImage={(unsplashImage: UnsplashImageType) =>
                setHabit({ ...habit, image: unsplashImage })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="text"
              color="secondary"
              startIcon={<ArrowBack />}
              fullWidth
              onClick={handlePickImage}
            >
              Back
            </Button>
            <StyledButton
              variant="contained"
              color="primary"
              startIcon={<Save />}
              fullWidth
              disabled={
                habit.title === "" ||
                habit.image?.url === "" ||
                habit.image?.url === undefined
              }
              onClick={handleSave}
            >
              Save
            </StyledButton>
          </DialogActions>
        </>
      )}
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
