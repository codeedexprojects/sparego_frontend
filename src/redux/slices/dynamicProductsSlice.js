// slices/dynamicProductsSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const getProductsBySection = createAsyncThunk(
  "productsBySection/getProductsBySection",
  async ({ sectionId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/section/${sectionId}`);
      console.log("Fetching products for section:", sectionId);
      return response?.data?.products;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch products");
    }
  }
);

const dynamicProductsSlice = createSlice({
  name: "productsBySection",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsBySection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsBySection.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload || [];
      })
      .addCase(getProductsBySection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dynamicProductsSlice.reducer;
