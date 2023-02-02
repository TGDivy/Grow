/* eslint-disable @typescript-eslint/no-unused-vars */
import { createTheme } from "@mui/material/styles";
import shadows from "@mui/material/styles/shadows";

export interface ThemeColorsType {
  primary: string;
  secondary: string;
  error: string;
  success: string;
  background: string;
}

const getTheme = (props: ThemeColorsType) => {
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
      mode: "light",
      background: {
        default: props.background,
      },
      primary: {
        main: props.primary,
        contrastText: "#fff",
      },
      secondary: {
        main: props.secondary,
        contrastText: "#fff",
      },
      error: {
        main: props.error,
        contrastText: "#fff",
      },
    },
    typography: {
      fontFamily: "Montserrat, sans-serif",
      // fontFamily: "Merriweather, serif",
      // fontFamilySecondary: "Merriweather, serif",
    },
  });

  return Theme;
};

export default getTheme;
