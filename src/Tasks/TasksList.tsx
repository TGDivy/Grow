import React, { FC, useEffect } from "react";
import { Grid, Stack } from "@mui/material";
import Task from "./Task/Task";
import CreateTask from "./CreateTask";

import useTaskStore from "../Common/Stores/TaskStore";
import _ from "lodash";
import { tasksListType, taskType } from "../Common/Types/Types";
import {
  collection,
  CollectionReference,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../Common/Firestore/firebase-config";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

interface tasksListFC {
  taskListName: string;
}

// find the latest task in tasksList
const fetchNewDocs = async (
  tasks: tasksListType,
  collectionRef: CollectionReference
) => {
  const tasksEntries = Object.entries(tasks);
  const initialTask = tasksEntries[0];

  const latestTask = await tasksEntries.reduce((prev, next) => {
    if (next[1].dateUpdated > prev[1].dateUpdated) {
      return next;
    }
    return prev;
  }, initialTask);

  const latestDate: Date = latestTask
    ? latestTask[1].dateUpdated
    : new Date(2000, 1, 1);

  // Fetch tasks after the latest task date

  const q = query(collectionRef, where("dateUpdated", ">", latestDate));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
};

const TasksList: FC<tasksListFC> = ({ taskListName }) => {
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const [tasksArray, completedArray] = _.flow(
    Object.entries,
    (arr) => arr.filter(([, task]) => task.taskListName === taskListName),
    (arr) => arr.reverse(),
    (arr) => _.partition(arr, ([, task]) => !task.completed)
    // (arr) => _.partition(arr, ([, task]) => task.completed)
  )(tasks);

  const user_id = useTaskStore((state) => state.user_id);

  useEffect(() => {
    const collectionRef = collection(db, "users", user_id, "plow");
    const querySnapshot = fetchNewDocs(tasks, collectionRef);

    querySnapshot
      .then((querySnapshot) => {
        // console.log("querySnapshot", querySnapshot);
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          const task = doc.data() as taskType;
          addTask(task, doc.id);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  const displayTasks = tasksArray.map(([id, task]) => (
    <Grid item xs={12} sm={6} md={4} lg={4} key={id}>
      <Task {...task} id={id} createNewTask={false} startTimerButton />
    </Grid>
  ));

  const completedTasks = completedArray.map(([id, task]) => (
    <Grid item xs={12} sm={6} md={4} lg={4} key={id}>
      <Task {...task} id={id} createNewTask={false} startTimerButton />
    </Grid>
  ));

  return (
    <Stack direction="column" spacing={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <CreateTask taskListName={taskListName} />
        </Grid>
        {displayTasks}
      </Grid>
      {completedTasks.length > 0 && (
        <Accordion
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.1)",
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
