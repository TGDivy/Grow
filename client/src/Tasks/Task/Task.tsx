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
import React, { useEffect, useState, FC } from "react";

import Description from "./Description";
import Priority from "./Priority";
import StartTimer from "./StartTimer";
import SubTaskList from "./SubTaskList";
import Tags from "./Tags";
import Title from "./Title";
import { taskType, tasksListType, priorityType } from "../../Stores/Types";

interface taskFC extends taskType {
  setTasks: (tasks: any) => void;
  taskKey: string;
  createNewTask: boolean;
}

const Task: FC<taskFC> = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [subtasks_, setSubtasks] = useState(props.subTasks);

  const [editing, setEditing] = useState(props.createNewTask);
  const [title_, setTitle] = useState(props.title);
  const [description_, setDescription] = useState(props.description);
  const [priority_, setPriority] = useState(props.priority);
  const [tags_, setTags] = useState(props.tags);
  const [completed_, setCompleted] = useState(props.completed);

  const handleEdit = () => {
    setEditing(true);
    setExpanded(true);
  };

  const handleSave = () => {
    console.log("Saving...");
    if (props.createNewTask) {
      props.setTasks((tasks: tasksListType) => {
        const newTask: taskType = {
          taskListName: props.taskListName,
          title: title_,
          description: description_,
          priority: priority_,
          subTasks: subtasks_,
          tags: tags_,
          completed: completed_,
          dueDate: new Date(),
        };
        return { [props.taskKey]: newTask, ...tasks };
      });
      setExpanded(false);
      setCompleted(false);
      setTitle("Create Task");
      setDescription("");
      setPriority(priorityType.Medium);
      setSubtasks([]);
      setTags([]);
    } else {
      setEditing(false);
      props.setTasks((prevState: tasksListType) => ({
        ...prevState,
        [props.taskKey]: {
          title: title_,
          description: description_,
          priority: priority_,
          subtasks: subtasks_,
          tags: tags_,
          completed: completed_,
        },
      }));
      console.log(props.priority);
    }
  };

  const handleTaskComplete = () => {
    if (!props.createNewTask) {
      setCompleted(!completed_);
      if (!completed_) {
        setSubtasks(subtasks_.map((subTask) => [subTask[0], true]));
      }
      handleSave();
    }
  };

  useEffect(() => {
    if (!editing && !props.createNewTask) {
      handleSave();
    }
  }, [subtasks_]);

  return (
    <ClickAwayListener
      onClickAway={() => {
        setExpanded(false);
        if (!props.createNewTask) {
          setEditing(false);
        }
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
              {!props.createNewTask && <StartTimer />}
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

export default Task;
