import React, { useState, useEffect } from "react";
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
import { List, ListItem, ListItemText } from "@mui/material";
import { MoreVert, Favorite, Share, Expand, Tag } from "@mui/icons-material";
import styled from "@emotion/styled";

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

const Task = ({ Title, Description, Priority, subtasks, tags }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [subTasks, setSubtasks] = useState(subtasks);

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

  return (
    <Card>
      <CardHeader
        title={Title}
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        subheader={tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            icon={<Tag />}
            variant="outlined"
            sx={{ m: 0.3 }}
          />
        ))}
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {Description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Favorite />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
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
          <Typography paragraph>Subtasks:</Typography>
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
        </CardContent>
      </Collapse>
    </Card>
  );
};

Task.propTypes = {
  Title: propTypes.string.isRequired,
  Description: propTypes.string.isRequired,
  Priority: propTypes.string.isRequired,
  subtasks: propTypes.arrayOf(propTypes.array).isRequired,
  tags: propTypes.arrayOf(propTypes.string).isRequired,
};

export default Task;
