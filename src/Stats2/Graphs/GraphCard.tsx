import React, { FC, useState } from "react";

import { ResponsiveContainer } from "recharts";
import {
  Card,
  Box,
  Typography,
  CardHeader,
  CardActions,
  ClickAwayListener,
  Collapse,
} from "@mui/material";
import StyledCard from "../../Common/ReusableComponents/StyledCard";

interface Props {
  children: React.ReactElement;
  title: string | React.ReactElement;
  cardActions?: React.ReactElement;
  height?: string;
}

const GraphCard: FC<Props> = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <ClickAwayListener onClickAway={() => setExpanded(false)}>
      <StyledCard
        onClick={() => setExpanded(true)}
        sx={{ height: props.height ? props.height : "100%" }}
      >
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
            height: props.height ? "85%" : "30vh",
            width: "100%",
          }}
        >
          <ResponsiveContainer>{props.children}</ResponsiveContainer>
        </Box>
        {props.cardActions && (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardActions sx={{ justifyContent: "center" }}>
              {props.cardActions}
            </CardActions>
          </Collapse>
        )}
      </StyledCard>
    </ClickAwayListener>
  );
};

export default GraphCard;
