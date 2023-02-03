import React, { FC, useState, MouseEvent } from "react";
import { Box, Chip, Menu, MenuItem, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import useUserStore from "../../Common/Stores/User";

interface tagsFc {
  sticker: string;
  setSticker: (sticker: string) => void;
  editing: boolean;
  timerPage?: boolean;
}

const Sticker: FC<tagsFc> = ({ sticker, editing, setSticker, timerPage }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const possibleStickers = useUserStore((state) => state.stickers);

  const [open, setOpen] = useState(false);

  const handleClickOpen = (event: MouseEvent) => {
    setOpen(true);
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleSetSticker = (tag: string) => {
    setSticker(tag);
  };

  const handleDeleteSticker = () => {
    setSticker("");
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
              minWidth: "max-content",
            },
          }}
        >
          {possibleStickers
            .filter((_sticker) => _sticker !== sticker)
            .map((_sticker) => (
              <MenuItem
                key={_sticker}
                onClick={() => {
                  handleSetSticker(_sticker);
                }}
              >
                {_sticker}
              </MenuItem>
            ))}
          {possibleStickers.length === 0 && (
            <MenuItem
              key="no-stickers"
              onClick={() => {
                handleSetSticker("");
              }}
              disabled
            >
              <Typography variant="body2" color="textSecondary">
                Create a sticker in settings
              </Typography>
            </MenuItem>
          )}
        </Menu>

        <Box sx={{ display: "flex", flexWrap: "wrap", paddingTop: 1 }}>
          <Chip
            label={`${sticker}`}
            size="small"
            variant="filled"
            onClick={handleClickOpen}
            onDelete={() => handleDeleteSticker()}
            icon={<Add />}
            sx={{
              marginBottom: 0,
              pl: 1,
              pr: 1,
              backgroundColor: "tertiary.container",
              color: "tertiary.onContainer",
              py: 2,
              borderRadius: 0,
              "& .MuiChip-label": {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              },
            }}
            className="tut-task-sticker"
          />
        </Box>
      </>
    );
  }
  if (!sticker) {
    return null;
  }
  return (
    <Chip
      label={sticker}
      size="small"
      variant="filled"
      sx={{
        marginBottom: 0,
        pl: 1,
        pr: 1,
        py: 2,
        borderRadius: 0,
        backgroundColor: "tertiary.container",
        color: "tertiary.onContainer",
        "& .MuiChip-label": {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
      }}
    />
  );
};

export default Sticker;
