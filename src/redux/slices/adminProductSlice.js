import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

const getToken = () => localStorage.getItem("adminToken");

// ===== Async Thunks =====

// Fetch all products (with filters/sorting)
export const getAllProducts = createAsyncThunk(
  "adminProduct/getAllProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      // Map frontend params to backend query params
      const query = new URLSearchParams();

      if (params.search) query.append("search", params.search);
      if (params.mainCategory) query.append("mainCategory", params.mainCategory);
      if (params.category) query.append("category", params.category);
      if (params.subCategory) query.append("subCategory", params.subCategory);
      if (params.subSubCategory) query.append("subSubCategory", params.subSubCategory);
      if (params.productBrand) query.append("productBrand", params.productBrand);
      if (params.vehicleId) query.append("vehicleId", params.vehicleId);
      if (params.vehicleType) query.append("vehicleType", params.vehicleType);
      if (params.minPrice) query.append("minPrice", params.minPrice);
      if (params.maxPrice) query.append("maxPrice", params.maxPrice);
      if (params.sortBy) query.append("sortBy", params.sortBy);
      if (params.order) query.append("order", params.order);
      if (params.status) query.append("status", params.status); // active/inactive

      // section is optional, we can skip it if unused
      // if (params.section) query.append("section", params.section);

      const res = await axios.get(`${BASE_URL}/products/all?${query.toString()}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


// Fetch products with pagination
export const fetchProducts = createAsyncThunk(
  "adminProduct/fetchProducts",
  async ({ page = 1, limit = 10, section } = {}, { rejectWithValue }) => {
    try {
      // FIX: Use URLSearchParams for proper URL construction
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });
      
      // Only add section if it exists and is not 'all'
      if (section && section !== 'all') {
        queryParams.append('section', section);
      }

      const res = await axios.get(
        `${BASE_URL}/products?${queryParams.toString()}`,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      return res.data;
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
      return res.data;
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
      return res.data;
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
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Toggle product active/inactive
export const toggleProductStatus = createAsyncThunk(
  "adminProduct/toggleProductStatus",
  async ({ id, isActive }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/products/${id}`,
        { isActive },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ===== Slice =====
const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState: {
    products: [],
    total: 0,
    page: 1,
    pages: 1,
    loading: false,
    error: null,
    currentProduct: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch products
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

      // Get all products (filters/sorting)
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
        state.total += 1;
      })

      // Edit product
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) state.products[index] = action.payload;
      })

      // View product by ID
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
      })

      // Toggle product status
      .addCase(toggleProductStatus.fulfilled, (state, action) => {
        const index = state.products.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) state.products[index] = action.payload;
      });
  },
});

export default adminProductSlice.reducer;
