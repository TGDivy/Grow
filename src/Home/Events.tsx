import React, { useEffect } from "react";
import { getFutureEvents } from "../Common/GAPI/Calendar";
import { EventType } from "../Common/GAPI/Utils";

import {
  Button,
  Typography,
  Stack,
  Box,
  Grid,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore, Refresh } from "@mui/icons-material";

import Event from "./Event";

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
    <>
      <Accordion
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          ":hover": {
            boxShadow: 20,
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            // flexDirection: "row-reverse",
            " .MuiAccordionSummary-content": {
              flexGrow: 0,
            },
          }}
          onClick={() => fetchFutureEvents()}
          className="tut-home-brief"
        >
          <Typography variant="h6" color="primary">
            {"Schedule"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            pt: 2,
            bgcolor: "rgba(255, 255, 255, 0.05)",
          }}
        >
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
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Events;
