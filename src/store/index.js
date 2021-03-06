import { configureStore } from "@reduxjs/toolkit";
import appReducer from "state";

export const store = configureStore({
  reducer: appReducer,
});
