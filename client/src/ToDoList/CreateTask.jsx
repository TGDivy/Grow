import React, { forwardRef, useState } from "react";
import propTypes from "prop-types";
import { Card, CardHeader, Skeleton, Box } from "@mui/material";
import { IconButton } from "@mui/material";
import { CardContent, Typography } from "@mui/material";
import { Favorite, Add } from "@mui/icons-material";

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
import Chip from "@mui/material/Chip";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const TaskSkeletonButton = ({ onClick }) => {
  return (
    <Card height="100%">
      <CardHeader
        title={<Typography variant="h5">Create Task</Typography>}
        action={
          <IconButton onClick={onClick} aria-label="settings">
            <Add />
          </IconButton>
        }
      />
      <CardContent>
        <Skeleton animation={false}>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          </Typography>
          <IconButton aria-label="add to favorites">
            <Favorite />
            <Favorite />
            <Favorite />
          </IconButton>
        </Skeleton>
      </CardContent>
    </Card>
  );
};

TaskSkeletonButton.propTypes = {
  onClick: propTypes.func.isRequired,
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

export const CreateTask = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(today());
  const [priority, setPriority] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [tags, setTags] = useState([]);

  console.log(dueDate);

  const tagTypes = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onSubmit = () => {
    console.log("submit");
  };

  if (!open) {
    return <TaskSkeletonButton onClick={handleClickOpen} />;
  } else {
    return (
      <Card height="100%">
        <CardContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            multiline
            maxRows={4}
            minRows={1}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin="normal"
            id="dueDate"
            label="Due Date"
            type="date"
            fullWidth
            variant="standard"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel id="tags-label">Tags</InputLabel>
            <Select
              labelId="tags-label"
              id="tags"
              multiple
              value={tags}
              label="Tags"
              onChange={(e) => setTags(e.target.value)}
              input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
              MenuProps={MenuProps}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {tagTypes.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    );
  }
};

CreateTask.propTypes = {};

export default CreateTask;
