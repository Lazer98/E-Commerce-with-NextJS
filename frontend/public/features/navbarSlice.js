import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState: {
    navbarIsVisible: false,
  },
  reducers: {
    setNavbarIsVisible: (state, action) => {
      state.navbarIsVisible = action.payload;
    },
  },
});

export const { setNavbarIsVisible } = navbarSlice.actions;
export const selectNavbarIsVisible = (state) => state.navbar.navbarIsVisible;
 
export default navbarSlice.reducer;