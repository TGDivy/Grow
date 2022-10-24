import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CurrentUserProvider } from "./Common/Contexts/UserContext";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Theme from "./Common/Styling/themes";
import { BrowserRouter as Router } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Router>
    <CurrentUserProvider>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CurrentUserProvider>
  </Router>
  // </React.StrictMode>
);
