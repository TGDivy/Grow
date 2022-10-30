import React, { FC, useEffect, useState } from "react";
import useDailyJournalStore from "../Common/Stores/DailyJournalStore";
import CreateTask from "../Tasks/CreateTask";
import { v4 as uuid_v4 } from "uuid";
import useTaskStore from "../Common/Stores/TaskStore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Edit, ExpandMore, Remove } from "@mui/icons-material";
import _, { remove } from "lodash";
import Task from "../Tasks/Task/Task";
import { Switch, ToggleButton } from "@mui/material";
import RTE from "./RTE/RTE";

interface Props {
  readonly?: boolean;
}

const Goals: FC<Props> = ({ readonly }) => {
  const tasksForTomorrow = useDailyJournalStore(
    (state) => state.tasksForTomorrow
  );
  const setTasksForTomorrow = useDailyJournalStore(
    (state) => state.setTasksForTomorrow
  );
  const tasks = useTaskStore((state) => state.tasks);
  const [addAndRemove, setAddAndRemove] = useState(false);

  const nextDayNotes = useDailyJournalStore((state) => state.nextDayNotes);
  const setNextDayNotes = useDailyJournalStore(
    (state) => state.setNextDayNotes
  );

  const [newTaskId, setNewTaskId] = React.useState(uuid_v4());

  const addTask = (task: string) => {
    if (addAndRemove) {
      setTasksForTomorrow([...tasksForTomorrow, task]);
      setNewTaskId(uuid_v4());
      console.log(tasksForTomorrow);
    }
  };

  const deleteTask = (task: string) => {
    if (addAndRemove) {
      setTasksForTomorrow(tasksForTomorrow.filter((t) => t !== task));
    }
  };

  useEffect(() => {
    if (newTaskId in tasks && !tasksForTomorrow.includes(newTaskId)) {
      setTasksForTomorrow([...tasksForTomorrow, newTaskId]);
      setNewTaskId(uuid_v4());
      console.log(newTaskId);
    }
  }, [newTaskId, tasks, tasksForTomorrow]);

  const [tasksForTomorrowT, otherTasksT] = _.flow(
    Object.entries,
    (arr) => arr.filter(([, task]) => !task.completed),
    (arr) => arr.reverse(),
    (arr) => _.partition(arr, ([id]) => tasksForTomorrow.includes(id))
    // (arr) => _.partition(arr, ([, task]) => task.completed)
  )(tasks);

  console.log(tasksForTomorrowT, otherTasksT);

  const displayTasks = tasksForTomorrowT.map(([id, task]) => (
    <Grid item xs={12} md={6} key={id}>
      <Box
        onClick={() => deleteTask(id)}
        sx={{
          cursor: addAndRemove ? "pointer" : "default",
        }}
      >
        <Task {...task} id={id} createNewTask={false} startTimerButton />
      </Box>
      {/* <Button onClick={() => deleteTask(id)}>
        <Remove />
      </Button> */}
    </Grid>
  ));

  const completedTasks = otherTasksT.map(([id, task]) => (
    <Grid item xs={12} md={6} key={id}>
      <Box
        onClick={() => addTask(id)}
        sx={{
          cursor: addAndRemove ? "pointer" : "default",
        }}
      >
        <Task {...task} id={id} createNewTask={false} startTimerButton />
      </Box>
    </Grid>
  ));

  return (
    <Stack direction="column" spacing={readonly ? 0 : 3} alignItems="flex-end">
      <Box
        sx={{
          position: "relative",
          width: "100%",
          "& .editor-inner": {
            minHeight: readonly ? "max-content" : "150px",
          },
        }}
      >
        <RTE
          text={nextDayNotes}
          setText={setNextDayNotes}
          textToAdd="Notes:"
          readonly={readonly}
        />
      </Box>

      <Box
        sx={{
          p: readonly ? 0 : 2,
          width: "100%",
          backgroundColor: readonly ? "transparent" : "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={10}>
            {readonly ? (
              <Typography variant="h5" color="white"></Typography>
            ) : (
              <>
                <Typography variant="h5" color="primary">
                  Goals for Tomorrow
                </Typography>

                <Typography variant="body2" color="primary">
                  {addAndRemove
                    ? "Click on a task to add or remove it from your goals for tomorrow."
                    : "Click the edit button to add or remove tasks from your goals for tomorrow."}
                </Typography>
              </>
            )}
          </Grid>

          {!readonly && (
            <>
              <Grid item xs={2}>
                <ToggleButton
                  value={addAndRemove}
                  color="primary"
                  selected={addAndRemove}
                  fullWidth
                  onChange={() => {
                    setAddAndRemove(!addAndRemove);
                  }}
                  size="medium"
                >
                  <Edit /> Edit
                </ToggleButton>
              </Grid>
              <Grid item xs={12}>
                <CreateTask taskListName="Tasks" id={newTaskId} />
              </Grid>
            </>
          )}

          {displayTasks}
        </Grid>
      </Box>

      <Box
        sx={{
          width: "100%",
        }}
      >
        {completedTasks.length > 0 && !readonly && (
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
              <Typography variant="h5" color="primary">
                Tasks To Do
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {completedTasks}
              </Grid>
            </AccordionDetails>
          </Accordion>
        )}
      </Box>
    </Stack>
  );
};

export default Goals;
