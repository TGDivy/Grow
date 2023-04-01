import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import React from "react";

type Props = {
  onClick?: () => void;
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
};

const StyledAccordion = (props: Props) => {
  return (
    <Accordion
      sx={{
        backgroundColor: "surfaceVariant.main",
        color: "surfaceVariant.contrastText",
        ":hover": {
          boxShadow: 4,
        },
      }}
      defaultExpanded={props.defaultExpanded}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          " .MuiAccordionSummary-content": {
            flexGrow: 0,
          },
        }}
        onClick={props.onClick}
      >
        <Typography variant="h6">{props.title}</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={
          {
            // bgcolor: "rgba(255, 255, 255, 0.05)",
          }
        }
      >
        {props.children}
      </AccordionDetails>
    </Accordion>
  );
};

export default StyledAccordion;
