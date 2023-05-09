import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { Order } from "models/order";

export const OrderCreated = ({
  open,
  onClose,
  order,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  order: Order;
  onCreated: (newOrder: Order) => void;
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Orden creada</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          La orden ha sido creada con éxito.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
        <Button
          onClick={() => {
            onCreated(order);
            onClose();
          }}
          autoFocus
        >
          Ver orden
        </Button>
      </DialogActions>
    </Dialog>
  );
};
