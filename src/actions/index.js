import { createAsyncThunk } from "@reduxjs/toolkit";

import { getCart } from "api";

export const fetchCart = createAsyncThunk(
  "fetchCart",
  async () => await getCart()
);
