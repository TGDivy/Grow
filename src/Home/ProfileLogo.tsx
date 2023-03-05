import React from "react";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import { Logout, Settings } from "@mui/icons-material";
import { getAuth, signOut } from "firebase/auth";
import useCurrentUser from "../Common/Contexts/UserContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useLocation } from "react-router-dom";
import AnonymousUser from "../Login/AnonymousUser";

const ProfileLogo = () => {
  const { user } = useCurrentUser();

  const userName = user?.displayName || user?.email || "Guest User";
  const location = useLocation();

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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (user) {
    return (
      <>
        <AnonymousUser />
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick}>
            <Avatar
              variant="square"
              sx={{
                bgcolor: "primary.container",
                color: "primary.onContainer",
              }}
            >
              {userName.slice(0, 2).toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem disabled>My account</MenuItem>
          <Divider />
          <MenuItem onClick={handleClose} component={Link} to="/Settings">
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={() => handleLogout()}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </>
    );
  }

  return (
    <Tooltip title="Login">
      <IconButton onClick={handleClick}>
        <Avatar
          variant="square"
          sx={{
            bgcolor: "primary.container",
            color: "primary.onContainer",
          }}
        >
          GU
        </Avatar>
      </IconButton>
    </Tooltip>
  );

  return <div>ProfileLogo</div>;
};

export default ProfileLogo;
