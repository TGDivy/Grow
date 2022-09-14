import React from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
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
  const signInWithGithub = () => {
    const provider = new GithubAuthProvider();
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
          <Button variant="contained" onClick={signInWithGithub}>
            Sign in with Github
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
