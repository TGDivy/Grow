import React from "react";

import useTimerStore from "../Common/Stores/TimerStore";
import { Button, Container, Grid } from "@mui/material";
import useUserStore from "../Common/Stores/User";
import { getFirebaseToken } from "../Common/Firestore/firebase-config";

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
    } else {
      console.log("Unable to get permission to notify.");
    }
  });
}

const StartTimer = () => {
  const startTimer = useTimerStore((state) => state.startTimer);
  const addDevice = useUserStore((state) => state.addDevice);

  const getPushToken = (pushToken: string) => {
    const device = {
      pushToken: pushToken,
      device: navigator.userAgent,
    };
    addDevice(device);
  };

  return (
    <Container>
      <Grid
        container
        spacing={0}
        justifyContent="center"
        direction="column"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => {
              startTimer();
              if (!("Notification" in window)) {
                console.log(
                  "This browser does not support desktop notification"
                );
              } else if (Notification.permission === "granted") {
                console.log("Notification permission granted");
              } else if (Notification.permission !== "denied") {
                requestPermission();
              }
              getFirebaseToken(getPushToken);
            }}
          >
            Start Timer
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StartTimer;
