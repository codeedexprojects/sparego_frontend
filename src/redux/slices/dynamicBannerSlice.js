import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// get all banners
export const getHomeBanners = createAsyncThunk(
  "banner/getHomeBanners",
  async (sectionId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/deal-banner/${sectionId}/home`,
        { headers: { "Cache-Control": "no-cache" } }
      );
      return { sectionId, banners: response?.data?.banners };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch banners");
    }
  }
);

export const getProductBanners = createAsyncThunk(
  "banner/getProductBanners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/deal-banner/spare-parts/product/`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch banners");
    }
  }
);

export const getProductDetailBanners = createAsyncThunk(
  "banner/getProductDetailBanners",
  async ({ sectionId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/deal-banner/${sectionId}/product-detail/`,
        { headers: { "Cache-Control": "no-cache" } }
      );
      return { sectionId, banners: response?.data?.banners };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch banners");
    }
  }
);

export const getdynamicWishlistBanners = createAsyncThunk(
  "banner/getdynamicWishlistBanners",
  async (sectionId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/deal-banner/${sectionId}/wishlist`,
        { headers: { "Cache-Control": "no-cache" } }
      );
      return { sectionId, banners: response?.data?.banners };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch banners");
    }
  }
);

export const getDynamicBanners = createAsyncThunk(
  "banner/getDynamicBanners",
  async (sectionId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/deal-banner/${sectionId}/wishlist/`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch banners");
    }
  }
);

export const getBrandBanners = createAsyncThunk(
  "banner/getBrandBanners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/deal-banner/spare-parts/brand/`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch banners");
    }
  }
);

const dynamicBannerSlice = createSlice({
  name: "banner",
  initialState: {
    homeBanners: [],
    categoryBanners: [],
    subCategoryBanners: [],
    subSubCategoryBanners: [],
    productBanners: [],
    productDetailBanners: [],
    wishlistBanners: [],
    bannersBySection: {},
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
        const { sectionId, banners } = action.payload;
        state.bannersBySection[sectionId] = {};

        banners.forEach((banner) => {
          const page = banner.page || "default";
          if (!state.bannersBySection[sectionId][page]) {
            state.bannersBySection[sectionId][page] = [];
          }
          state.bannersBySection[sectionId][page].push(banner);
        });
      })
      .addCase(getHomeBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //

      //

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
      // wishlist
      .addCase(getdynamicWishlistBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getdynamicWishlistBanners.fulfilled, (state, action) => {
        state.loading = false;
        const { sectionId, banners } = action.payload;
        state.bannersBySection[sectionId] = {};

        banners.forEach((banner) => {
          const page = banner.page || "default";
          if (!state.bannersBySection[sectionId][page]) {
            state.bannersBySection[sectionId][page] = [];
          }
          state.bannersBySection[sectionId][page].push(banner);
        });
      })
      .addCase(getdynamicWishlistBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // brands
      .addCase(getBrandBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBrandBanners.fulfilled, (state, action) => {
        state.loading = false;
        const { sectionId, banners } = action.payload;
        state.bannersBySection[sectionId] = {};

        banners.forEach((banner) => {
          const page = banner.page || "default";
          if (!state.bannersBySection[sectionId][page]) {
            state.bannersBySection[sectionId][page] = [];
          }
          state.bannersBySection[sectionId][page].push(banner);
        });
      })
      .addCase(getBrandBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dynamicBannerSlice.reducer;
