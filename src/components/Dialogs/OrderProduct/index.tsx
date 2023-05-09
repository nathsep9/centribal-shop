import * as React from "react";
import { useTranslation } from "react-i18next";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";

import { useShopping } from "contexts/ShoppingContext";
import { numberFormat } from "utils";

export const OrderProduct = () => {
  const { t, i18n } = useTranslation("addProduct");
  const { products, deleteProduct } = useShopping();

  return (
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>{t("reference")}</TableCell>
            <TableCell>{t("name")}</TableCell>
            <TableCell>{t("description")}</TableCell>
            <TableCell>{t("price")}</TableCell>
            <TableCell>{t("amount")}</TableCell>
            <TableCell>{t("action")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(({ product, amount }) => (
            <TableRow hover tabIndex={-1} key={product.ref}>
              <TableCell>{product.ref}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {product.description || "------------------"}
              </TableCell>
              <TableCell>{numberFormat(product.price)}</TableCell>
              <TableCell>{amount}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    deleteProduct(product.ref);
                  }}
                >
                  {t("delete")}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
