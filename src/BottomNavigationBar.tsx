import React, { FC } from "react";

import { Link, useLocation } from "react-router-dom";

import { Home, Task, Nature, Terrain, TrendingUp } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

const BottomNavigationBar: FC = () => {
  const location = useLocation();

  if (
    location.pathname === "/" ||
    location.pathname === "/Login" ||
    location.pathname === "/AnnonymousUser"
  ) {
    return null;
  }

  const workPlaces = [
    {
      name: "Tasks",
      icon: <Task />,
      link: "/Tasks",
    },
    {
      name: "Seed",
      icon: <Nature />,
      link: "/Seed",
    },
  ];

  const workoutPlaces = [
    {
      name: "Workout",
      icon: <Terrain />,
      link: "/Soil",
    },
  ];

  const statsPlaces = [
    {
      name: "Statistics",
      icon: <TrendingUp />,
      link: "/Stats",
    },
  ];

  const places = () => {
    switch (location.pathname) {
      case "/Tasks":
        return workPlaces;
      case "/Seed":
        return workPlaces;
      case "/Soil":
        return workoutPlaces;
      case "/Stats":
        return statsPlaces;
      default:
        return workPlaces;
    }
  };

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
        {places().map((place) => (
          <BottomNavigationAction
            component={Link}
            to={place.link}
            label={place.name}
            value={place.link}
            icon={place.icon}
            key={place.name}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavigationBar;
