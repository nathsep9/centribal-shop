import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Box, IconButton, Typography } from "@mui/material";

import { TableProducts } from "components/TableProducts";
import { OrderProduct } from "models/order";
import { useShopping } from "contexts/ShoppingContext";

export const ShoppingProducts = ({
  open,
  onClose,
  products,
  onUpdateProducts,
}: {
  open: boolean;
  onClose: () => void;
  products: OrderProduct[];
  onUpdateProducts: (products: OrderProduct[]) => void;
}) => {
  const { t } = useTranslation("addProduct");
  const { deleteProduct, createOrder } = useShopping();

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
              {onClose ? (
                <IconButton
                  aria-label="close"
                  onClick={onClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CancelOutlinedIcon />
                </IconButton>
              ) : null}
            </DialogTitle>
          </Grid>
          {(!products.length && (
            <Grid item xs={12}>
              <Typography variant="h6" align="center" my={4}>
                {t("emptyCart")}
              </Typography>
            </Grid>
          )) || (
            <TableProducts
              products={products}
              onDelete={(product) => {
                deleteProduct(product.id);
              }}
              onEdit={onUpdateProducts}
            />
          )}

          <Box display="flex" justifyContent="center" p={2} width="100%">
            <Button
              disabled={!products.length}
              onClick={async () => {
                await createOrder();
                onClose();
              }}
              variant="contained"
              color="secondary"
            >
              {t("addOrder")}
            </Button>
          </Box>
        </Grid>
      </Dialog>
    </div>
  );
};
