import { lighten, styled, darken } from "@mui/material";
import { Button } from "@mui/material";

const StyledButton = styled(Button)(({ theme, ...props }) => ({
  color:
    props.variant === "contained"
      ? theme.palette.primary.onContainer
      : theme.palette.surface.contrastText,
  backgroundColor:
    props.variant === "contained"
      ? theme.palette.primary.container
      : "transparent",

  borderColor: theme.palette.secondary.main,

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

export default StyledButton;
