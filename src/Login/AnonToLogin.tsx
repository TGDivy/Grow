import React from "react";
import { GoogleAuthProvider, linkWithPopup, User } from "firebase/auth";
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

const AnonToLogin = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    linkWithPopup(auth.currentUser as User, provider)
      .then((result) => {
        console.log("Linked with Google");
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
            minHeight: "10vh",
          }}
        >
          <Typography variant="h3">Link your account to GROW!</Typography>
        </Box>
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
        <Button variant="contained" size="large" disabled>
          with Email (coming soon)
        </Button>
        <Typography variant="h6" component="h2">
          or
        </Typography>
        <Button variant="contained" onClick={signInWithGoogle} size="large">
          with Google
        </Button>

        <Divider />
        <Box
          sx={{
            height: "5vh",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Still Unsure?
          </Typography>
          <Button variant="contained" component={Link} to="/">
            Home
          </Button>
        </Box>
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

export default AnonToLogin;
