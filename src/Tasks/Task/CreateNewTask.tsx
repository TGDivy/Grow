import React, { FC, useState } from "react";
import { Props } from "react-confetti";
import { taskType } from "../../Common/Types/Types";
import useTaskStore from "../../Common/Stores/TaskStore";
import { Save, Edit, Delete, ExpandLess } from "@mui/icons-material";
import {
  ClickAwayListener,
  CardHeader,
  IconButton,
  CardContent,
  Divider,
  Box,
  CardActions,
  Grid,
  Checkbox,
  Button,
  Collapse,
  TextField,
  Stack,
  CardMedia,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import StyledCard from "../../Common/ReusableComponents/StyledCard";
import CreateEvent from "./CreateEvent";
import DueDate from "./DueDate";
import StartTimer from "./StartTimer";
import Sticker from "./Sticker";
import SubTaskList from "./SubTaskList";
import Tags from "./Tags";
import Title from "./Title";
import Description from "./Description";
import StyledButton from "../../Common/ReusableComponents/StyledButton";

interface taskFC extends taskType {
  id: string;
  alwaysExpanded?: boolean;
  handleCreateNewTask?: () => void;
  handleExit?: () => void;
  hoverShadow?: boolean;
}

// Function to get a random image from Unsplash
// https://api.unsplash.com/
// GET /photos/random

const CreateNewTask: FC<taskFC> = (props) => {
  const addTask = useTaskStore((state) => state.addTask);

  const [expanded, setExpanded] = useState(props.alwaysExpanded);
  const [subtasks_, setSubtasks] = useState(props.subTasks);

  const [title_, setTitle] = useState(props.title);
  const [description_, setDescription] = useState(props.description);
  const [priority_, setPriority] = useState(props.priority);
  const [tags_, setTags] = useState(props.tags);
  const [sticker_, setSticker] = useState(props.sticker);
  const [completed_, setCompleted] = useState(props.completed);
  const [dueDate_, setDueDate] = useState<Date | null>(props.dueDate);

  const editing = true;

  const handleSave = () => {
    console.log("Saving...");
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
    setTitle("");
    setDescription("");
    setPriority(false);
    setSubtasks([]);
    setTags([]);
    if (props.handleCreateNewTask) {
      props.handleCreateNewTask();
    }
  };

  return (
    <>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        Create New Task{" "}
        <Sticker sticker={sticker_} setSticker={setSticker} editing={editing} />
      </DialogTitle>
      <CardMedia
        component="img"
        image="https://images.unsplash.com/photo-1578852612716-854e527abf2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        alt="Live from space album cover"
        height="140"
      />
      <CardHeader
        title={
          <TextField
            id="outlined-basic"
            label="Title"
            size="small"
            variant="filled"
            fullWidth
            value={title_ === "" ? undefined : title_}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            sx={{
              "& .MuiInputBase-root": {
                borderBottom: "0px solid",
                "&::before": {
                  borderBottom: "0px solid",
                },
                "&::after": {
                  borderBottom: "0px solid",
                },
              },
            }}
          />
        }
      />
      <CardContent sx={{ pt: 2, pb: 0, mb: 0, flexGrow: 1 }}>
        <SubTaskList
          subTasks={subtasks_}
          setSubTasks={setSubtasks}
          handleSave={() => {
            console.log("Saving...");
          }}
          editing={editing}
        />
      </CardContent>
      <Stack sx={{ flexGrow: 0 }} spacing={1}>
        <Box
          sx={{
            // display: "flex",
            justifyContent: "center",
            textAlign: "center",
            // overflowY: "scroll",
          }}
        >
          <Tags tags={tags_} setTags={setTags} editing={editing} />
        </Box>
      </Stack>

      <TextField
        // label="Description"
        placeholder="Write any additional details here..."
        margin="normal"
        variant="filled"
        value={description_}
        multiline
        minRows={4}
        maxRows={8}
        fullWidth
        onChange={(event) => {
          setDescription(event.target.value);
        }}
        sx={{
          "& .MuiInputBase-root": {
            borderBottom: "0px solid",
            "&::before": {
              borderBottom: "0px solid",
            },
            "&::after": {
              borderBottom: "0px solid",
            },
          },
        }}
      />

      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Delete />}
          onClick={props.handleExit}
          fullWidth
        >
          Cancel
        </Button>
        <StyledButton
          variant="contained"
          color="primary"
          startIcon={<Save />}
          onClick={handleSave}
          fullWidth
        >
          Save
        </StyledButton>
      </DialogActions>
    </>
  );
};

export default CreateNewTask;
