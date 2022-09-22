import styled from "@emotion/styled";
import { Edit, Expand, PlayArrow, Save } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
} from "@mui/material";
import propTypes from "prop-types";
import React, { useEffect, useState } from "react";

import Description from "./Description";
import DueDate from "./DueDate";
import Priority from "./Priority";
import SubTaskList from "./SubTaskList";
import Tags from "./Tags";
import Title from "./Title";

const today = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = yyyy + "-" + mm + "-" + dd;
  return formattedToday;
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Task = ({
  title,
  description,
  priority,
  subtasks,
  tags,
  setTasks,
  completed,
  taskKey,
}) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [subtasks_, setSubtasks] = useState(subtasks);

  const [editing, setEditing] = useState(false);
  const [title_, setTitle] = useState(title);
  const [description_, setDescription] = useState(description);
  const [dueDate, setDueDate] = useState(today());
  const [priority_, setPriority] = useState(priority);
  const [tags_, setTags] = useState(tags);
  const [completed_, setCompleted] = useState(completed);

  const handleEdit = () => {
    setEditing(true);
    setExpanded(true);
  };

  const handleSave = () => {
    setEditing(false);
    setTasks((prevState) => ({
      ...prevState,
      [taskKey]: {
        title: title_,
        description: description_,
        priority: priority_,
        subtasks: subtasks_,
        tags: tags_,
        completed: completed_,
      },
    }));
    console.log(priority);
  };

  const handleTaskComplete = () => {
    setCompleted(!completed_);
    if (!completed_) {
      setSubtasks(subtasks_.map((subTask) => [subTask[0], true]));
    }
    handleSave();
  };

  useEffect(() => {
    if (!editing) {
      handleSave();
    }
  }, [subtasks_]);

  return (
    <Card
      sx={{
        ":hover": {
          boxShadow: 20, // theme.shadows[20]
        },
      }}
    >
      <CardHeader
        title={
          <Title
            title={title_}
            editing={editing}
            setTitle={setTitle}
            completed={completed_}
            handleTaskComplete={handleTaskComplete}
          />
        }
        action={
          (editing && (
            <IconButton aria-label="save" onClick={handleSave}>
              <Save />
            </IconButton>
          )) || (
            <IconButton aria-label="edit" onClick={handleEdit}>
              <Edit />
            </IconButton>
          )
        }
        // subheader={}
      />
      <CardContent sx={{ padding: "5px 20px 5px 20px" }}>
        <Tags tags={tags_} editing={editing} setTags={setTags} />
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          paddingBottom: 0,
          marginBottom: 0,
        }}
      >
        <Grid container>
          <Grid item xs={3}>
            <Priority
              priority={priority_}
              editing={editing}
              setPriority={setPriority}
            />
          </Grid>
          <Grid item xs={6}>
            <DueDate
              dueDate={dueDate}
              editing={editing}
              setDueDate={setDueDate}
            />
          </Grid>
          <Grid item>
            <IconButton
              sx={{ padding: "0px 0px 0px 0px", margin: 0 }}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <PlayArrow />
            </IconButton>
          </Grid>
        </Grid>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Expand />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          sx={{
            marginTop: 0,
            marginBottom: 0,
            paddingTop: 0,
            "&:last-child": {
              paddingBottom: 1,
            },
          }}
        >
          {/* <Divider /> */}
          <SubTaskList
            subTasks={subtasks_}
            setSubTasks={setSubtasks}
            editing={editing}
          />
          <Description
            description={description_}
            editing={editing}
            setDescription={setDescription}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
};

Task.propTypes = {
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  priority: propTypes.string.isRequired,
  subtasks: propTypes.arrayOf(propTypes.array).isRequired,
  tags: propTypes.arrayOf(propTypes.string).isRequired,
  setTasks: propTypes.func.isRequired,
  completed: propTypes.bool.isRequired,
  taskKey: propTypes.string.isRequired,
};

export default Task;
