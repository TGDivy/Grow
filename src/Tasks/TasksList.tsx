import React, { FC } from "react";
import { Box, Grid, Grow, Stack, Collapse } from "@mui/material";
import Task from "./Task/Task";
import CreateTask from "./CreateTask";
import { Chip } from "@mui/material";
import useTaskStore from "../Common/Stores/TaskStore";
import _ from "lodash";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import useUserStore from "../Common/Stores/User";
import { TransitionGroup } from "react-transition-group";
import { taskType } from "../Common/Types/Types";
interface tasksListFC {
  taskListName: string;
}

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

const TasksList: FC<tasksListFC> = ({ taskListName }) => {
  const tasks = useTaskStore((state) => state.tasks);
  const possibleTags = useUserStore((state) => state.tags);
  const [filter, setFilter] = React.useState<string>("");

  const [tasksArray, setTasksArray] = React.useState<[string, taskType][]>([]);
  const [completedArray, setCompletedArray] = React.useState<
    [string, taskType][]
  >([]);
  const [filtered, setFiltered] = React.useState<[string, taskType][]>([]);
  const [filteredCompletedArray, setFilteredCompletedArray] = React.useState<
    [string, taskType][]
  >([]);

  React.useEffect(() => {
    const [tasksArray_, completedArray_] = _.flow(
      Object.entries,
      (arr) => arr.filter(([, task]) => task.taskListName === taskListName),
      (arr) => arr.reverse(),
      (arr) => arr.slice(0, 40),
      (arr) => _.partition(arr, ([, task]) => !task.completed)
    )(tasks);

    setTasksArray(tasksArray_);
    setCompletedArray(completedArray_);
  }, [tasks, taskListName]);

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
      <Grow in={true} timeout={600 + index * 200}>
        <Box>
          <Task {...task} id={id} createNewTask={false} startTimerButton />
        </Box>
      </Grow>
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
      <Stack direction="row" spacing={1}>
        {filter && (
          <Collapse in={true} orientation="horizontal" timeout={200}>
            <Chip
              label={filter}
              onDelete={handleDeleteTag}
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
              }}
            />
          </Collapse>
        )}

        {possibleTags.map((tag, index) => (
          <Collapse
            key={tag}
            in={filter ? false : true}
            orientation="horizontal"
            timeout={index * 200}
          >
            <Chip
              label={tag}
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
              }}
              onClick={() => handleAddTag(tag)}
            />
          </Collapse>
        ))}
      </Stack>
    </TransitionGroup>
  );

  return (
    <Stack direction="column" spacing={3}>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={10}>
          {filterChips}
        </Grid>
        <Grid item>
          <CreateTask taskListName={taskListName} />
        </Grid>
      </Grid>
      {filtered.length !== 0 && (
        <Box
          sx={{
            p: 2,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
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
        <Accordion
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">Completed</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {completedTasks}
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}
    </Stack>
  );
};

export default TasksList;
