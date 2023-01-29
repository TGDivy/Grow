import React, { FC } from "react";

import { ResponsiveContainer } from "recharts";
import { Card, Box, Typography, CardHeader } from "@mui/material";

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
        backgroundColor: "#00000088",
        color: "primary.main",
        width: "800px",
        maxWidth: "100%",
        position: "relative",
      }}
    >
      <CardHeader
        title={
          <Typography variant="h6" color="primary.main" align="center">
            {props.title}
          </Typography>
        }
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          height: "30vh",
          width: "100%",
        }}
      >
        <ResponsiveContainer>{props.children}</ResponsiveContainer>
      </Box>
      {/* </CardContent> */}
    </Card>
  );
};

export default GraphCard;
