export interface Product {
  id: string;
  productName: string;
  price: string;
  description: string;
  sizes: string[];
  colors: string[];
}

export interface FormData {
  productName: string;
  price: string;
  description: string;
  sizes: string;
  colors: string;
}

export interface Product {
  id: string;
  productName: string;
  price: string;
}

export interface CartItem {
  productId: string | undefined;
  productName: string | undefined;
  price: string | undefined;
  size: string | undefined;
  color: string | undefined;
}

export interface UserState {
  cart: CartItem[];
}
