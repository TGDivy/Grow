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

import { Container, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Button, Drawer } from "@mui/material";
import BottomNavigationBar from "../BottomNavigationBar";

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
  const location = useLocation();

  const inspirationalQuote =
    "The best way to predict the future is to create it.";

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
  ];

  return (
    <Container>
      <Box
        sx={{
          height: "90vh",
          alignContent: "center",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack spacing={2} alignContent="center" justifyContent="center">
          <Typography variant="h4" align="center">
            {inspirationalQuote}
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center">
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
        </Stack>
      </Box>
      {/* <Typography variant="h5" align="center">
            <Link to="/Tasks">Tasks</Link>
          </Typography>
          <Typography variant="h5" align="center">
            <Link to="/Seed">Seed</Link>
          </Typography>
          <Typography variant="h5" align="center">
            <Link to="/Soil">Soil</Link>
          </Typography>
          <Typography variant="h5" align="center">
            <Link to="/Stats">Statistics</Link>
          </Typography>
        </Stack>
      </Box> */}
    </Container>
  );
};

export default Home;
