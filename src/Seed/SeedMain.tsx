import React from "react";

import { Box, Container, Grow, Grid, Stack } from "@mui/material";
import Timer from "./Timer";
import TimerTask from "./AddTask";
import AddTags from "./AddTags";
import AddSticker from "./AddSticker";
import ZenQuote from "./ZenQuote";
import StyledCard from "../Common/ReusableComponents/StyledCard";

const SeedMain = () => {
  const StickerAndTags = () => {
    return (
      <Grow
        in={true}
        {...{ timeout: 1500 }}
        style={{
          transitionDelay: `${400}ms`,
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
            <Grid item xs={6} sm={8}>
              <AddTags />
            </Grid>
            <Grid item xs={6} sm={4}>
              <AddSticker />
            </Grid>
          </Grid>
        </StyledCard>
      </Grow>
    );
  };

  const Components = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grow
            in={true}
            {...{ timeout: 1000 }}
            style={{
              transitionDelay: `${0}ms`,
            }}
          >
            <div>
              <ZenQuote />
            </div>
          </Grow>
        </Grid>
        <Grid item xs={12} md={6} sx={{ height: "100%" }}>
          <Stack spacing={2}>
            <Grow
              in={true}
              {...{ timeout: 1500 }}
              style={{
                transitionDelay: `${400}ms`,
              }}
            >
              <div>
                <Timer />
              </div>
            </Grow>
            <StickerAndTags />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grow
            in={true}
            {...{ timeout: 1500 }}
            style={{
              transitionDelay: `${400}ms`,
            }}
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                gap: "1rem",
              }}
            >
              <TimerTask />
            </Box>
          </Grow>
        </Grid>
      </Grid>
    );
  };

  return (
    <Container
      sx={{
        mt: { xs: 2, md: 2 },
      }}
    >
      {/* <PageTitle title="Timer" /> */}
      <Box
        sx={
          {
            // p: { xs: 0, sm: 2 },
            // backgroundColor: { xs: "transparent", sm: "surfaceVariant.main" },
            // color: { xs: "transparent", sm: "surfaceVariant.contrastText" },
          }
        }
      >
        <Components />
      </Box>
    </Container>
  );
};

export default SeedMain;
