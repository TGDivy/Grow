import { styled } from "@mui/material";
import { Card } from "@mui/material";
// create a styled card

const StyledCard = styled(Card)(({ theme }) => ({
  ":hover": {
    boxShadow: 0,
  },
  maxWidth: "100%",
  backgroundColor: theme.palette.surface.main,
  color: theme.palette.surface.contrastText,
  borderRadius: theme.shape.borderRadius,
  position: "relative",
}));

({});

export default StyledCard;
