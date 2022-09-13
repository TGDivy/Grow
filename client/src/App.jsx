import React from "react";
import "firebaseui/dist/firebaseui.css";
import { Button } from "@mui/material";
import "./App.css";

const App = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <Button onClick={signInWithGoogle}>Sign in with Google</Button>
    </div>
  );
};

export default App;
