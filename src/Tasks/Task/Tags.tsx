import React, { FC, useState, MouseEvent } from "react";
import { Box, Chip, Menu, MenuItem } from "@mui/material";
import { Add } from "@mui/icons-material";
import useUserStore from "../../Common/Stores/User";

interface tagsFc {
  tags: Array<string>;
  setTags: (tags: Array<string>) => void;
  editing: boolean;
  timerPage?: boolean;
}

const Tags: FC<tagsFc> = ({ tags, editing, setTags, timerPage }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const possibleTags = useUserStore((state) => state.tags);

  const [open, setOpen] = useState(false);

  const handleClickOpen = (event: MouseEvent) => {
    setOpen(true);
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleAddTag = (tag: string) => {
    setTags([...tags, tag]);
  };

  const handleDeleteTag = (tagToDelete: string) => {
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
              maxHeight: ITEM_HEIGHT * 6,
              width: "15ch",
            },
          }}
        >
          {possibleTags
            .filter((tag) => !tags.includes(tag) && typeof tag === "string")
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
            icon={<Add />}
            color="primary"
            onClick={handleClickOpen}
            size="small"
            label="Tag"
          />

          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              color="secondary"
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
        <Chip
          key={tag}
          label={tag}
          color="primary"
          size="small"
          variant="outlined"
          // labelProps={{
          //   sx: {
          //     overflow: "hidden",
          //     textOverflow: "clip",
          //   },
          // }}
          sx={{
            marginBottom: 0,
            maxWidth: "120px",
            pl: 0,
            pr: 0,
            pt: 0.2,
            "& .MuiChip-label": {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            },
          }}
        />
      ))}
    </>
  );
};

export default Tags;
