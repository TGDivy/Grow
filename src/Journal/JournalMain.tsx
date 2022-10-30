import React, { useEffect } from "react";
import { Box, Grid, IconButton, Stepper, Typography } from "@mui/material";
import { Step, StepLabel } from "@mui/material";
import { Container } from "@mui/material";
import { Stack } from "@mui/system";
import { Button } from "@mui/material";
import useDailyJournalStore from "../Common/Stores/DailyJournalStore";

import Mood from "./Mood";
import Habits from "./Habits";
import Reflect from "./Reflect";
import Goals from "./Goals";
import useJournalStore from "../Common/Stores/JournalStore";

const JournalMain = () => {
  const activeStep = useDailyJournalStore((state) => state.activeStep);
  const setActiveStep = useDailyJournalStore((state) => state.setActiveStep);
  const getLastDocumentDate = useJournalStore(
    (state) => state.getLastDocumentDate
  );
  const resetStore = useDailyJournalStore((state) => state.resetStore);
  const getJournal = useDailyJournalStore((state) => state.getJournal);
  const documents = useJournalStore((state) => state.documents);
  const addDocument = useJournalStore((state) => state.addDocument);
  const lastDocumentDate = getLastDocumentDate();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {
    addDocument(getJournal());
    resetStore();
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
      component: <Reflect Question="What went well today?" />,
      shortLabel: "Positives",
    },
    {
      component: <Reflect Question="What could have gone better today?" />,
      shortLabel: "Negatives",
    },
    {
      component: <Reflect Question="How are feeling overall?" />,
      shortLabel: "Overall",
    },
    {
      label: "",
      component: <Goals />,
      shortLabel: "Goals",
    },
  ];

  useEffect(() => {
    setActiveStep(0);
  }, [documents]);

  console.log(lastDocumentDate);
  console.log(new Date());
  console.log(lastDocumentDate.getTime() > Date.now() - 60 * 1 * 1 * 1000);

  // TODO: Add a check to see if the last document is from today
  const submittedRecently =
    lastDocumentDate.getTime() > Date.now() - 60 * 1 * 1 * 1000;

  if (submittedRecently) {
    return (
      <Container>
        <Typography variant="h4" align="center">
          {"You've already submitted your journal for today!"}
        </Typography>
      </Container>
    );
  }

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
