import React, { FC } from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import { TextField, TextFieldProps, Typography } from "@mui/material";

interface dueDateProps {
  dueDate: Date;
  editing: boolean;
  setDueDate: (date: Date) => void;
}

const DueDate: FC<dueDateProps> = ({ dueDate, editing, setDueDate }) => {
  const handleDueDateChange = (date: Date) => {
    setDueDate(date);
  };

  if (editing) {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Due Date"
          value={dueDate}
          onChange={handleDueDateChange}
          renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
            <TextField {...params} />
          )}
        />
      </LocalizationProvider>
    );
  }
  return (
    <Typography variant="body2" sx={{ color: "gray" }}>
      {" "}
      Due Date{" "}
    </Typography>
  );
};

export default DueDate;
