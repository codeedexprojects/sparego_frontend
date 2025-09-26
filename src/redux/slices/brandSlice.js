import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// get all brands
export const getAllBrands = createAsyncThunk(
  "brand/getAllBrands",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/brands/vehicle/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch brands");
    }
  }
);

export const getSectionBrands = createAsyncThunk(
  "brands/getSectionBrands",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/brands/product`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "failed to get product brands"
      );
    }
  }
);
export const getSectionBrandById = createAsyncThunk(
  "brands/getSectionBrandById",
  async (sectionId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/brands/product/section/${sectionId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "failed to get product brands"
      );
    }
  }
);

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brands: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // productbrands

      .addCase(getSectionBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getSectionBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(getSectionBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // getsectiobbrandbyid
      .addCase(getSectionBrandById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getSectionBrandById.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(getSectionBrandById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default brandSlice.reducer;
