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
  const [expanded, setExpanded] = React.useState(props.defaultExpanded);
  const handleClick = () => {
    setExpanded(!expanded);
    props.onClick && props.onClick();
  };
  return (
    <Accordion
      sx={{
        backgroundColor: "surface.main",
        color: "surface.contrastText",
        ":hover": {
          boxShadow: 4,
        },
        // opacity: expanded ? 1 : 0.6,
      }}
      defaultExpanded={expanded}
      expanded={expanded}
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
        onClick={handleClick}
      >
        <Typography variant="h6">{props.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{props.children}</AccordionDetails>
    </Accordion>
  );
};

export default StyledAccordion;
