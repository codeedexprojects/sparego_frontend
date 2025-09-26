import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import brandReducer from "./slices/brandSlice";
import productReducer from "./slices/productSlice";
import wishlistReducer from "./slices/wishlistSlice";
import cartReducer from "./slices/cartSlice";
import addressReducer from "./slices/addressSlice";
import orderReducer from "./slices/orderSlice";
import carouselReducer from "./slices/carouselSlice";
import bannerReducer from "./slices/bannerSlice";
import vehicleReducer from "./slices/vehicleSlice";
import testimonialReducer from "./slices/testimonialSlice";
import blogReducer from "./slices/blogSlice";
import dynamicBannerReducer from "./slices/dynamicBannerSlice";
import randomProductReducer from "./slices/randomProductSlice";
import homeCardReducer from "./slices/homeCardSlice";
import popularProductReducer from "./slices/popularProductSlice";
import productsBySectionReducer from "./slices/dynamicProductsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    brand: brandReducer,
    product: productReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    address: addressReducer, 
    order: orderReducer,
    carousel: carouselReducer,
    banner: bannerReducer,
    vehicles: vehicleReducer,
    testimonial: testimonialReducer,
    blogs: blogReducer,
    dynamicBanners:dynamicBannerReducer,
    randomProducts:randomProductReducer,
    homecards:homeCardReducer,
    popularproduct: popularProductReducer,
    productsBySection: productsBySectionReducer,
    
  },
});
