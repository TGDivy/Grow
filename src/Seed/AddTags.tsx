import React, { useEffect, useState } from "react";
import useTimerStore from "../Common/Stores/TimerStore";
import useTaskStore from "../Common/Stores/TaskStore";
import { Button, Box, Grid } from "@mui/material";

import Tags from "../Tasks/Task/Tags";

const AddTags = () => {
  //   const [tags, setTags] = useState<Array<tagsType>>([]);
  const taskKey = useTimerStore((state) => state.taskKey);
  const setTags = useTimerStore((state) => state.setTags);
  const tags = useTimerStore((state) => state.tags);

  useEffect(() => {
    if (taskKey) {
      setTags(useTaskStore.getState().tasks[taskKey].tags);
    }
  }, [taskKey]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-end",
        // justifyContent: "flex-end",
        justifyContent: "center",
        "& > :not(style)": {
          m: 1,
        },
      }}
    >
      <Tags tags={tags} setTags={setTags} editing timerPage />
    </Box>
  );
};

export default AddTags;
