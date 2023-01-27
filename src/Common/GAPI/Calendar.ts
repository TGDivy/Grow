import { executeGAPI, EventType } from "./Utils";
import { taskType } from "../Types/Types";

export const getFutureEvents = (setEvents: (events: EventType[]) => void) => {
  const fetchFrom = new Date();
  fetchFrom.setHours(0,0,0,0)
  executeGAPI(() => {
    window.gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: fetchFrom.toISOString(),
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

// we want to add subtasks, tags, and description to event description
// we want to add/ replace sticker to event title

const getEventDescription = (task: taskType) => {
  // subtasks, and tags are present, add them to description
  // subtask is an array of subtask objects, with a title and a boolean
  // we want to add the title of the subtask, and a checkmark if it is completed
  // we want to add the tags to the description

  const subTasks = task.subTasks
    ? task.subTasks.map((subtask) => {
        return subtask.completed
          ? `✅ ${subtask.title}\n`
          : `❌ ${subtask.title}\n`;
      })
    : [];

  const tags = task.tags ? task.tags : [];

  const description = [...tags, ...subTasks, task.description].join("\n");

  return description;
};

const getEventTitle = (task: taskType) => {
  // if sticker is present, add it to title
  // the title might already have a sticker, so we want to replace it
  // if there is no sticker, we just want to add it to the title

  const sticker = task.sticker ? task.sticker : "";
  const title = task.title ? task.title : "";

  const eventTitle = title.includes("[")
    ? title.replace(/\[.*\]/, sticker)
    : `[${sticker}] ${title}`;

  return eventTitle;
};

export const createTaskEvent = (
  id: string,
  task: taskType,
  setEventCreated: (eventCreated: boolean) => void
) => {
  executeGAPI(() => {
    // due date is start date, it can be null, if so cancel event creation
    if (!task.dueDate) {
      return;
    }
    const evenTitle = getEventTitle(task);
    const eventDescription = getEventDescription(task);
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
        setEventCreated(true);
      })
      .catch((error) => {
        updateTaskEvent(id, task, setEventCreated);
      });
  });
};

export const updateTaskEvent = (
  id: string,
  task: taskType,
  setEventCreated: (eventCreated: boolean) => void
) => {
  executeGAPI(() => {
    // due date is start date, it can be null, if so cancel event creation
    if (!task.dueDate) {
      return;
    }
    const evenTitle = getEventTitle(task);
    const eventDescription = getEventDescription(task);
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
        setEventCreated(true);
      })
      .catch((error) => {
        console.log("Update fail", error);
      });
  });
};
