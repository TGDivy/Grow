import React from "react";
import useDailyJournalStore from "../Common/Stores/DailyJournalStore";
import { Stack, Button, Grid, Typography, Paper, Grow } from "@mui/material";
import EmotionIcons from "../Common/EmotionIcons/EmotionIcons";
import { Box } from "@mui/system";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// props

const Mood = () => {
  const moods = useDailyJournalStore((state) => state.mood);
  const addMood = useDailyJournalStore((state) => state.addMood);
  const lastMoodUpdated = useDailyJournalStore(
    (state) => state.lastMoodUpdated
  );

  // if current time is less than 1 hour from last mood updated, then disable the buttons
  const updatedMoodTooRecently =
    new Date().getTime() - lastMoodUpdated.getTime() < 60 * 60 * 1000;

  // get last selected mood
  const lastMood = moods.length > 0 ? moods[moods.length - 1] : "Happy";
  const lastMoodIndex = EmotionIcons.findIndex((e) => e.label === lastMood);

  const [value, setValue] = React.useState(lastMoodIndex);
  const EmotionIcon = EmotionIcons[value].icon;

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    addMood(EmotionIcons[newValue].label);
  };

  if (updatedMoodTooRecently) {
    return (
      <Grow in={true} timeout={1000}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            height: "100%",
            backgroundColor: "#00000088",
            ":hover": {
              boxShadow: 20,
            },
          }}
        >
          <Tabs
            value={value}
            aria-label="mood"
            sx={{
              width: "135px",
            }}
          >
            <Tab
              key={value}
              icon={
                <EmotionIcon
                  sx={{
                    width: 50,
                    height: 50,
                    filter: "brightness(80%) sepia(65%) contrast(150%)",
                  }}
                />
              }
              label={EmotionIcons[value].label}
              value={value}
            />
          </Tabs>
          <Box sx={{ color: "white", height: "max-content", width: "100%" }}>
            <Typography variant="body1" align="center">
              {EmotionIcons[value].description}.
            </Typography>
          </Box>
        </Paper>
      </Grow>
    );
  }

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        height: "100%",
        backgroundColor: "#00000088",
        color: "white",
        ":hover": {
          boxShadow: 20,
        },
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        aria-label="mood"
      >
        {EmotionIcons.map((emotion, index) => (
          <Tab
            key={emotion.label}
            onClick={() => {
              setValue(index);
              addMood(emotion.label);
            }}
            icon={
              <emotion.icon
                sx={{
                  width: 50,
                  height: 50,
                  filter: "brightness(80%) sepia(65%) contrast(150%)",
                }}
              />
            }
            label={emotion.label}
            value={index}
            sx={{
              color: "#f5f5f5",
            }}
          />
        ))}
      </Tabs>
    </Paper>
  );
};

export default Mood;
