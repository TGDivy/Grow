import { Edit, Save } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  ClickAwayListener,
  Collapse,
  Grid,
  IconButton,
} from "@mui/material";
import propTypes from "prop-types";
import React, { useEffect, useState } from "react";

import Description from "./Description";
import Priority from "./Priority";
import StartTimer from "./StartTimer";
import SubTaskList from "./SubTaskList";
import Tags from "./Tags";
import Title from "./Title";

const Task = ({
  title,
  description,
  priority,
  subtasks,
  tags,
  setTasks,
  completed,
  taskKey,
  createNewTask,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [subtasks_, setSubtasks] = useState(subtasks);

  const [editing, setEditing] = useState(false);
  const [title_, setTitle] = useState(title);
  const [description_, setDescription] = useState(description);
  const [priority_, setPriority] = useState(priority);
  const [tags_, setTags] = useState(tags);
  const [completed_, setCompleted] = useState(completed);

  const handleEdit = () => {
    setEditing(true);
    setExpanded(true);
  };

  const handleSave = () => {
    console.log("Saving...");
    if (createNewTask) {
      setEditing(false);
      setTasks((tasks) => {
        const newTask = {
          title: title_,
          description: description_,
          priority: priority_,
          subtasks: subtasks_,
          tags: tags_,
          completed: completed_,
        };
        return { [taskKey]: newTask, ...tasks };
      });
      setExpanded(false);
      setCompleted(false);
      setTitle("Create Task");
      setDescription("");
      setPriority("medium");
      setSubtasks([]);
      setTags([]);
    } else {
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
    }
  };

  const handleTaskComplete = () => {
    if (!createNewTask) {
      setCompleted(!completed_);
      if (!completed_) {
        setSubtasks(subtasks_.map((subTask) => [subTask[0], true]));
      }
      handleSave();
    }
  };

  useEffect(() => {
    if (!editing && !createNewTask) {
      handleSave();
    }
  }, [subtasks_]);

  return (
    <ClickAwayListener
      onClickAway={() => {
        setExpanded(false);
        setEditing(false);
      }}
    >
      <Card
        sx={{
          ":hover": {
            boxShadow: 20, // theme.shadows[20]
          },
        }}
        onClick={() => {
          setExpanded(true);
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
        />
        <CardContent sx={{ padding: "5px 20px 5px 20px" }}>
          <Tags tags={tags_} editing={editing} setTags={setTags} />
        </CardContent>
        <CardActions>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={1}>
              <Priority
                priority={priority_}
                editing={editing}
                setPriority={setPriority}
              />
            </Grid>
            <Grid item xs={6}>
              <StartTimer />
            </Grid>
          </Grid>
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
    </ClickAwayListener>
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
  createNewTask: propTypes.bool.isRequired,
};

export default Task;
