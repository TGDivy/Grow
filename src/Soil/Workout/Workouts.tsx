import React, { useEffect } from "react";
import { Grid, Typography, Button } from "@mui/material";
import useWorkoutStore from "../../Common/Stores/WorkoutStore";
import WorkOutCard from "./WorkOutCard";
import CreateWorkout from "./CreateWorkout";
import { workoutType } from "../../Common/Types/Types";
import _ from "lodash";
import useActivityStore from "../../Common/Stores/ActivityStore";

const Workouts = () => {
  const workouts = useWorkoutStore((state) => state.workouts);
  const fetchWorkouts = useWorkoutStore((state) => state.fetchWorkouts);
  const fetchActivities = useActivityStore((state) => state.fetchActivities);
  useEffect(() => {
    fetchWorkouts();
    fetchActivities();
  }, []);

  const workoutCards = _.map(workouts, (workout: workoutType) => {
    return (
      <Grid item xs={12} md={6} key={workout.name}>
        <WorkOutCard workout={workout} />
      </Grid>
    );
  });

  return (
    <Grid container spacing={2}>
      {workoutCards}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <CreateWorkout />
      </Grid>
    </Grid>
  );
};

export default Workouts;
