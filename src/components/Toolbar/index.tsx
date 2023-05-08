import React from "react";
import {
  AppBar,
  Toolbar as MuiToolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";

import { Shopping } from "./Shopping";

export const Toolbar = () => {
  const { t, i18n } = useTranslation("main");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = !!anchorEl;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [shopping, setShopping] = React.useState(false);
  return (
    <AppBar position="sticky">
      <MuiToolbar>
        <Typography
          variant="h5"
          component="div"
          color="secondary"
          sx={{ flexGrow: 1 }}
          fontFamily={"Roboto"}
          fontWeight={"500"}
        >
          {t("title")}
        </Typography>
        <Shopping />
        <IconButton aria-label="delete" color="inherit" onClick={handleClick}>
          <LanguageIcon />
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              i18n.changeLanguage("es");
              handleClose();
            }}
          >
            {t("spanish")}
          </MenuItem>
          <MenuItem
            onClick={() => {
              i18n.changeLanguage("en");
              handleClose();
            }}
          >
            {t("english")}
          </MenuItem>
        </Menu>
      </MuiToolbar>
    </AppBar>
  );
};
