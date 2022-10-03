import React, { useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";

import useCurrentUser from "../Common/Contexts/UserContext";
import { db } from "../Common/Firestore/firebase-config";
import { onSnapshot, doc } from "firebase/firestore";

import useTimerRecordsStore from "../Common/Stores/TimerRecordsStore";

import WeeklyWorkStat from "./WeeklyWorkStat";

const Home = () => {
  const { user, setUser } = useCurrentUser();
  const addLatestTimerRecord = useTimerRecordsStore(
    (state) => state.addLatestTimerRecord
  );

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "users", user.uid),
      { includeMetadataChanges: true },
      (doc) => {
        setUser(doc.data());
      }
    );

    addLatestTimerRecord(user.uid);

    return unsub;
  }, []);

  return (
    <>
      <Container>
        <Typography variant="h4">Home</Typography>
        <Typography variant="h5">Welcome {user.displayName} !</Typography>
        <Box sx={{ height: "20px" }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            height: "500px",
            width: "100%",
            backgroundColor: "#ffffffff",
          }}
        >
          <WeeklyWorkStat />
        </Box>
      </Container>
    </>
  );
};

export default Home;
