import React from "react";
import { Box, Grid, IconButton, Stepper, Typography } from "@mui/material";
import { Step, StepLabel } from "@mui/material";
import { Container } from "@mui/material";
import { Stack } from "@mui/system";
import { Button } from "@mui/material";
import useJournalStore from "../Common/Stores/DailyJournalStore";

import Mood from "./Mood";
import Habits from "./Habits";

const JournalMain = () => {
  const activeStep = useJournalStore((state) => state.activeStep);
  const setActiveStep = useJournalStore((state) => state.setActiveStep);

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {
    console.log("submit");
  };

  const steps = [
    {
      label: "How are you feeling today?",
      component: <Mood />,
      shortLabel: "Mood",
    },
    {
      label: "Keeping up with your habits?",
      component: <Habits />,
      shortLabel: "Habits",
    },
    {
      label: "What are you grateful for today?",
      component: <div>Grateful</div>,
      shortLabel: "Grateful",
    },
    {
      label: "What are your goals for today?",
      component: <div>Goals</div>,
      shortLabel: "Goals",
    },
    {
      label: "What are your goals for the week?",
      component: <div>Week Goals</div>,
      shortLabel: "Week Goals",
    },
  ];

  return (
    <Container>
      <Stack spacing={2} alignItems="center">
        <Box
          sx={{
            width: "100%",
            margin: "20px 0 0 0",
          }}
        >
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step) => (
              <Step key={step.label}>
                <StepLabel>{step.shortLabel}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box
          sx={{
            width: "100%",
            minHeight: "50vh",
            // alignItems: "center",
            // justifyContent: "center",
            // display: "flex",
          }}
        >
          <Grid container spacing={2} direction="row" justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h4" align="center">
                {steps[activeStep].label}
              </Typography>
            </Grid>
            <Grid item xs={12} md={10}>
              {steps[activeStep].component}
            </Grid>
          </Grid>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={
              activeStep === steps.length - 1 ? handleSubmit : handleNext
            }
          >
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default JournalMain;
