import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Overall from "../Stats2/Overall";
import {
  Task,
  Nature,
  Terrain,
  TrendingUp,
  Settings,
} from "@mui/icons-material";

import {
  AppBar,
  Container,
  Fade,
  Grid,
  Grow,
  Stack,
  Toolbar,
  Typography,
  Zoom,
} from "@mui/material";
import Events from "./Events";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Help } from "@mui/icons-material";
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
import Habits from "../Journal/Habits";
import { Tab, Tabs } from "@mui/material";
import { useTour } from "@reactour/tour";
import { homeSteps } from "../steps";
import useUserStore from "../Common/Stores/User";
import StyledAccordion from "../Common/ReusableComponents/StyledAccordion";
import StyledButton from "../Common/ReusableComponents/StyledButton";
import StyledTab from "../Common/ReusableComponents/StyledTab";
import TopBar from "./TopBar";

const Home = () => {
  // const inspirationalQuote = {
  //   quote: "It is not the mountain we conquer, but ourselves.",
  //   author: "Sir Edmund Hillary",
  // };
  const inspirationalQuote = {
    quote: "Not all those who wander are lost.",
    author: "Bilbo Baggins",
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
      name: "Workout (soon)",
      icon: <Terrain />,
      link: "/Soil",
    },
    {
      name: "Statistics",
      icon: <TrendingUp />,
      link: "/Statistics",
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
    goals: 2000,
    schedule: 3000,
    overall: 4000,
  };

  const tabs = [
    <Goals readonly key="0" />,
    <Box
      key={"habits"}
      sx={{
        "& .MuiPaper-root": {
          border: "none",
          padding: 0,
          boxShadow: "none",
          backgroundImage: "none",
        },
      }}
    >
      <Habits key="1" />
    </Box>,
  ];
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (
    event: any,
    newValue: React.SetStateAction<number>
  ) => {
    setTab(newValue);
  };

  return (
    <>
      <TopBar />
      <Container
        sx={{
          color: "surface.contrastText",
          backgroundColor: "surface.main",
        }}
      >
        <Box
          sx={{
            mt: 2,
            width: "100%",
            alignContent: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
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
                className="tut-home-places"
                sx={{
                  display: { xs: "none", md: "flex" },
                }}
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
                    <Link to={place.link}>
                      <StyledButton
                        variant="contained"
                        color="primary"
                        startIcon={place.icon}
                        key={place.name}
                        disabled={place.name.toLowerCase().includes("soon")}
                      >
                        {place.name}
                      </StyledButton>
                    </Link>
                  </Zoom>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} md={8} sx={{ pb: 0, mb: 0 }}>
              <Fade
                in={true}
                style={{
                  transitionDelay: `${transitionDelays.goals}ms`,
                }}
                {...{ timeout: 1000 }}
              >
                <div>
                  <StyledAccordion title="Today's Brief">
                    <StyledTab value={tab} onChange={handleTabChange}>
                      <Tab label="Goals" className="tut-home-goals" />
                      <Tab label="Habits" className="tut-home-habits" />
                    </StyledTab>
                    {tabs[tab]}
                  </StyledAccordion>
                </div>
              </Fade>
            </Grid>

            <Grid item xs={12} md={8} sx={{ pt: 0, mt: 0 }}>
              <Fade
                in={true}
                style={{
                  transitionDelay: `${transitionDelays.schedule}ms`,
                }}
                {...{ timeout: 1000 }}
              >
                <div>
                  <Events />
                </div>
              </Fade>
            </Grid>

            <Grid item xs={12} md={8} sx={{ pt: 0, mt: 0 }}>
              <Fade
                in={true}
                style={{
                  transitionDelay: `${transitionDelays.overall}ms`,
                }}
                {...{ timeout: 1000 }}
              >
                <div>
                  <Overall />
                </div>
              </Fade>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Home;
