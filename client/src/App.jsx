import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginPage from "./LoginPage";
import Home from "./Home";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const auth = getAuth();
  const [user, setUser] = React.useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log("user is signed in", uid);
      setUser(user);
    } else {
      // User is signed out
      // ...
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      {user ? <Home user={user} /> : <LoginPage />}
    </ThemeProvider>
  );
};

export default App;
