import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button, Grid, IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import StyledButton from "../Common/ReusableComponents/StyledButton";
import useJournalStore from "../Common/Stores/JournalStore";
import useTimerRecordsStore from "../Common/Stores/TimerRecordsStore";
import OverallStatBar from "./Graphs/OverallStatBar";
import {
  getJournalRecordsWithWorkDone,
  getPeriodName,
  getStartAndEndDate,
  timePeriod,
} from "./Utils/utils";

const Overall = () => {
  const timerRecords = useTimerRecordsStore((state) => state.timerRecords);
  const journalRecords = useJournalStore((state) => state.documents);

  const [periodBack, setPeriodBack] = React.useState(0);
  const [period, setPeriod] = React.useState<timePeriod>(timePeriod.month);

  const navigate = useNavigate();

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

  const onClickCyclePeriod = () => {
    if (period === timePeriod.week) {
      setPeriod(timePeriod.month);
    } else if (period === timePeriod.month) {
      setPeriod(timePeriod.quarter);
    } else if (period === timePeriod.quarter) {
      setPeriod(timePeriod.year);
    } else if (period === timePeriod.year) {
      setPeriod(timePeriod.week);
    }
    setPeriodBack(0);
  };
  const tabs = (
    <Grid
      container
      alignContent="center"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={5} flexGrow={2}>
        <StyledButton
          variant="contained"
          // startIcon={<TrendingUp />}
          onClick={onClickCyclePeriod}
        >
          {period}
        </StyledButton>
      </Grid>

      <Grid item xs={2}>
        <IconButton size="small" onClick={() => handlePeriodBackClick("back")}>
          <ArrowBack />
        </IconButton>
      </Grid>
      <Grid item xs={3}>
        <Button
          fullWidth
          size="small"
          variant="outlined"
          onClick={onClickCyclePeriod}
        >
          {getPeriodName(firstDay, lastDay, period)}
        </Button>
      </Grid>
      <Grid item xs={2}>
        <IconButton
          size="small"
          onClick={() => handlePeriodBackClick("forward")}
          disabled={periodBack === 0}
        >
          <ArrowForward />
        </IconButton>
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
