import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useTranslation } from "react-i18next";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useLocalObservable } from "mobx-react";

import { Product } from "models/product";
import { FormProduct } from "components/Forms/FormProduct";
import { client } from "client";
import { ProductFormValues } from "../../../models/product";

export const EditProduct = ({
  open,
  onClose,
  product,
  onEdited,
}: {
  open: boolean;
  onClose: () => void;
  product: Product;
  onEdited: (newProduct: Product) => void;
}) => {
  const { values, change } = useLocalObservable(
    (): {
      values: ProductFormValues;
      change<T extends keyof ProductFormValues>(
        key: T,
        value: ProductFormValues[T]
      ): void;
    } => ({
      values: {
        ref: product.ref,
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        tax: product.tax?.toString(),
      },
      change(key, value) {
        this.values[key] = value;
      },
    })
  );
  const [loading, setLoading] = React.useState(false);
  const { t, i18n } = useTranslation("addProduct");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{t("editProduct")}</DialogTitle>
      <DialogContent>
        <FormProduct values={values} onChange={change} edit />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("cancel")}</Button>
        <Button
          onClick={async () => {
            setLoading(true);
            try {
              const { data } = await client.put<Product>(
                `/products/${product.id}`,
                {
                  ref: values.ref,
                  name: values.name,
                  description: values.description,
                  price: +values.price,
                  tax: values.tax,
                } as Product
              );
              onEdited(data);
              onClose();
            } catch (error) {
              console.error(error);
            }
            setLoading(false);
          }}
        >
          {loading ? t("updating") : t("update")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
