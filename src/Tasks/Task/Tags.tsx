import React, { FC, useState, MouseEvent } from "react";
import { Box, Chip, Menu, MenuItem } from "@mui/material";
import { Add } from "@mui/icons-material";
import { tagsType } from "../../Types/Types";

interface tagsFc {
  tags: Array<tagsType>;
  setTags: (tags: Array<tagsType>) => void;
  editing: boolean;
}

const Tags: FC<tagsFc> = ({ tags, editing, setTags }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [open, setOpen] = useState(false);

  const handleClickOpen = (event: MouseEvent) => {
    setOpen(true);
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleAddTag = (tag: tagsType) => {
    setTags([...tags, tag]);
  };

  const handleDeleteTag = (tagToDelete: tagsType) => {
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
          {Object.values(tagsType)
            .filter(
              (tag) =>
                !tags.includes(tag as tagsType) && typeof tag === "string"
            )
            .map((tag) => (
              <MenuItem
                key={tag}
                onClick={() => {
                  handleAddTag(tag as tagsType);
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
