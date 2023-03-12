import React, { useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import useHabitsStore, {
  HabitType,
  getNextDueDates,
} from "../Common/Stores/HabitsStore";
import StyledButton from "../Common/ReusableComponents/StyledButton";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import "./styles.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(BigCalendar);

const habitsToEvents = (habits: HabitType[]) => {
  const events = habits.map((habit) => {
    const nextDueDates = getNextDueDates(habit.frequencyType);
    return nextDueDates.map((nextDueDate) => {
      return {
        title: habit.title,
        start: nextDueDate,
        end: nextDueDate,
        allDay: true,
        id: habit.habitId,
      };
    });
  });
  return events.flat();
};

const calendarStyle = {
  // conver to mui
  "& .rbc-today": {
    backgroundColor: "primary.container",
  },
};

const Calendar = () => {
  const habits = useHabitsStore((state) => state.habits);
  const habitList = Object.values(habits);
  const [events, setEvents] = useState(habitsToEvents(habitList));

  // replace each component with mui components
  const components = {
    event: (props: any) => {
      const { event } = props;
      return (
        <Box onClick={() => props.onSelectEvent(event)}>
          <Typography variant="body2">{event.title}</Typography>
        </Box>
      );
    },

    eventWrapper: (props: any) => {
      const { event } = props;
      return (
        <Box
          onClick={() => props.onSelectEvent(event)}
          sx={{ backgroundColor: "surfaceVariant.main", p: 0.5 }}
        >
          {props.children}
        </Box>
      );
    },

    toolbar: (props: any) => {
      const { views, onView, view, onNavigate, date } = props;
      return (
        <Box
          sx={{
            backgroundColor: "surfaceVariant.main",
            color: "surfaceVariant.contrastText",
            mt: 2,
            mb: 2,
            p: 1,
          }}
        >
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <Grid item xs={12} md={3}>
              <ToggleButtonGroup
                value={view}
                exclusive
                onChange={(e, v) => onView(v)}
              >
                {views.map((v: any) => (
                  <ToggleButton key={v} value={v} size="small">
                    {v}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6">{props.label}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <IconButton onClick={() => onNavigate("PREV")} size="small">
                <ArrowBack />
              </IconButton>
              <Button
                onClick={() => onNavigate("TODAY")}
                variant={
                  moment().isSame(date, "day") ? "contained" : "outlined"
                }
              >
                Today
              </Button>
              <IconButton onClick={() => onNavigate("NEXT")} size="small">
                <ArrowForward />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      );
    },
  };

  return (
    <Box sx={calendarStyle}>
      <DnDCalendar
        localizer={localizer}
        events={events}
        resizable
        defaultDate={moment().toDate()}
        style={{ minHeight: "500px" }}
        defaultView="month"
        onDoubleClickEvent={(event) => {
          console.log(event);
        }}
        onSelectEvent={(event) => {
          console.log(event);
        }}
        onEventDrop={(event) => {
          console.log(event);
        }}
        views={["month", "agenda"]}
        components={components}
        elementProps={{
          style: {
            color: "red",
          },
        }}
      />
    </Box>
  );
};

export default Calendar;
