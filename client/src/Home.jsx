import React from "react";
import { Container, Typography } from "@mui/material";

import StudyTimer from "./StudyTimer";
import useCurrentUser from "./contexts/UserContext";

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
    </>
  );
};

export default Home;
