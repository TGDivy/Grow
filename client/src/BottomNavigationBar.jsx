import React from "react";

import { Home, CheckBox } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

import propTypes from "prop-types";

const BottomNavigationBar = ({ section, setSection }) => {
  const handleChange = (event, newValue) => {
    setSection(newValue);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation value={section} onChange={handleChange}>
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

BottomNavigationBar.propTypes = {
  section: propTypes.string.isRequired,
  setSection: propTypes.func.isRequired,
};

export default BottomNavigationBar;
