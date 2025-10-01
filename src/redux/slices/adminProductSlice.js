import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

const getToken = () => localStorage.getItem("adminToken");

// Fetch all products with optional pagination
export const fetchProducts = createAsyncThunk(
  "adminProduct/fetchProducts",
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/products?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return res.data; // return total, page, pages, products
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Add new product
export const addProduct = createAsyncThunk(
  "adminProduct/addProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/products`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data; // return new product
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Edit product
export const editProduct = createAsyncThunk(
  "adminProduct/editProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${BASE_URL}/products/${id}`, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data; // return updated product
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "adminProduct/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return id; // return deleted product id
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// View product by ID
export const viewProductById = createAsyncThunk(
  "adminProduct/viewProductById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return res.data; // return product object
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState: {
    products: [],
    total: 0,
    page: 1,
    pages: 1,
    loading: false,
    error: null,
    currentProduct: null, // for viewById
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload); // add new product at the top
        state.total += 1;
      })
      // Edit Product
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) state.products[index] = action.payload;
      })
      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);
        state.total -= 1;
      })
      // View Product by ID
      .addCase(viewProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentProduct = null;
      })
      .addCase(viewProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(viewProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentProduct = null;
      });
  },
});

export default adminProductSlice.reducer;
