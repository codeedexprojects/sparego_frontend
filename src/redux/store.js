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
import adminAuthReducer from "./slices/adminAuthSlice"
import adminCarouselReducer from './slices/adminCarouselSlice'
import adminBrandReducer from './slices/adminBrandSlice'
import adminCategoryReducer from './slices/adminCategorySlice'
import adminVehicleReducer from './slices/adminVehicleSlice'
import adminOrderReducer from './slices/adminOrderSlice'
import adminDealBannerReducer from './slices/adminDealBannerSlice'
import adminProductReducer from './slices/adminProductSlice'
import adminHomeCardReducer from './slices/adminHomeCardSlice'
import adminUserManagementReducer from './slices/adminUserManagementSlice'
import adminReviewReducer from './slices/adminReviewSlice'
import adminSubAdminManagementReducer from './slices/adminSubAdminManagementSlice'


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
    adminAuth: adminAuthReducer,
    adminCarousel: adminCarouselReducer,
    adminBrand: adminBrandReducer,
    adminCategory: adminCategoryReducer,
    adminVehicle: adminVehicleReducer,
    adminOrder: adminOrderReducer,
    adminDealBanner: adminDealBannerReducer,
    adminProduct: adminProductReducer,
    adminHomeCard: adminHomeCardReducer,
    adminUserManagement: adminUserManagementReducer,
    adminReview: adminReviewReducer,
    adminSubAdminManagement: adminSubAdminManagementReducer,
  },
});
