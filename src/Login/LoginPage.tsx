import React from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  OAuthCredential,
} from "firebase/auth";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import { auth } from "../Common/Firestore/firebase-config";
import { Stack } from "@mui/system";

const LoginPage = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    // add calendar scope
    provider.addScope("https://www.googleapis.com/auth/calendar.events");
    provider.addScope("https://www.googleapis.com/auth/calendar.readonly");
    provider.addScope("https://www.googleapis.com/auth/calendar");
    provider.addScope(
      "https://www.googleapis.com/auth/calendar.events.readonly"
    );

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;

        console.log(token);
        console.log(user);
        window.token = token || null;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const guestLogin = () => {
    signInAnonymously(auth)
      .then(() => {
        console.log("guest login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Stack
        spacing={2}
        alignContent="center"
        justifyContent="center"
        textAlign="center"
        sx={{
          height: "90vh",
        }}
      >
        <Box
          sx={{
            height: "20vh",
          }}
        >
          <Typography variant="h2">Welcome to GROW!</Typography>
        </Box>

        <Typography variant="h4" component="h1">
          Sign in or Sign up
        </Typography>

        <Button variant="contained" size="large" disabled>
          with Email (coming soon)
        </Button>
        <Typography variant="h6" component="h2">
          or
        </Typography>
        <Button variant="contained" onClick={signInWithGoogle} size="large">
          with Google
        </Button>
        <Box
          sx={{
            height: "20vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" component="h2">
            GROW is a web app that helps you track your progress in your
            personal growth journey.
          </Typography>
          <Typography variant="h6" component="h2">
            Its fundamental principle is to compete with yourself, not with
            others.
          </Typography>
        </Box>
        <Divider />
        <Typography variant="h6" component="h2">
          Just want to try it out?
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={guestLogin}
          component={Link}
          to="/"
          disabled
        >
          Try as Guest (Max guest limit reached)
        </Button>
      </Stack>

      <Box
        sx={{
          position: "fixed",
          bottom: 10,
          right: 10,
        }}
      >
        <Typography variant="body1">Made with ❤️ by TGDivy</Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
