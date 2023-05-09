import React from "react";
import { useTranslation } from "react-i18next";
import { Observer } from "mobx-react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { ProductFormValues } from "models/product";
import { calculateTax } from "utils";

interface FormProductProps {
  values: ProductFormValues;
  onChange: <T extends keyof ProductFormValues>(
    key: T,
    value: ProductFormValues[T]
  ) => void;
  edit?: boolean;
}

export const FormProduct = ({ values, onChange, edit }: FormProductProps) => {
  const { t, i18n } = useTranslation("addProduct");

  return (
    <Grid container spacing={2} mt={0}>
      <Grid item xs={6}>
        <Observer>
          {() => (
            <TextField
              label={t("reference")}
              variant="outlined"
              fullWidth
              value={values.ref}
              onChange={(e) => {
                onChange("ref", e.target.value);
              }}
            />
          )}
        </Observer>
      </Grid>
      <Grid item xs={6}>
        <Observer>
          {() => (
            <TextField
              label={t("name")}
              variant="outlined"
              value={values.name}
              fullWidth
              onChange={(e) => {
                onChange("name", e.target.value);
              }}
            ></TextField>
          )}
        </Observer>
      </Grid>
      <Grid item xs={6}>
        <Observer>
          {() => (
            <TextField
              label={t("description")}
              variant="outlined"
              value={values.description}
              fullWidth
              onChange={(e) => {
                onChange("description", e.target.value);
              }}
            />
          )}
        </Observer>
      </Grid>
      <Grid item xs={6}>
        <Observer>
          {() => (
            <TextField
              label={t("priceWithoutTaxes")}
              variant="outlined"
              value={values.price}
              fullWidth
              onChange={(e) => {
                onChange("price", e.target.value);
              }}
            />
          )}
        </Observer>
      </Grid>
      <Grid item xs={6}>
        <Observer>
          {() => (
            <TextField
              label={t("applicableTax")}
              variant="outlined"
              value={values.tax}
              fullWidth
              onChange={(e) => {
                onChange("tax", e.target.value);
              }}
            />
          )}
        </Observer>
      </Grid>
      <Grid item xs={6}>
        <Observer>
          {() => (
            <TextField
              label={t("priceWithTax")}
              variant="outlined"
              disabled
              fullWidth
              value={calculateTax(values.price, values.tax)}
            />
          )}
        </Observer>
      </Grid>
    </Grid>
  );
};
