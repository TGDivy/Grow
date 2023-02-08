import React from "react";
import useJournalStore from "../Common/Stores/JournalStore";
import useTimerRecordsStore from "../Common/Stores/TimerRecordsStore";
import {
  timePeriod,
  getStartAndEndDate,
  getJournalRecordsWithWorkDone,
  getPeriodName,
} from "./Utils/utils";
import OverallStatBar from "./Graphs/OverallStatBar";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Grid, Box, Typography } from "@mui/material";
import StyledButton from "../Common/ReusableComponents/StyledButton";

const Overall = () => {
  const timerRecords = useTimerRecordsStore((state) => state.timerRecords);
  const journalRecords = useJournalStore((state) => state.documents);

  const [periodBack, setPeriodBack] = React.useState(0);
  const [period, setPeriod] = React.useState<timePeriod>(timePeriod.week);

  const handlePeriodChange = (
    e: React.SyntheticEvent<Element, Event>,
    newValue: timePeriod
  ) => {
    setPeriodBack(0);
    setPeriod(newValue);
  };

  const handlePeriodBackClick = (direction: "back" | "forward") => {
    if (direction === "back") {
      setPeriodBack(periodBack + 1);
    } else {
      setPeriodBack(periodBack - 1);
    }
  };

  const { firstDay, lastDay } = getStartAndEndDate(period, periodBack);
  const selectedJournalRecords = getJournalRecordsWithWorkDone(
    firstDay,
    lastDay,
    timerRecords,
    journalRecords,
    period
  );

  const { firstDay: firstDay2, lastDay: lastDay2 } = getStartAndEndDate(
    period,
    periodBack + 1
  );
  const selectedJournalRecords2 = getJournalRecordsWithWorkDone(
    firstDay2,
    lastDay2,
    timerRecords,
    journalRecords,
    period
  );

  const tabs = (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <StyledButton
          variant="contained"
          fullWidth
          onClick={() => handlePeriodBackClick("back")}
          size="small"
        >
          <ArrowBack />
        </StyledButton>
      </Grid>
      <Grid item xs={6}>
        <Box
          textAlign="center"
          alignItems="center"
          justifyContent="center"
          display="flex"
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            noWrap
            justifyItems="center"
            alignItems="center"
          >
            {getPeriodName(firstDay, lastDay, period)}
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={3}>
        <StyledButton
          variant="contained"
          fullWidth
          onClick={() => handlePeriodBackClick("forward")}
          disabled={periodBack === 0}
          size="small"
        >
          <ArrowForward />
        </StyledButton>
      </Grid>
    </Grid>
  );

  return (
    <>
      <OverallStatBar
        journalRecords={selectedJournalRecords}
        journalRecords2={selectedJournalRecords2}
        period={period}
        tabs={tabs}
      />
      {/* </GraphCard> */}
    </>
  );
};

export default Overall;
