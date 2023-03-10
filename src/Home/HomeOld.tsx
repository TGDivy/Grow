import React from "react";
import { Link } from "react-router-dom";
import Overall from "../Stats2/Overall";
import { Nature, Task, Terrain, TrendingUp } from "@mui/icons-material";

import {
  Container,
  Fade,
  Grid,
  Grow,
  IconButton,
  Stack,
  Tab,
  Typography,
  Zoom,
} from "@mui/material";
import Events from "./Events";
import { Box } from "@mui/system";
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
import TopBar from "./TopBar";
import CondensedTaskList from "../Tasks/CondensedTaskList";
import Timer from "../Seed/Timer";
import StyledCard from "../Common/ReusableComponents/StyledCard";
import HabitsCondensed from "../Journal/HabitsCondensed";
import PieCharts from "../Stats2/PieCharts";
import StyledButton from "../Common/ReusableComponents/StyledButton";
import { tab } from "@testing-library/user-event/dist/tab";
import StyledAccordion from "../Common/ReusableComponents/StyledAccordion";
import StyledTab from "../Common/ReusableComponents/StyledTab";
import Goals from "../Journal/Goals";

const Buttons = () => {
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

  return (
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
            transitionDelay: `${index * 150 + 1000}ms`,
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
  );
};

const TodaysBrief = () => {
  const tabs = [
    <>
      <CondensedTaskList />
      <Goals readonly key="0" />
    </>,
    <HabitsCondensed key="habits" />,
  ];
  const [tab, setTab] = React.useState(0);
  const handleTabChange = (
    event: any,
    newValue: React.SetStateAction<number>
  ) => {
    setTab(newValue);
  };
  return (
    <Fade
      in={true}
      style={{
        transitionDelay: `${1000}ms`,
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
  );
};
const Home = () => {
  // const inspirationalQuote = {
  //   quote: "It is not the mountain we conquer, but ourselves.",
  //   author: "Sir Edmund Hillary",
  // };
  const inspirationalQuote = {
    quote: "Not all those who wander are lost.",
    author: "Bilbo Baggins",
  };

  const transitionDelays = {
    quote: 0,
    quoteAuthor: 1000,

    overall: 2000,
    schedule: 3000,
  };

  return (
    <>
      <TopBar />
      <Container sx={{ pt: 2, p: { xs: 0, md: 2 } }}>
        <Box
          sx={{
            mt: { xs: 2, md: 0 },
            p: { xs: 0, md: 2 },
            mb: { xs: 0, md: 2 },
            borderRadius: 1,
            backgroundColor: {
              xs: "transparent",
              sm: "surfaceVariant.main",
            },
            color: { xs: "transparent", sm: "surfaceVariant.contrastText" },
          }}
        >
          <Grid
            container
            spacing={{
              xs: 2,
              sm: 2,
              md: 3,
            }}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12}>
              <Grow in={true} {...{ timeout: 1000 }}>
                <StyledCard
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1rem",
                  }}
                >
                  <Typography variant="h6" align="center">
                    {inspirationalQuote.quote} - {inspirationalQuote.author}
                  </Typography>
                </StyledCard>
              </Grow>
            </Grid>
            <Grid item xs={12}>
              <Buttons />
            </Grid>
          </Grid>
        </Box>
        <Grid
          container
          spacing={{
            xs: 2,
            sm: 2,
            md: 3,
          }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} md={9} sx={{ pb: 0, mb: 0 }}>
            <TodaysBrief />
          </Grid>

          <Grid item xs={12} sm={12} md={8} sx={{ pt: 0, mt: 0 }}>
            <Fade
              in={true}
              style={{
                transitionDelay: `${transitionDelays.overall}ms`,
              }}
              {...{ timeout: 1000 }}
            >
              <Box
                sx={{
                  pt: 0,
                  p: { xs: 0, md: 2 },
                  borderRadius: 1,
                  backgroundColor: {
                    xs: "surfaceVariant.main",
                    sm: "surfaceVariant.main",
                  },
                  color: {
                    xs: "transparent",
                    sm: "surfaceVariant.contrastText",
                  },
                }}
              >
                <Overall />
              </Box>
            </Fade>
          </Grid>

          <Grid item xs={12} md={12} sx={{ pt: 0, mt: 0 }}>
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
        </Grid>
      </Container>
    </>
  );
};

export default Home;
