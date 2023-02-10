import React, { FC, useCallback, useState } from "react";
import useTimerRecordsStore from "../Common/Stores/TimerRecordsStore";
import useUserStore from "../Common/Stores/User";
import {
  timePeriod,
  getStartAndEndDate,
  getTimerRecordsBetween,
  getPeriodName,
} from "./Utils/utils";
import { PieChart, Pie } from "recharts";
import useThemeStore from "../Common/Stores/ThemeStore";
import { timerType } from "../Common/Types/Types";
import GraphCard from "./Graphs/GraphCard";
import { renderActiveShape } from "./Utils/Shapes";
import { dataType } from "./Utils/graph";
import { getTagPieData, getStickerPieData } from "./Utils/graphRadial";
import { Typography, Box, Grid, Tab, Button, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import StyledButton from "../Common/ReusableComponents/StyledButton";
import StyledTab from "../Common/ReusableComponents/StyledTab";

interface Props {
  timerRecords: timerType[];
  filterOn: "Tags" | "Stickers";
  values: string[];
  tabs: React.ReactElement;
}

const TagPieStat: FC<Props> = ({ timerRecords, filterOn, values, tabs }) => {
  const [data, setData] = React.useState<dataType[]>();
  const colors = useThemeStore((state) => state.colors);

  React.useEffect(() => {
    if (filterOn === "Tags") {
      getTagPieData(timerRecords, values).then((data) => {
        if (data) {
          setData(data);
        }
      });
    } else if (filterOn === "Stickers") {
      getStickerPieData(timerRecords, values).then((data) => {
        if (data) {
          setData(data);
        }
      });
    }
  }, [timerRecords]);

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: React.SetStateAction<number>) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  if (!data) {
    return null;
  }

  return (
    <GraphCard title={tabs} cardActions={tabs} height="310px">
      <PieChart>
        <Pie
          data={data}
          dataKey="time"
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="80%"
          fill="#00000088"
          stroke="#ffffff33"
          strokeWidth={2}
          activeIndex={activeIndex}
          activeShape={renderActiveShape(colors.tertiary)}
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </GraphCard>
  );
};

const PieCharts = () => {
  const timerRecords = useTimerRecordsStore((state) => state.timerRecords);
  const possibleTags = useUserStore((state) => state.tags);
  const possibleStickers = useUserStore((state) => state.stickers);

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
  const selectedTimerRecords = getTimerRecordsBetween(
    timerRecords,
    firstDay,
    lastDay,
    period
  );

  const onClickCyclePeriod = () => {
    if (period === timePeriod.day) {
      setPeriod(timePeriod.week);
    } else if (period === timePeriod.week) {
      setPeriod(timePeriod.month);
    } else if (period === timePeriod.month) {
      setPeriod(timePeriod.year);
    } else if (period === timePeriod.year) {
      setPeriod(timePeriod.day);
    }
  };
  const tabs = (
    <Grid
      container
      alignContent="center"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={3}>
        <Button
          fullWidth
          size="small"
          variant="outlined"
          onClick={onClickCyclePeriod}
        >
          {period}
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Typography
          variant="body1"
          align="center"
          noWrap
          justifyItems="center"
          alignItems="center"
        >
          {getPeriodName(firstDay, lastDay, period)}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <IconButton
              size="small"
              onClick={() => handlePeriodBackClick("back")}
            >
              <ArrowBack />
            </IconButton>
          </Grid>

          <Grid item xs={6}>
            <IconButton
              size="small"
              onClick={() => handlePeriodBackClick("forward")}
              disabled={periodBack === 0}
            >
              <ArrowForward />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <TagPieStat
      timerRecords={selectedTimerRecords}
      filterOn="Tags"
      values={possibleTags}
      tabs={tabs}
    />
  );
};

export default PieCharts;
