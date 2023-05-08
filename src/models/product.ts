export interface Product {
  id: string;
  ref: string;
  name: string;
  description: string;
  price: number;
  tax?: string;
}

export interface ProductFormValues {
  ref: string;
  name: string;
  description: string;
  price: string;
  tax?: string;
}
