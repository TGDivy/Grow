import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CurrentUserProvider } from "./Common/Contexts/UserContext";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "react-toastify/dist/ReactToastify.css";

// const testToast = (toast) => {
//   toast("🦄 The connectivity is back, sync in progress...");
//   console.log("toast");
// };

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <CurrentUserProvider>
      <App />
    </CurrentUserProvider>
  </Router>
);

serviceWorkerRegistration.register();
