import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
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
