import { executeGAPI, EventType } from "./Utils";

export const getFutureEvents = (setEvents: (events: EventType[]) => void) => {
  executeGAPI(() => {
    window.gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      })
      .then((response) => {
        const events = response.result.items as EventType[];
        setEvents(events);
      });
  });
};
