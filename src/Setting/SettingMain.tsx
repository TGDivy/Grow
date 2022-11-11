import React from "react";
import { Container, Box, Stack, Typography, Divider } from "@mui/material";
import Tags from "./Tags";

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
      </Stack>
    </Container>
  );
};

export default SettingMain;
