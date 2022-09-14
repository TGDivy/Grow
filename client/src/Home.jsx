import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";

import StudyTimer from "./StudyTimer";
import useCurrentUser from "./contexts/UserContext";
import { db } from "./firebase-config";
import { onSnapshot, doc } from "firebase/firestore";

const Home = () => {
  const { user, setUser } = useCurrentUser();
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

    return unsub;
  }, []);

  return (
    <>
      <Container>
        <Typography variant="h4">Home</Typography>
        <Typography variant="h5">{user.displayName}</Typography>
        <Typography variant="h5">{user.email}</Typography>
        <Typography variant="h5">Total Sessions: {user.total_sess}</Typography>
      </Container>
      <StudyTimer />
    </>
  );
};

export default Home;
