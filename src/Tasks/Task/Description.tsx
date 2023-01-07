import React, { FC } from "react";
import propTypes from "prop-types";
import { Box, TextField } from "@mui/material";
import MuiMarkdown from "mui-markdown";

interface descriptionProps {
  description: string;
  editing: boolean;
  setDescription: (description: string) => void;
}

const Description: FC<descriptionProps> = ({
  description,
  editing,
  setDescription,
}) => {
  Description.propTypes = {
    description: propTypes.string.isRequired,
    editing: propTypes.bool.isRequired,
    setDescription: propTypes.func.isRequired,
  };

  if (editing) {
    return (
      <TextField
        className="tut-task-description"
        id="standard-multiline-static"
        label="Description"
        variant="standard"
        defaultValue={description}
        multiline
        color="primary"
        rows={4}
        fullWidth
        onChange={(event) => {
          setDescription(event.target.value);
        }}
        InputLabelProps={{
          sx: {
            color: "primary.main",
          },
        }}
        sx={{
          "& .MuiInputBase-root": {
            color: "primary.main",
          },
        }}
      />
    );
  }
  return (
    <Box paddingTop={1}>
      <MuiMarkdown>{description}</MuiMarkdown>
    </Box>
  );
};

export default Description;
