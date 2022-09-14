import React from "react";
import { db } from "./firebase-config";
import { doc, setDoc, collection, getDoc } from "firebase/firestore";
import PropTypes from "prop-types";
import { useEffect } from "react";

const ManageUser = ({ user }) => {
  const docRef = doc(db, "users", user.uid);

  const addUser = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("User data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      await setDoc(docRef, {
        name: user.displayName,
        email: user.email,
        created: new Date(),
      });
    }
  };

  useEffect(() => {
    addUser();
  }, []);

  return <div>ManageUser</div>;
};

ManageUser.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ManageUser;
