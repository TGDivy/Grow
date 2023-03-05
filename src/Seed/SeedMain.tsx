import React from "react";

import { Box, Container, Fade, Grid, Grow, Stack } from "@mui/material";
import Timer from "./Timer";
import TimerTask from "./AddTask";
import AddTags from "./AddTags";
import AddSticker from "./AddSticker";
import ZenQuote from "./ZenQuote";
import PageTitle from "../Common/ReusableComponents/PageTitle";
import StyledCard from "../Common/ReusableComponents/StyledCard";

const SeedMain = () => {
  const StickerAndTags = () => {
    return (
      <Fade
        in={true}
        {...{ timeout: 1000 }}
        style={{
          transitionDelay: `${2500}ms`,
        }}
      >
        <StyledCard
          sx={{
            p: 2,
          }}
        >
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={8}>
              <AddTags />
            </Grid>
            <Grid item xs={4}>
              <AddSticker />
            </Grid>
          </Grid>
        </StyledCard>
      </Fade>
    );
  };

  const Components = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Fade
            in={true}
            {...{ timeout: 1000 }}
            style={{
              transitionDelay: `${500}ms`,
            }}
          >
            <div>
              <ZenQuote />
            </div>
          </Fade>
        </Grid>
        <Grid item xs={12} md={6} sx={{ height: "100%" }}>
          <Stack spacing={2}>
            <Fade
              in={true}
              {...{ timeout: 1000 }}
              style={{
                transitionDelay: `${1000}ms`,
              }}
            >
              <div>
                <Timer />
              </div>
            </Fade>
            <StickerAndTags />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Fade
            in={true}
            {...{ timeout: 1000 }}
            style={{
              transitionDelay: `${1750}ms`,
            }}
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <TimerTask />
            </Box>
          </Fade>
        </Grid>
      </Grid>
    );
  };

  return (
    <Container>
      <PageTitle title="Timer" />
      <Box
        sx={{
          p: { xs: 0, sm: 2 },
          backgroundColor: { xs: "transparent", sm: "surfaceVariant.main" },
          color: { xs: "transparent", sm: "surfaceVariant.contrastText" },
        }}
      >
        <Components />
      </Box>
    </Container>
  );
};

export default SeedMain;
