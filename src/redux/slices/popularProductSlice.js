import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const getPopularProducts = createAsyncThunk(
  "popularproducts/getPopularProducts",
  async ({ section }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/products/popular/${section}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "failed to get the popular products"
      );
    }
  }
);

const popularProductSlice = createSlice({
  name: "popularproduct",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPopularProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPopularProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action?.payload?.products;
      })
      .addCase(getPopularProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default popularProductSlice.reducer;
