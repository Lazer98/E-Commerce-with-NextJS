import { createSlice } from "@reduxjs/toolkit";

export const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState: {
    cartItems: null,
  },
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const { setCartItems } = cartItemsSlice.actions;

export default cartItemsSlice.reducer;