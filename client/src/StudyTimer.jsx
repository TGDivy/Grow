import React from "react";

import { Container, Grid, Button } from "@mui/material";
import { useEffect } from "react";

import pushStudyTime from "./firestore/pushStudyTime";
import useCurrentUser from "./contexts/UserContext";
import getUser from "./firestore/getUser";

const StudyTimer = () => {
  const [studyTime, setStudyTime] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const [tags, setTags] = React.useState([]);
  const [notes, setNotes] = React.useState("");

  const { user, setUser } = useCurrentUser();

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setStudyTime((studyTime) => studyTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, studyTime]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
    pushStudyTime(studyTime, user, tags, notes);
    // .then(() => {
    //   getUser(user.uid).then((user) => setUser(user));
    // });
    setStudyTime(0);
  };

  const HandleStateButton = () => {
    const func = isActive ? handleStop : handleStart;
    const text = isActive ? "Stop" : "Start";
    return (
      <Button variant="contained" color="neutral" onClick={func}>
        {text}
      </Button>
    );
  };

  return (
    <Container>
      <Grid
        container
        spacing={0}
        justifyContent="center"
        direction="column"
        alignItems="center"
      >
        <Grid item xs={12}>
          <h1>{studyTime}</h1>
        </Grid>
        <Grid item xs={12}>
          <HandleStateButton />
        </Grid>
      </Grid>
    </Container>
  );
};

StudyTimer.propTypes = {};

export default StudyTimer;
