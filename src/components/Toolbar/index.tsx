import {
  AppBar,
  Toolbar as MuiToolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import React from "react";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
import LanguageDetector from "i18next-browser-languagedetector";

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
  return (
    <React.Fragment>
      <AppBar position="relative">
        <MuiToolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            {t("title")}
          </Typography>
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
              Español
            </MenuItem>
            <MenuItem
              onClick={() => {
                i18n.changeLanguage("en");
                handleClose();
              }}
            >
              Inglés
            </MenuItem>
          </Menu>
        </MuiToolbar>
      </AppBar>
    </React.Fragment>
  );
};
