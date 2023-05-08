import { useMemo } from "react";
import ShoppingIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge, Button, IconButton } from "@mui/material";

import { ShoppingProducts } from "components/Cart";
import { useShopping } from "contexts/ShoppingContext";

export const Shopping = () => {
  const { open, setOpen, products } = useShopping();

  return (
    <>
      <IconButton
        onClick={() => {
          setOpen(true);
        }}
        color="inherit"
      >
        <Badge badgeContent={products.length} color="secondary">
          <ShoppingIcon />
        </Badge>
      </IconButton>

      <ShoppingProducts
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        products={products}
      />
    </>
  );
};
