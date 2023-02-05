import React from "react";
import useThemeStore from "../Common/Stores/ThemeStore";
import { DarkMode, LightMode, ColorLens } from "@mui/icons-material";
import { Avatar, IconButton, ListItemIcon, Tooltip } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  blueThemeLight,
  redThemeLight,
  greenThemeLight,
} from "../Common/Styling/themeSpecs";

const ThemePicker = () => {
  const setMode = useThemeStore((state) => state.setMode);
  const mode = useThemeStore((state) => state.mode); // light, dark
  const setThemeByName = useThemeStore((state) => state.setThemeByName);
  const theme = useThemeStore((state) => state.theme); // red, green, blue

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  return (
    <>
      <Tooltip title="Theme settings">
        <IconButton onClick={changeMode}>
          {mode === "light" ? (
            <LightMode
              sx={{
                color: "primary.main",
              }}
            />
          ) : (
            <DarkMode
              sx={{
                color: "primary.main",
              }}
            />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip title="Theme settings">
        <IconButton onClick={handleClick}>
          <ColorLens
            sx={{
              color: "primary.main",
            }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="theme-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 28,
              height: 28,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: "50%",
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <MenuItem onClick={() => setThemeByName("red")}>
          <ListItemIcon>
            <Avatar
              sx={{
                bgcolor: redThemeLight.primary,
                color: redThemeLight.onPrimary,
              }}
            >
              R
            </Avatar>
          </ListItemIcon>
          Red
        </MenuItem>
        <MenuItem onClick={() => setThemeByName("green")}>
          <ListItemIcon>
            <Avatar
              sx={{
                bgcolor: greenThemeLight.primary,
                color: greenThemeLight.onPrimary,
              }}
            >
              G
            </Avatar>
          </ListItemIcon>
          Green
        </MenuItem>
        <MenuItem onClick={() => setThemeByName("blue")}>
          <ListItemIcon>
            <Avatar
              sx={{
                bgcolor: blueThemeLight.primary,
                color: blueThemeLight.onPrimary,
              }}
            >
              B
            </Avatar>
          </ListItemIcon>
          Blue
        </MenuItem>
      </Menu>
    </>
  );
};

export default ThemePicker;
