import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./reducers/productsReducer";
import { authReducer } from "./reducers/authenticationReducer";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer } from "./reducers/orderReducer";

export const store = configureStore({
  reducer: {
    productsReducer,
    authReducer,
    cartReducer,
    orderReducer,
  },
});
