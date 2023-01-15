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

  const task = tasks[event.id];

  const add_or_play = task ? (
    <StartTimer id={event.id} timeSpent={task.timeSpent} />
  ) : (
    <IconButton
      aria-label="create task"
      onClick={createTask}
      sx={{ color: "primary.main" }}
    >
      <Add />
    </IconButton>
  );

  return (
    <Card
      sx={{
        ":hover": {
          boxShadow: 20,
        },
        backgroundColor: "#00000088",
        color: "primary.main",
        width: "800px",
        maxWidth: "100%",
      }}
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
    </Card>
  );
};

export default Event;
