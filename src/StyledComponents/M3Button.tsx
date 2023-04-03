import { Button, darken, lighten, styled } from "@mui/material";

type buttonM3Variants =
  | "text"
  | "filledTonal"
  | "outlined"
  | "elevated"
  | "filled";
// styled Button

const M3Button = styled(Button, {
  shouldForwardProp: (prop) => prop !== "variantStyle",
})<{
  component?: React.ElementType;
  to?: string;
  variantStyle?: buttonM3Variants;
}>(({ theme, variant, variantStyle }) => {
  let variantStyleType: buttonM3Variants;
  if (!variantStyle) {
    if (variant === "text") {
      variantStyleType = "text";
    } else if (variant === "outlined") {
      variantStyleType = "outlined";
    } else {
      variantStyleType = "filledTonal";
    }
  } else {
    variantStyleType = variantStyle;
  }

  const borderRadius = theme.spacing(2.5);
  const shadow = theme.shadows[0];

  // Height
  // 40dp
  // Shape
  // 20dp
  // Icon size
  // 18dp
  // Container width
  // 48dp min
  // Left/right padding
  // 12dp
  const commonStyles = {
    borderRadius,
    boxShadow: shadow,
    height: theme.spacing(5),
    // width: fullWidth ? "100%" : "auto",
    // minWidth: theme.spacing(12),
    // padding: theme.spacing(0, 3),
  };
  let overwrideStyles = {};

  switch (variantStyleType) {
    case "text":
      overwrideStyles = {
        color: theme.palette.primary.main,
        fontWeight: 400,
        textTransform: "none",
        fontSize: theme.typography.body2.fontSize,
      };
      break;
    case "filled":
      overwrideStyles = {
        color: theme.palette.primary.onContainer,
        backgroundColor: theme.palette.primary.container,
        fontWeight: 400,
        fontSize: theme.typography.body2.fontSize,
        // textTransform: "none",
        "&:hover": {
          backgroundColor: darken(theme.palette.primary.container || "", 0.0),
        },
      };
      break;
    case "filledTonal":
      overwrideStyles = {
        color: theme.palette.secondary.onContainer,
        backgroundColor: theme.palette.secondary.container,
        fontWeight: 400,
        fontSize: theme.typography.body2.fontSize,
        textTransform: "none",
        "&:hover": {
          backgroundColor: darken(theme.palette.secondary.container || "", 0.0),
        },
      };
      break;

    case "outlined":
      overwrideStyles = {
        color: theme.palette.primary.main,
        border: `1px solid ${theme.palette.divider}`,
        fontWeight: 400,
        fontSize: theme.typography.body2.fontSize,
        textTransform: "none",
      };
      break;
  }

  return {
    ...commonStyles,
    ...overwrideStyles,
  };
});

export default M3Button;
