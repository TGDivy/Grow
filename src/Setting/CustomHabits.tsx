import React from "react";
import useUserStore from "../Common/Stores/User";
import { Paper, Typography, Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Stack } from "@mui/system";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ButtonGroup,
} from "@mui/material";

const CustomBoolHabits = () => {
  // Text box for adding new tags
  // And display all the tags

  const customBoolHabits = useUserStore((state) => state.customBoolHabits);
  const setCustomBoolHabits = useUserStore(
    (state) => state.setCustomBoolHabits
  );

  // For each custom bool habit, we want to select days of the week for it.
  const handleDaysOfWeekChange = (index: number, day: string) => {
    // daysOfWeek is a string of 7 characters, where each character is either 0 or 1
    // 0 means the day is not selected, 1 means the day is selected
    // The order of the days is: Sun, Mon, Tue, Wed, Thu, Fri, Sat

    const customBoolHabits_ = [...customBoolHabits];
    const daysOfWeek = customBoolHabits_[index].daysOfWeek;
    const dayIndex = ("SunMonTueWedThuFriSat".indexOf(day) / 3) as
      | 0
      | 1
      | 2
      | 3
      | 4
      | 5
      | 6;
    const newDaysOfWeek =
      daysOfWeek.slice(0, dayIndex) +
      (daysOfWeek[dayIndex] === "0" ? "1" : "0") +
      daysOfWeek.slice(dayIndex + 1);
    customBoolHabits_[index].daysOfWeek = newDaysOfWeek;
    setCustomBoolHabits(customBoolHabits_);
  };

  const toggleAllDaysOfWeek = (index: number) => {
    const customBoolHabits_ = [...customBoolHabits];
    const daysOfWeek = customBoolHabits_[index].daysOfWeek;
    const newDaysOfWeek = daysOfWeek.includes("0") ? "1111111" : "0000000";
    customBoolHabits_[index].daysOfWeek = newDaysOfWeek;
    setCustomBoolHabits(customBoolHabits_);
  };

  const [newCustomBoolHabit, setNewCustomBoolHabit] = React.useState("");

  const handleNewCustomBoolHabitChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCustomBoolHabit(event.target.value);
  };

  const handleNewCustomBoolHabitAdd = () => {
    const customBoolHabits_ = [...customBoolHabits];
    customBoolHabits_.push({
      name: newCustomBoolHabit,
      daysOfWeek: "0000000",
    });
    setCustomBoolHabits(customBoolHabits_);
    setNewCustomBoolHabit("");
  };

  const handleCustomBoolHabitDelete = (index: number) => {
    const customBoolHabits_ = [...customBoolHabits];
    customBoolHabits_.splice(index, 1);
    setCustomBoolHabits(customBoolHabits_);
  };

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        height: "100%",
        backgroundColor: "#ffffff88",
        color: "black",
      }}
      className="tut-settings-create-habit"
    >
      <Stack
        direction="row"
        spacing={2}
        mb={2}
        // keep apart
        sx={{ width: "100%" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">Habits</Typography>
      </Stack>
      <List
        sx={{
          width: "100%",
          bgcolor: "#ffffff88",
          // scroll if longer than 300px
          maxHeight: 400,
          overflow: "auto",
        }}
      >
        {customBoolHabits.map((habit, index) => (
          <ListItem key={habit.name}>
            <ListItemButton onClick={() => toggleAllDaysOfWeek(index)}>
              <ListItemText primary={habit.name} />
            </ListItemButton>
            <Stack direction="row" spacing={2}>
              <ButtonGroup
                variant="text"
                aria-label="text button group"
                sx={{ display: "flex" }}
              >
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day, dayIndex) => (
                    <Button
                      key={day}
                      size="small"
                      onClick={() => handleDaysOfWeekChange(index, day)}
                      color={
                        habit.daysOfWeek[dayIndex] === "1"
                          ? "primary"
                          : "inherit"
                      }
                      variant="contained"
                    >
                      {day}
                    </Button>
                  )
                )}
              </ButtonGroup>
              <Button
                variant="contained"
                onClick={() => handleCustomBoolHabitDelete(index)}
              >
                Delete
              </Button>
            </Stack>
          </ListItem>
        ))}
        <ListItem
          secondaryAction={
            <Button
              variant="contained"
              onClick={handleNewCustomBoolHabitAdd}
              disabled={
                newCustomBoolHabit === "" ||
                customBoolHabits
                  .map((habit) => habit.name.toLowerCase())
                  .includes(newCustomBoolHabit.toLowerCase())
              }
            >
              Add
            </Button>
          }
        >
          <TextField
            label="New Habit"
            variant="standard"
            value={newCustomBoolHabit}
            onChange={handleNewCustomBoolHabitChange}
          />
        </ListItem>
      </List>
      <Stack
        direction="row"
        spacing={2}
        mb={2}
        // keep apart
        sx={{ width: "100%" }}
        justifyContent="space-between"
        alignItems="center"
      ></Stack>
    </Paper>
  );
};

export default CustomBoolHabits;
