import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CurrentUserProvider } from "./Common/Contexts/UserContext";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Theme from "./Common/Styling/themes";
import { BrowserRouter as Router } from "react-router-dom";
import { TourProvider } from "@reactour/tour";
import { steps, closeBtn } from "./steps";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Router>
    <TourProvider
      onClickMask={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
        if (steps) {
          if (currentStep === steps.length - 1) {
            setIsOpen(false);
          } else {
            setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1));
          }
        }
      }}
      scrollSmooth
      disableDotsNavigation
      components={{ Close: closeBtn }}
    >
      <CurrentUserProvider>
        <ThemeProvider theme={Theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </CurrentUserProvider>
    </TourProvider>
  </Router>
  // </React.StrictMode>
);

serviceWorkerRegistration.unregister();
