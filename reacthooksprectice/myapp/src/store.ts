import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/product/productsslice";
import cartReducer from "./features/cart/cartslice";
import { loggerMiddleware } from "./loggermiddleware";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
store.subscribe(() => {
  const cart = store.getState().cart;

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
});

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

store.subscribe(() => {
  const cart = store.getState().cart;

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
});