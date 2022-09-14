import React from "react";
import { Container, Typography } from "@mui/material";
import PropTypes from "prop-types";

const Home = ({ user }) => {
  return (
    <Container>
      <Typography variant="h1">Home</Typography>
      <Typography variant="h2">{user.displayName}</Typography>
      <Typography variant="h2">{user.email}</Typography>
    </Container>
  );
};

Home.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Home;
