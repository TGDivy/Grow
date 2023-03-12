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

  const [habitsDueToday, setHabitsDueToday] = React.useState<HabitType[]>([]);
  const [habitsDone, setHabitsDone] = React.useState<habitEntryType>({});

  React.useEffect(() => {
    if (habitsDueToday.length === 0) {
      const habitsDueToday_ = Object.values(habits).filter((habit) => {
        // check if today is the same as the next due date using moment
        const nextDueDate = moment(habit.nextDueDate.toDate());
        const todayMoment = moment(today);
        return nextDueDate.isSame(todayMoment, "day");
      });
      setHabitsDueToday(habitsDueToday_);

      if (Object.keys(entries).length > 0) {
        if (entries[moment(today).format("YYYY-MM-DD")]?.habits) {
          setHabitsDone(entries[moment(today).format("YYYY-MM-DD")].habits);
        } else {
          // set habitsDone to false for all habits due today
          const habitsDone_ = habitsDueToday_.reduce((acc, habit) => {
            return {
              ...acc,
              [habit.habitId]: false,
            };
          }, {});
          setHabitsDone(habitsDone_);
        }
      }
    }
  }, [habits]);

  React.useEffect(() => {
    updateEntry(habitsDone, today);
    console.log("updated entry");
  }, [habitsDone]);

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
