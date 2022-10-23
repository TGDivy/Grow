import React from "react";
import { Link, useLocation } from "react-router-dom";
import TasksMain from "../Tasks/TasksMain";
import Seed from "../Seed/SeedMain";
import Soil from "../Soil/SoilMain";
import {
  Home as HomeIcon,
  Task,
  Nature,
  Terrain,
  TrendingUp,
} from "@mui/icons-material";

import { Container, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Button, Drawer } from "@mui/material";
import BottomNavigationBar from "../BottomNavigationBar";
import Mood from "../Journal/Mood";
/**
 * A simple, elegant and inspiration home page for the app.
 * Allow easy access to the main features of the app.
 * Have a simple, clean and elegant design.
 *
 * The elements of the home page should be:
 *
 * - An inspirational quote.
 * - A link to the tasks page.
 * - A link to the seed page.
 * - A link to the soil page.
 * - How are you feeling today? (A mood tracker)
 * - A link to the statistics page.
 * - A single most important graph of growth.
 */

const Home = () => {
  const inspirationalQuote = {
    quote: "It is not the mountain we conquer, but ourselves.",
    author: "Sir Edmund Hillary",
  };

  const places = [
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
    {
      name: "Workout",
      icon: <Terrain />,
      link: "/Soil",
    },
    {
      name: "Statistics",
      icon: <TrendingUp />,
      link: "/Stats",
    },
    {
      name: "Reflect",
      icon: <Terrain />,
      link: "/Reflect",
    },
  ];

  return (
    <Container>
      <Box
        sx={{
          height: "90vh",
          width: "100%",
          alignContent: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              {inspirationalQuote.quote}
            </Typography>
            <Typography variant="h6" align="center">
              ~{inspirationalQuote.author}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
            >
              {places.map((place) => (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={place.icon}
                  component={Link}
                  to={place.link}
                  key={place.name}
                >
                  {place.name}
                </Button>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Mood />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
