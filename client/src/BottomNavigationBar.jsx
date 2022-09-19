import React from "react";

import { Home, CheckBox } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

const BottomNavigationBar = () => {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction label="Home" value="home" icon={<Home />} />
        <BottomNavigationAction
          label="To Do"
          value="todo"
          icon={<CheckBox />}
        />
      </BottomNavigation>
    </Paper>
  );
};
export default BottomNavigationBar;
