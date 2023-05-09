import { Product } from "./product";

export interface OrderProduct {
  amount: number;
  product: Product;
}

export interface Order {
  id: string;
  ref: string;
  products: OrderProduct[];
  date: string;
}
