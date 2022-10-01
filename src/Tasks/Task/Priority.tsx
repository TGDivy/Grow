import React, { FC, useState } from "react";
import { MenuItem, Menu, IconButton, Avatar, Button } from "@mui/material";
import { PriorityHigh } from "@mui/icons-material";

import { priorityType } from "../../Types/Types";

type priorityElement = {
  [key in priorityType]: JSX.Element;
};

const priorities: priorityElement = {
  [priorityType.Medium]: <PriorityHigh fontSize="medium" />,
  [priorityType.High]: <PriorityHigh color="error" fontSize="medium" />,
};

const ITEM_HEIGHT = 36;

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

  if (editing) {
    return (
      <>
        <Button
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          variant="text"
          size="small"
          sx={{ padding: "0px", margin: 0 }}
          onClick={handleClick}
        >
          {priorities[priority]}
        </Button>
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
              width: "8ch",
            },
          }}
        >
          {Object.values(priorityType)
            .filter((value) => typeof value !== "string")
            .map((priority_) => (
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
            ))}
        </Menu>
      </>
    );
  }
  return priorities[priority];
};

export default Priority;
