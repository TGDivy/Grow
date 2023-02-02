import React, { FC } from "react";

import { ResponsiveContainer } from "recharts";
import { Box, Typography, CardHeader } from "@mui/material";
import StyledCard from "../Common/ReusableComponents/StyledCard";

interface Props {
  children: React.ReactElement;
  title: string;
}

const GraphCard: FC<Props> = (props) => {
  return (
    <StyledCard>
      <CardHeader
        title={
          <Typography variant="h5" color="text.primary">
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
          backgroundColor: "#ffffffff",
        }}
      >
        <ResponsiveContainer>{props.children}</ResponsiveContainer>
      </Box>
    </StyledCard>
  );
};

export default GraphCard;
