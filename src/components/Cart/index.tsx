import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Typography } from "@mui/material";

import { TableProduct } from "components/Table";
import { OrderProduct } from "models/order";

export const ShoppingProducts = ({
  open,
  onClose,
  products,
}: {
  open: boolean;
  onClose: () => void;
  products: OrderProduct[];
}) => {
  const { t, i18n } = useTranslation("addProduct");
  return (
    <div>
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
          {(!products.length && (
            <Grid item xs={12}>
              <Typography variant="h6" align="center" my={4}>
                Tu carrito esta vacío.¿No sabes qué comprar? ¡Miles de productos
                te esperan!
              </Typography>
            </Grid>
          )) || <TableProduct />}
        </Grid>

        <DialogContent></DialogContent>
      </Dialog>
    </div>
  );
};
