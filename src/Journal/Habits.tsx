import React, { FC, useEffect } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Divider,
  ListItemButton,
  Typography,
  ButtonGroup,
  Button,
  Grow,
} from "@mui/material";
import { Cancel, LocalDining, TakeoutDining } from "@mui/icons-material";

import {
  totalTimeWorked,
  totalTimeWorkedByTagOrSticker,
  filterTimerRecords,
} from "../Stats/StatsMain";
import useTimerRecordsStore from "../Common/Stores/TimerRecordsStore";
import useActivityStore from "../Common/Stores/ActivityStore";
import useDailyJournalStore from "../Common/Stores/DailyJournalStore";
import { JournalType } from "../Common/Types/Types";
import useJournalStore from "../Common/Stores/JournalStore";
import useUserStore from "../Common/Stores/User";

interface Props {
  readonly?: boolean;
  document?: JournalType;
  today?: Date;
}

const CustomBoolHabitsDisplay = ({ readonly, document, today }: Props) => {
  if (!today) {
    return <></>;
  }

  if (readonly) {
    const customBoolHabits = document?.customBoolHabits || {};
    return (
      <>
        {Object.entries(customBoolHabits).map(([habit, completed]) => {
          return (
            <ListItem
              secondaryAction={
                <Checkbox
                  edge="end"
                  checked={completed}
                  tabIndex={-1}
                  disabled
                />
              }
              key={habit}
              sx={{
                backgroundColor: "#ffffff22",
              }}
            >
              <ListItemButton sx={{ width: "100%" }} disabled={readonly}>
                <ListItemText
                  primary={`${completed ? "Did - " : "Did not - "} ${habit}`}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </>
    );
  }

  const customBoolHabitsStore = useUserStore((state) => state.customBoolHabits);

  const filterCustomBoolHabits = customBoolHabitsStore.filter(
    (habit) => habit.daysOfWeek[today.getDay()] === "1"
  );

  const customBoolHabits = useDailyJournalStore(
    (state) => state.customBoolHabits
  );

  const setCustomBoolHabit = useDailyJournalStore(
    (state) => state.setCustomBoolHabit
  );

  useEffect(() => {
    // if customBoolHabits doesn't have the same habits as filterCustomBoolHabits, then add them

    const map = new Map<string, boolean>();
    filterCustomBoolHabits.forEach((habit) => {
      map.set(habit.name, false);
    });
    Object.entries(customBoolHabits).forEach(([habit, completed]) => {
      map.set(habit, completed);
    });

    setCustomBoolHabit(map);
  }, []);

  const handleCustomBoolHabitToggle = (name: string) => {
    // customBoolhabits to map
    const map = new Map<string, boolean>();
    Object.entries(customBoolHabits).forEach(([key, value]) => {
      map.set(key, value);
    });
    map.set(name, !map.get(name));
    setCustomBoolHabit(map);
  };

  return (
    <>
      {Object.entries(customBoolHabits).map(([habit, completed], index) => {
        return (
          <ListItem
            secondaryAction={
              <Checkbox
                edge="end"
                checked={completed}
                tabIndex={-1}
                onClick={() => handleCustomBoolHabitToggle(habit)}
              />
            }
            key={habit}
            sx={{
              backgroundColor: "#ffffff22",
            }}
          >
            <ListItemButton
              sx={{ width: "100%" }}
              disabled={readonly}
              onClick={() => handleCustomBoolHabitToggle(habit)}
            >
              <ListItemText
                primary={`${completed ? "Did - " : "Did not - "} ${habit}`}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </>
  );
};

const Habits: FC<Props> = ({ readonly, document }) => {
  const timerRecords = useTimerRecordsStore((state) => state.timerRecords);
  const latestActivityDate = useActivityStore(
    (state) => state.latestActivityDate
  );

  const stickerTagHabits = useUserStore((state) => state.stickerTagHabits);

  // Display all habits, and ask if they were completed.
  // the habits are:
  // - 8 hours of work
  // - exercised
  // - number of meals
  // - no MB

  let today = new Date();
  let meals = useDailyJournalStore((state) => state.meals);
  let exercised = useDailyJournalStore((state) => state.exercised);

  if (readonly) {
    if (document) {
      meals = document.meals;
      today = document.date;
    } else {
      const documents = useJournalStore((state) => state.documents);
      const latest = Object.values(documents).sort(
        (a, b) => b.date.getTime() - a.date.getTime()
      )[0];
      meals = latest?.meals;
      today = latest?.date;
      exercised = latest?.exercised;
    }
  }
  // subtract 5 hours to get the time I started working
  today = new Date(today.getTime() - 5 * 60 * 60 * 1000);

  const todayRecords = filterTimerRecords(timerRecords, 1, 0);
  const totalWorkTime = totalTimeWorked(todayRecords);

  const filterStickerTagHabits = stickerTagHabits.filter(
    (habit) => habit.daysOfWeek[today.getDay()] === "1"
  );
  const totalWorkTimeByTagOrSticker = filterStickerTagHabits.map((habit) => {
    const timeWorked = totalTimeWorkedByTagOrSticker(todayRecords, habit.name);
    if (timeWorked >= habit.minutes) {
      return { ...habit, completed: true };
    }
    return { ...habit, completed: false };
  });
  const setTagHabit = useDailyJournalStore((state) => state.setTagHabit);

  useEffect(() => {
    // convert totalWorkTimeByTagOrSticker to a map
    if (readonly) {
      return;
    }
    const map = new Map<string, boolean>();
    totalWorkTimeByTagOrSticker.forEach((habit) => {
      map.set(habit.name, habit.completed);
    });
    setTagHabit(map);
  }, [totalWorkTimeByTagOrSticker]);

  const setMeals = useDailyJournalStore((state) => state.setMeals);
  const setExercised = useDailyJournalStore((state) => state.setExercised);

  const handleMeals = (index: number, meal: string) => () => {
    const newMeals = [...meals];
    newMeals[index] = meal;
    setMeals(newMeals);
  };

  return (
    <Grow in={true} timeout={1000}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          height: "100%",
          backgroundColor: "#00000088",
          color: "white",
        }}
      >
        <List
          sx={{
            width: "100%",
          }}
        >
          <Divider
            textAlign="center"
            sx={{
              "&.MuiDivider-root": {
                color: "primary.main",
                pb: 1,
                "&::before": {
                  borderTopWidth: 2,
                  borderTopStyle: "solid",
                  borderTopColor: "primary.main",
                },
                "&::after": {
                  borderTopWidth: 2,
                  borderTopStyle: "solid",
                  borderTopColor: "primary.main",
                },
              },
            }}
          >
            <Typography variant="body1">
              {today.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Divider>
          <ListItem
            secondaryAction={
              <Checkbox
                edge="end"
                checked={totalWorkTime >= 8 * 60}
                tabIndex={-1}
                disableRipple
                disabled
              />
            }
            sx={{
              backgroundColor: "#ffffff22",
            }}
          >
            <ListItemButton sx={{ width: "100%" }} disabled={readonly}>
              <ListItemText
                primary={`Worked for ${Math.floor(totalWorkTime / 60)}H ${
                  totalWorkTime % 60
                }M`}
              />
            </ListItemButton>
          </ListItem>
          <Divider
            sx={{
              borderBottomWidth: 3,
            }}
          />

          <ListItem
            secondaryAction={
              <Checkbox
                edge="end"
                checked={exercised}
                tabIndex={-1}
                disabled={readonly}
                onChange={(e) => setExercised(e.target.checked)}
              />
            }
            sx={{
              backgroundColor: "#ffffff22",
            }}
          >
            <ListItemButton
              sx={{ width: "100%" }}
              disabled={readonly}
              onClick={() => setExercised(!exercised)}
            >
              <ListItemText
                primary={exercised ? "Exercised" : "Did not exercise"}
              />
            </ListItemButton>
          </ListItem>
          <Divider
            sx={{
              borderBottomWidth: 3,
            }}
          />

          <ListItem
            secondaryAction={
              <Checkbox
                edge="end"
                checked={meals.filter((meal) => meal).length >= 3}
                tabIndex={-1}
                disabled
              />
            }
            sx={{
              backgroundColor: "#ffffff22",
            }}
          >
            <ListItemButton sx={{ width: "100%" }} disabled={readonly}>
              <ListItemText
                sx={{
                  width: "100%",
                }}
                primary={`Had ${meals.length} meals`}
              />
            </ListItemButton>
          </ListItem>
          <List
            component="div"
            disablePadding
            sx={{
              width: "100%",
            }}
          >
            {["Breakfast", "Lunch", "Dinner"].map((meal, index) => {
              return (
                <ListItem
                  sx={{
                    backgroundColor: "#ffffff19",
                    pl: 4,
                  }}
                  key={index}
                  secondaryAction={
                    <ButtonGroup
                      variant="outlined"
                      aria-label="outlined button group"
                    >
                      <Button
                        variant={meals[index] === "" ? "contained" : "outlined"}
                        onClick={handleMeals(index, "")}
                        disabled={readonly}
                      >
                        <Cancel />
                      </Button>
                      <Button
                        onClick={handleMeals(index, "cooked")}
                        disabled={readonly}
                        variant={
                          meals[index] === "cooked" ? "contained" : "outlined"
                        }
                      >
                        <TakeoutDining />
                      </Button>
                      <Button
                        onClick={handleMeals(index, "restaurant")}
                        disabled={readonly}
                        variant={
                          meals[index] === "restaurant"
                            ? "contained"
                            : "outlined"
                        }
                      >
                        <LocalDining />
                      </Button>
                    </ButtonGroup>
                  }
                >
                  <ListItemButton sx={{ width: "100%" }} disabled={readonly}>
                    <ListItemText
                      primary={`${meal}`}
                      secondary={meals[index] || "none"}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Divider
            sx={{
              borderBottomWidth: 3,
            }}
          />

          <CustomBoolHabitsDisplay
            today={today}
            readonly={readonly}
            document={document}
          />
          <Divider
            sx={{
              borderBottomWidth: 3,
            }}
          />
          {totalWorkTimeByTagOrSticker.map((object) => {
            return (
              <ListItem
                secondaryAction={
                  <Checkbox
                    edge="end"
                    checked={object.completed}
                    tabIndex={-1}
                    disabled
                  />
                }
                key={object.name}
                sx={{
                  backgroundColor: "#ffffff22",
                }}
              >
                <ListItemButton sx={{ width: "100%" }} disabled={readonly}>
                  <ListItemText
                    primary={`${object.completed ? "Did" : "Did not do"}
                    ${object.name} more than ${object.minutes} minutes`}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </Grow>
  );
};

export default Habits;
