import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart-slice";
import productReducer from "./slices/product-slice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
