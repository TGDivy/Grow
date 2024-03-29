import React, { FC } from "react";
import {
  Box,
  Grid,
  Grow,
  Stack,
  Collapse,
  Fade,
  Zoom,
  Slide,
} from "@mui/material";
import Task from "./Task/Task";
import CreateTask from "./CreateTask";
import { Chip } from "@mui/material";
import useTaskStore from "../Common/Stores/TaskStore";
import _ from "lodash";
import useUserStore from "../Common/Stores/User";
import { TransitionGroup } from "react-transition-group";
import { taskType } from "../Common/Types/Types";
import StyledAccordion from "../Common/ReusableComponents/StyledAccordion";
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

  return (
    <Stack direction="column" spacing={3}>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={12} md={2}>
          <CreateTask taskListName={taskListName} />
        </Grid>
        <Grid item xs={12} md={10}>
          {filterChips}
        </Grid>
      </Grid>
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
  );
};

export default TasksList;
