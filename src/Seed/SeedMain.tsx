import React from "react";

import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
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
      <StyledCard
        sx={{
          p: 2,
        }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={8}>
            <AddTags />
          </Grid>
          <Grid item xs={4}>
            <AddSticker />
          </Grid>
        </Grid>
      </StyledCard>
    );
  };

  const Components = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ZenQuote />
        </Grid>
        <Grid item xs={12} md={6} sx={{ height: "100%" }}>
          <Stack spacing={2}>
            <Timer />
            <StickerAndTags />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
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
        </Grid>
      </Grid>
    );
  };

  return (
    <Container>
      <PageTitle title="Timer" />
      <Box
        sx={{
          p: 2,
          backgroundColor: "surfaceVariant.main",
          color: "surfaceVariant.contrastText",
        }}
      >
        <Components />
      </Box>
    </Container>
  );
};

export default SeedMain;
