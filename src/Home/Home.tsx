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
  ExpandMore,
  Settings,
} from "@mui/icons-material";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Divider,
  Fade,
  Grid,
  Grow,
  Slide,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
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
 */ import Goals from "../Journal/Goals";

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

  // Add transitions to the home page.

  const transitionDelays = {
    quote: 0,
    quoteAuthor: 200,
    places: 1000,
    mood: 2000,
    goals: 3000,
  };

  return (
    <Container>
      <Box
        sx={{
          height: "25vh",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            p: 2,
          }}
        >
          <Button variant="contained" component={Link} to="/Settings">
            <Settings />
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          // height: "90vh",
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
            <Grow
              in={true}
              style={{ transformOrigin: "0 0 0" }}
              {...{ timeout: 1000 }}
            >
              <Typography variant="h4" align="center">
                {inspirationalQuote.quote}
              </Typography>
            </Grow>
            <Grow
              in={true}
              style={{
                transformOrigin: "0 0 0",
                transitionDelay: `${transitionDelays.quoteAuthor}ms`,
              }}
              {...{ timeout: 1000 }}
            >
              <Typography variant="h6" align="center">
                ~{inspirationalQuote.author}
              </Typography>
            </Grow>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
            >
              {places.map((place, index) => (
                <Zoom
                  in={true}
                  style={{
                    transitionDelay: `${
                      index * 150 + transitionDelays.places
                    }ms`,
                  }}
                  key={place.name}
                >
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
                </Zoom>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Fade
              in={true}
              style={{
                transitionDelay: `${transitionDelays.mood}ms`,
              }}
              {...{ timeout: 1000 }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <Mood />
              </Box>
            </Fade>
          </Grid>

          <Grid item xs={12} md={8} sx={{ pb: 0, mb: 0 }}>
            <Fade
              in={true}
              style={{
                transitionDelay: `${transitionDelays.goals}ms`,
              }}
              {...{ timeout: 1000 }}
            >
              <Accordion
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  ":hover": {
                    boxShadow: 20,
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    // flexDirection: "row-reverse",
                    " .MuiAccordionSummary-content": {
                      flexGrow: 0,
                    },
                  }}
                >
                  <Typography variant="h6" color="primary">
                    {"Today's Brief"}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    pt: 2,
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <Goals readonly />
                </AccordionDetails>
              </Accordion>
            </Fade>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
