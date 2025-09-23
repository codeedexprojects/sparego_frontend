import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// get all banners
export const getHomeBanners = createAsyncThunk(
    "banner/getHomeBanners",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/deal-banner/spare-parts/home/`,
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch banners"
            )
        }
    }
)

export const getCategoryBanners = createAsyncThunk(
    "banner/getCategoryBanners",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/deal-banner/spare-parts/category/`,
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch banners"
            )
        }
    }
)

export const    getsubCategoryBanners = createAsyncThunk(
    "banner/getsubCategoryBanners",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/deal-banner/spare-parts/sub-category/`,
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch banners"
            )
        }
    }
)

export const getsubSubCategoryBanners = createAsyncThunk(
    "banner/getsubSubCategoryBanners",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/deal-banner/spare-parts/sub-sub-category/`,
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch banners"
            )
        }
    }
)

export const getProductBanners = createAsyncThunk(
    "banner/getProductBanners",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/deal-banner/spare-parts/product/`,
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch banners"
            )
        }
    }
)

export const getProductDetailBanners = createAsyncThunk(
    "banner/getProductDetailBanners",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/deal-banner/spare-parts/product-detail/`,
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch banners"
            )
        }
    }
)

export const getWishlistBanners = createAsyncThunk(
    "banner/getWishlistBanners",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/deal-banner/spare-parts/wishlist/`,
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch banners"
            )
        }
    }
)

export const getBrandBanners = createAsyncThunk(
    "banner/getBrandBanners",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/deal-banner/spare-parts/brand/`,
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch banners"
            )
        }
    }
)

const bannerSlice = createSlice({
    name: "banner",
    initialState: {
        homeBanners: [],
        categoryBanners: [],
        subCategoryBanners: [],
        subSubCategoryBanners: [],
        productBanners: [],
        productDetailBanners: [],
        wishlistBanners:[],
        brandBanners: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHomeBanners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getHomeBanners.fulfilled, (state, action) => {
                state.loading = false;
                state.homeBanners = action.payload;
            })
            .addCase(getHomeBanners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCategoryBanners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategoryBanners.fulfilled, (state, action) => {
                state.loading = false;
                state.categoryBanners = action.payload;
            })
            .addCase(getCategoryBanners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getsubCategoryBanners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getsubCategoryBanners.fulfilled, (state, action) => {
                state.loading = false;
                state.subCategoryBanners = action.payload;
            })
            .addCase(getsubCategoryBanners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getsubSubCategoryBanners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getsubSubCategoryBanners.fulfilled, (state, action) => {
                state.loading = false;
                state.subSubCategoryBanners = action.payload;
            })
            .addCase(getsubSubCategoryBanners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getProductBanners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductBanners.fulfilled, (state, action) => {
                state.loading = false;
                state.productBanners = action.payload;
            })
            .addCase(getProductBanners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getProductDetailBanners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductDetailBanners.fulfilled, (state, action) => {
                state.loading = false;
                state.productDetailBanners = action.payload;
            })
            .addCase(getProductDetailBanners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getWishlistBanners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getWishlistBanners.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlistBanners = action.payload;
            })
            .addCase(getWishlistBanners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getBrandBanners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBrandBanners.fulfilled, (state, action) => {
                state.loading = false;
                state.brandBanners = action.payload;
            })
            .addCase(getBrandBanners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export default bannerSlice.reducer;