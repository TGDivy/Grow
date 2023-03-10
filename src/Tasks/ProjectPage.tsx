import {
  Box,
  Button,
  CardActions,
  Chip,
  Collapse,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Grow,
  LinearProgress,
  Stack,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useTaskStore from "../Common/Stores/TaskStore";
import { taskType } from "../Common/Types/Types";
import useUserStore from "../Common/Stores/User";
import _ from "lodash";
import Task from "./Task/Task";
import { TransitionGroup } from "react-transition-group";
import CreateTask from "./CreateTask";
import StyledAccordion from "../Common/ReusableComponents/StyledAccordion";
import StyledCard from "../Common/ReusableComponents/StyledCard";
import { ArrowBack, Delete } from "@mui/icons-material";

type Props = {
  // ...
};

const filterTasksByTag = async (
  tag: string,
  tasksArray: [string, taskType][]
) => {
  return tasksArray.filter(([, task]) => {
    if (tag) {
      return task.tags.includes(tag);
    } else {
      return true;
    }
  });
};

const DeleteProject = () => {
  const stickers = useUserStore((state) => state.stickers);
  const setStickers = useUserStore((state) => state.setStickers);

  const { projectId } = useParams();

  if (!projectId) {
    return null;
  }

  const navigate = useNavigate();

  const handleDelete = () => {
    setStickers(stickers.filter((sticker) => sticker !== projectId));
    navigate("/tasks");
  };

  // Display a confirmation dialog before deleting the project
  // ask the user to enter the project name to confirm
  const [open, setOpen] = React.useState(false);
  const [projectName, setProjectName] = React.useState("");

  return (
    <>
      <Button
        variant="text"
        color="error"
        onClick={() => setOpen(true)}
        size="small"
        sx={{
          position: "absolute",
          right: 0,
          mr: "0.5rem",
        }}
      >
        <Delete />
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color={"error"}>
          {`Delete Project "${projectId}"`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this project? This action cannot be
            undone. To confirm, please enter the project name below exactly as
            it appears.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            variant="standard"
            id="name"
            label="Project Name"
            type="text"
            fullWidth
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDelete}
            disabled={projectName !== projectId}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const ProjectPage = (props: Props) => {
  const tasks = useTaskStore((state) => state.tasks);
  const possibleTags = useUserStore((state) => state.tags);
  const [filter, setFilter] = React.useState<string>("");

  const navigate = useNavigate();

  const { projectId } = useParams();

  const [tasksArray, setTasksArray] = React.useState<[string, taskType][]>([]);
  const [completedArray, setCompletedArray] = React.useState<
    [string, taskType][]
  >([]);
  const [filtered, setFiltered] = React.useState<[string, taskType][]>([]);
  const [filteredCompletedArray, setFilteredCompletedArray] = React.useState<
    [string, taskType][]
  >([]);

  const [projectTaskStats, setProjectTaskStats] = React.useState({
    total: 0,
    completed: 0,
    notCompleted: 0,
    timeSpent: 0,
  });

  React.useEffect(() => {
    const [tasksArray_, completedArray_] = _.flow(
      Object.entries,
      (arr) => arr.filter(([, task]) => task.sticker === projectId),
      (arr) => arr.reverse(),
      (arr) => arr.slice(0, 40),
      (arr) => _.partition(arr, ([, task]) => !task.completed)
    )(tasks);

    setTasksArray(tasksArray_);
    setCompletedArray(completedArray_);

    const total = _.flow(Object.entries, (arr) =>
      arr.filter(([, task]) => task.sticker === projectId)
    )(tasks).length;

    const completed = _.flow(Object.entries, (arr) =>
      arr.filter(([, task]) => task.sticker === projectId && task.completed)
    )(tasks).length;

    const notCompleted = _.flow(Object.entries, (arr) =>
      arr.filter(([, task]) => task.sticker === projectId && !task.completed)
    )(tasks).length;

    const timeSpent = _.flow(Object.entries, (arr) =>
      arr.filter(([, task]) => task.sticker === projectId)
    )(tasks)
      .map(([, task]) => task.timeSpent)
      .reduce((a, b) => a + b, 0);

    setProjectTaskStats({
      total,
      completed,
      notCompleted,
      timeSpent: Math.round(timeSpent / 60),
    });
  }, [tasks, projectId]);

  React.useEffect(() => {
    filterTasksByTag(filter, tasksArray).then((filtered) => {
      filterTasksByTag(filter, completedArray).then((filtered2) => {
        setFilteredCompletedArray(filtered2);
        setFiltered(filtered);
      });
    });
  }, [filter, tasksArray, completedArray]);

  const handleDeleteTag = () => {
    setFilter("");
  };

  const handleAddTag = (tag: string) => {
    setFilter(tag);
  };

  const displayTasks = filtered.map(([id, task], index) => (
    <Grid item xs={12} sm={6} md={4} lg={4} key={id}>
      <Zoom
        in={true}
        timeout={600}
        style={{
          transformOrigin: "0 0 0",
          transitionDelay: `${index * 450}ms`,
        }}
      >
        <Box>
          <Task {...task} id={id} createNewTask={false} startTimerButton />
        </Box>
      </Zoom>
    </Grid>
  ));

  const completedTasks = filteredCompletedArray.map(([id, task]) => (
    <Grid item xs={12} sm={6} md={4} lg={4} key={id}>
      <Task {...task} id={id} createNewTask={false} startTimerButton />
    </Grid>
  ));

  // Filter chips for tags. Transition the chips using Collapse component, when chip is selected, hide other chips. When chip is deselected, show all chips.
  const filterChips = (
    <TransitionGroup>
      <>
        <Stack
          direction="row"
          spacing={1}
          // justifyContent="flex-end"
          alignItems="center"
          sx={{
            overflowX: "auto",
          }}
        >
          {filter && (
            <Collapse
              orientation="horizontal"
              timeout={500}
              in={filter ? true : false}
            >
              <Chip
                label={filter}
                onDelete={handleDeleteTag}
                sx={{
                  backgroundColor: "surfaceVariant.main",
                  color: "surfaceVariant.contrastText",
                  padding: { xs: "0", sm: "0.4rem" },
                  margin: "0",
                }}
              />
            </Collapse>
          )}

          {possibleTags.map((tag, index) => (
            <Chip
              label={tag}
              key={tag}
              sx={{
                backgroundColor: "surfaceVariant.main",
                color: "surfaceVariant.contrastText",
                display: filter ? "none" : "default ",
                padding: { xs: "0", sm: "0.4rem" },
                margin: "0",
              }}
              onClick={() => handleAddTag(tag)}
            />
          ))}
        </Stack>
      </>
    </TransitionGroup>
  );

  const LinearProgressWithLabel = (props: { value: number; total: number }) => (
    <Box
      sx={{ display: "flex", alignItems: "center", flexGrow: 1, width: "100%" }}
    >
      <Box sx={{ width: "100%", mr: 1, flexGrow: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="caption" color="text.secondary">
            {`${Math.round(props.value)}/${props.total}`} tasks
          </Typography>
          <Typography variant="caption" color="text.secondary">
            <Typography variant="caption">
              {projectTaskStats.timeSpent > 60
                ? `${Math.floor(projectTaskStats.timeSpent / 60)}h ${
                    projectTaskStats.timeSpent % 60
                  }m`
                : `${projectTaskStats.timeSpent}m`}
            </Typography>
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={props.value !== 0 ? (props.value / props.total) * 100 : 0}
        />
      </Box>
    </Box>
  );

  return (
    <Container
      sx={{
        mt: { xs: 2, md: 2 },
      }}
    >
      <Stack direction="column" spacing={3}>
        <Box
          sx={{
            mt: { xs: 2, md: 0 },
            p: { xs: 0, md: 2 },
            mb: { xs: 0, md: 2 },
            borderRadius: 1,
            backgroundColor: {
              xs: "transparent",
              sm: "surfaceVariant.main",
            },
            color: { xs: "transparent", sm: "surfaceVariant.contrastText" },
          }}
        >
          <Grow in={true} {...{ timeout: 1000 }}>
            <StyledCard
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
                "&:hover": {
                  boxShadow: 3,
                },
              }}
            >
              <Typography variant="h6" align="center">
                {projectId}
              </Typography>

              <Button
                variant="text"
                size="small"
                onClick={() => {
                  navigate("/Tasks");
                }}
                sx={{
                  position: "absolute",
                  left: "0",
                  ml: "0.5rem",
                }}
              >
                <ArrowBack />
              </Button>
              <DeleteProject />
            </StyledCard>
          </Grow>
        </Box>
        <LinearProgressWithLabel
          value={projectTaskStats.completed}
          total={projectTaskStats.total}
        />

        <Box>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={12} md={2}>
              <CreateTask taskListName={"Tasks"} sticker={projectId} />
            </Grid>
            <Grid item xs={12} md={10}>
              {filterChips}
            </Grid>
          </Grid>
        </Box>
        {filtered.length !== 0 && (
          <Box
            sx={{
              p: { xs: 0, sm: 2 },
              backgroundColor: { xs: "transparent", sm: "surfaceVariant.main" },
              color: { xs: "transparent", sm: "surfaceVariant.contrastText" },
            }}
          >
            <TransitionGroup>
              <Grid container spacing={2}>
                {displayTasks}
              </Grid>
            </TransitionGroup>
          </Box>
        )}
        {completedTasks.length > 0 && (
          <StyledAccordion title="Completed">
            <Grid container spacing={2}>
              {completedTasks}
            </Grid>
          </StyledAccordion>
        )}
      </Stack>
    </Container>
  );
};

export default ProjectPage;
