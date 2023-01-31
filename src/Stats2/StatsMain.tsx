import React from "react";
import useTimerRecordsStore from "../Common/Stores/TimerRecordsStore";
import { Container, Typography, Grid, Divider, Box } from "@mui/material";
import { Tab, Tabs, Button } from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import {
  timePeriod,
  getStartAndEndDate,
  getPeriodName,
  getTimerRecordsBetween,
} from "./Utils/utils";
import WorkStatBar from "./Graphs/WorkStatBar";
import WorkStatLine from "./Graphs/WorkStatLine";
import TagPieStat from "./Graphs/PieStat";
import useUserStore from "../Common/Stores/User";
import HabitsChart from "./HabitsChart/HabitsChart";
import { Stack } from "@mui/system";
import PageTitle from "../Common/Utils/PageTitle";

const StatsMain = () => {
  const timerRecords = useTimerRecordsStore((state) => state.timerRecords);
  const possibleTags = useUserStore((state) => state.tags);
  const possibleStickers = useUserStore((state) => state.stickers);
  const [periodBack, setPeriodBack] = React.useState(0);
  const [period, setPeriod] = React.useState<timePeriod>(timePeriod.day);

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
  console.log(firstDay, lastDay);
  const selectedTimerRecords = getTimerRecordsBetween(
    timerRecords,
    firstDay,
    lastDay,
    period
  );

  const { firstDay: firstDay2, lastDay: lastDay2 } = getStartAndEndDate(
    period,
    periodBack + 1
  );
  const selectedTimerRecords2 = getTimerRecordsBetween(
    timerRecords,
    firstDay2,
    lastDay2,
    period
  );

  return (
    <>
      <Container>
        <PageTitle title="Stats" />

        <Stack spacing={2}>
          <Box
            sx={{
              p: 2,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
          >
            <Grid
              container
              spacing={2}
              alignContent="center"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} md={8}>
                <Tabs
                  value={period}
                  onChange={handlePeriodChange}
                  textColor="primary"
                  indicatorColor="primary"
                  // change the font size of text in the tab when selected
                  sx={{
                    "& .MuiTab-textColorPrimary.Mui-selected": {
                      fontSize: "1.4rem",
                    },
                  }}
                >
                  <Tab label="Day" value={timePeriod.day} />
                  <Tab label="Week" value={timePeriod.week} />
                  <Tab label="Month" value={timePeriod.month} />
                  <Tab label="Quarter" value={timePeriod.quarter} />
                  <Tab label="Year" value={timePeriod.year} />
                </Tabs>
              </Grid>
              <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handlePeriodBackClick("back")}
                    >
                      <ArrowBack />
                    </Button>
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
                        color="primary"
                        noWrap
                        justifyItems="center"
                        alignItems="center"
                      >
                        {getPeriodName(firstDay, lastDay, period)}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handlePeriodBackClick("forward")}
                      disabled={periodBack === 0}
                    >
                      <ArrowForward />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <WorkStatBar
                  timerRecords={selectedTimerRecords}
                  selectedTimerRecords2={selectedTimerRecords2}
                  period={period}
                  date={lastDay}
                  date2={lastDay2}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <WorkStatLine
                  timerRecords={selectedTimerRecords}
                  selectedTimerRecords2={selectedTimerRecords2}
                  period={period}
                  date={lastDay}
                  date2={lastDay2}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TagPieStat
                  timerRecords={selectedTimerRecords}
                  filterOn="Tags"
                  values={possibleTags}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TagPieStat
                  timerRecords={selectedTimerRecords}
                  filterOn="Stickers"
                  values={possibleStickers}
                />
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              p: 2,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
          >
            <HabitsChart />
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default StatsMain;
