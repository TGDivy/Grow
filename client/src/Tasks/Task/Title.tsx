import React, { FC } from "react";
import { Typography, Checkbox, TextField } from "@mui/material";

interface titleFc {
  title: string;
  setTitle: (title: string) => void;
  completed: boolean;
  handleTaskComplete: () => void;
  editing: boolean;
}

const Title: FC<titleFc> = ({
  title,
  editing,
  setTitle,
  completed,
  handleTaskComplete,
}) => {
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
