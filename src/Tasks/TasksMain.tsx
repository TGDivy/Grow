import React from "react";
import { Box, Container, Stack, Fade } from "@mui/material";
import Projects from "./Projects";
import CondensedTaskList from "./CondensedTaskList";

const TasksMain = () => {
  return (
    <Container
      sx={{
        mt: { xs: 2, md: 2 },
      }}
    >
      <Stack spacing={2}>
        <Projects />
        <Fade in={true} timeout={1000}>
          <Box>
            <CondensedTaskList title={"All Tasks"} createTask />
          </Box>
        </Fade>
      </Stack>
    </Container>
  );
};

export default TasksMain;
