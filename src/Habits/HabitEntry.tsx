import {
  CardHeader,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import moment from "moment";
import React from "react";
import StyledCard from "../Common/ReusableComponents/StyledCard";
import useHabitsStore, {
  HabitType,
  habitEntryType,
} from "../Common/Stores/HabitsStore";

const today = new Date();
today.setDate(today.getDate());

const HabitEntry = () => {
  const habits = useHabitsStore((state) => state.habits);
  const updateEntry = useHabitsStore((state) => state.updateEntry);
  const entries = useHabitsStore((state) => state.entries);

  const [habitsDone, setHabitsDone] = React.useState<habitEntryType>({});

  React.useEffect(() => {
    // if entries for today exist, set habitsDone to the habits in the entry
    // note entries contains habit ids as keys and and boolean as value
    if (entries[moment(today).format("YYYY-MM-DD")]?.habits) {
      setHabitsDone(entries[moment(today).format("YYYY-MM-DD")].habits);
    } else {
      // get all habits due today
      const habitsDueToday = Object.values(habits).filter((habit) => {
        return moment(habit.nextDueDate).isSame(today, "day");
      });
      const habitsDueTodayObj = habitsDueToday.reduce((acc, habit) => {
        acc[habit.habitId] = false;
        return acc;
      }, {} as habitEntryType);
      setHabitsDone(habitsDueTodayObj);
    }
  }, []);

  React.useEffect(() => {
    updateEntry(habitsDone, today);
    console.log("updated entry");
  }, [habitsDone]);

  const habitsDueToday = Object.keys(habitsDone).map((habit) => {
    return habits[habit];
  });

  return (
    <StyledCard
      sx={{
        // height: "310px",
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
        {habitsDueToday.map((habit) => (
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
        ))}
      </List>
    </StyledCard>
  );
};

export default HabitEntry;
