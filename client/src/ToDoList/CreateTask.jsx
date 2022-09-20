import React from "react";
import propTypes from "prop-types";
import { Card, CardHeader, Skeleton } from "@mui/material";
import { IconButton } from "@mui/material";
import {
  CardContent,
  Typography,
  CardActions,
  Collapse,
  Chip,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import {
  MoreVert,
  Favorite,
  Share,
  Expand,
  Tag,
  Add,
} from "@mui/icons-material";
import styled from "@emotion/styled";

export const CreateTask = () => {
  return (
    <Card height="100%">
      <CardHeader
        title={<Typography variant="h5">Create Task</Typography>}
        action={
          <IconButton aria-label="settings">
            <Add />
          </IconButton>
        }
        subheader={[<Skeleton animation={false} key={1} />]}
      />
      <CardContent>
        <Skeleton animation={false} disable>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          </Typography>
          <IconButton aria-label="add to favorites">
            <Favorite />
            <Favorite />
            <Favorite />
          </IconButton>
        </Skeleton>
      </CardContent>
    </Card>
  );
};

CreateTask.propTypes = {};

export default CreateTask;
