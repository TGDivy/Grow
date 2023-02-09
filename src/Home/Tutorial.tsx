import { useTour } from "@reactour/tour";
import React, { useEffect } from "react";
import useUserStore from "../Common/Stores/User";
import { homeSteps } from "../steps";
import { Help } from "@mui/icons-material";
import { MenuItem, ListItemIcon } from "@mui/material";

const Tutorial = () => {
  const tutorials = useUserStore((state) => state.tutorials);
  const setTutorials = useUserStore((state) => state.setTutorials);

  const { setIsOpen, isOpen, setSteps, setCurrentStep } = useTour();

  const handleHelp = () => {
    setSteps(homeSteps);
    setCurrentStep(0);
    setIsOpen(true);
    setTutorials([...tutorials, "home"]);
  };

  useEffect(() => {
    if (tutorials.includes("home")) return;
    handleHelp();
  }, []);
  return (
    <MenuItem onClick={() => handleHelp()}>
      <ListItemIcon>
        <Help fontSize="small" />
      </ListItemIcon>
      Guide
    </MenuItem>
  );
};

export default Tutorial;
