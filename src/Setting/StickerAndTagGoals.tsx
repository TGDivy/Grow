import React from "react";
import useUserStore from "../Common/Stores/User";
import {
  Paper,
  Typography,
  Button,
  Collapse,
  ListItemIcon,
} from "@mui/material";
import { TextField } from "@mui/material";
import { Stack } from "@mui/system";
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemButton,
  ButtonGroup,
} from "@mui/material";
import { stickerTagHabitType } from "../Common/Types/Types";

interface selectedStickerTagHabit extends stickerTagHabitType {
  selected: boolean;
}

const StickerAndTagGoals = () => {
  // Text box for adding new tags
  // And display all the tags

  const stickerTagHabits = useUserStore((state) => state.stickerTagHabits);
  const setStickerTagHabits = useUserStore(
    (state) => state.setStickerTagHabits
  );

  const tags = useUserStore((state) => state.tags);
  const stickers = useUserStore((state) => state.stickers);

  // For each tag and sticker, we want to display a checkbox
  // If the user has selected it, then we want user to also select days of the week for it, and minutes per day

  const [tagsAndStickers, setTagsAndStickers] = React.useState<
    selectedStickerTagHabit[]
  >(
    [...tags, ...stickers].map((tagOrStickerName) => {
      // find tagOrStickerName in stickerTagHabits and return it with selected: true
      // if not found, return it with selected: false
      const found = stickerTagHabits.find(
        (stickerTagHabit) => stickerTagHabit.name === tagOrStickerName
      );
      if (found) {
        return { ...found, selected: true };
      }
      return {
        name: tagOrStickerName,
        selected: false,
        daysOfWeek: "0000000",
        minutes: 0,
      };
    })
  );

  const handleTagOrStickerClick = (index: number) => {
    const newSelectedTagsAndStickers = [...tagsAndStickers];
    newSelectedTagsAndStickers[index].selected =
      !newSelectedTagsAndStickers[index].selected;
    setTagsAndStickers(newSelectedTagsAndStickers);
  };

  const handleTagOrStickerDaysOfWeekChange = (index: number, day: string) => {
    // daysOfWeek is a string of 7 characters, where each character is either 0 or 1
    // 0 means the day is not selected, 1 means the day is selected
    // The order of the days is: Sun, Mon, Tue, Wed, Thu, Fri, Sat

    const newSelectedTagsAndStickers = [...tagsAndStickers];
    const daysOfWeek = newSelectedTagsAndStickers[index].daysOfWeek;
    const dayIndex = ("SunMonTueWedThuFriSat".indexOf(day) / 3) as
      | 0
      | 1
      | 2
      | 3
      | 4
      | 5
      | 6;
    const newDaysOfWeek =
      daysOfWeek.slice(0, dayIndex) +
      (daysOfWeek[dayIndex] === "0" ? "1" : "0") +
      daysOfWeek.slice(dayIndex + 1);
    newSelectedTagsAndStickers[index].daysOfWeek = newDaysOfWeek;
    setTagsAndStickers(newSelectedTagsAndStickers);
  };

  const handleTagOrStickerMinutesChange = (index: number, minutes: number) => {
    const newSelectedTagsAndStickers = [...tagsAndStickers];
    newSelectedTagsAndStickers[index].minutes = minutes;
    setTagsAndStickers(newSelectedTagsAndStickers);
  };

  const [changesMade, setChangesMade] = React.useState(false);

  React.useEffect(() => {
    // If value of tagsAndStickers changes, then set changesMade to true
    // Not if the order of the tags and stickers changes, but if the values of the tags and stickers change

    const newStickerTagHabits = tagsAndStickers
      .filter((tagOrSticker) => tagOrSticker.selected)
      .map(({ ...rest }) => rest);
    if (
      JSON.stringify(newStickerTagHabits) !== JSON.stringify(stickerTagHabits)
    ) {
      setChangesMade(true);
    }
  }, [tagsAndStickers]);

  //update global state when user clicks save
  const handleSave = () => {
    // reorganize the tags and stickers so that the selected ones are at the top
    const newTagsAndStickers = [...tagsAndStickers];
    newTagsAndStickers.sort((a, b) => {
      if (a.selected === b.selected) {
        return 0;
      }
      if (a.selected) {
        return -1;
      }
      return 1;
    });
    setTagsAndStickers(newTagsAndStickers);

    const newStickerTagHabits = tagsAndStickers.filter(
      (selectedTagsAndSticker) => selectedTagsAndSticker.selected
    );
    // remove the selected property
    const newStickerTagHabitsWithoutSelected = newStickerTagHabits.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ selected, ...rest }) => rest
    );
    setStickerTagHabits(newStickerTagHabitsWithoutSelected);
    setChangesMade(false);
  };

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        height: "100%",
        backgroundColor: "#ffffff88",
        color: "black",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        mb={2}
        // keep apart
        sx={{ width: "100%" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">Stickers and Tags</Typography>
        {/* save button */}
        {changesMade && (
          <Button variant="contained" onClick={handleSave}>
            Save Your Changes
          </Button>
        )}
      </Stack>
      <List
        sx={{
          width: "100%",
          bgcolor: "#ffffff88",
          // scroll if longer than 300px
          maxHeight: 400,
          overflow: "auto",
        }}
      >
        {tagsAndStickers.map((tagOrSticker, index) => (
          <ListItem
            key={tagOrSticker.name}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <ListItemButton
              onClick={() => handleTagOrStickerClick(index)}
              className={index === 0 ? "tut-settings-create-tag-habit" : ""}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={tagOrSticker.selected}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={tagOrSticker.name} />
            </ListItemButton>
            <Collapse in={tagOrSticker.selected} timeout="auto" unmountOnExit>
              <Stack direction="row" spacing={2}>
                <ButtonGroup
                  variant="text"
                  aria-label="text button group"
                  sx={{ display: tagOrSticker.selected ? "flex" : "none" }}
                  className={
                    index === 0 ? "tut-settings-create-tag-habit-day" : ""
                  }
                >
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day, dayIndex) => (
                      <Button
                        key={day}
                        size="small"
                        onClick={() =>
                          handleTagOrStickerDaysOfWeekChange(index, day)
                        }
                        color={
                          tagOrSticker.daysOfWeek[dayIndex] === "1"
                            ? "primary"
                            : "inherit"
                        }
                        variant="contained"
                      >
                        {day}
                      </Button>
                    )
                  )}
                </ButtonGroup>
                <TextField
                  id="outlined-number"
                  label="M Per Day"
                  type="number"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={tagOrSticker.minutes}
                  onChange={(e) =>
                    handleTagOrStickerMinutesChange(
                      index,
                      parseInt(e.target.value)
                    )
                  }
                  sx={{
                    maxWidth: "90px",
                  }}
                  className={
                    index === 0 ? "tut-settings-create-tag-habit-duration" : ""
                  }
                />
              </Stack>
            </Collapse>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default StickerAndTagGoals;
