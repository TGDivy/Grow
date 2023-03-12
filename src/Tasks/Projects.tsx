import React from "react";
import useUserStore from "../Common/Stores/User";
import ProjectPage from "./ProjectPage";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Grid,
  Stack,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
  Collapse,
  CardActions,
  IconButtonProps,
  Divider,
  Typography,
  LinearProgress,
  TextField,
  Zoom,
} from "@mui/material";
import StyledCard from "../Common/ReusableComponents/StyledCard";
import useTaskStore from "../Common/Stores/TaskStore";
import { taskType } from "../Common/Types/Types";
import useTimerStore from "../Common/Stores/TimerStore";
import _ from "lodash";
import { ExpandMoreOutlined, PlayArrow } from "@mui/icons-material";
import styled from "@emotion/styled";
import CreateTask from "./CreateTask";
import { TransitionGroup } from "react-transition-group";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
export const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  // transition: theme.transitions.create('transform', {
  //   duration: theme.transitions.duration.shortest,
  // }),
}));

const ProjectCard = (props: { name: string }) => {
  const navigate = useNavigate();
  const tasks = useTaskStore((state) => state.tasks);

  const [notCompletedArray, setNotCompletedArray] = React.useState<
    [string, taskType][]
  >([]);
  const active = useTimerStore((state) => state.active);
  const addTask = useTimerStore((state) => state.addTask);
  const [expanded, setExpanded] = React.useState(false);

  const [projectTaskStats, setProjectTaskStats] = React.useState({
    total: 0,
    completed: 0,
    notCompleted: 0,
    timeSpent: 0,
  });

  React.useEffect(() => {
    const completedArray_ = _.flow(Object.entries, (arr) =>
      arr.filter(([, task]) => !task.completed && task.sticker === props.name)
    )(tasks);

    setNotCompletedArray(completedArray_);

    const total = _.flow(Object.entries, (arr) =>
      arr.filter(([, task]) => task.sticker === props.name)
    )(tasks).length;

    const completed = _.flow(Object.entries, (arr) =>
      arr.filter(([, task]) => task.sticker === props.name && task.completed)
    )(tasks).length;

    const notCompleted = _.flow(Object.entries, (arr) =>
      arr.filter(([, task]) => task.sticker === props.name && !task.completed)
    )(tasks).length;

    const timeSpent = _.flow(Object.entries, (arr) =>
      arr.filter(([, task]) => task.sticker === props.name)
    )(tasks)
      .map(([, task]) => task.timeSpent)
      .reduce((a, b) => a + b, 0);

    setProjectTaskStats({
      total,
      completed,
      notCompleted,
      timeSpent: Math.round(timeSpent / 60),
    });
  }, [tasks]);

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
      <ListItemText primary={task.title} />
    </ListItem>
  ));

  // Linear progress bar with stats of project
  const LinearProgressWithLabel = (props: { value: number; total: number }) => (
    <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
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
          value={props.total === 0 ? 0 : (props.value / props.total) * 100}
        />
      </Box>
    </Box>
  );

  return (
    <StyledCard>
      <CardHeader
        title={
          <ListItemButton
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              pl: 0,
            }}
            onClick={() => navigate(`/projects/${props.name}`)}
          >
            {props.name}
          </ListItemButton>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {notCompletedArray.length !== 0 && <List dense>{taskList}</List>}
        {notCompletedArray.length === 0 && (
          <CardContent
            sx={{
              m: 0,
              padding: "0 !important",
            }}
          >
            <Divider flexItem />
            <Typography variant="body2" align="center">
              No tasks left to complete.
            </Typography>
            <Divider flexItem />
          </CardContent>
        )}
      </Collapse>

      <CardActions disableSpacing>
        <LinearProgressWithLabel
          value={projectTaskStats.completed}
          total={projectTaskStats.total}
        />
        <ExpandMore
          expand={expanded}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreOutlined />
        </ExpandMore>
      </CardActions>
    </StyledCard>
  );
};

const CreateProjectCard = () => {
  const projects = useUserStore((state) => state.stickers);
  const setProject = useUserStore((state) => state.setStickers);

  const [newProjectName, setNewProjectName] = React.useState("");

  const handleCreateProject = () => {
    setProject([...projects, newProjectName]);
    setNewProjectName("");
  };

  return (
    <StyledCard>
      <CardHeader
        title={
          <TextField
            label="Project Name"
            variant="standard"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            sx={{
              width: "100%",
              "& .MuiInputBase-root": {
                fontSize: "1.5rem",
                borderBottom: "0px solid",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                "&::before": {
                  borderBottom: "0px solid",
                },
                "&::after": {
                  borderBottom: "0px solid",
                },
              },
              "& .MuiInputBase-input": {
                textAlign: "center",
              },

              "& .MuiInputLabel-root": {
                fontSize: "1.5rem",
                textAlign: "center",
                width: "100%",
              },

              "& .MuiInputLabel-shrink": {
                transform: "scale(0.6)",
                textAlign: "left",
                width: "100%",
              },
            }}
          />
        }
      />
      <CardActions disableSpacing>
        <Button
          variant="contained"
          size="small"
          onClick={handleCreateProject}
          disabled={newProjectName === ""}
          fullWidth
          sx={{
            marginLeft: "auto",
          }}
        >
          Create New Project
        </Button>
      </CardActions>
    </StyledCard>
  );
};

const Projects = () => {
  const projects = useUserStore((state) => state.stickers);

  return (
    <Box
      sx={{
        p: { xs: 0, sm: 2 },
        backgroundColor: { xs: "transparent", sm: "surfaceVariant.main" },
        color: { xs: "transparent", sm: "surfaceVariant.contrastText" },
      }}
    >
      <TransitionGroup>
        <Grid container spacing={2}>
          {projects.map((project, index) => (
            <Zoom
              in={true}
              timeout={600}
              style={{
                transformOrigin: "0 0 0",
                transitionDelay: `${index * 450}ms`,
              }}
              key={project}
            >
              <Grid item xs={12} sm={6} md={4} key={project}>
                <ProjectCard name={project} />
              </Grid>
            </Zoom>
          ))}
          <Zoom
            in={true}
            timeout={600}
            style={{
              transformOrigin: "0 0 0",
              transitionDelay: `${projects.length * 450}ms`,
            }}
          >
            <Grid item xs={12} sm={6} md={4}>
              <CreateProjectCard />
            </Grid>
          </Zoom>
        </Grid>
      </TransitionGroup>
    </Box>
  );
};

export default Projects;
