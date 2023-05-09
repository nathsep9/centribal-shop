import { useState } from "react";
import ShoppingBasket from "@mui/icons-material/ShoppingBasketRounded";
import {
  Badge,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import { useShopping } from "contexts/ShoppingContext";
import { OrderCard } from "components/ShoppingProducts/OrderCard";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useTranslation } from "react-i18next";

export const Orders = () => {
  const { orders } = useShopping();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("addProduct");

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
              <Typography variant="h6">{t("order")}</Typography>
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
        <DialogContent>
          <Grid container spacing={2}>
            {orders.map((order) => (
              <Grid item key={order.id} xs={12}>
                <OrderCard order={order} />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};
