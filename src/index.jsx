import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CurrentUserProvider } from "./Common/Contexts/UserContext";
import { BrowserRouter as Router } from "react-router-dom";
import { TourProvider } from "@reactour/tour";
import { closeBtn } from "./steps";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <CurrentUserProvider>
      <App />
    </CurrentUserProvider>
    {/* </TourProvider> */}
  </Router>
);

serviceWorkerRegistration.unregister();
