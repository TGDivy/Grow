import React from "react";
import { Avatar, Button } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { getAuth, signOut } from "firebase/auth";
import useCurrentUser from "../Common/Contexts/UserContext";

const ProfileLogo = () => {
  const { user } = useCurrentUser();

  const userName = user?.displayName || "Guest";

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("logged out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (user) {
    return (
      <>
        <Avatar alt={userName} />
        <Button onClick={() => handleLogout()} variant="contained">
          <Logout />
        </Button>
      </>
    );
  }

  return <div>ProfileLogo</div>;
};

export default ProfileLogo;
