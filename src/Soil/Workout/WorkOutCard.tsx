import React, { FC } from "react";
import { workoutType } from "../../Common/Types/Types";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

interface Props {
  workout: workoutType;
}

const WorkOutCard: FC<Props> = ({ workout }) => {
  const { name, description, activities } = workout;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{workout.name}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained">Start</Button>
      </CardActions>
    </Card>
  );
};

export default WorkOutCard;
