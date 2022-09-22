import React from "react";
import { Box, Button } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";

const StartTimer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Button
        sx={{ padding: "0px", margin: 0 }}
        size="small"
        variant="outlined"
        fullWidth
      >
        <PlayArrow />
      </Button>
    </Box>
  );
};

export default StartTimer;
