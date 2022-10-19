import React, { FC } from "react";

import { Link, useLocation } from "react-router-dom";

import { Home, Task, Nature, Terrain } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

const BottomNavigationBar: FC = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
      color="primary"
    >
      <BottomNavigation value={location.pathname}>
        <BottomNavigationAction
          component={Link}
          to="/"
          label="Home"
          value="/"
          icon={<Home />}
        />
        <BottomNavigationAction
          label="Tasks"
          component={Link}
          to="/Tasks"
          value="/Tasks"
          icon={<Task />}
        />
        <BottomNavigationAction
          component={Link}
          to="/Seed"
          label="Seed"
          value="/Seed"
          icon={<Nature />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavigationBar;
