import React from "react";
import propTypes from "prop-types";
import { Typography, Checkbox, TextField } from "@mui/material";

const Title = ({ title, editing, setTitle, completed, handleTaskComplete }) => {
  Title.propTypes = {
    title: propTypes.string.isRequired,
    editing: propTypes.bool.isRequired,
    setTitle: propTypes.func.isRequired,
    completed: propTypes.bool.isRequired,
    handleTaskComplete: propTypes.func.isRequired,
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
  return (
    <Typography variant="h5">
      <Checkbox
        checked={completed}
        onChange={handleTaskComplete}
        size="medium"
        sx={{ padding: "0px 5px 0px 0px" }}
      />
      {title}
    </Typography>
  );
};

export default Title;
