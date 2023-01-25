import React, { FC, useState } from "react";
import useTimerRecordsStore from "../Common/Stores/TimerRecordsStore";

import {
  LineChart,
  Line,
  YAxis,
  Tooltip,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import { JournalType, timerType } from "../Common/Types/Types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  ClickAwayListener,
  Collapse,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import useJournalStore from "../Common/Stores/JournalStore";
import { ArrowBack, ArrowForward, ExpandMore } from "@mui/icons-material";
import {
  dataType,
  dataTypeJournal,
  getWeeklyHabitStat,
  dataToDailyScore,
  getWeeklyWorkStat,
  filterJournalRecords,
} from "./Utils/overall";
import { filterTimerRecords } from "./Utils/recordUtils";

interface Props {
  timerRecords: timerType[];
  previousRecords: timerType[];
  journalRecords: JournalType[];
  previousJournalRecords: JournalType[];
  dayDiff: number;
  timePeriodLength: number;
  handleChange: any;
  handlePeriodBack: any;
  periodBack: number;
}

const OverallStats: FC<Props> = ({
  timerRecords,
  previousRecords,
  journalRecords,
  previousJournalRecords,
  dayDiff,
  timePeriodLength,
  handleChange,
  handlePeriodBack,
  periodBack,
}) => {
  // const timerRecords = useTimerRecordsStore((state) => state.timerRecords);

  const [data, setData] = React.useState<dataType[]>();
  const [dataJournal, setDataJournal] = React.useState<dataTypeJournal[]>();
  const [expanded, setExpanded] = useState(false);

  React.useEffect(() => {
    getWeeklyWorkStat(timerRecords, previousRecords, dayDiff).then((data) => {
      if (data) {
        setData(data);
      }
    });
  }, [timerRecords, previousRecords]);

  React.useEffect(() => {
    getWeeklyHabitStat(journalRecords, previousJournalRecords, dayDiff).then(
      (data) => {
        if (data) {
          setDataJournal(data);
        }
      }
    );
  }, [journalRecords, previousJournalRecords]);

  if (!data || !dataJournal) {
    return null;
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active) {
      return (
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "0px 10px",
            border: "2px solid #bbbbbb",
          }}
        >
          <Typography variant="h6" color="text.primary">
            {`${Math.floor(payload[1].value)}`}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {`Previous ${Math.floor(payload[0].value)}`}
          </Typography>
        </div>
      );
    }

    return null;
  };

  const displayPeriod = () => {
    const DAY = 24 * 60 * 60 * 1000;
    const current = new Date(Date.now() - periodBack * DAY * timePeriodLength);

    // Display current date in a pretty way
    return (
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          alignSelf: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {current.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </Typography>
    );
  };

  return (
    <ClickAwayListener onClickAway={() => setExpanded(false)}>
      <Card
        sx={{
          ":hover": {
            boxShadow: 20,
          },
          backgroundColor: "#00000088",
          color: "#ffffff",
        }}
        onClick={() => setExpanded(true)}
        className="tut-home-progress"
      >
        {/* Center the header */}
        <CardHeader
          title={
            <Typography variant="h5" color="primary">
              Overall Stats
            </Typography>
          }
          action={
            <IconButton aria-label="settings" onClick={() => setExpanded(true)}>
              <ExpandMore />
            </IconButton>
          }
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            height: "30vh",
            width: "100%",
            backgroundColor: "#ffffff00",
          }}
        >
          <ResponsiveContainer>
            <LineChart
              data={dataToDailyScore(data, dataJournal)}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid vertical={false} />

              <YAxis
                axisLine={false}
                width={30}
                orientation="left"
                ticks={[20, 40, 60, 80, 100]}
                tickLine={false}
                tick={{ fill: "#ffffffbb" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <XAxis
                dataKey="day"
                fontSize={14}
                axisLine={false}
                tickLine={false}
                dy={7}
                dx={-5}
                tick={{ fill: "#ffffffbb" }}
              />

              <Line
                type="monotone"
                dataKey="scorePrev"
                name="Previous"
                stroke="#ac9172"
                strokeOpacity={0.3}
                strokeWidth={5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="score"
                name="Current"
                stroke="#ac9172"
                strokeWidth={5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent
            sx={{
              //   marginBottom: 0,
              paddingTop: 0,
              backgroundColor: "#00000000",
            }}
          >
            <Grid
              container
              spacing={2}
              alignContent="center"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} md={6}>
                <Tabs
                  value={timePeriodLength}
                  onChange={handleChange}
                  textColor="primary"
                  indicatorColor="primary"
                  variant="fullWidth"
                >
                  <Tab
                    value={3}
                    label="3 Day"
                    sx={{
                      color: "#ffffffbb",
                    }}
                  />
                  <Tab
                    value={7}
                    label="Week"
                    sx={{
                      color: "#ffffffbb",
                    }}
                  />
                  <Tab
                    value={14}
                    label="Fortnight"
                    sx={{
                      color: "#ffffffbb",
                    }}
                  />
                  <Tab
                    value={30}
                    label="Month"
                    sx={{
                      color: "#ffffffbb",
                    }}
                  />
                </Tabs>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2} alignContent="center">
                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handlePeriodBack("backward")}
                      size="small"
                    >
                      <ArrowBack />
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    {displayPeriod()}
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handlePeriodBack("forward")}
                      disabled={periodBack === 0}
                      size="small"
                    >
                      <ArrowForward />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    </ClickAwayListener>
  );
};

const Overall = () => {
  const timerRecords = useTimerRecordsStore((state) => state.timerRecords);
  const journalRecords = useJournalStore((state) => state.documents);

  const [periodBack, setPeriodBack] = React.useState(0);
  const [timePeriodLength, setTimePeriodLength] = React.useState(7);

  // Display selected period, and change daysBack to change the period
  const handlePeriodBack = (direction: string) => {
    if (direction === "forward" && periodBack > 0) {
      setPeriodBack(periodBack - 1);
    } else if (direction === "backward") {
      setPeriodBack(periodBack + 1);
    }
  };

  const handleChange = (event: any, newValue: any) => {
    setPeriodBack(0);
    setTimePeriodLength(newValue);
  };

  const selectedPeriod = filterTimerRecords(
    timerRecords,
    timePeriodLength,
    periodBack * timePeriodLength
  );
  const previousPeriod = filterTimerRecords(
    timerRecords,
    timePeriodLength,
    periodBack * timePeriodLength + timePeriodLength
  );
  const selectedJournalPeriod = filterJournalRecords(
    journalRecords,
    timePeriodLength,
    periodBack * timePeriodLength
  );
  const previousJournalPeriod = filterJournalRecords(
    journalRecords,
    timePeriodLength,
    periodBack * timePeriodLength + timePeriodLength
  );

  return (
    <OverallStats
      timerRecords={selectedPeriod}
      previousRecords={previousPeriod}
      dayDiff={timePeriodLength}
      journalRecords={selectedJournalPeriod}
      previousJournalRecords={previousJournalPeriod}
      periodBack={periodBack}
      timePeriodLength={timePeriodLength}
      handlePeriodBack={handlePeriodBack}
      handleChange={handleChange}
    />
  );
};

export default Overall;
