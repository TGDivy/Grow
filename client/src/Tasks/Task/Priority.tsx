import React, { FC, useState } from "react";
import { MenuItem, Box, Menu, IconButton, Avatar } from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  HorizontalRule,
  Pageview,
} from "@mui/icons-material";
import { green, pink } from "@mui/material/colors";

import { priorityType } from "../../Stores/Types";

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
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Avatar
            variant="rounded"
            sx={{
              width: 52,
              height: 26,
              backgroundColor: "transparent",
              border: 1,
            }}
          >
            {priorities[priority]}
          </Avatar>
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
  return (
    <Avatar
      variant="rounded"
      sx={{ width: 52, height: 26, backgroundColor: "transparent", border: 1 }}
    >
      {priorities[priority]}
    </Avatar>
    // <Avatar variant="square">
    //   {/* <KeyboardArrowDown /> */}
    //   <Pageview />
    //   {/*  */}
    // </Avatar>
    // {/* {priorities[priority]} */}
  );
};

export default Priority;
