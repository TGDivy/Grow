import React from "react";
/* eslint-disable max-len */
import {
  themeFromImage,
  hexFromArgb,
  Theme,
} from "@material/material-color-utilities";
import {
  Box,
  Card,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useThemeStore, { ThemeColorsType } from "../Common/Stores/ThemeStore";
import M3Button from "../StyledComponents/M3Button";
import { TodaysBrief } from "./HomeOld";
import CondensedTaskList from "../Tasks/CondensedTaskList";
import Events from "./Events";
import { ArrowForwardIos } from "@mui/icons-material";

const palleteToThemeColors = (
  palette: Theme,
  mode: "dark" | "light"
): ThemeColorsType => {
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
const url4 =
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format";

const url1 =
  "https://images.unsplash.com/photo-1679340891423-a863f984fe6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";

const url2 =
  "https://images.unsplash.com/photo-1620926975779-37500edb6561?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";

const url3 =
  "https://images.unsplash.com/photo-1679345506039-c4228a79c93a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";

const urls = [url1, url2, url3, url4];

const Home3 = () => {
  // ref to the image
  const imageRef = React.useRef<HTMLImageElement>(null);
  //   const mode = "dark";
  const setThemeColors = useThemeStore((state) => state.setColors);
  const setMode = useThemeStore((state) => state.setMode);
  const mode = useThemeStore((state) => state.mode);
  //   const url = url4;
  const [urlIndex, setUrlIndex] = React.useState(0);
  const [customUrl, setCustomUrl] = React.useState("");
  const url = customUrl || urls[urlIndex];

  React.useEffect(() => {
    // get the image
    const image = imageRef.current;
    if (image) {
      // get the color palette from the image
      image.crossOrigin = "Anonymous";
      themeFromImage(image).then((palette) => {
        // set the color palette
        console.log(palette);
        setMode(mode);
        setThemeColors(palleteToThemeColors(palette, mode));
      });
    }
  }, [url, mode]);

  console.log("mode", mode);

  return (
    <Box
      sx={{
        width: "100%",
        p: 1,
      }}
    >
      <Card
        elevation={0}
        sx={{
          borderRadius: "24px",
          backgroundImage: `url(${url})`,
          backgroundOrigin: "padding-box",
          backgroundClip: "border-box",
          backgroundPositionX: "0px",
          backgroundPositionY: "100%",
          backgroundSize: "cover",
          color: "white",
          p: 7,
          position: "relative",
        }}

        // ref={imageRef}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            transform: "translateY(-50%)",
            zIndex: 1,
            p: 1,
          }}
        >
          <IconButton
            sx={{
              color: "white",
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: "50%",
            }}
            onClick={() => {
              setUrlIndex((prev) => (prev + 1) % urls.length);
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>
        <Stack direction="column" spacing={2} alignItems="center">
          <Box>
            <Typography
              variant="h1"
              textAlign="center"
              sx={{
                // less than bold
                fontWeight: 550,
              }}
            >
              Welcome to Grow!
            </Typography>
            <Typography variant="h5" textAlign="center">
              A Companion on your Journey to Self-Improvement.
            </Typography>
          </Box>
          <M3Button
            variant="contained"
            variantStyle="filled"
            sx={{
              p: 3,
              borderRadius: 6,
            }}
          >
            Get Started
          </M3Button>
          <Grid
            container
            spacing={{
              xs: 2,
              sm: 2,
              md: 3,
            }}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} md={4} sx={{ pb: 0, mb: 0 }}>
              <CondensedTaskList />
            </Grid>
            <Grid item xs={12} md={9} sx={{ pb: 0, mb: 0 }}>
              <Events />
            </Grid>
          </Grid>
        </Stack>
        <img src={url} ref={imageRef} style={{ display: "none" }} />
      </Card>
      <Box sx={{ p: 1, textAlign: "center" }}>
        <TextField
          value={customUrl}
          onChange={(e) => setCustomUrl(e.target.value)}
        />
      </Box>
    </Box>
  );
};

export default Home3;
