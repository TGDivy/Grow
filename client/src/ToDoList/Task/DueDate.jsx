import React from "react";
import propTypes from "prop-types";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import { TextField, Typography } from "@mui/material";

const DueDate = ({ dueDate, editing, setDueDate }) => {
  DueDate.propTypes = {
    dueDate: propTypes.string.isRequired,
    editing: propTypes.bool.isRequired,
    setDueDate: propTypes.func.isRequired,
  };

  const handleDueDateChange = (date) => {
    setDueDate(date);
  };

  if (editing) {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Due Date"
          value={dueDate}
          onChange={handleDueDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  }
  return (
    <Typography variant="body2" sx={{ color: "gray" }}>
      {dueDate}
    </Typography>
  );
};

export default DueDate;
