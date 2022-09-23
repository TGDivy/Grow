import React, { FC } from "react";
import propTypes from "prop-types";
import { Box, Typography, TextField } from "@mui/material";

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
  return (
    <Box paddingTop={1}>
      <Typography variant="body1">{description}</Typography>
    </Box>
  );
};

export default Description;