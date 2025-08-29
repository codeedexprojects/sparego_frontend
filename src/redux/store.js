import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import brandReducer from "./slices/brandSlice";
import productReducer from "./slices/productSlice";
import wishlistReducer from "./slices/wishlistSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    brand: brandReducer,
    product: productReducer,
    wishlist: wishlistReducer,
  },
});
