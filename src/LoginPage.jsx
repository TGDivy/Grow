import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button, Container, Grid } from "@mui/material";
import { auth } from "./firebase-config";

const LoginPage = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        console.log("popup result");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <Button variant="contained" onClick={signInWithGoogle}>
            Sign in with Google
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
