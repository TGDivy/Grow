import React, { FC, useState } from "react";
import { MenuItem, Box, Menu, IconButton } from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  HorizontalRule,
} from "@mui/icons-material";

import { priorityType } from "../Types";

type priorityElement = {
  [key in priorityType]: JSX.Element;
};

const priorities: priorityElement = {
  [priorityType.Low]: (
    <KeyboardArrowDown sx={{ color: "green" }} fontSize="small" />
  ),
  [priorityType.Medium]: <HorizontalRule sx={{ color: "orange" }} />,
  [priorityType.High]: (
    <KeyboardArrowUp sx={{ color: "red" }} fontSize="small" />
  ),
};

const ITEM_HEIGHT = 48;

interface priorityProps {
  priority: priorityType;
  setPriority: (priority: priorityType) => void;
  editing: boolean;
}

const Priority: FC<priorityProps> = ({ priority, editing, setPriority }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: { currentTarget: HTMLElement }) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePriorityChange = (newPriority: priorityType) => {
    setPriority(newPriority);
    handleClose();
  };

  console.log(priority);

  if (editing) {
    return (
      <>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {priorities[priority]}
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "6ch",
            },
          }}
        >
          {Object.values(priorityType).map(
            (priority_) => (
              console.log(priority_, "---"),
              (
                <MenuItem
                  key={priority_}
                  onClick={() => {
                    handlePriorityChange(priority_ as priorityType);
                  }}
                  selected={priority === priority_}
                  value={priority_}
                >
                  {priorities[priority_ as priorityType]}
                </MenuItem>
              )
            )
          )}
        </Menu>
      </>
    );
  }
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {priorities[priority]}
    </Box>
  );
};

export default Priority;
