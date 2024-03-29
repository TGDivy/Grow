import React from "react";
import useDailyStore from "../Common/Stores/DailyStore";
import { Card, Typography } from "@mui/material";
import StyledCard from "../Common/ReusableComponents/StyledCard";

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
    <StyledCard
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <Typography variant="body2" align="center">
        {quote} - {author}
      </Typography>
    </StyledCard>
  );
};

export default ZenQuote;
