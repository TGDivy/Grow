import React from "react";
import useHabitsStore, {
  HabitType,
  habitEntryType,
} from "../Common/Stores/HabitsStore";
import moment from "moment";
import {
  CardHeader,
  IconButton,
  List,
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import StyledCard from "../Common/ReusableComponents/StyledCard";
const HabitEntry = () => {
  const habits = useHabitsStore((state) => state.habits);
  const [habitsDueToday, setHabitsDueToday] = React.useState<HabitType[]>([]);
  const [habitsDone, setHabitsDone] = React.useState<habitEntryType>({});

  // 1 day from now
  const today = new Date();
  today.setDate(today.getDate() + 1);

  React.useEffect(() => {
    const habitsDueToday_ = Object.values(habits).filter((habit) => {
      // check if today is the same as the next due date using moment
      const nextDueDate = moment(habit.nextDueDate.toDate());
      const todayMoment = moment(today);
      return nextDueDate.isSame(todayMoment, "day");
    });
    setHabitsDueToday(habitsDueToday_);
    // set habitsDone to false for all habits due today
    const habitsDone_ = habitsDueToday_.reduce((acc, habit) => {
      return {
        ...acc,
        [habit.habitId]: false,
      };
    }, {});
    setHabitsDone(habitsDone_);
  }, [habits]);

  return (
    <StyledCard
      sx={{
        // height: "310px",
        ":hover": {
          boxShadow: 0,
        },
      }}
    >
      <CardHeader align="center" />
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
