import React, { useEffect } from "react";
import useTimerStore from "../Common/Stores/TimerStore";
import useTaskStore from "../Common/Stores/TaskStore";
import { Box } from "@mui/material";

import Sticker from "../Tasks/Task/Sticker";

const AddSticker = () => {
  //   const [tags, setTags] = useState<Array<tagsType>>([]);
  const taskKey = useTimerStore((state) => state.taskKey);
  const setSticker = useTimerStore((state) => state.setSticker);
  const sticker = useTimerStore((state) => state.sticker);

  useEffect(() => {
    if (taskKey) {
      setSticker(useTaskStore.getState().tasks[taskKey]?.sticker);
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
      }}
    >
      <Sticker sticker={sticker} setSticker={setSticker} editing timerPage />
    </Box>
  );
};

export default AddSticker;
