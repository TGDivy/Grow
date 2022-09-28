import React, { FC } from "react";
import { Typography, Checkbox, TextField } from "@mui/material";
import { PriorityHigh } from "@mui/icons-material";

interface titleFc {
  title: string;
  setTitle: (title: string) => void;
  priority: boolean;
  setPriority: (priority: boolean) => void;
  editing: boolean;
}

const Title: FC<titleFc> = ({
  title,
  editing,
  setTitle,
  priority,
  setPriority,
}) => {
  if (editing) {
    return (
      <>
        <Checkbox
          checked={priority}
          onChange={() => setPriority(!priority)}
          size="medium"
          sx={{ padding: "0px 0px 0px 0px" }}
          checkedIcon={<PriorityHigh fontSize="medium" color="error" />}
          icon={<PriorityHigh fontSize="medium" />}
        />
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
      </>
    );
  }
  return (
    <Typography variant="h5">
      {title}
      {priority && (
        <Checkbox
          checked={priority}
          onChange={() => setPriority(!priority)}
          size="medium"
          sx={{ padding: "0px 0px 5px 0px" }}
          checkedIcon={<PriorityHigh fontSize="medium" color="error" />}
          icon={<PriorityHigh fontSize="medium" />}
        />
      )}
    </Typography>
  );
};

export default Title;
