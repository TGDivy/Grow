import React, { FC } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  Box,
  Button,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import moment from "moment";
import { createTaskEvent } from "../../Common/GAPI/Calendar";
import { IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Stack } from "@mui/system";
import useTaskStore from "../../Common/Stores/TaskStore";

interface dueDateProps {
  dueDate: Date | null;
  editing: boolean;
  setDueDate: (date: Date | null) => void;
  taskId?: string;
}

const DueDate: FC<dueDateProps> = ({
  dueDate,
  editing,
  setDueDate,
  taskId,
}) => {
  const handleDueDateChange = (date: Date | null) => {
    setDueDate(new Date(date || new Date()));
  };

  const tasks = useTaskStore((state) => state.tasks);
  const task = taskId ? tasks[taskId] : null;

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
  if (!dueDate || !taskId || !task) return null;
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
      {/* <Button
        color="primary"
        onClick={() => {
          createTaskEvent(taskId, task);
        }}
        size="small"
      >
         <Add />
      </Button> */}
    </Stack>
  );
};

export default DueDate;
