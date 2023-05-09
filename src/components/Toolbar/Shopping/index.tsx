import { useState } from "react";
import ShoppingIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge, IconButton } from "@mui/material";

import { ShoppingProducts } from "components/ShoppingProducts";
import { useShopping } from "contexts/ShoppingContext";

export const Shopping = () => {
  const { products, setProducts } = useShopping();

  const [open, setOpen] = useState(false);

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
        onUpdateProducts={(newProducts) => setProducts(newProducts)}
      />
    </>
  );
};
