import { lighten, styled, darken } from "@mui/material";
import { Fab } from "@mui/material";

const StyledFab = styled(Fab)(({ theme }) => ({
  color: theme.palette.primary.onContainer,
  backgroundColor: theme.palette.primary.container,

  textDecoration: "none",
  // remove any link styling or a tag styling
  "&:link": {
    textDecoration: "none",
  },

  "&:hover": {
    // lightens the background color if theme is light and darkens if theme is dark
    backgroundColor:
      theme.palette.mode === "light"
        ? lighten(theme.palette.primary.container as string, 0.2)
        : darken(theme.palette.primary.container as string, 0.2),
  },
}));

({});

export default StyledFab;
