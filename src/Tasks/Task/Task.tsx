import { Delete, Edit, ExpandLess, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  ClickAwayListener,
  Collapse,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useState, FC } from "react";

import Description from "./Description";
import StartTimer from "./StartTimer";
import SubTaskList from "./SubTaskList";
import Tags from "./Tags";
import Title from "./Title";
import { subtaskType, taskType } from "../../Common/Types/Types";

import useTaskStore from "../../Common/Stores/TaskStore";
import Sticker from "./Sticker";
import { useTour } from "@reactour/tour";
import DueDate from "./DueDate";
import CreateEvent from "./CreateEvent";
import StyledCard from "../../Common/ReusableComponents/StyledCard";

interface taskFC extends taskType {
  id: string;
  createNewTask: boolean;
  alwaysExpanded?: boolean;
  startTimerButton?: boolean;
  handleCreateNewTask?: () => void;
}

const Task: FC<taskFC> = (props) => {
  const addTask = useTaskStore((state) => state.addTask);
  const editTask = useTaskStore((state) => state.editTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const [expanded, setExpanded] = useState(props.alwaysExpanded);
  const [subtasks_, setSubtasks] = useState(props.subTasks);

  const [editing, setEditing] = useState(props.createNewTask);
  const [title_, setTitle] = useState(props.title);
  const [description_, setDescription] = useState(props.description);
  const [priority_, setPriority] = useState(props.priority);
  const [tags_, setTags] = useState(props.tags);
  const [sticker_, setSticker] = useState(props.sticker);
  const [completed_, setCompleted] = useState(props.completed);
  const [dueDate_, setDueDate] = useState<Date | null>(props.dueDate);
  const { setIsOpen, isOpen } = useTour();
  const handleEdit = () => {
    setEditing(true);
    setExpanded(true);
  };

  const handleSave = () => {
    console.log("Saving...");
    if (props.createNewTask) {
      if (isOpen) setIsOpen(false);
      addTask(
        {
          taskListName: props.taskListName,
          title: title_,
          description: description_,
          priority: priority_,
          subTasks: subtasks_,
          tags: tags_,
          completed: completed_,
          dateUpdated: new Date(),
          timeSpent: props.timeSpent,
          sticker: sticker_,
          dueDate: dueDate_,
        },
        props.id
      );
      if (!props.alwaysExpanded) setExpanded(false);
      setCompleted(false);
      setTitle("Create Task");
      setDescription("");
      setPriority(false);
      setSubtasks([]);
      setTags([]);
      if (props.handleCreateNewTask) {
        props.handleCreateNewTask();
      }
    } else {
      setEditing(false);
      editTask(
        {
          taskListName: props.taskListName,
          title: title_,
          description: description_,
          priority: priority_,
          subTasks: subtasks_,
          tags: tags_,
          completed: completed_,
          dateUpdated: new Date(),
          timeSpent: props.timeSpent,
          sticker: sticker_,
          dueDate: dueDate_,
        },
        props.id
      );
    }
  };

  const handleSubTaskToggle = (subTasks: Array<subtaskType>) => {
    editTask(
      {
        taskListName: props.taskListName,
        title: title_,
        description: description_,
        priority: priority_,
        subTasks: subTasks,
        tags: tags_,
        completed: completed_,
        dateUpdated: new Date(),
        timeSpent: props.timeSpent,
        sticker: sticker_,
        dueDate: dueDate_,
      },
      props.id
    );
  };

  const handleTaskComplete = () => {
    if (!props.createNewTask) {
      editTask(
        {
          taskListName: props.taskListName,
          title: title_,
          description: description_,
          priority: priority_,
          subTasks: subtasks_.map((subTask) => {
            return { title: subTask.title, completed: true };
          }),
          tags: tags_,
          completed: !completed_,
          dateUpdated: new Date(),
          timeSpent: props.timeSpent,
          sticker: sticker_,
          dueDate: dueDate_,
        },
        props.id
      );
      if (!completed_) {
        setSubtasks(
          subtasks_.map((subTask) => {
            return { title: subTask.title, completed: true };
          })
        );
      }
      setCompleted(!completed_);
    }
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (!props.createNewTask) {
          setEditing(false);
        }
      }}
    >
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
            <>
              <Title
                title={title_}
                editing={editing}
                setTitle={setTitle}
                priority={priority_}
                setPriority={setPriority}
              />
            </>
          }
          action={
            true &&
            ((editing && (
              <IconButton
                aria-label="save"
                onClick={handleSave}
                className="tut-task-save"
              >
                <Save />
              </IconButton>
            )) || (
              <IconButton aria-label="edit" onClick={handleEdit}>
                <Edit />
              </IconButton>
            ))
          }
        />

        <CardContent
          sx={{ padding: "5px 20px 5px 20px", position: "relative" }}
        >
          {editing && (
            <Box
              sx={{
                right: "0px",
                top: "0px",
              }}
            >
              <DueDate
                dueDate={dueDate_}
                setDueDate={setDueDate}
                editing={editing}
              />
            </Box>
          )}
          <Divider
            textAlign="left"
            sx={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              position: "relative",
              "&.MuiDivider-root": {
                color: "outline",
                py: 1,
                "&::before": {
                  borderTopWidth: 2,
                  borderTopStyle: "solid",
                  borderTopColor: "outline",
                },
                "&::after": {
                  borderTopWidth: 2,
                  borderTopStyle: "solid",
                  borderTopColor: "outline",
                  width: "100%",
                },
              },
            }}
          >
            {(editing || sticker_ || dueDate_) && (
              <>
                <Sticker
                  sticker={sticker_}
                  setSticker={setSticker}
                  editing={editing}
                />
                {!editing &&
                  dueDate_ &&
                  (!sticker_ ? (
                    <DueDate
                      dueDate={dueDate_}
                      setDueDate={setDueDate}
                      editing={editing}
                    />
                  ) : (
                    dueDate_ && (
                      <Box
                        sx={{
                          position: "absolute",
                          right: "0px",
                          top: "0px",
                        }}
                      >
                        <DueDate
                          dueDate={dueDate_}
                          setDueDate={setDueDate}
                          editing={editing}
                        />
                      </Box>
                    )
                  ))}
              </>
            )}
          </Divider>
        </CardContent>
        <CardActions>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                {!editing && (
                  <Checkbox
                    checked={completed_}
                    onChange={handleTaskComplete}
                    size="medium"
                  />
                )}
                {!completed_ && <CreateEvent taskId={props.id} />}
              </Box>
            </Grid>

            <Grid item xs={6}>
              {props.startTimerButton && !editing && (
                <StartTimer id={props.id} timeSpent={props.timeSpent} />
              )}
              {!props.createNewTask && editing && (
                <Button
                  aria-label="delete"
                  onClick={() => {
                    deleteTask(props.id);
                  }}
                  fullWidth
                  variant="contained"
                  size="small"
                >
                  <Delete />
                </Button>
              )}
            </Grid>
          </Grid>
        </CardActions>
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
            <Box sx={{ py: 1 }}>
              <Tags tags={tags_} editing={editing} setTags={setTags} />
            </Box>
            <SubTaskList
              subTasks={subtasks_}
              setSubTasks={setSubtasks}
              handleSave={handleSubTaskToggle}
              editing={editing}
            />
            <Description
              description={description_}
              editing={editing}
              setDescription={setDescription}
            />

            {/* Collapse button */}
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
    </ClickAwayListener>
  );
};

export default Task;
