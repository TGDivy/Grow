import {
  Box,
  CardHeader,
  Checkbox,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import StyledCard from "../Common/ReusableComponents/StyledCard";
import useHabitsStore, {
  HabitType,
  habitEntryType,
} from "../Common/Stores/HabitsStore";
import {
  filterTimerRecords,
  totalTimeWorked,
  totalTimeWorkedByTagOrSticker,
} from "../Stats/Utils/recordUtils";
import useTimerRecordsStore from "../Common/Stores/TimerRecordsStore";

const HabitEntry = () => {
  const getTodaysEntry = useHabitsStore((state) => state.getTodaysEntry);
  const updateEntry = useHabitsStore((state) => state.updateEntry);

  const habits = useHabitsStore((state) => state.habits);
  const [habitsDone, setHabitsDone] = React.useState<habitEntryType>({});

  React.useEffect(() => {
    const entry = getTodaysEntry();
    if (entry) {
      setHabitsDone(entry.habits);
    }
  }, []);

  React.useEffect(() => {
    updateEntry(habitsDone, new Date());
  }, [habitsDone]);

  const habitsDueToday = Object.keys(habitsDone).map((habit) => {
    return habits[habit];
  });

  const SimpleHabitItem = (habit: HabitType) => {
    return (
      <ListItem
        key={habit.habitId}
        secondaryAction={
          <Checkbox
            color="primary"
            onClick={() => {
              setHabitsDone({
                ...habitsDone,
                [habit.habitId]: !habitsDone[habit.habitId],
              });
            }}
            checked={habitsDone[habit.habitId] || false}
          />
        }
      >
        <ListItemButton
          sx={{ width: "100%" }}
          onClick={() => {
            setHabitsDone({
              ...habitsDone,
              [habit.habitId]: !habitsDone[habit.habitId],
            });
          }}
        >
          <ListItemText primary={habit.title} />
        </ListItemButton>
      </ListItem>
    );
  };
  const timerRecords = useTimerRecordsStore((state) => state.timerRecords);
  const todayRecords = filterTimerRecords(timerRecords, 1, 0);
  const projectHabitItem = (habit: HabitType) => {
    if (habit?.completionCriteria?.type !== "numeric") return null;
    const timeSpent = totalTimeWorkedByTagOrSticker(todayRecords, habit.title); // time spent on project in minutes
    if (
      timeSpent > habit.completionCriteria.value / 60 &&
      habitsDone[habit.habitId] !== true
    ) {
      setHabitsDone({
        ...habitsDone,
        [habit.habitId]: true,
      });
    }
    // secondary text informing user how much time they have spent on the project
    // and how much time they need to spend
    // display in hours and minutes

    // ignore 0 values
    const timeSpentHours = Math.floor(timeSpent / 60);
    const timeSpentMinutes = Math.floor(timeSpent % 60);
    const timeSpentText = `${timeSpentHours > 0 ? timeSpentHours + "h" : ""} ${
      timeSpentMinutes > 0 ? timeSpentMinutes + "m" : ""
    }`;

    const timeNeededHours = Math.floor(habit.completionCriteria.value / 3600);
    const timeNeededMinutes = Math.floor(
      (habit.completionCriteria.value % 3600) / 60
    );
    const timeNeededText = `${
      timeNeededHours > 0 ? timeNeededHours + "h" : ""
    } ${timeNeededMinutes > 0 ? timeNeededMinutes + "m" : ""}`;

    const secondaryText = `${timeSpentText} / ${timeNeededText}`;

    // progress bar showing how much time is left to spend on the project

    return (
      <ListItem
        key={habit.habitId}
        secondaryAction={
          <Checkbox
            color="primary"
            onClick={() => {
              setHabitsDone({
                ...habitsDone,
                [habit.habitId]: !habitsDone[habit.habitId],
              });
            }}
            checked={habitsDone[habit.habitId] || false}
            disabled
          />
        }
      >
        <ListItemButton sx={{ width: "100%", pb: 1 }}>
          <ListItemText
            sx={{
              textTransform: "capitalize",
            }}
            primary={habit.title}
          />
          <Box
            sx={{
              width: "100%",
              position: "absolute",
              left: 0,
              bottom: 0,
              paddingRight: "1rem",
              paddingLeft: "1rem",
            }}
          >
            <Typography variant="body2" align="right">
              {secondaryText}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={Math.min(
                (timeSpent / (habit.completionCriteria.value / 60)) * 100,
                100
              )}
            />
          </Box>
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <StyledCard
      sx={{
        ":hover": {
          boxShadow: 0,
        },
      }}
    >
      <CardHeader
        align="center"
        title={
          habitsDueToday.length === 0
            ? "No habits due today"
            : "Habits due today"
        }
      />
      <List dense>
        {habitsDueToday.map((habit) =>
          habit.type === "custom"
            ? SimpleHabitItem(habit)
            : projectHabitItem(habit)
        )}
      </List>
    </StyledCard>
  );
};

export default HabitEntry;
