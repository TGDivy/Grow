import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";

import useCurrentUser from "../Common/Contexts/UserContext";
import { db } from "../Common/Firestore/firebase-config";
import {
  onSnapshot,
  doc,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";

const executeQuery = async (collectionRef) => {
  const q = query(
    collectionRef,
    where("startTime", ">=", new Date(2023, 0, 1))
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
};

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

    const collectionRef = collection(db, "users", user.uid, "sow");

    executeQuery(collectionRef);

    return unsub;
  }, []);

  return (
    <>
      <Container>
        <Typography variant="h4">Home</Typography>
        <Typography variant="h5">Welcome {user.displayName} !</Typography>
        {/* <Typography variant="h5">{user.email}</Typography> */}
        {/* <Typography variant="h5">Total Sessions: {user.total_sess}</Typography> */}
      </Container>
    </>
  );
};

export default Home;
