import * as React from "react";
import { useLocalObservable } from "mobx-react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import { Product } from "models/product";
import { FormValues } from "./states";
import { Order } from "./Order";
import { ShoppingProduct } from "contexts/ShoppingContext";
import { TableProduct } from "components/Table";
export const ShoppingProducts = ({
  open,
  onClose,
  products,
}: {
  open: boolean;
  onClose: () => void;
  products: ShoppingProduct[];
}) => {
  const [isUpdating, setIsUpdating] = React.useState(false);
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
            <DialogTitle id="alert-dialog-title">{t("addProduct")}</DialogTitle>
          </Grid>

          <Grid item xs={6}>
            <Button
              onClick={onClose}
              style={{ float: "right", marginTop: "10px" }}
            >
              <CancelOutlinedIcon />
            </Button>
          </Grid>
          <TableProduct />
        </Grid>

        <DialogContent></DialogContent>
      </Dialog>
    </div>
  );
};
