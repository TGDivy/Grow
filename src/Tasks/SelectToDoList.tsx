import React, { FC, useState } from "react";
import { Box, Grid } from "@mui/material";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { Button, Drawer, Typography } from "@mui/material";
import {
  LightModeOutlined,
  FormatListBulletedOutlined,
  Menu,
} from "@mui/icons-material";

interface SelectToDoListProps {
  setList: (listName: string) => void;
  listName: string;
}

const SelectToDoList: FC<SelectToDoListProps> = ({ setList, listName }) => {
  const [open, setOpenState] = useState(false);

  const toggleDrawer = (open: boolean) => (event: any) => {
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
      { text: "My Day", icon: <LightModeOutlined /> },
      { text: "Tasks", icon: <FormatListBulletedOutlined /> },
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
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={10}>
          <Box pb={2} pt={2}>
            <Typography variant="h3">{listName}</Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box
            width="100%"
            height={"100%"}
            alignContent="center"
            justifyContent="center"
            display="flex"
          >
            <Button
              onClick={toggleDrawer(true)}
              variant="contained"
              color="primary"
            >
              <Menu />
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Drawer anchor={"top"} open={open} onClose={toggleDrawer(false)}>
        {Lists()}
      </Drawer>
    </div>
  );
};

export default SelectToDoList;
