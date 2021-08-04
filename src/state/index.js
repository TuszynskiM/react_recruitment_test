import { createSlice } from "@reduxjs/toolkit";
import { fetchCart } from "../actions";

const initialState = {
  cart: [],
  loading: false,
  toPay: 0,
};

export const appSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setAmountToPay(state, action) {
      state.toPay += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCart.rejected, (state) => {
      state.cart = [];
      state.loading = false;
    });
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { setAmountToPay } = appSlice.actions;

export default appSlice.reducer;
