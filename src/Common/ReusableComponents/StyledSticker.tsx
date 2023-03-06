import { lighten, styled, darken } from "@mui/material";
import { Chip } from "@mui/material";

const StyledSticker = styled(Chip)(({ theme }) => ({
  padding: "15px 5px",
  backgroundColor: theme.palette.tertiary.container,
  color: theme.palette.tertiary.onContainer,
  borderRadius: 0,

  "& .MuiChip-label": {
    overflow: "hidden",
    textOverflow: "clip",
    whiteSpace: "nowrap",
    flexShrink: 1,
  },
  "& .MuiChip-icon": {
    color: theme.palette.tertiary.onContainer,
  },
  "& .MuiChip-deleteIcon": {
    color: theme.palette.tertiary.onContainer,
  },

  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light"
        ? lighten(theme.palette.tertiary.container as string, 0.2)
        : darken(theme.palette.tertiary.container as string, 0.2),
  },
}));

({});

export default StyledSticker;
