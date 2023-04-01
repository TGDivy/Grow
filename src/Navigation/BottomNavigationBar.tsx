import React, { FC } from "react";

import { Link, useLocation } from "react-router-dom";

import {
  Home,
  Nature,
  SelfImprovement,
  Task,
  Terrain,
  TrendingUp,
} from "@mui/icons-material";
import { Box, Grid, IconButton, Paper, Zoom } from "@mui/material";
import StyledFab from "../Common/ReusableComponents/StyledFab";
import useThemeStore from "../Common/Stores/ThemeStore";

const BottomNavigationBar: FC = () => {
  const location = useLocation();
  const colors = useThemeStore((state) => state.colors);

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
      link: "/Statistics",
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
        backgroundColor: `${colors.surface}bb`,
        color: "surface.contrastText",
        zIndex: 100,
      }}
      elevation={3}
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
                <StyledFab>
                  <Home />
                </StyledFab>
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
                        : "secondary",
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
