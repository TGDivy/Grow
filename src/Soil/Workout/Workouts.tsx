import React, { useEffect } from "react";
import { Grid, Typography, Button } from "@mui/material";
import useWorkoutStore from "../../Common/Stores/WorkoutStore";
import WorkOutCard from "./WorkOutCard";
import CreateWorkout from "./CreateWorkout";
import { workoutType } from "../../Common/Types/Types";
import _ from "lodash";

const Workouts = () => {
  const workouts = useWorkoutStore((state) => state.workouts);
  const fetchWorkouts = useWorkoutStore((state) => state.fetchWorkouts);
  useEffect(() => {
    fetchWorkouts();
  }, []);

  const workoutCards = _.map(workouts, (workout: workoutType) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={workout.name}>
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
