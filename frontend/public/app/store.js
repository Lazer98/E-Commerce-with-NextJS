import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/postSlice";
import cartReducer from "../features/cartSlice"
import verifyTokenReducer from "../features/verifyTokenSlice";
import navbarReducer from "../features/navbarSlice"

const initialState = {
  user: {
    username: null, 
  },
  cartItems: {
    cartItems: 0, 
  },
};

export default configureStore({
  reducer: {
    post: postReducer,
    user: (state = initialState.user, action) => {
      switch (action.type) {
        case 'user/setUsername':
          return { ...state, username: action.payload };
        default:
          return state;
      }
    },
    cartItems: (state = initialState.cartItems, action) => {
      switch (action.type) {
        case 'cartItems/setCartItems':
          return { ...state, cartItems: action.payload };
          default:
            return state;
          }
        },
        cart: cartReducer,
        verifyToken: verifyTokenReducer,
        navbar:navbarReducer
  },
});