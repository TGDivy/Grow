import React, { FC, useState, MouseEvent } from "react";
import {
  Box,
  Chip,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import useUserStore from "../../Common/Stores/User";
import StyledSticker from "../../Common/ReusableComponents/StyledSticker";

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
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const label = sticker ? sticker : "Select Project";

  if (editing) {
    return (
      <>
        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          onClick={handleClose}
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
                Create a Project First.
              </Typography>
            </MenuItem>
          )}
        </Menu>

        <StyledSticker
          label={label}
          size="small"
          variant="filled"
          onClick={handleClickOpen}
          onDelete={() => handleDeleteSticker()}
          icon={!mobile ? <Add /> : <></>}
        />
      </>
    );
  }
  if (!sticker) {
    return null;
  }
  return <StyledSticker label={sticker} size="small" variant="filled" />;
};

export default Sticker;
