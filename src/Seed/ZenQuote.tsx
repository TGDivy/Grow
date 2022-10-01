import React from "react";
import useDailyStore from "../Stores/DailyStore";
import { Typography } from "@mui/material";

const timeElapsed = (startTime: Date) => {
  return Math.ceil((new Date().getTime() - startTime.getTime()) / 1000);
};

const ZenQuote = () => {
  const quoteDate = useDailyStore((state) => state.date);
  const setQuote = useDailyStore((state) => state.setQuote);
  const quote = useDailyStore((state) => state.quote);
  const author = useDailyStore((state) => state.author);
  if (timeElapsed(quoteDate) > 60 * 60 * 24) {
    setQuote();
  }
  return (
    <Typography variant="body2" align="center">
      {quote} - {author}
    </Typography>
  );
};

export default ZenQuote;
