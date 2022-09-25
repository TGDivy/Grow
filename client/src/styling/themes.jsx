import { createTheme } from "@mui/material/styles";

const primaryColor = "#8A3357";

const Theme = createTheme({
  components: {
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          // color: "red",
          "&.Mui-selected": { color: "green" },
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          borderColor: primaryColor,
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
  },
  palette: {
    mode: "light",
    background: {
      default: "#8fba72",
    },
    primary: {
      main: primaryColor,
      contrastText: "#fff",
    },

    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

export default Theme;
