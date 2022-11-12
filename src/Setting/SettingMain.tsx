import React from "react";
import { Container, Box, Stack, Typography, Divider } from "@mui/material";
import Tags from "./Tags";
import Sticker from "./Sticker";
import StickerAndTagGoals from "./StickerAndTagGoals";
import CustomBoolHabits from "./CustomHabits";

const SettingMain = () => {
  return (
    <Container>
      <Stack spacing={2}>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h3" align="center">
            Settings
          </Typography>
        </Box>
        <Divider />
        <Tags />
        <Sticker />
        <Divider />
        <StickerAndTagGoals />
        <CustomBoolHabits />
      </Stack>
    </Container>
  );
};

export default SettingMain;
