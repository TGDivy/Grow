import {
  CardHeader,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import StyledCard from "../Common/ReusableComponents/StyledCard";
import useHabitsStore, { habitEntryType } from "../Common/Stores/HabitsStore";

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
    console.log("updated entry");
  }, [habitsDone]);

  const habitsDueToday = Object.keys(habitsDone).map((habit) => {
    return habits[habit];
  });

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
