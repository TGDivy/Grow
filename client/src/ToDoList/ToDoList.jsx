import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Divider } from "@mui/material";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { Button, SwipeableDrawer } from "@mui/material";
import {
  LightModeOutlined,
  FormatListBulletedOutlined,
} from "@mui/icons-material";

export const ToDoList = () => {
  const [open, setOpenState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenState(open);
  };

  const list = () => (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LightModeOutlined />
            </ListItemIcon>
            <ListItemText primary="My Day" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <FormatListBulletedOutlined />
            </ListItemIcon>
            <ListItemText primary="Tasks" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Container>
      <Typography variant="h4">To Do List</Typography>
      <div>
        <Button onClick={toggleDrawer(true)}>{"top"}</Button>
        <SwipeableDrawer
          anchor={"top"}
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list()}
        </SwipeableDrawer>
      </div>
    </Container>
  );
};
