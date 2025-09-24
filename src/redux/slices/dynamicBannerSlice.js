import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const getDynamicBanners = createAsyncThunk(
  "banners/getDynamicBanners",
  async ({ section, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/deal-banner/${section}/${page}`
      );
      return { section, page, data: response?.data?.banners };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "failed to get offer cards"
      );
    }
  }
);

const dynamicBannerSlice = createSlice({
  name: "dynamicBannerSlice",
  initialState: {
    data: {}, // { section: { page: [banners] } }
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDynamicBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDynamicBanners.fulfilled, (state, action) => {
        state.loading = false;
        const { section, page, data } = action.payload;

        if (!state.data[section]) {
          state.data[section] = {};
        }
        state.data[section][page] = data; 
      })
      .addCase(getDynamicBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dynamicBannerSlice.reducer;

