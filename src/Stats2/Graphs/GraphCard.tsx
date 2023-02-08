import React, { FC } from "react";

import { ResponsiveContainer } from "recharts";
import { Card, Box, Typography, CardHeader, CardActions } from "@mui/material";
import StyledCard from "../../Common/ReusableComponents/StyledCard";

interface Props {
  children: React.ReactElement;
  title: string;
  cardActions?: React.ReactElement;
}

const GraphCard: FC<Props> = (props) => {
  return (
    <StyledCard>
      <CardHeader
        title={
          <Typography variant="h6" align="center">
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
      {props.cardActions && (
        <CardActions sx={{ justifyContent: "center" }}>
          {props.cardActions}
        </CardActions>
      )}
    </StyledCard>
  );
};

export default GraphCard;
