import React from "react";
import { Box, Button } from "@mui/material";
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
      <Box
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="error"
            size="small"
            component={Link}
            to="/Login"
            endIcon={<Warning fontSize="small" />}
          >
            Sign in
          </Button>
        </Box>
      </Box>
    );
  }
  return null;
};

export default AnonymousUser;
