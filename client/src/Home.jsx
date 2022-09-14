import React from "react";
import { Container, Typography } from "@mui/material";

import StudyTimer from "./StudyTimer";
import useCurrentUser from "./contexts/UserContext";
import { enableNetwork } from "firebase/firestore";
import { db } from "./firebase-config";
import { Button } from "@mui/material";

const Home = () => {
  const { user } = useCurrentUser();
  return (
    <>
      <Container>
        <Typography variant="h4">Home</Typography>
        <Typography variant="h5">{user.displayName}</Typography>
        <Typography variant="h5">{user.email}</Typography>
        <Typography variant="h5">Total Sessions: {user.total_sess}</Typography>
      </Container>
      <StudyTimer />
      <Button
        variant="contained"
        color="neutral"
        onClick={() => enableNetwork(db)}
      >
        Enable Network
      </Button>
    </>
  );
};

export default Home;
