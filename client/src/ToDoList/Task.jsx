import React, { useState } from "react";
import propTypes from "prop-types";
import { IconButton } from "@mui/material";
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
} from "@mui/material";
import { Favorite, Expand, Tag, Edit, Save, Add } from "@mui/icons-material";
import styled from "@emotion/styled";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
        id="outlined-basic"
        label="Description"
        variant="outlined"
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

  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddTag = () => {
    setTags([...tags, tag]);
    setTag("");
    setOpen(false);
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  if (editing) {
    return (
      <>
        <Dialog
          open={open}
          TransitionComponent={Slide}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Add Tag"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <TextField
                id="outlined-basic"
                label="Tag"
                variant="outlined"
                value={tag}
                onChange={(event) => {
                  setTag(event.target.value);
                }}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddTag}>Add</Button>
          </DialogActions>
        </Dialog>
        <div>
          <Chip icon={<Add />} onClick={handleClickOpen} size="small" />
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              onDelete={() => handleDeleteTag(tag)}
            />
          ))}
        </div>
      </>
    );
  }
  return (
    <div>
      {tags.map((tag) => (
        <Chip key={tag} label={tag} size="small" />
      ))}
    </div>
  );
};

const Task = ({
  title,
  description,
  priority,
  subtasks,
  tags,
  setTasks,
  index,
}) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [subTasks, setSubtasks] = useState(subtasks);

  const [editing, setEditing] = useState(false);
  const [title_, setTitle] = useState(title);
  const [description_, setDescription] = useState(description);
  const [dueDate, setDueDate] = useState(today());
  const [priority_, setPriority] = useState("");
  const [tags_, setTags] = useState(tags);

  const handleSubtaskChange = (event) => {
    setSubtasks(
      subTasks.map((subtask) => {
        if (subtask[0] === event.target.value) {
          return [subtask[0], !subtask[1]];
        } else {
          return subtask;
        }
      })
    );
  };

  const handleEdit = () => {
    setEditing(true);
    setExpanded(true);
  };

  const handleSave = () => {
    setEditing(false);
    setExpanded(false);
    setTasks((tasks) => {
      const newTasks = [...tasks];
      newTasks[index] = {
        ...newTasks[index],
        title: title_,
        description: description_,
        priority: priority_,
        subtasks: subTasks,
        tags: tags_,
      };
      return newTasks;
    });
  };

  return (
    <Card>
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
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Favorite />
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
        <CardContent>
          <FormGroup>
            {subTasks.map((subtask) => (
              <FormControlLabel
                key={subtask[0]}
                label={subtask[0]}
                value={subtask[0]}
                control={
                  <Checkbox
                    onChange={handleSubtaskChange}
                    checked={subtask[1]}
                  />
                }
              ></FormControlLabel>
            ))}
          </FormGroup>
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
  index: propTypes.number.isRequired,
};

export default Task;
