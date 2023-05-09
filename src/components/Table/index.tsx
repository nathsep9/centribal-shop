import * as React from "react";
import { useTranslation } from "react-i18next";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Typography } from "@mui/material";

import { numberFormat } from "./../../utils/index";
import { useShopping } from "contexts/ShoppingContext";

import { Product } from "models/product";

// interface TableProductProps {
//   product: Product;
// }

export const TableProduct = () => {
  const { t, i18n } = useTranslation("addProduct");
  const { products, deleteProduct, createOrder } = useShopping();
  {
    /* quiero mostrar la suma de los productos agregados */
  }
  const suma = products.reduce(
    (acc, el) => acc + el.product.price * el.amount,
    0
  );

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

      <Typography
        variant="h6"
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "1rem",
          marginTop: "1rem",
        }}
      >
        Total de productos agregados: {numberFormat(suma)}
      </Typography>
      <Box textAlign="center" mt={2}>
        <Button
          onClick={() => {
            createOrder();
          }}
          variant="contained"
          color="secondary"
        >
          {t("addOrder")}
        </Button>
      </Box>
    </TableContainer>
  );
};
