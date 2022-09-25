import { createTheme } from "@mui/material/styles";

const SDark = "#21496d";
const SLight = "#81a3cc";
const S = "#52749c";
const SText = "#ffffff";

const P = "#ac9172";
const PDark = "#7c6446";
const PLight = "#dec1a1";
const PText = "#000000";

const Theme = createTheme({
  components: {
    MuiCardHeader: {
      styleOverrides: {
        root: {
          paddingBottom: 0,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          marginRight: 5,
          marginBottom: 5,
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
          backgroundColor: P,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            // color: primaryColorCompliment,
            backgroundColor: SDark,
            borderRadius: 4,
          },
        },
      },
    },
  },
  palette: {
    mode: "light",
    background: {
      default: S,
    },
    primary: {
      main: P,
      contrastText: "#fff",
      text: PText,
    },
    secondary: {
      main: S,
      contrastText: "#fff",
      text: SText,
    },
  },
});

export default Theme;
