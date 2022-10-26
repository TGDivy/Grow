import { Box } from "@mui/material";
import React, { useEffect } from "react";
import useJournalStore from "../Common/Stores/DailyJournalStore";
import RTE from "./RTE/RTE";

const Reflect = () => {
  // A place to write down what you're grateful for.
  const grateful = useJournalStore((state) => state.grateful);
  const setGrateful = useJournalStore((state) => state.setGrateful);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "500px",
          width: "100%",
          "& .editor-inner": {
            height: "450px",
          },
        }}
      >
        <RTE text={grateful} setText={setGrateful} textToAdd="Good Job!" />
      </Box>
    </>
  );
};

export default Reflect;
