import React from "react";
import { Box, Divider, Grid, Stepper, Typography } from "@mui/material";
import { Step, StepLabel } from "@mui/material";
import { Container } from "@mui/material";
import { Stack } from "@mui/system";
import { Button } from "@mui/material";
import useDailyJournalStore from "../Common/Stores/DailyJournalStore";

import Mood from "./Mood";
import Habits from "./Habits";
import Reflect from "./Reflect";
import Goals from "./Goals";
import All from "./All";
import useJournalStore from "../Common/Stores/JournalStore";
import moment from "moment";

import { ViewList, Create } from "@mui/icons-material";
import StyledButton from "../Common/ReusableComponents/StyledButton";

const JournalMain = () => {
  const activeStep = useDailyJournalStore((state) => state.activeStep);
  const setActiveStep = useDailyJournalStore((state) => state.setActiveStep);
  const getLastDocumentDate = useJournalStore(
    (state) => state.getLastDocumentDate
  );
  const [viewAll, setViewAll] = React.useState(false);
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
      component: <Reflect Question="How are you feeling overall?" />,
      shortLabel: "Overall",
    },
    {
      label: "",
      component: <Goals />,
      shortLabel: "Goals",
    },
    {
      label: "",
      component: <All />,
      shortLabel: "Summary",
    },
  ];

  const submittedRecently =
    lastDocumentDate.getTime() > Date.now() - 60 * 60 * 18 * 1000;

  const timeUntilNextSubmission = new Date(
    lastDocumentDate.getTime() + 60 * 60 * 18 * 1000
  );

  if (submittedRecently || viewAll) {
    return (
      <Container>
        <Stack spacing={2} justifyContent="center">
          <Box
            sx={{
              width: "100%",
              margin: "20px 0 0 0",
            }}
          >
            <Divider textAlign="right">
              <StyledButton
                variant="contained"
                onClick={() => setViewAll(false)}
              >
                <Create />
                &nbsp;New Journal Entry
              </StyledButton>
            </Divider>
          </Box>

          <Box
            sx={{
              width: "100%",
              margin: "20px 0 0 0",
            }}
          />
          <Typography variant="h4" align="center">
            {"You've already submitted your journal for today!"}
          </Typography>
          <Typography variant="h6" align="center">
            {`Come back again ${moment(timeUntilNextSubmission).fromNow()}`}
          </Typography>
          <Typography variant="h6" align="center">
            {"Or, if you want to see your previous entries, click below!"}
          </Typography>
          <All allEntries />
        </Stack>
      </Container>
    );
  }

  return (
    <Container>
      <Stack spacing={2} alignItems="center" justifyContent="center">
        <Box
          sx={{
            width: "100%",
            margin: "20px 0 0 0",
          }}
        >
          <Divider textAlign="right">
            <StyledButton variant="contained" onClick={() => setViewAll(true)}>
              <ViewList />
            </StyledButton>
          </Divider>
        </Box>

        <Box
          sx={{
            width: "100%",
            margin: "20px 0 0 0",
          }}
        >
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step) => (
              <Step key={step.shortLabel}>
                <StepLabel>{step.shortLabel}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box
          sx={{
            width: "100%",
            minHeight: "50vh",
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
              <Box
                sx={{
                  width: "100%",
                  // display: "flex",
                  // alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {steps[activeStep].component}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Stack direction="row" spacing={2}>
          <StyledButton
            variant="contained"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={
              activeStep === steps.length - 1 ? handleSubmit : handleNext
            }
          >
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </StyledButton>
        </Stack>
      </Stack>
    </Container>
  );
};

export default JournalMain;
