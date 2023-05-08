import * as React from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useLocalObservable } from "mobx-react";
import { v4 as uuidv4 } from "uuid";

import { Product } from "models/product";
import { ProductFormValues } from "models/product";
import { client } from "client";
import { FormProduct } from "components/Forms";

interface AddProductProps {
  open: boolean;
  onClose: () => void;

  onCreated: (newProduct: Product) => void;
}

const INITIAL_VALUES: ProductFormValues = {
  ref: "",
  name: "",
  description: "",
  price: "",
  tax: "",
};

export const AddProduct = ({
  open,
  onClose,

  onCreated,
}: AddProductProps) => {
  const { t, i18n } = useTranslation("addProduct");
  const { values, change, reset } = useLocalObservable(() => ({
    values: INITIAL_VALUES,
    change<T extends keyof ProductFormValues>(
      key: T,
      value: ProductFormValues[T]
    ) {
      this.values[key] = value;
    },
    reset() {
      this.values = INITIAL_VALUES;
    },
  }));
  const [loading, setLoading] = React.useState(false);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{t("addProduct")}</DialogTitle>
      <DialogContent>
        <FormProduct values={values} onChange={change} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("cancel")}</Button>
        <Button
          onClick={async () => {
            setLoading(true);
            try {
              const { data } = await client.post<Product>(`/products`, {
                id: uuidv4(),
                ref: values.ref,
                name: values.name,
                description: values.description,
                price: +values.price,
                tax: values.tax,
              } as Product);
              onCreated(data);
              onClose();
              reset();
            } catch (error) {
              console.error(error);
            }
            setLoading(false);
          }}
        >
          {loading ? t("saving") : t("save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
