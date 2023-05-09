import React, { createContext, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";

import { Product } from "models/product";
import { Order, OrderProduct } from "models/order";
import { client } from "client";
import { use } from "i18next";

interface ShoppingContextProps {
  products: OrderProduct[];
  setProducts: React.Dispatch<React.SetStateAction<OrderProduct[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  deleteProduct: (id: string) => void;
  addProduct: (product: Product) => void;
  createOrder: () => Promise<Order>;
  deleteOrder: (id: string) => void;
}

export const ShoppingContext = createContext({} as ShoppingContextProps);
export const useShopping = () => React.useContext(ShoppingContext);

export const ShoppingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = React.useState<OrderProduct[]>([]);
  const [orders, setOrders] = React.useState<Order[]>([]);

  useEffect(() => {
    client.get("/orders").then(({ data }) => {
      setOrders(data);
    });
  }, []);

  const deleteProduct = (id: string) => {
    const newProducts = products.filter((product) => product.product.id !== id);
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

  const createOrder = async () => {
    const order: Order = {
      products: products,
      date: new Date().toISOString(),
      id: uuidV4(),
      ref: uuidV4().slice(0, 8),
    };
    await client.post("/orders", order);
    setOrders([...orders, order]);
    setProducts([]);
    return order;
  };

  const deleteOrder = async (id: string) => {
    await client.delete(`/orders/${id}`);
    setOrders((current) => current.filter((order) => order.id !== id));
  };

  return (
    <ShoppingContext.Provider
      value={{
        setProducts,
        products,
        deleteProduct,
        addProduct,
        createOrder,
        orders,
        setOrders,
        deleteOrder,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingProvider;
