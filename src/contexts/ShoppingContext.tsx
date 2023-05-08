import React, { createContext } from "react";

import { Product } from "models/product";

interface ShoppingContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  products: ShoppingProduct[];
  setProducts: React.Dispatch<React.SetStateAction<ShoppingProduct[]>>;
  deleteProduct: (id: string) => void;
  addProduct: (product: Product) => void;
}

export interface ShoppingProduct {
  amount: number;
  product: Product;
}

export const ShoppingContext = createContext({} as ShoppingContextProps);
export const useShopping = () => React.useContext(ShoppingContext);

export const ShoppingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = React.useState<ShoppingProduct[]>([]);

  const deleteProduct = (id: string) => {
    const newProducts = products.filter(
      (product) => product.product.ref !== id
    );
    setProducts(newProducts);
  };

  const addProduct = (product: Product) => {
    const newProducts = [...products];
    const index = newProducts.findIndex(
      (productItem) => productItem.product.ref === product.ref
    );
    if (index === -1) {
      newProducts.push({ product, amount: 1 });
    } else {
      newProducts[index].amount += 1;
    }
    setProducts(newProducts);
  };

  return (
    <ShoppingContext.Provider
      value={{
        open,
        setOpen,
        setProducts: setProducts,
        products: products,
        deleteProduct,
        addProduct,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingProvider;
