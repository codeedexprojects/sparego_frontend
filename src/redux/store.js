import { configureStore } from "@reduxjs/toolkit";

// User reducers
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

// Admin reducers
import adminAuthReducer from "./slices/adminAuthSlice";
import adminCarouselReducer from "./slices/adminCarouselSlice";
import adminBrandReducer from "./slices/adminBrandSlice";
import adminVehicleReducer from "./slices/adminVehicleSlice";
import adminOrderReducer from "./slices/adminOrderSlice";
import adminDealBannerReducer from "./slices/adminDealBannerSlice";
import adminProductReducer from "./slices/adminProductSlice";
import adminHomeCardReducer from "./slices/adminHomeCardSlice";
import adminUserManagementReducer from "./slices/adminUserManagementSlice";
import adminReviewReducer from "./slices/adminReviewSlice";
import adminSubAdminManagementReducer from "./slices/adminSubAdminManagementSlice";
import sectionsReducer from "./slices/sectionSlice";
import adminMainCategoryReducer from "./slices/adminMainCategorySlice";
import adminCategoryReducer from "./slices/adminCategorySlice";
import adminSubCategoryReducer from "./slices/adminSubCategorySlice";
import adminSubSubCategoryReducer from "./slices/adminSubSubCategorySlice";
import adminMainCarouselReducer from "./slices/adminMainCarouselSlice";
import adminHomeCarouselReducer from "./slices/adminHomeCarouselSlice";
import adminBottomCarouselReducer from "./slices/adminBottomCarouselSlice";
import adminProductBrandReducer from "./slices/adminProductBrand";

export const store = configureStore({
  reducer: {
    // User reducers
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
    dynamicBanners: dynamicBannerReducer,
    randomProducts: randomProductReducer,
    homecards: homeCardReducer,
    popularproduct: popularProductReducer,
    productsBySection: productsBySectionReducer,

    // Admin reducers
    adminAuth: adminAuthReducer,
    adminCarousel: adminCarouselReducer,
    adminBrand: adminBrandReducer,
    adminVehicle: adminVehicleReducer,
    adminOrder: adminOrderReducer,
    adminDealBanner: adminDealBannerReducer,
    adminProduct: adminProductReducer,
    adminHomeCard: adminHomeCardReducer,
    adminUserManagement: adminUserManagementReducer,
    adminReview: adminReviewReducer,
    adminSubAdminManagement: adminSubAdminManagementReducer,
    sections: sectionsReducer,
    adminMainCategory: adminMainCategoryReducer,
    adminCategory: adminCategoryReducer,
    adminSubCategory: adminSubCategoryReducer,
    adminSubSubCategory: adminSubSubCategoryReducer,
    adminMainCarousel: adminMainCarouselReducer,
    adminHomeCarousel: adminHomeCarouselReducer,
    adminBottomCarousel: adminBottomCarouselReducer,
    adminProductBrand: adminProductBrandReducer,
  },
});
