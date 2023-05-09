import { useMemo, useState } from "react";
import ShoppingBasket from "@mui/icons-material/ShoppingBasketRounded";
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import { ShoppingProducts } from "components/Cart";
import { useShopping } from "contexts/ShoppingContext";
import { OrderCard } from "components/Cart/OrderCard";
import { TableProduct } from "components/Table";
import { t } from "i18next";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export const Orders = () => {
  const { orders } = useShopping();
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton
        onClick={() => {
          setOpen(true);
        }}
        color="inherit"
      >
        <Badge badgeContent={orders.length} color="secondary">
          <ShoppingBasket />
        </Badge>
      </IconButton>

      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xl"
      >
        <Grid container>
          <Grid item xs={6}>
            <DialogTitle id="alert-dialog-title">
              {t("shoppingCart")}
            </DialogTitle>
          </Grid>

          <Grid item xs={6}>
            <Button
              onClick={onClose}
              style={{ float: "right", marginTop: "10px" }}
            >
              <CancelOutlinedIcon />
            </Button>
          </Grid>
        </Grid>
        <DialogContent></DialogContent>
      </Dialog>
    </>
  );
};
