import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";

import useCurrentUser from "../Common/Contexts/UserContext";
import { db } from "../Common/Firestore/firebase-config";
import { onSnapshot, doc } from "firebase/firestore";

import useTimerRecordsStore from "../Common/Stores/TimerRecordsStore";

const Home = () => {
  const { user, setUser } = useCurrentUser();
  const timerRecords = useTimerRecordsStore((state) => state.timerRecords);
  const addLatestTimerRecord = useTimerRecordsStore(
    (state) => state.addLatestTimerRecord
  );

  console.log("timerRecords", timerRecords);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "users", user.uid),
      { includeMetadataChanges: true },
      (doc) => {
        const source = doc.metadata.hasPendingWrites ? "Local" : "Server";

        console.log("Current data: ", source);
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
      </Container>
    </>
  );
};

export default Home;
