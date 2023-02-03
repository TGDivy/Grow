import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Overall from "../Stats/Overall";
import {
  Task,
  Nature,
  Terrain,
  TrendingUp,
  Settings,
} from "@mui/icons-material";

import {
  Container,
  Fade,
  Grid,
  Grow,
  Stack,
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
import ProfileLogo from "./ProfileLogo";
import StyledAccordion from "../Common/ReusableComponents/StyledAccordion";
import StyledButton from "../Common/ReusableComponents/StyledButton";

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
      link: "/Stats",
    },
    {
      name: "Reflect",
      icon: <Terrain />,
      link: "/Reflect",
    },
  ];

  const tutorials = useUserStore((state) => state.tutorials);
  const setTutorials = useUserStore((state) => state.setTutorials);

  const { setIsOpen, isOpen, setSteps, setCurrentStep } = useTour();

  const handleHelp = () => {
    setSteps(homeSteps);
    setCurrentStep(0);
    setIsOpen(true);
    setTutorials([...tutorials, "home"]);
  };

  useEffect(() => {
    if (tutorials.includes("home")) return;
    handleHelp();
  }, []);

  // Add transitions to the home page.

  const transitionDelays = {
    quote: 0,
    quoteAuthor: 200,
    places: 1000,
    goals: 2000,
    schedule: 3000,
    overall: 4000,
  };

  const tabs = [<Goals readonly key="0" />, <Habits key="1" />];
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (
    event: any,
    newValue: React.SetStateAction<number>
  ) => {
    setTab(newValue);
  };

  return (
    <Container
      sx={{
        color: "surface.contrastText",
        backgroundColor: "surface.main",
      }}
    >
      <Box
        sx={{
          height: "15vh",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            p: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // gap: 2,
          }}
        >
          <Button
            onClick={handleHelp}
            size="large"
            className="tut-home-help"
            sx={{ p: 0 }}
          >
            <Help fontSize="large" />
          </Button>
          <Link to="/Settings">
            <StyledButton variant="contained" className="tut-home-settings">
              <Settings />
            </StyledButton>
          </Link>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            p: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <ProfileLogo />
        </Box>
      </Box>
      <Box
        sx={{
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
              className="tut-home-places"
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
                      disabled={
                        isOpen === true ||
                        place.name.toLowerCase().includes("soon")
                      }
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
                  <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                  >
                    <Tab label="Goals" className="tut-home-goals" />
                    <Tab label="Habits" className="tut-home-habits" />
                  </Tabs>
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
  );
};

export default Home;
