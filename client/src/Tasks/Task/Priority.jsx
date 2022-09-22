import React from "react";
import propTypes from "prop-types";
import { MenuItem, Box, Menu, IconButton } from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  HorizontalRule,
} from "@mui/icons-material";

const priorities = {
  High: (
    <KeyboardArrowUp
      sx={{ color: "red", alignSelf: "center", textAlign: "center" }}
    />
  ),
  Medium: <HorizontalRule sx={{ color: "orange" }} />,
  Low: <KeyboardArrowDown sx={{ color: "green" }} />,
};

const ITEM_HEIGHT = 48;

const Priority = ({ priority, editing, setPriority }) => {
  Priority.propTypes = {
    priority: propTypes.string.isRequired,
    editing: propTypes.bool.isRequired,
    setPriority: propTypes.func.isRequired,
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePriorityChange = (newPriority) => {
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
          {Object.keys(priorities).map(
            (priority_) => (
              console.log(priority_, "---"),
              (
                <MenuItem
                  key={priority_}
                  onClick={() => {
                    handlePriorityChange(priority_);
                  }}
                  selected={priority === priority_}
                  value={priority_}
                >
                  {priorities[priority_]}
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
