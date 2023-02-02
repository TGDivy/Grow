import React, { FC, useState } from "react";
import { EventType } from "../Common/GAPI/Utils";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  ClickAwayListener,
  Collapse,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import { Add, ExpandLess, PlayArrow } from "@mui/icons-material";
import Description from "../Tasks/Task/Description";
import Title from "../Tasks/Task/Title";
import useUserStore from "../Common/Stores/User";
import useTaskStore from "../Common/Stores/TaskStore";
import StartTimer from "../Tasks/Task/StartTimer";
import StyledCard from "../Common/ReusableComponents/StyledCard";

interface Props {
  event: EventType;
}

const Event: FC<Props> = ({ event }) => {
  const [expanded, setExpanded] = useState(false);
  const possibleStickers = useUserStore((state) => state.stickers);
  const addTask = useTaskStore((state) => state.addTask);
  const tasks = useTaskStore((state) => state.tasks);
  const startTime = new Date(event.start.dateTime);
  const endTime = new Date(event.end.dateTime);

  const displayTime = `${startTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} - ${endTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  const empty = () => {
    return;
  };
  // check if event title contains a sticker
  const sticker = possibleStickers.find((sticker) =>
    event.summary.toLowerCase().includes(sticker.toLowerCase())
  );

  console.log("sticker", sticker);

  const createTask = () => {
    addTask(
      {
        title: event.summary,
        description: event.description,
        dueDate: new Date(event.start.dateTime),
        taskListName: "Tasks",
        priority: false,
        subTasks: [],
        tags: [],
        completed: false,
        dateUpdated: new Date(),
        timeSpent: 0,
        sticker: sticker || "",
      },
      event.id
    );
  };

  let id = event.id;

  let task = tasks[id];
  if (!task) {
    // add dashes to event id to make it a valid task id
    // add them after 8, 12, 16, and 20 characters
    id = event.id.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, "$1-$2-$3-$4-$5");
    task = tasks[id];
  }

  const add_or_play = task ? (
    <StartTimer id={id} timeSpent={task.timeSpent} />
  ) : (
    <IconButton aria-label="create task" onClick={createTask}>
      <Add />
    </IconButton>
  );

  return (
    <StyledCard
      onClick={() => {
        if (!expanded) {
          setExpanded(true);
        }
      }}
      className="tut-task-card"
    >
      <CardHeader
        title={
          <Title
            title={event.summary}
            editing={false}
            setTitle={empty}
            priority={false}
            setPriority={empty}
          />
        }
        action={add_or_play}
      />
      <CardContent sx={{ padding: "5px 20px 5px 20px" }}>
        <Divider
          textAlign="left"
          sx={{
            alignItems: "center",
            justifyContent: "center",

            "&.MuiDivider-root": {
              color: "primary.main",
              py: 1,
              "&::before": {
                borderTopWidth: 2,
                borderTopStyle: "solid",
                borderTopColor: "primary.main",
              },
              "&::after": {
                borderTopWidth: 2,
                borderTopStyle: "solid",
                borderTopColor: "primary.main",
                width: "100%",
              },
            },
          }}
        >
          {displayTime}
        </Divider>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          sx={{
            marginBottom: 0,
            paddingTop: 0,
            "&:last-child": {
              paddingBottom: 1,
            },
          }}
        >
          <Description
            description={event.description}
            editing={false}
            setDescription={empty}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
              zIndex: 100,
            }}
          >
            <IconButton
              aria-label="collapse"
              onClick={() => {
                setExpanded(false);
              }}
            >
              <ExpandLess />
            </IconButton>
          </Box>
        </CardContent>
      </Collapse>
    </StyledCard>
  );
};

export default Event;
