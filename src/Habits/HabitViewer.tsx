import React, { useState } from "react";
import {
  useMediaQuery,
  Dialog,
  useTheme,
  DialogTitle,
  CardMedia,
  DialogContent,
  Typography,
  Stack,
  Divider,
  Button,
  DialogActions,
  DialogContentText,
  Box,
  IconButton,
} from "@mui/material";
import useHabitsStore, { HabitType } from "../Common/Stores/HabitsStore";
import { FrequencyTypeToString } from "./HabitsList";
import moment from "moment";
import { Delete } from "@mui/icons-material";

type Props = {
  open: boolean;
  handleClose: () => void;
  habit: HabitType;
};

const HabitViewer = (props: Props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { habit, handleClose, open } = props;
  const deleteHabit = useHabitsStore((state) => state.deleteHabit);
  const defaultImage =
    "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8";
  const urlImageParams = ""; //"&auto=format&fit=crop&w=1740&q=80";

  const handleDelete = () => {
    deleteHabit(habit.habitId);
    handleClose();
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      PaperProps={{
        sx: {
          backgroundColor: "background.default",
          backgroundImage: "none",
          color: "surface.contrastText",
          minHeight: "667px",
        },
      }}
      sx={{
        backdropFilter: "blur(10px)",
      }}
      fullWidth
      scroll="paper"
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {habit.title}
        <IconButton onClick={handleDelete}>
          <Delete />
        </IconButton>
      </DialogTitle>
      <CardMedia
        component="img"
        image={(habit.image?.url || defaultImage) + urlImageParams}
        alt="Habit Image"
        height="140"
      />
      <DialogContent>
        <Stack spacing={2}>
          <Stack
            spacing={2}
            direction="row"
            sx={{ justifyContent: "space-between" }}
          >
            <Typography variant="body2">
              {FrequencyTypeToString(habit.frequencyType)}
            </Typography>
            <Typography variant="body2">
              {moment(habit.nextDueDate.toDate()).format("dddd, MMMM Do")}
            </Typography>
          </Stack>
          <Divider flexItem />
          <Box
            sx={{
              backgroundColor: "surfaceVariant.main",
              borderRadius: "8px",
              padding: 1,
              color: "surfaceVariant.contrastText",
            }}
          >
            <DialogContentText
              variant="body2"
              sx={{
                textAlign: "center",
              }}
            >
              {habit.description || "No description"}
            </DialogContentText>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          color="secondary"
          fullWidth
          onClick={props.handleClose}
        >
          Back
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HabitViewer;
