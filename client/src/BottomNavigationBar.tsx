import React, { FC } from "react";

import { Home, Task, Nature } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

interface Props {
  section: string;
  setSection: (section: string) => void;
}

const BottomNavigationBar: FC<Props> = ({ section, setSection }) => {
  const handleChange = (_event: any, newValue: string) => {
    setSection(newValue);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation value={section} onChange={handleChange}>
        <BottomNavigationAction label="Home" value="home" icon={<Home />} />
        <BottomNavigationAction label="Tasks" value="Tasks" icon={<Task />} />
        <BottomNavigationAction label="Seed" value="Seed" icon={<Nature />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavigationBar;
