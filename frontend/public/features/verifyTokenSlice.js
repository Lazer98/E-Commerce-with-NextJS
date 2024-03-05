import { createSlice } from "@reduxjs/toolkit";

// verifyTokenSlice.js
export const verifyTokenSlice = createSlice({
  name: 'verifyToken',
  initialState: {
    verifyToken: null,
  },
  reducers: {
    setVerifyToken: (state, action) => {
      state.verifyToken = action.payload;
    },
  },
});

export const { setVerifyToken } = verifyTokenSlice.actions;

export default verifyTokenSlice.reducer;
