import React from "react";
import useTaskStore from "../Common/Stores/TaskStore";
import { taskType } from "../Common/Types/Types";
import _ from "lodash";
import StyledCard from "../Common/ReusableComponents/StyledCard";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import StartTimer from "./Task/StartTimer";
import useTimerStore from "../Common/Stores/TimerStore";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBack, PlayArrow } from "@mui/icons-material";
import TaskIcon from "@mui/icons-material/Task";
import StyledButton from "../Common/ReusableComponents/StyledButton";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import Task from "./Task/Task";
import CreateTask from "./CreateTask";
import { type } from "os";

const taskListName = "Tasks";

type props = {
  title?: React.ReactElement | string;
  createTask?: boolean;
};

const CondensedTaskList = (props: props) => {
  const tasks = useTaskStore((state) => state.tasks);

  const [notCompletedArray, setNotCompletedArray] = React.useState<
    [string, taskType][]
  >([]);
  const addTask = useTimerStore((state) => state.addTask);
  const active = useTimerStore((state) => state.active);
  const navigate = useNavigate();
  const [taskSelected, setTaskSelected] = React.useState<string | null>(null);

  React.useEffect(() => {
    const completedArray_ = _.flow(Object.entries, (arr) =>
      arr.filter(
        ([, task]) => task.taskListName === taskListName && !task.completed
      )
    )(tasks);

    setNotCompletedArray(completedArray_);
  }, [tasks, taskListName]);

  const handleStart = (id: string) => {
    if (!active) {
      addTask(id);
      navigate("/Seed");
    } else {
      navigate("/Seed");
    }
  };

  const taskList = notCompletedArray.map(([id, task]) => (
    <ListItem
      key={id}
      secondaryAction={
        <IconButton onClick={() => handleStart(id)} color="primary">
          <PlayArrow fontSize="small" />
        </IconButton>
      }
    >
      <ListItemButton
        onClick={() => setTaskSelected(id)}
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <ListItemText primary={task.title} />
      </ListItemButton>
    </ListItem>
  ));

  const titleButton = (
    <>
      <StyledButton
        fullWidth
        onClick={() => navigate("/Tasks")}
        variant="contained"
        startIcon={<TaskIcon />}
      >
        Tasks
      </StyledButton>
    </>
  );

  if (taskSelected) {
    return (
      <StyledCard
        sx={{
          ":hover": {
            boxShadow: 0,
          },
        }}
        elevation={0}
      >
        <CardHeader
          title={
            <Button
              onClick={() => setTaskSelected(null)}
              startIcon={<ArrowBack />}
            >
              Back
            </Button>
          }
          sx={{
            mb: 1,
          }}
        />
        <Task
          id={taskSelected}
          {...tasks[taskSelected]}
          createNewTask={false}
          startTimerButton
          hoverShadow={false}
          alwaysExpanded
        />
      </StyledCard>
    );
  }

  return (
    <StyledCard
      sx={{
        // height: "310px",
        display: "flex",
        flexDirection: "column",
        ":hover": {
          boxShadow: 0,
        },
      }}
    >
      <CardHeader align="center" title={props.title} />
      {notCompletedArray.length > 0 && <List dense>{taskList}</List>}
      {notCompletedArray.length === 0 && (
        <>
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "flex-end",
              height: "100%",
            }}
          >
            <Divider flexItem />
            <Typography variant="body2" align="center">
              No tasks left to complete.
            </Typography>
            <Divider flexItem />
          </CardContent>
        </>
      )}
      {props.createTask && (
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <CreateTask taskListName="Tasks" />
        </CardContent>
      )}
    </StyledCard>
  );
};

export default CondensedTaskList;
