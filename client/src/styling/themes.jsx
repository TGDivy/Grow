import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  components: {
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          // color: "red",
          "&.Mui-selected": { color: "green" },
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
  },
  palette: {
    mode: "light",
    background: {
      default: "#8fba72",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

export default darkTheme;
