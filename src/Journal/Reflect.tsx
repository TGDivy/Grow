import React, { FC, useEffect } from "react";
import { Box } from "@mui/material";
import useJournalStore from "../Common/Stores/DailyJournalStore";
import RTE from "./RTE/RTE";

interface Props {
  Question: string;
}

const Reflect: FC<Props> = ({ Question }) => {
  // A place to write down what you're grateful for.
  const text = useJournalStore((state) => state.entry);
  const setText = useJournalStore((state) => state.setEntry);

  return (
    <>
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
    </>
  );
};

export default Reflect;
