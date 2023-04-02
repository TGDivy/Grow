import React from "react";
/* eslint-disable max-len */
import {
  themeFromImage,
  hexFromArgb,
  Theme,
} from "@material/material-color-utilities";
import { Box, Container } from "@mui/material";
import useThemeStore, { ThemeColorsType } from "../Common/Stores/ThemeStore";

const palleteToThemeColors = (palette: Theme): ThemeColorsType => {
  const mode = "light";
  return {
    primary: hexFromArgb(palette.schemes[mode].primary),
    onPrimary: hexFromArgb(palette.schemes[mode].onPrimary),
    primaryContainer: hexFromArgb(palette.schemes[mode].primaryContainer),
    onPrimaryContainer: hexFromArgb(palette.schemes[mode].onPrimaryContainer),

    secondary: hexFromArgb(palette.schemes[mode].secondary),
    onSecondary: hexFromArgb(palette.schemes[mode].onSecondary),
    secondaryContainer: hexFromArgb(palette.schemes[mode].secondaryContainer),
    onSecondaryContainer: hexFromArgb(
      palette.schemes[mode].onSecondaryContainer
    ),

    tertiary: hexFromArgb(palette.schemes[mode].tertiary),
    onTertiary: hexFromArgb(palette.schemes[mode].onTertiary),
    tertiaryContainer: hexFromArgb(palette.schemes[mode].tertiaryContainer),
    onTertiaryContainer: hexFromArgb(palette.schemes[mode].onTertiaryContainer),

    error: hexFromArgb(palette.schemes[mode].error),
    onError: hexFromArgb(palette.schemes[mode].onError),
    errorContainer: hexFromArgb(palette.schemes[mode].errorContainer),
    onErrorContainer: hexFromArgb(palette.schemes[mode].onErrorContainer),

    background: hexFromArgb(palette.schemes[mode].background),
    onBackground: hexFromArgb(palette.schemes[mode].onBackground),
    surface: hexFromArgb(palette.schemes[mode].surface),
    onSurface: hexFromArgb(palette.schemes[mode].onSurface),
    surfaceVariant: hexFromArgb(palette.schemes[mode].surfaceVariant),
    onSurfaceVariant: hexFromArgb(palette.schemes[mode].onSurfaceVariant),

    outline: hexFromArgb(palette.schemes[mode].outline),
  };
};

const Home3 = () => {
  // ref to the image
  const imageRef = React.useRef<HTMLImageElement>(null);
  const setThemeColors = useThemeStore((state) => state.setColors);

  React.useEffect(() => {
    // get the image
    const image = imageRef.current;
    if (image) {
      // get the color palette from the image
      image.crossOrigin = "Anonymous";
      themeFromImage(image).then((palette) => {
        // set the color palette
        console.log(palette);
        setThemeColors(palleteToThemeColors(palette));
      });
    }
  }, []);

  return (
    <Container>
      <Box>
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1679978677453-9452668cb867?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="image"
          width="100%"
        />
      </Box>
    </Container>
  );
};

export default Home3;
