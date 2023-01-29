import React, { FC } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField, TextFieldProps, Typography } from "@mui/material";
import moment from "moment";

import { Stack } from "@mui/system";

interface dueDateProps {
  dueDate: Date | null;
  editing: boolean;
  setDueDate: (date: Date | null) => void;
}

const DueDate: FC<dueDateProps> = ({ dueDate, editing, setDueDate }) => {
  const handleDueDateChange = (date: Date | null) => {
    setDueDate(new Date(date || new Date()));
  };

  if (editing) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          disablePast
          views={["year", "month", "day", "hours"]}
          label="Due Date"
          value={dueDate}
          onChange={handleDueDateChange}
          renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
            <TextField
              {...params}
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
          )}
        />
      </LocalizationProvider>
    );
  }
  if (!dueDate) return null;
  return (
    <Stack direction="row" spacing={1}>
      <Typography
        variant="body2"
        sx={{
          color: "primary.main",
        }}
      >
        {moment(dueDate).format("ddd, MMM Do")}
      </Typography>
    </Stack>
  );
};

export default DueDate;
