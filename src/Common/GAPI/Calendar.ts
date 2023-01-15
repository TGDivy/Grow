import { executeGAPI, EventType } from "./Utils";
import { taskType } from "../Types/Types";

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

export const createSampleEvent = () => {
  executeGAPI(() => {
    const event = {
      summary: "Google I/O 2015",
      location: "800 Howard St., San Francisco, CA 94103",
      description: "A chance to hear more about Google's developer products.",
      start: {
        dateTime: "2021-01-28T09:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: "2021-01-28T17:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    };

    window.gapi.client.calendar.events
      .insert({
        calendarId: "primary",
        resource: event,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

export const createTaskEvent = (id: string, task: taskType) => {
  executeGAPI(() => {
    // due date is start date, it can be null, if so cancel event creation
    if (!task.dueDate) {
      return;
    }
    // if sticker is present, add it to title
    const evenTitle = task.sticker
      ? `[${task.sticker}] ${task.title}`
      : task.title;

    // subtasks, and tags are present, add them to description
    const eventDescription = `${task.tags} ${task.description} ${task.subTasks} `;
    // remove dashes from id
    const even_id = id.replace(/-/g, "");
    const event = {
      id: even_id,
      summary: evenTitle,
      description: eventDescription,
      start: {
        dateTime: task.dueDate.toISOString(),
        // get local time zone
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      // end date is 1 hour after start date
      end: {
        dateTime: new Date(
          task.dueDate.getTime() + 60 * 60 * 1000
        ).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    };

    window.gapi.client.calendar.events
      .insert({
        calendarId: "primary",
        resource: event,
      })
      .then((response) => {
        window.open(response.result.htmlLink);
      })
      .catch((error) => {
        updateTaskEvent(id, task);
      });
  });
};

export const updateTaskEvent = (id: string, task: taskType) => {
  executeGAPI(() => {
    // due date is start date, it can be null, if so cancel event creation
    if (!task.dueDate) {
      return;
    }
    // if sticker is present, add it to title
    const evenTitle = task.sticker
      ? `[${task.sticker}] ${task.title}`
      : task.title;

    // subtasks, and tags are present, add them to description
    const eventDescription = `${task.tags} ${task.description} ${task.subTasks} `;
    // remove dashes from id
    const even_id = id.replace(/-/g, "");
    const event = {
      id: even_id,
      summary: evenTitle,
      description: eventDescription,
      start: {
        dateTime: task.dueDate.toISOString(),
        // get local time zone
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      // end date is 1 hour after start date
      end: {
        dateTime: new Date(
          task.dueDate.getTime() + 60 * 60 * 1000
        ).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    };

    window.gapi.client.calendar.events
      .update({
        calendarId: "primary",
        eventId: even_id,
        resource: event,
      })
      .then((response) => {
        window.open(response.result.htmlLink);
      })
      .catch((error) => {
        console.log("Update fail", error);
      });
  });
};
