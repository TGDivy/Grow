import React from "react";
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
} from "@mui/material";
import { Cancel, LocalDining, TakeoutDining } from "@mui/icons-material";

import { totalTimeWorked, filterTimerRecords } from "../Stats/StatsMain";
import useTimerRecordsStore from "../Common/Stores/TimerRecordsStore";
import useActivityStore from "../Common/Stores/ActivityStore";
import useDailyJournalStore from "../Common/Stores/DailyJournalStore";

const Habits = () => {
  const timerRecords = useTimerRecordsStore((state) => state.timerRecords);
  const latestActivityDate = useActivityStore(
    (state) => state.latestActivityDate
  );

  // Display all habits, and ask if they were completed.
  // the habits are:
  // - 8 hours of work
  // - exercised
  // - number of meals
  // - no MB

  const today = new Date();
  const totalWorkTime = totalTimeWorked(filterTimerRecords(timerRecords, 1, 0));
  const exercisedToday = latestActivityDate
    ? latestActivityDate.getDate() === today.getDate() &&
      latestActivityDate.getMonth() === today.getMonth() &&
      latestActivityDate.getFullYear() === today.getFullYear()
    : false;
  const meals = useDailyJournalStore((state) => state.meals);
  const noMB = useDailyJournalStore((state) => state.noMB);

  const setMeals = useDailyJournalStore((state) => state.setMeals);
  const setNB = useDailyJournalStore((state) => state.setNB);

  const handleMeals = (index: number, meal: string) => () => {
    const newMeals = [...meals];
    newMeals[index] = meal;
    setMeals(newMeals);
  };

  return (
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
        <ListItem>
          <Typography variant="body1">Today, you:</Typography>
        </ListItem>
        <ListItem
          secondaryAction={
            <Checkbox
              edge="end"
              checked={totalWorkTime >= 8 * 60}
              tabIndex={-1}
              disableRipple
            />
          }
          sx={{
            backgroundColor: "#ffffff22",
          }}
        >
          <ListItemButton sx={{ width: "100%" }}>
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
            <Checkbox edge="end" checked={exercisedToday} tabIndex={-1} />
          }
          sx={{
            backgroundColor: "#ffffff22",
          }}
        >
          <ListItemButton sx={{ width: "100%" }}>
            <ListItemText
              primary={exercisedToday ? "Exercised" : "Did not exercise"}
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
            />
          }
          sx={{
            backgroundColor: "#ffffff22",
          }}
        >
          <ListItemButton sx={{ width: "100%" }}>
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
                    >
                      <Cancel />
                    </Button>
                    <Button
                      onClick={handleMeals(index, "cooked")}
                      variant={
                        meals[index] === "cooked" ? "contained" : "outlined"
                      }
                    >
                      <TakeoutDining />
                    </Button>
                    <Button
                      onClick={handleMeals(index, "restaurant")}
                      variant={
                        meals[index] === "restaurant" ? "contained" : "outlined"
                      }
                    >
                      <LocalDining />
                    </Button>
                  </ButtonGroup>
                }
              >
                <ListItemButton sx={{ width: "100%" }}>
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

        <ListItem
          secondaryAction={
            <Checkbox
              edge="end"
              checked={noMB}
              tabIndex={-1}
              onChange={(e) => setNB(e.target.checked)}
            />
          }
          sx={{
            backgroundColor: "#ffffff22",
          }}
        >
          <ListItemButton sx={{ width: "100%" }} onClick={() => setNB(!noMB)}>
            <ListItemText primary={noMB ? "Did not MB" : "Did MB"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  );
};

export default Habits;
