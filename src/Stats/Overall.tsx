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
  BarChart,
  Bar,
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
  Divider,
  Grid,
  IconButton,
  Paper,
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
import useThemeStore from "../Common/Stores/ThemeStore";
import StyledCard from "../Common/ReusableComponents/StyledCard";
import StyledButton from "../Common/ReusableComponents/StyledButton";

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
  const colors = useThemeStore((state) => state.colors);

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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active) {
      const score = Math.floor(payload[0].value);
      const scorePrev = Math.floor(payload[1].value) + score;
      return (
        <Paper
          sx={{
            padding: "10px",
            border: "2px solid #aaaaaa",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1">{label}</Typography>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              margin: "0px 10px",
              borderRight: "2px solid #aaaaaa",
            }}
          />
          <Typography variant="body1">
            Score: {`${score}`.padStart(2, "0")}
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              margin: "0px 10px",
              borderRight: "2px solid #aaaaaa",
            }}
          />
          <Typography variant="body1">
            Prev: {`${scorePrev}`.padStart(2, "0")}
          </Typography>
        </Paper>
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
      <StyledCard
        onClick={() => setExpanded(true)}
        className="tut-home-progress"
      >
        <CardHeader
          title={
            <Typography variant="h6" align="center">
              Overall Stats
            </Typography>
          }
          action={
            <IconButton onClick={() => setExpanded(true)}>
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
          }}
        >
          <ResponsiveContainer>
            <BarChart
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
              />
              <Tooltip content={<CustomTooltip />} />
              <XAxis
                dataKey="day"
                fontSize={14}
                axisLine={false}
                tickLine={false}
                dy={7}
                dx={-5}
              />

              <Bar fill={colors.tertiary} stackId="aa" dataKey="score" />
              <Bar
                dataKey="scorePrev"
                fill={`${colors.tertiary}55`}
                stackId="aa"
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent
            sx={{
              paddingTop: 0,
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
                  indicatorColor="secondary"
                  variant="fullWidth"
                >
                  <Tab value={3} label="3 Day" />
                  <Tab value={7} label="Week" />
                  <Tab value={14} label="Fortnight" />
                  <Tab value={30} label="Month" />
                </Tabs>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2} alignContent="center">
                  <Grid item xs={3}>
                    <StyledButton
                      variant="contained"
                      fullWidth
                      onClick={() => handlePeriodBack("backward")}
                      size="small"
                    >
                      <ArrowBack />
                    </StyledButton>
                  </Grid>
                  <Grid item xs={6}>
                    {displayPeriod()}
                  </Grid>
                  <Grid item xs={3}>
                    <StyledButton
                      variant="contained"
                      fullWidth
                      onClick={() => handlePeriodBack("forward")}
                      disabled={periodBack === 0}
                      size="small"
                    >
                      <ArrowForward />
                    </StyledButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </StyledCard>
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
