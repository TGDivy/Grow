import React, { FC, useEffect } from "react";
import { Box, Grow, Slide } from "@mui/material";
import useDailyJournalStore from "../Common/Stores/DailyJournalStore";
import RTE from "./RTE/RTE";

interface Props {
  Question: string;
}

const Reflect: FC<Props> = ({ Question }) => {
  // A place to write down what you're grateful for.
  const text = useDailyJournalStore((state) => state.entry);
  const setText = useDailyJournalStore((state) => state.setEntry);

  return (
    <>
      <Grow in={true} timeout={1000}>
        <Box
          sx={{
            position: "relative",
            // height: "500px",
            width: "100%",
            "& .editor-inner": {
              minHeight: "450px",
            },
          }}
        >
          <RTE text={text} setText={setText} textToAdd={Question} />
        </Box>
      </Grow>
    </>
  );
};

export default Reflect;
