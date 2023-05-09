import { useTranslation } from "react-i18next";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { Box, Button, Typography } from "@mui/material";

import { calculateTax, numberFormat } from "utils";

import { Product } from "models/product";
import { OrderProduct } from "models/order";

interface TableProductProps {
  products: OrderProduct[];
  onDelete: (product: Product) => void;
  onEdit: (products: OrderProduct[]) => void;
}

export const TableProducts = ({
  products,
  onDelete,
  onEdit,
}: TableProductProps) => {
  const { t } = useTranslation("addProduct");

  const totalTax = products.reduce(
    (acc, el) =>
      acc + calculateTax(el.product.price, el.product.tax) * el.amount,
    0
  );

  const total = products.reduce(
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
          {products.map(({ product, amount }, i) => (
            <TableRow hover tabIndex={-1} key={product.ref}>
              <TableCell>{product.ref}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {product.description || "------------------"}
              </TableCell>
              <TableCell>{numberFormat(product.price)}</TableCell>
              <TableCell>
                <TextField
                  type="number"
                  size="small"
                  value={amount}
                  onChange={(e) => {
                    const newAmount = parseInt(e.target.value);
                    if (newAmount > 0) {
                      const newProducts = [...products];
                      newProducts[i] = {
                        ...newProducts[i],
                        amount: newAmount,
                      };
                      onEdit(newProducts);
                    }
                  }}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    onDelete(product);
                  }}
                >
                  {t("delete")}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        px={1}
        sx={{
          marginTop: 1,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          Impuestos: {numberFormat(totalTax - total)}
        </Typography>
        <Typography variant="h6" textAlign="end">
          Total: {numberFormat(totalTax)}
        </Typography>
      </Box>
    </TableContainer>
  );
};
