/* eslint-disable @typescript-eslint/no-unused-vars */
import { createTheme } from "@mui/material/styles";
import shadows from "@mui/material/styles/shadows";
import { ThemeColorsType } from "../Stores/ThemeStore";
import {
  PaletteOptions,
  PaletteColorOptions,
} from "@mui/material/styles/createPalette";
import { darken, lighten } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
    surface: Palette["primary"];
    surfaceVariant: Palette["primary"];
  }

  interface PaletteOptions {
    tertiary: PaletteOptions["primary"];
    surface: PaletteOptions["primary"];
    surfaceVariant: PaletteOptions["primary"];
  }

  interface PaletteColor {
    container?: string;
    onContainer?: string;
  }

  interface SimplePaletteColorOptions {
    container?: string;
    onContainer?: string;
  }
}

const getTheme = (props: ThemeColorsType, mode: "dark" | "light") => {
  const Theme = createTheme({
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            "&:hover": {
              boxShadow: shadows[20],
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          scrollButtons: {
            "&.Mui-disabled": {
              opacity: 0.3,
            },
          },
        },
      },

      MuiCardHeader: {
        styleOverrides: {
          root: {
            paddingBottom: 0,
          },
        },
      },
      MuiIcon: {
        styleOverrides: {
          root: {
            color: props.primary,
            backgroundColor: props.secondary,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            marginRight: 5,
            marginBottom: 5,
            padding: "0px 7px",
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            paddingTop: 0,
            marginTop: 0,
          },
        },
      },
      MuiBottomNavigation: {
        styleOverrides: {
          root: {
            backgroundColor: props.primary,
          },
        },
      },
      MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              backgroundColor: props.secondary,
            },
          },
        },
      },
    },
    palette: {
      mode: mode,
      background: {
        default: props.background,
      },
      primary: {
        main: props.primary,
        contrastText: props.onPrimary,
        container: props.primaryContainer,
        onContainer: props.onPrimaryContainer,
      },
      tertiary: {
        main: props.tertiary,
        contrastText: props.onTertiary,
        container: props.tertiaryContainer,
        onContainer: props.onTertiaryContainer,
      },
      secondary: {
        main: props.secondary,
        contrastText: props.onSecondary,
        container: props.secondaryContainer,
        onContainer: props.onSecondaryContainer,
      },
      error: {
        main: props.error,
        contrastText: props.onError,
        container: props.errorContainer,
        onContainer: props.onErrorContainer,
      },
      surface: {
        main:
          mode === "dark" && props.surface === props.background
            ? lighten(props.surface, 0.0)
            : darken(props.surface, 0.0),
        contrastText: props.onSurface,
      },
      surfaceVariant: {
        main: props.surfaceVariant,
        contrastText: props.onSurfaceVariant,
      },
    },
    typography: {
      fontFamily: "Montserrat, sans-serif",
    },
  });

  return Theme;
};

export default getTheme;
