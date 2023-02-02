import { styled } from "@mui/material";
import { Card } from "@mui/material";
// create a styled card

const StyledCard = styled(Card)(({ theme }) => ({
  ":hover": {
    boxShadow: 20,
  },
  backgroundColor: "#00000088",
  maxWidth: "100%",
  color: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,

  position: "relative",
}));

({});

export default StyledCard;
