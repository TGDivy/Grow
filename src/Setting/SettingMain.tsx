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
import { useTour } from "@reactour/tour";
import { settingsSteps } from "../steps";
import useUserStore from "../Common/Stores/User";
import { Help } from "@mui/icons-material";

const SettingMain = () => {
  const tutorials = useUserStore((state) => state.tutorials);
  const setTutorials = useUserStore((state) => state.setTutorials);
  const { setIsOpen, setSteps, setCurrentStep } = useTour();
  const handleHelp = () => {
    setSteps(settingsSteps);
    setCurrentStep(0);
    setIsOpen(true);
    setTutorials([...tutorials, "setting"]);
  };

  useEffect(() => {
    if (tutorials.includes("setting")) return;
    handleHelp();
  }, []);

  return (
    <Container>
      <Stack spacing={2}>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h3" align="center">
            Settings{" "}
            <Button onClick={handleHelp} size="large">
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
      </Stack>
    </Container>
  );
};

export default SettingMain;
