// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalSum: 0, // Add totalSum to the initial state
  },
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.items.find(item => item.id === action.payload.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push(action.payload);
      }

      // Update totalSum whenever the cart is modified
      state.totalSum = state.items.reduce((sum, product) => {
        return sum + product.price * product.quantity;
      }, 0);
    },
    removeFromCart: (state, action) => {
      const existingProduct = state.items.find(item => item.id === action.payload.id);

      if (existingProduct) {
        existingProduct.quantity -= 1;

        if (existingProduct.quantity === 0) {
          state.items = state.items.filter(item => item.id !== action.payload.id);
        }
      }

      // Update totalSum whenever the cart is modified
      state.totalSum = state.items.reduce((sum, product) => {
        return sum + product.price * product.quantity;
      }, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalSum = 0; // Clear totalSum when cart is cleared
    },
  },
});

// Action creators
export const { addToCart, clearCart, removeFromCart } = cartSlice.actions;

// Selector
export const selectCartItems = (state) => state.cart.items;
export const selectTotalSum = (state) => state.cart.totalSum; // Add a selector for totalSum

// Reducer
export default cartSlice.reducer;
