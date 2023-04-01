import { Button, styled } from "@mui/material";

type buttonM3Variants =
  | "text"
  | "filledTonal"
  | "outlined"
  | "elevated"
  | "filled";
// styled Button

const M3Button = styled(Button)<{
  component: React.ElementType;
  to: string;
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

  const commonStyles = {
    borderRadius,
    boxShadow: shadow,
  };
  let overwrideStyles = {};

  switch (variantStyleType) {
    case "text":
      overwrideStyles = {
        color: theme.palette.primary.main,
      };
      break;
    case "filledTonal":
      overwrideStyles = {
        color: theme.palette.secondary.container,
        backgroundColor: theme.palette.secondary.onContainer,
      };
  }

  return {
    ...commonStyles,
    ...overwrideStyles,
  };
});

export default M3Button;
