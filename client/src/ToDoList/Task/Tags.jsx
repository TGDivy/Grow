import React, { useState } from "react";
import { Box, Chip, Menu, MenuItem } from "@mui/material";
import { Add } from "@mui/icons-material";
import propTypes from "prop-types";

const Tags = ({ tags, editing, setTags }) => {
  Tags.propTypes = {
    tags: propTypes.array.isRequired,
    editing: propTypes.bool.isRequired,
    setTags: propTypes.func.isRequired,
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const tagsList = [
    "Engineering",
    "Research",
    "Planning",
    "Study",
    "Applications",
    "Chore",
  ];

  const [open, setOpen] = useState(false);

  const handleClickOpen = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleAddTag = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };
  const ITEM_HEIGHT = 48;

  if (editing) {
    return (
      <>
        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "15ch",
            },
          }}
        >
          {tagsList
            .filter((tag) => !tags.includes(tag))
            .map((tag) => (
              <MenuItem
                key={tag}
                onClick={() => {
                  handleAddTag(tag);
                }}
              >
                {tag}
              </MenuItem>
            ))}
        </Menu>
        <Box sx={{ display: "flex", flexWrap: "wrap", paddingTop: 1 }}>
          <Chip
            style={{
              width: "30px",
              height: "25px",
              paddingLeft: "8px",
              marginBottom: "5px",
            }}
            icon={<Add />}
            color="primary"
            onClick={handleClickOpen}
            size="small"
          />

          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              onDelete={() => handleDeleteTag(tag)}
            />
          ))}
        </Box>
      </>
    );
  }
  return (
    <>
      {tags.map((tag) => (
        <Chip key={tag} label={tag} size="small" />
      ))}
    </>
  );
};

export default Tags;
