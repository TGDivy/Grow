import React, { useEffect } from "react";
import {
  Container,
  Box,
  Stack,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import Tags from "./Tags";
import Sticker from "./Sticker";
import StickerAndTagGoals from "./StickerAndTagGoals";
import CustomBoolHabits from "./CustomHabits";
import useUserStore from "../Common/Stores/User";
import { Help } from "@mui/icons-material";
import CleanUpLocalStorage from "./CleanUpLocalStorage";

const SettingMain = () => {
  return (
    <Container>
      <Stack spacing={2}>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h3" align="center">
            Settings{" "}
            <Button size="large">
              <Help fontSize="large" />
            </Button>
          </Typography>
        </Box>
        <Divider />
        <Tags />
        <Sticker />
        <Divider />
        <StickerAndTagGoals />
        <CustomBoolHabits />
        <CleanUpLocalStorage />
      </Stack>
    </Container>
  );
};

export default SettingMain;
