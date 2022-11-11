import React from "react";
import useUserStore from "../Common/Stores/User";
import { Box, Paper, Grid, Typography, Button } from "@mui/material";
import { TextField, Chip } from "@mui/material";
import { Add } from "@mui/icons-material";

const Sticker = () => {
  // Text box for adding new tags
  // And display all the tags

  const stickers = useUserStore((state) => state.stickers);
  const setStickers = useUserStore((state) => state.setStickers);

  const [sticker, setSticker] = React.useState("");

  const handleAddTag = () => {
    // tags are unique, case insensitive and not empty
    if (
      sticker.trim() !== "" &&
      !stickers.map((t) => t.toLowerCase()).includes(sticker.toLowerCase())
    ) {
      setStickers([...stickers, sticker]);
      setSticker("");
    }
  };

  const handleDeleteTag = (tag: string) => {
    setStickers(stickers.filter((t) => t !== tag));
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
      <Grid
        container
        spacing={1}
        sx={{ width: "100%" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={6}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
            }}
          >
            Stickers
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            label="Add new sticker"
            variant="outlined"
            size="small"
            value={sticker}
            onChange={(event) => {
              setSticker(event.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleAddTag}>
            <Add />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ textAlign: "left" }}>
            - Stickers are assigned to your overarching goals.
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "left" }}>
            - They showcase your progress, and are meant to change over time.
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "left" }}>
            - Only one sticker can be assigned to a task, or a timer.
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2, width: "100%" }}>
        <Grid
          container
          spacing={1}
          // keep the tags left aligned
          justifyContent="flex-start"
          alignItems="center"
        >
          {stickers.map((tag) => (
            <Grid item key={tag}>
              <Chip
                label={tag}
                onDelete={() => handleDeleteTag(tag)}
                sx={{
                  textTransform: "capitalize",
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default Sticker;
