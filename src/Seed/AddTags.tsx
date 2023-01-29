import React, { useEffect } from "react";
import useTimerStore from "../Common/Stores/TimerStore";
import useTaskStore from "../Common/Stores/TaskStore";
import { Box } from "@mui/material";

import Tags from "../Tasks/Task/Tags";

const AddTags = () => {
  //   const [tags, setTags] = useState<Array<tagsType>>([]);
  const taskKey = useTimerStore((state) => state.taskKey);
  const setTags = useTimerStore((state) => state.setTags);
  const tags = useTimerStore((state) => state.tags);

  useEffect(() => {
    if (taskKey) {
      setTags(useTaskStore.getState().tasks[taskKey]?.tags);
    }
  }, [taskKey]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <Tags tags={tags} setTags={setTags} editing timerPage />
    </Box>
  );
};

export default AddTags;
