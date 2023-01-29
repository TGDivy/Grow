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
import { Masonry } from "@mui/lab";
import useTimerStore from "../Common/Stores/TimerStore";
import ZenQuote from "./ZenQuote";

const SeedMain = () => {
  // Occupy full page
  const taskKey = useTimerStore((state) => state.taskKey);

  const StickerAndTags = () => {
    return (
      <Card
        sx={{
          ":hover": {
            boxShadow: 20,
          },
          backgroundColor: "#00000088",
          color: "primary.main",
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "1rem",
          alignItems: "space-between",
          flexWrap: "wrap",
        }}
      >
        <AddTags />
        <AddSticker />
      </Card>
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
      <Divider
        textAlign="left"
        sx={{
          "&.MuiDivider-root": {
            pb: 1,
            "&::before": {
              borderTopWidth: 3,
              borderTopStyle: "solid",
              borderTopColor: "#00000088",
            },
            "&::after": {
              borderTopWidth: 3,
              borderTopStyle: "solid",
              borderTopColor: "#00000088",
            },
          },
        }}
      >
        <Box
          pt={2}
          mb={1}
          alignItems={"center"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Typography variant="h4" align="center">
            Timer
          </Typography>
        </Box>
      </Divider>
      <Box
        sx={{
          p: 2,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      >
        <Components />
      </Box>
    </Container>
  );
};

export default SeedMain;
