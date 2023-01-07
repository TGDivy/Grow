import React, { FC } from "react";

import { Link, useLocation } from "react-router-dom";

import {
  Home,
  Task,
  Nature,
  Terrain,
  TrendingUp,
  SelfImprovement,
  Menu,
} from "@mui/icons-material";
import { Fab, IconButton, Paper, Button, Box, Grid, Zoom } from "@mui/material";

const BottomNavigationBar: FC = () => {
  const location = useLocation();

  if (
    location.pathname === "/" ||
    location.pathname === "/Login" ||
    location.pathname === "/AnnonymousUser"
  ) {
    return null;
  }

  const list = ["/Reflect", "/Soil", "/Stats", "Seed", "/Tasks"];

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

  const selfImprovementPlaces = [
    {
      name: "Statistics",
      icon: <TrendingUp />,
      link: "/Stats",
    },
    {
      name: "Reflect",
      icon: <SelfImprovement />,
      link: "/Reflect",
    },
  ];

  const all = [
    ...workPlaces,
    ...workoutPlaces,
    ...statsPlaces,
    ...selfImprovementPlaces,
  ];
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#00000088",
      }}
      elevation={3}
      color="primary"
      className={`tut-navbar-overview`}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={5} md={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            {workPlaces.map((place) => (
              <Link to={place.link} key={place.name}>
                <IconButton
                  sx={{
                    color:
                      location.pathname === place.link
                        ? "primary.main"
                        : "primary",
                  }}
                  className={`tut-navbar-${place.name}`}
                >
                  {place.icon}
                </IconButton>
              </Link>
            ))}
          </Box>
        </Grid>
        <Grid item>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
              top: "-20px",
            }}
          >
            <Zoom in={true} timeout={500}>
              <Link to="/">
                <Fab color="secondary" aria-label="menu">
                  <Home />
                </Fab>
              </Link>
            </Zoom>
          </Box>
        </Grid>
        <Grid item xs={5} md={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            {selfImprovementPlaces.map((place) => (
              <Link to={place.link} key={place.name}>
                <IconButton
                  sx={{
                    color:
                      location.pathname === place.link
                        ? "primary.main"
                        : "primary",
                  }}
                >
                  {place.icon}
                </IconButton>
              </Link>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BottomNavigationBar;
