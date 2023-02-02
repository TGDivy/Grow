import React, { useEffect } from "react";
import { getFutureEvents } from "../Common/GAPI/Calendar";
import { EventType } from "../Common/GAPI/Utils";

import { Typography, Stack, Box, Grid } from "@mui/material";

import Event from "./Event";
import StyledAccordion from "../Common/ReusableComponents/StyledAccordion";

const Events = () => {
  const [events, setEvents] = React.useState<EventType[]>([]);
  console.log(events);

  const fetchFutureEvents = async () => {
    await getFutureEvents(setEvents);
  };

  useEffect(() => {
    // showFutureEvents();
  }, []);

  const sortedEvents = events.sort((a, b) => {
    const aStart = new Date(a.start.dateTime);
    const bStart = new Date(b.start.dateTime);
    return aStart.getTime() - bStart.getTime();
  });

  // group events by day
  const eventsByDay: { [key: string]: EventType[] } = {};
  sortedEvents.forEach((event) => {
    const eventDate = new Date(event.start.dateTime);
    // day format: "Tue, 14 Feb"
    const eventDay = eventDate.toLocaleDateString([], {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

    if (eventsByDay[eventDay]) {
      eventsByDay[eventDay].push(event);
    } else {
      eventsByDay[eventDay] = [event];
    }
  });

  return (
    <StyledAccordion title="Schedule" onClick={() => fetchFutureEvents()}>
      <Grid container justifyContent="center" spacing={2}>
        {Object.keys(eventsByDay).map((day) => {
          return (
            <Grid item xs={12} md={10} key={day}>
              <Box>
                <Typography variant="h5">{day}</Typography>
                <Stack spacing={2}>
                  {eventsByDay[day].map((event) => {
                    return <Event event={event} key={event.id} />;
                  })}
                </Stack>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </StyledAccordion>
  );
};

export default Events;
