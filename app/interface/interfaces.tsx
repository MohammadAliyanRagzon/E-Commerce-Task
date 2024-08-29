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
  productId: string;
  productName: string;
  price: number;
  size: string;
  color: string;
}

export interface UserState {
  cart: CartItem[];
}