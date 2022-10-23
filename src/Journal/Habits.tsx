import React from "react";
import {
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useState } from "react";

import { totalTimeWorked, filterTimerRecords } from "../Stats/StatsMain";
import useTimerRecordsStore from "../Common/Stores/TimerRecordsStore";

const Habits = () => {
  const timerRecords = useTimerRecordsStore((state) => state.timerRecords);
  const totalWorkTime = totalTimeWorked(filterTimerRecords(timerRecords, 1, 0));

  return <div>Habits {totalWorkTime}</div>;
};

export default Habits;
