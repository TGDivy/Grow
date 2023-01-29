import React from "react";
import useDailyStore from "../Common/Stores/DailyStore";
import { Card, Typography } from "@mui/material";

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
    <Card
      sx={{
        ":hover": {
          boxShadow: 20,
        },
        backgroundColor: "#00000088",
        color: "primary.main",
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
    </Card>
  );
};

export default ZenQuote;
