import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { Button, Drawer } from "@mui/material";
import {
  LightModeOutlined,
  FormatListBulletedOutlined,
  Menu,
} from "@mui/icons-material";

import propTypes from "prop-types";

const SelectToDoList = ({ setList }) => {
  const [open, setOpenState] = useState(false);

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenState(open);
  };

  const Lists = () => {
    const ListItems = [
      { text: "Tasks 1", icon: <LightModeOutlined /> },
      { text: "Tasks 2", icon: <FormatListBulletedOutlined /> },
    ];
    return (
      <Box
        sx={{ width: "auto" }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {ListItems.map((item) => (
            <ListItem
              disablePadding
              key={item.text}
              onClick={() => {
                setList(item.text);
              }}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  return (
    <div>
      <Grid container spacing={0} direction="row">
        <Grid item xs={10}></Grid>
        <Grid item xs={2}>
          <Button
            onClick={toggleDrawer(true)}
            variant="Text"
            sx={{ width: "100%" }}
            color="neutral"
          >
            <Menu />
          </Button>
        </Grid>
      </Grid>
      <Drawer
        anchor={"top"}
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        disableDiscovery={iOS}
      >
        {Lists()}
      </Drawer>
    </div>
  );
};

SelectToDoList.propTypes = {
  setList: propTypes.func.isRequired,
};

export default SelectToDoList;
