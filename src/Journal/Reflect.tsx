import React, { FC, useEffect } from "react";
import { Box, Grow, Slide } from "@mui/material";
import useDailyJournalStore from "../Common/Stores/DailyJournalStore";
import RTE from "./RTE/RTE";
import { JournalType } from "../Common/Types/Types";

interface Props {
  Question?: string;
  readonly?: boolean;
  document?: JournalType;
}

const Reflect: FC<Props> = ({ Question, readonly, document }) => {
  // A place to write down what you're grateful for.

  let text = useDailyJournalStore((state) => state.entry);
  const setText = useDailyJournalStore((state) => state.setEntry);

  if (document) {
    text = document.entry;
  }

  return (
    <>
      <Grow in={true} timeout={1000}>
        <Box
          sx={{
            position: "relative",
            // height: "500px",
            width: "100%",
            "& .editor-inner": {
              minHeight: readonly ? "" : "450px",
            },
          }}
        >
          <RTE
            text={text}
            setText={setText}
            textToAdd={Question}
            readonly={readonly}
          />
        </Box>
      </Grow>
    </>
  );
};

export default Reflect;
