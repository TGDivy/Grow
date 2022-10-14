import React, { FC } from "react";

import { ResponsiveContainer } from "recharts";
import { Card, Box, CardContent, Typography, CardHeader } from "@mui/material";

interface Props {
  children: React.ReactElement;
  title: string;
}

const GraphCard: FC<Props> = (props) => {
  return (
    <Card
      sx={{
        ":hover": {
          boxShadow: 20,
        },
      }}
    >
      <CardHeader
        title={
          <Typography variant="h5" color="text.primary">
            {props.title}
          </Typography>
        }
      />
      {/* <CardContent> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          height: "30vh",
          width: "100%",
          backgroundColor: "#ffffffff",
        }}
      >
        <ResponsiveContainer>{props.children}</ResponsiveContainer>
      </Box>
      {/* </CardContent> */}
    </Card>
  );
};

export default GraphCard;
