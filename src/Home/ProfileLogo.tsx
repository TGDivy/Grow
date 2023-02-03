import React from "react";
import { Avatar, Button } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { getAuth, signOut } from "firebase/auth";
import useCurrentUser from "../Common/Contexts/UserContext";
import StyledButton from "../Common/ReusableComponents/StyledButton";

const ProfileLogo = () => {
  const { user } = useCurrentUser();

  const userName = user?.displayName || user?.email || "Guest User";

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
        <Avatar>{userName.slice(0, 2).toUpperCase()}</Avatar>
        <StyledButton onClick={() => handleLogout()} variant="contained">
          <Logout />
        </StyledButton>
      </>
    );
  }

  return <div>ProfileLogo</div>;
};

export default ProfileLogo;
