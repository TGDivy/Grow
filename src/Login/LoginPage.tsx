import React from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
} from "firebase/auth";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { auth } from "../Common/Firestore/firebase-config";
import { Stack } from "@mui/system";
import StyledButton from "../Common/ReusableComponents/StyledButton";
import TopBar from "../Home/TopBar";

const LoginPage = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;

        console.log(token);
        console.log(user);
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
    <>
      <TopBar />
      <Container maxWidth="sm">
        <Stack
          spacing={2}
          alignContent="center"
          justifyContent="center"
          textAlign="center"
          mt={2}
        >
          <Typography variant="h5">Welcome!</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="body1" component="h2">
              GROW is a web app that helps you track your progress in your
              personal growth journey.
            </Typography>
            <Typography variant="body1" component="h2">
              Its fundamental principle is to compete with yourself, not with
              others.
            </Typography>
          </Box>
          <Divider />
          <Typography variant="h5" component="h1">
            Sign in / Sign up
          </Typography>
          <StyledButton variant="contained" disabled>
            with Email (coming soon)
          </StyledButton>
          <StyledButton variant="contained" onClick={signInWithGoogle}>
            with Google
          </StyledButton>

          <Divider />
          <Typography variant="h6" component="h2">
            Just want to try it out?
          </Typography>
          <Button
            variant="contained"
            onClick={guestLogin}
            component={Link}
            to="/"
            disabled
          >
            Try as Guest (Max guest limit reached)
          </Button>
          <Divider />
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
    </>
  );
};

export default LoginPage;
