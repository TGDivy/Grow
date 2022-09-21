import React, { useState } from "react";
import propTypes from "prop-types";
import { IconButton, useTheme } from "@mui/material";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Collapse,
  Chip,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Box,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  TextField,
  Menu,
  ClickAwayListener,
} from "@mui/material";
import {
  Favorite,
  Expand,
  Tag,
  Edit,
  Save,
  Add,
  Delete,
  Done,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { TransitionGroup } from "react-transition-group";

import styled from "@emotion/styled";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect } from "react";

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

const Title = ({ title, editing, setTitle }) => {
  Title.propTypes = {
    title: propTypes.string.isRequired,
    editing: propTypes.bool.isRequired,
    setTitle: propTypes.func.isRequired,
  };

  if (editing) {
    return (
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        size="small"
        defaultValue={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
    );
  }
  return <Typography variant="h5">{title}</Typography>;
};

const Description = ({ description, editing, setDescription }) => {
  Description.propTypes = {
    description: propTypes.string.isRequired,
    editing: propTypes.bool.isRequired,
    setDescription: propTypes.func.isRequired,
  };

  if (editing) {
    return (
      <TextField
        id="standard-multiline-static"
        label="Description"
        variant="standard"
        defaultValue={description}
        multiline
        rows={4}
        fullWidth
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
    );
  }
  return <Typography variant="body2">{description}</Typography>;
};

const Tags = ({ tags, editing, setTags }) => {
  Tags.propTypes = {
    tags: propTypes.array.isRequired,
    editing: propTypes.bool.isRequired,
    setTags: propTypes.func.isRequired,
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const tagsList = [
    "Engineering",
    "Research",
    "Planning",
    "Study",
    "Applications",
    "Chore",
  ];

  const [open, setOpen] = useState(false);

  const handleClickOpen = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleAddTag = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };
  const ITEM_HEIGHT = 48;

  if (editing) {
    return (
      <>
        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "15ch",
            },
          }}
        >
          {tagsList
            .filter((tag) => !tags.includes(tag))
            .map((tag) => (
              <MenuItem
                key={tag}
                onClick={() => {
                  handleAddTag(tag);
                }}
              >
                {tag}
              </MenuItem>
            ))}
        </Menu>
        <Box sx={{ display: "flex", flexWrap: "wrap", paddingTop: 1 }}>
          <Chip
            style={{
              width: "30px",
              height: "25px",
              paddingLeft: "8px",
              marginBottom: "5px",
            }}
            icon={<Add />}
            color="primary"
            onClick={handleClickOpen}
            size="small"
          />

          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              onDelete={() => handleDeleteTag(tag)}
            />
          ))}
        </Box>
      </>
    );
  }
  return (
    <>
      {tags.map((tag) => (
        <Chip key={tag} label={tag} size="small" />
      ))}
    </>
  );
};

const SubTaskList = ({ subTasks, editing, setSubTasks }) => {
  SubTaskList.propTypes = {
    subTasks: propTypes.array.isRequired,
    editing: propTypes.bool.isRequired,
    setSubTasks: propTypes.func.isRequired,
  };

  const [subTask, setSubTask] = useState(["", false]);

  const handleAddSubTask = () => {
    setSubTasks([...subTasks, subTask]);
    setSubTask(["", false]);
  };

  const handleDeleteSubTask = (subTaskToDelete) => {
    setSubTasks(subTasks.filter((subTask) => subTask !== subTaskToDelete));
  };

  const handleToggleSubTask = (index) => {
    const array = [...subTasks];
    array[index][1] = !array[index][1];
    setSubTasks(array);
  };

  const handleSubTaskChange = (event, index) => {
    const array = [...subTasks];
    array[index][0] = event.target.value;
    setSubTasks(array);
  };

  return (
    <>
      <List
        dense
        sx={{
          paddingTop: 0,
          marginTop: 0,
          paddingBottom: 0,
          marginBottom: 0,
        }}
      >
        <TransitionGroup>
          {subTasks.map((subTask, index) => (
            <Collapse key={index}>
              <ListItem
                secondaryAction={
                  editing && (
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteSubTask(subTask)}
                    >
                      <Delete />
                    </IconButton>
                  )
                }
              >
                <Checkbox
                  edge="start"
                  checked={subTask[1]}
                  onClick={() => handleToggleSubTask(index)}
                />
                {editing ? (
                  <TextField
                    id="small"
                    size="small"
                    variant="standard"
                    value={subTasks[index][0]}
                    onChange={(event) => {
                      handleSubTaskChange(event, index);
                    }}
                  />
                ) : (
                  <ListItemText>
                    <Typography
                      variant="body1"
                      sx={{
                        textDecoration: subTask[1] ? "line-through" : "none",
                        color: subTask[1] ? "gray" : "black",
                      }}
                    >
                      {subTask[0]}
                    </Typography>
                  </ListItemText>
                )}
              </ListItem>
            </Collapse>
          ))}
        </TransitionGroup>
        {editing && (
          <ListItem
            key="Add Subtask"
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={handleAddSubTask}
              >
                <Add />
              </IconButton>
            }
          >
            <Checkbox edge="start" checked={false} />
            <TextField
              id="small"
              size="small"
              variant="standard"
              value={subTask[0]}
              onChange={(event) => {
                setSubTask([event.target.value, false]);
              }}
            />
          </ListItem>
        )}
      </List>
    </>
  );
};

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
  const [priority_, setPriority] = useState("");
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
        title={<Title title={title_} editing={editing} setTitle={setTitle} />}
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
        subheader={<Tags tags={tags_} editing={editing} setTags={setTags} />}
      />
      <CardActions
        disableSpacing
        sx={{
          paddingBottom: 0,
          marginBottom: 0,
        }}
      >
        <IconButton aria-label="complete task">
          <Checkbox checked={completed_} onChange={handleTaskComplete} />
        </IconButton>

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
