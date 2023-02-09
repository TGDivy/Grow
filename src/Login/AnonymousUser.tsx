import React from "react";
import { Box, Button, IconButton } from "@mui/material";
import { Warning } from "@mui/icons-material";
import useCurrentUser from "../Common/Contexts/UserContext";
import { Link, useLocation } from "react-router-dom";

const AnonymousUser = () => {
  const { user } = useCurrentUser();

  const isAnonymous = !user?.email;

  const location = useLocation();

  if (location.pathname === "/Login") {
    return null;
  }

  if (isAnonymous) {
    return (
      <IconButton size="small" component={Link} to="/Anon" color="error">
        <Warning />
      </IconButton>
    );
  }
  return null;
};

export default AnonymousUser;
