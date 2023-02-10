import React, { useEffect } from "react";
import useDailyJournalStore from "../Common/Stores/DailyJournalStore";
import useUserStore from "../Common/Stores/User";
import {
  filterTimerRecords,
  totalTimeWorked,
  totalTimeWorkedByTagOrSticker,
} from "../Stats/Utils/recordUtils";
import useTimerRecordsStore from "../Common/Stores/TimerRecordsStore";
import { useNavigate } from "react-router-dom";
import {
  Cancel,
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
  ExpandLess,
  LocalDining,
  SelfImprovement,
  TakeoutDining,
  Task,
} from "@mui/icons-material";
import {
  Box,
  ButtonGroup,
  CardHeader,
  Checkbox,
  Collapse,
  Divider,
  Grow,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import StyledButton from "../Common/ReusableComponents/StyledButton";
import StyledCard from "../Common/ReusableComponents/StyledCard";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const CustomBoolHabitsDisplay = () => {
  const today = new Date();
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
                color="secondary"
              />
            }
            key={habit}
          >
            <ListItemButton
              sx={{ width: "100%" }}
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

const HabitsCondensed = () => {
  const today = new Date();
  const meals = useDailyJournalStore((state) => state.meals);
  const stickerTagHabits = useUserStore((state) => state.stickerTagHabits);

  const exercised = useDailyJournalStore((state) => state.exercised);
  const timerRecords = useTimerRecordsStore((state) => state.timerRecords);

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
    const map = new Map<string, boolean>();
    totalWorkTimeByTagOrSticker.forEach((habit) => {
      map.set(habit.name, habit.completed);
    });
    setTagHabit(map);
  }, [totalWorkTimeByTagOrSticker]);

  const setMeals = useDailyJournalStore((state) => state.setMeals);
  const setExercised = useDailyJournalStore((state) => state.setExercised);
  const navigate = useNavigate();
  const handleMeals = (index: number) => () => {
    let newMeals = [...meals];
    if (newMeals.length === 0) {
      newMeals = ["", "", ""];
    }

    if (newMeals[index] === "cooked") {
      newMeals[index] = "";
    } else if (newMeals[index] === "") {
      newMeals[index] = "cooked";
    }
    setMeals(newMeals);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const mealsList = ["Breakfast", "Lunch", "Dinner"].map((meal, index) => (
    <ListItem
      key={meal}
      secondaryAction={
        <Checkbox
          edge="end"
          tabIndex={-1}
          disableRipple
          color="secondary"
          checked={meals[index] === "cooked"}
          onClick={handleMeals(index)}
        />
      }
      onClick={handleMeals(index)}
    >
      <ListItemButton>
        <ListItemText>{meal}</ListItemText>
      </ListItemButton>
    </ListItem>
  ));

  const titleButton = (
    <>
      <StyledButton
        fullWidth
        onClick={() => navigate("/Reflect")}
        variant="contained"
        startIcon={<SelfImprovement />}
      >
        Reflect
      </StyledButton>
    </>
  );

  return (
    <StyledCard
      sx={{
        height: "310px",
        overflow: "scroll",
      }}
    >
      <CardHeader title={titleButton} align="center" />
      <List dense>
        <ListItem
          secondaryAction={
            <Checkbox
              edge="end"
              checked={totalWorkTime >= 8 * 60}
              tabIndex={-1}
              disableRipple
              color="secondary"
              disabled
            />
          }
        >
          <ListItemButton sx={{ width: "100%" }}>
            <ListItemText
              primary={`Worked for ${Math.floor(totalWorkTime / 60)}H ${
                totalWorkTime % 60
              }M`}
            />
          </ListItemButton>
        </ListItem>
        <ListItem
          secondaryAction={
            <Checkbox
              edge="end"
              checked={exercised}
              tabIndex={-1}
              onChange={(e) => setExercised(e.target.checked)}
              color="secondary"
            />
          }
        >
          <ListItemButton
            sx={{ width: "100%" }}
            onClick={() => setExercised(!exercised)}
          >
            <ListItemText
              primary={exercised ? "Exercised" : "Did not exercise"}
            />
          </ListItemButton>
        </ListItem>
        <ListItem
          secondaryAction={
            <Checkbox
              edge="end"
              checked={meals.filter((meal) => meal).length >= 3}
              tabIndex={-1}
              disabled
              color="secondary"
            />
          }
        >
          <ListItemButton
            sx={{ width: "100%" }}
            onClick={(event) =>
              handleClick(
                event as unknown as React.MouseEvent<HTMLButtonElement>
              )
            }
          >
            <ListItemText
              primary={`Had ${meals.filter((meal) => meal).length} meal${
                meals.filter((meal) => meal).length === 1 ? "" : "s"
              }`}
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <CustomBoolHabitsDisplay />
        <Divider />
        {totalWorkTimeByTagOrSticker.map((object) => {
          return (
            <ListItem
              secondaryAction={
                <Checkbox
                  edge="end"
                  checked={object.completed}
                  tabIndex={-1}
                  disabled
                  color="secondary"
                />
              }
              key={object.name}
            >
              <ListItemButton
                sx={{
                  width: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <ListItemText
                  primary={`${object.name} > ${object.minutes} minutes`}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuList dense>{mealsList}</MenuList>
      </Menu>
    </StyledCard>
  );
};

export default HabitsCondensed;
