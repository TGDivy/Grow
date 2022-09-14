import React from "react";
import { Container, Typography } from "@mui/material";
import PropTypes from "prop-types";

import ManageUser from "./ManageUser";

const Home = ({ user }) => {
  return (
    <Container>
      <Typography variant="h4">Home</Typography>
      <Typography variant="h5">{user.displayName}</Typography>
      <Typography variant="h5">{user.email}</Typography>
      <ManageUser user={user} />
    </Container>
  );
};

Home.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Home;
