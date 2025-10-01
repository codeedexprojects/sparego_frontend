import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// Fetch all brands
export const fetchBrands = createAsyncThunk(
  "adminProductBrand/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${BASE_URL}/brands/product/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Brands API Response:", res.data);
      return Array.isArray(res.data) ? res.data : res.data.brands || [];
    } catch (err) {
      console.error("Fetch error:", err);
      return rejectWithValue(err.response?.data?.message || "Failed to fetch brands");
    }
  }
);

// Add a brand
export const addBrand = createAsyncThunk(
  "adminProductBrand/add",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.post(`${BASE_URL}/brands/product/`, data, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add brand");
    }
  }
);

// Edit a brand
export const editBrand = createAsyncThunk(
  "adminProductBrand/edit",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.patch(`${BASE_URL}/brands/product/${id}`, data, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to edit brand");
    }
  }
);

// Delete a brand
export const deleteBrand = createAsyncThunk(
  "adminProductBrand/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${BASE_URL}/brands/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete brand");
    }
  }
);

const adminProductBrandSlice = createSlice({
  name: "adminProductBrand",
  initialState: {
    brands: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
        console.log("Brands updated in Redux:", action.payload);
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Fetch rejected:", action.payload);
      });

    // Add
    builder
      .addCase(addBrand.fulfilled, (state, action) => {
        state.brands.push(action.payload);
      })
      .addCase(addBrand.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Edit
    builder
      .addCase(editBrand.fulfilled, (state, action) => {
        const index = state.brands.findIndex((b) => b._id === action.payload._id);
        if (index !== -1) state.brands[index] = action.payload;
      })
      .addCase(editBrand.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Delete
    builder
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.brands = state.brands.filter((b) => b._id !== action.payload);
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default adminProductBrandSlice.reducer;
