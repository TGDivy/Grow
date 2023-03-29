import { ExpandMoreOutlined } from "@mui/icons-material";
import {
  Box,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Link,
  ListItemButton,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
import moment from "moment";
import React from "react";
import StyledCard from "../Common/ReusableComponents/StyledCard";
import useHabitsStore, {
  FrequencyType,
  HabitType,
} from "../Common/Stores/HabitsStore";
import { ExpandMore } from "../Tasks/Projects";
import HabitViewer from "./HabitViewer";

export const FrequencyTypeVisualizer = (props: FrequencyType) => {
  const { type, repeatEvery, daysOfWeek } = props;
  let daysOfWeekText = "";
  const weekdays = ["mon", "tue", "wed", "thu", "fri"] as (
    | "mon"
    | "tue"
    | "wed"
    | "thu"
    | "fri"
  )[];
  const weekend = ["sat", "sun"] as ("sat" | "sun")[];
  const capDaysOfWeek = daysOfWeek?.map(
    (day) => day.charAt(0).toUpperCase() + day.slice(1)
  );

  switch (type) {
    case "day":
      if (repeatEvery === 1) {
        return <Typography variant="body2">Everyday</Typography>;
      }
      return <Typography variant="body2">Every {repeatEvery} days</Typography>;
    case "week":
      if (daysOfWeek && capDaysOfWeek) {
        if (daysOfWeek.length === 7) {
          daysOfWeekText = "Everyday";
        } else if (
          daysOfWeek.length === 5 &&
          weekdays.every((day) => daysOfWeek.includes(day))
        ) {
          daysOfWeekText = "on weekdays";
        } else if (
          daysOfWeek.length === 2 &&
          weekend.every((day) => daysOfWeek.includes(day))
        ) {
          daysOfWeekText = "on weekend";
        } else if (daysOfWeek.length === 1) {
          daysOfWeekText = `on ${capDaysOfWeek[0]}`;
        } else if (daysOfWeek.length === 2) {
          daysOfWeekText = `on ${capDaysOfWeek[0]} and ${capDaysOfWeek[1]}`;
        } else {
          daysOfWeekText = `on ${capDaysOfWeek.slice(0, -1).join(", ")} and ${
            capDaysOfWeek[capDaysOfWeek.length - 1]
          }`;
        }
      }
      return (
        <Typography variant="body2">
          Every {repeatEvery === 1 ? "" : repeatEvery} week {daysOfWeekText}
        </Typography>
      );
    default:
      return <Typography variant="body2">Unknown</Typography>;
  }
};

const HabitCard = (habit: HabitType) => {
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [coverImageHover, setCoverImageHover] = React.useState(false);

  return (
    <StyledCard onMouseLeave={() => setCoverImageHover(false)}>
      <HabitViewer open={open} handleClose={handleClose} habit={habit} />
      {habit.image?.url && (
        <ImageList
          cols={3}
          variant="quilted"
          rowHeight={120}
          sx={{
            m: 0,
          }}
        >
          <ImageListItem cols={3} rows={1}>
            <img
              src={`${habit.image.url}`}
              srcSet={`${habit.image.url}`}
              alt={`cover image for ${habit.image.url}}`}
              loading="lazy"
              onMouseEnter={() => setCoverImageHover(true)}
            />
            {coverImageHover && (
              <ImageListItemBar
                subtitle={
                  // link to author's profile
                  <Stack
                    direction="row"
                    spacing={1}
                    onMouseEnter={() => setCoverImageHover(true)}
                    alignItems="flex-end"
                    justifyContent={"flex-end"}
                  >
                    <Typography variant="caption">Photo by</Typography>

                    <Link href={habit.image.authorUrl} target="_blank">
                      <Typography variant="caption">
                        {habit.image.name}
                      </Typography>
                    </Link>
                    <Typography variant="caption">on</Typography>
                    <Link href="https://unsplash.com/" target="_blank">
                      <Typography variant="caption">Unsplash</Typography>
                    </Link>
                  </Stack>
                }
              />
            )}
          </ImageListItem>
        </ImageList>
      )}
      <CardHeader
        title={
          <ListItemButton
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              pl: 0,
            }}
            onClick={handleClickOpen}
          >
            {habit.title}
          </ListItemButton>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          sx={{
            m: 0,
            padding: "0 !important",
          }}
        >
          <Divider flexItem />
          <Typography variant="body2" align="center">
            <FrequencyTypeVisualizer {...habit.frequencyType} />
          </Typography>
          <Divider flexItem />
        </CardContent>
      </Collapse>

      <CardActions disableSpacing>
        <Typography variant="body2" align="center">
          {moment(habit.nextDueDate.toDate()).format("dddd, MMMM Do")}
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreOutlined />
        </ExpandMore>
      </CardActions>
    </StyledCard>
  );
};

const HabitsList = () => {
  const habits = useHabitsStore((state) => state.habits);
  const habitsList = Object.entries(habits);

  return (
    <Box
      sx={{
        p: { xs: 0, sm: 2 },
        backgroundColor: { xs: "transparent", sm: "surfaceVariant.main" },
        color: { xs: "transparent", sm: "surfaceVariant.contrastText" },
      }}
    >
      <Grid container spacing={2}>
        {habitsList.map(([habitId, habit], index) => (
          <Zoom
            in
            timeout={600}
            style={{
              transformOrigin: "0 0 0",
              transitionDelay: `${index * 450}ms`,
            }}
            key={habitId}
          >
            <Grid item xs={12} sm={6} md={4} key={habitId}>
              <HabitCard {...habit} />
            </Grid>
          </Zoom>
        ))}
      </Grid>
    </Box>
  );
};

export default HabitsList;
