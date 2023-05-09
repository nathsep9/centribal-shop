import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
} from "@mui/material";
import { Order, OrderProduct } from "models/order";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { TableProducts } from "components/TableProducts";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { client } from "client";
import { useShopping } from "contexts/ShoppingContext";

interface OrderCard {
  order: Order;
}
export const OrderCard = ({ order }: OrderCard) => {
  const { ref, date, products } = order;

  const [open, setOpen] = useState(false);
  const { setOrders, deleteOrder } = useShopping();
  const { t } = useTranslation("addProduct");

  const onClose = () => {
    setOpen(false);
  };
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {ref}
        </Typography>
        <Typography variant="h5" component="div">
          {new Date(date).toLocaleDateString()}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {products.map((product) => (
            <Typography variant="body2">
              {product.amount} - {product.product.name}
            </Typography>
          ))}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => {
            setOpen(true);
          }}
        >
          {t("see")}
        </Button>

        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => {
            deleteOrder(order.id);
          }}
        >
          {t("delete")}
        </Button>
      </CardActions>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>
          {t("orderDetail")}
          {onClose ? (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "black",
              }}
            >
              <CancelOutlinedIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent>
          {(!products.length && (
            <Grid item xs={12}>
              <Typography variant="h6" align="center" my={4}>
                {t("notProduct")}
              </Typography>
            </Grid>
          )) || (
            <TableProducts
              products={products}
              onDelete={async (productDeleted) => {
                const newProducts = products.filter(
                  (product) => product.product.id !== productDeleted.id
                );
                const newOrder: Order = {
                  ...order,
                  products: newProducts,
                };

                await client.put(`/orders/${newOrder.id}`, newOrder);

                setOrders((prev) =>
                  prev.map((currentOrder) =>
                    currentOrder.id == newOrder.id ? newOrder : currentOrder
                  )
                );
              }}
              onEdit={async (newProducts) => {
                const oldOrder: Order = order;
                const newOrder: Order = {
                  ...order,
                  products: newProducts,
                };
                setOrders((prev) =>
                  prev.map((currentOrder) =>
                    currentOrder.id == newOrder.id ? newOrder : currentOrder
                  )
                );
                try {
                  await client.put(`/orders/${newOrder.id}`, newOrder);
                } catch (error) {
                  setOrders((prev) =>
                    prev.map((currentOrder) =>
                      currentOrder.id == newOrder.id ? currentOrder : oldOrder
                    )
                  );
                }
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};
