import { lighten, styled, darken } from "@mui/material";
import { Chip } from "@mui/material";

const StyledSticker = styled(Chip)(({ theme }) => ({
  padding: "15px 5px",
  backgroundColor: theme.palette.tertiary.main,
  color: theme.palette.tertiary.contrastText,
  borderRadius: 0,
  "& .MuiChip-label": {
    fontWeight: 600,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  "& .MuiChip-icon": {
    color: theme.palette.tertiary.contrastText,
  },
  "& .MuiChip-deleteIcon": {
    color: theme.palette.tertiary.contrastText,
  },

  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light"
        ? lighten(theme.palette.tertiary.main as string, 0.2)
        : darken(theme.palette.tertiary.main as string, 0.2),
  },
}));

({});

export default StyledSticker;
