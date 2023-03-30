import React, { Box, Container, Fade, Stack } from "@mui/material";
import Chat from "./Chat";

const ReflectAIAssistedChat = () => {
  return (
    <Container
      sx={{
        mt: { xs: 2, md: 2 },
      }}
    >
      <Stack spacing={2}>
        <Fade in timeout={1000}>
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
              position: "relative",
            }}
          >
            <Chat />
          </Box>
        </Fade>
      </Stack>
    </Container>
  );
};

export default ReflectAIAssistedChat;
