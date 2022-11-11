import React from "react";
import useUserStore from "../Common/Stores/User";
import { Box, Paper, Grid, Typography, Button } from "@mui/material";
import { TextField, Chip } from "@mui/material";
import { Add } from "@mui/icons-material";

const Tags = () => {
  // Text box for adding new tags
  // And display all the tags

  const tags = useUserStore((state) => state.tags);
  const setTags = useUserStore((state) => state.setTags);

  const [tag, setTag] = React.useState("");

  const handleAddTag = () => {
    // tags are unique, case insensitive and not empty
    if (
      tag.trim() !== "" &&
      !tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
    ) {
      setTags([...tags, tag]);
    }
  };

  const handleDeleteTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
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
            Tags
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            label="Add new tag"
            variant="outlined"
            size="small"
            value={tag}
            onChange={(event) => {
              setTag(event.target.value);
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
            - Tags are used to categorize your tasks, and understand what type
            of skills you are developing over time.
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "left" }}>
            - They are meant to represent the type of work you are doing.
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "left" }}>
            - You can add multiple tags to a single task.
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
          {tags.map((tag) => (
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

export default Tags;
