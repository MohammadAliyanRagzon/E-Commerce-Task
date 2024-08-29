import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, UserState } from "../interface/interfaces";


const initialState: UserState = {
  cart: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.cart.push(action.payload);
    },
    deleteFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.cart = state.cart.filter(
        (item) => item.productId !== action.payload.id
      );
    },
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload;
    },
  },
});

export const { addToCart, deleteFromCart, setCart } = userSlice.actions;

export default userSlice.reducer;
