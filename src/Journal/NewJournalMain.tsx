import React from "react";
import HabitCreator from "../Habits/HabitCreator";
import {
  Task,
  SelfImprovement,
  List,
  AlignHorizontalCenter,
} from "@mui/icons-material";
import {
  Stack,
  Zoom,
  Container,
  Box,
  Grid,
  Grow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import StyledButton from "../Common/ReusableComponents/StyledButton";
import StyledCard from "../Common/ReusableComponents/StyledCard";
import TopBar from "../Home/TopBar";

const Buttons = () => {
  const places = [
    {
      name: "Habits (Coming Soon)",
      icon: <AlignHorizontalCenter />,
      link: "/Habits",
    },
    {
      name: "Today's Journal Entry",
      icon: <SelfImprovement />,
      link: "/Journal/Today",
    },
    {
      name: "Old Journal Entries (Coming Soon)",
      icon: <List />,
      link: "/Journal",
    },
  ];

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      justifyContent="center"
      className="tut-home-places"
      alignItems="center"
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

const NewJournalMain = () => {
  const inspirationalQuote = {
    quote:
      "Life can only be understood backwards; but it must be lived forwards.",
    author: "Søren Kierkegaard",
  };

  return (
    <>
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
      </Container>
    </>
  );
};

export default NewJournalMain;
