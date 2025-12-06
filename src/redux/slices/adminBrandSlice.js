// redux/slices/adminBrandSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../baseUrl';

const prepareFormData = (brandData) => {
  const hasFile = brandData.logo && brandData.logo instanceof File;
  if (hasFile) {
    const formData = new FormData();
    Object.keys(brandData).forEach(key => {
      if (brandData[key] !== undefined && brandData[key] !== null) {
        formData.append(key, brandData[key]);
      }
    });
    return formData;
  }
  return brandData; 
};

// GET BRANDS
export const getBrands = createAsyncThunk(
  'brand/getBrands',
  async (brandType, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return rejectWithValue({ message: 'No admin token found', status: 401 });

      const endpoint = brandType === 'product' ? '/brands/product/' : '/brands/vehicle/';
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Handle different response structures
      if (Array.isArray(response.data)) return response.data;
      if (response.data?.data) return response.data.data;
      if (response.data?.brands) return response.data.brands;
      return [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch brands');
    }
  }
);

// GET PRODUCT BRANDS
export const getProductBrands = createAsyncThunk(
  'brand/getProductBrands',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return rejectWithValue({ message: 'No admin token found', status: 401 });

      const response = await axios.get(`${BASE_URL}/brands/product/`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product brands');
    }
  }
);

// CREATE BRAND
export const createBrand = createAsyncThunk(
  'brand/createBrand',
  async ({ brandData, brandType }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return rejectWithValue({ message: 'No admin token found', status: 401 });

      const endpoint = brandType === 'product' ? '/brands/product/' : '/brands/vehicle/';
      const dataToSend = prepareFormData(brandData);

      const headers = {
        Authorization: `Bearer ${token}`,
        ...(dataToSend instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}),
      };

      const response = await axios.post(`${BASE_URL}${endpoint}`, dataToSend, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create brand');
    }
  }
);

// UPDATE BRAND
export const updateBrand = createAsyncThunk(
  'brand/updateBrand',
  async ({ id, brandData, brandType }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return rejectWithValue({ message: 'No admin token found', status: 401 });

      const endpoint = brandType === 'product' ? `/brands/product/${id}/` : `/brands/vehicle/${id}/`;
      const dataToSend = prepareFormData(brandData);

      const headers = {
        Authorization: `Bearer ${token}`,
        ...(dataToSend instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}),
      };

      const response = await axios.patch(`${BASE_URL}${endpoint}`, dataToSend, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update brand');
    }
  }
);

// DELETE BRAND
export const deleteBrand = createAsyncThunk(
  'brand/deleteBrand',
  async ({ id, brandType }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return rejectWithValue({ message: 'No admin token found', status: 401 });

      const endpoint = brandType === 'product' ? `/brands/product/${id}/` : `/brands/vehicle/${id}/`;
      await axios.delete(`${BASE_URL}${endpoint}`, { headers: { Authorization: `Bearer ${token}` } });
      return { id, brandType };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete brand');
    }
  }
);

// TOGGLE BRAND STATUS
export const toggleBrandStatus = createAsyncThunk(
  'brand/toggleBrandStatus',
  async ({ id, brandType, currentStatus }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return rejectWithValue({ message: 'No admin token found', status: 401 });

      const endpoint = brandType === 'product' ? `/brands/product/${id}/` : `/brands/vehicle/${id}/`;
      const response = await axios.patch(
        `${BASE_URL}${endpoint}`,
        { isActive: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle brand status');
    }
  }
);

// SLICE
const brandSlice = createSlice({
  name: 'brand',
  initialState: {
    brands: [],
    productBrands: [],
    loading: false,
    error: null,
    success: false,
    successMessage: null,
  },
  reducers: {
    clearError: (state) => { state.error = null; },
    clearSuccess: (state) => { state.success = false; state.successMessage = null; },
  },
  extraReducers: (builder) => {
    builder
      // GET PRODUCT BRANDS
      .addCase(getProductBrands.pending, (state) => { state.loading = true; })
      .addCase(getProductBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.productBrands = action.payload || [];
      })
      .addCase(getProductBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET BRANDS
      .addCase(getBrands.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload || [];
      })
      .addCase(getBrands.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // CREATE BRAND
      .addCase(createBrand.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brands.push(action.payload);
        state.success = true;
        state.successMessage = 'Brand created successfully';
      })
      .addCase(createBrand.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // UPDATE BRAND
      .addCase(updateBrand.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.brands.findIndex(b => b._id === action.payload._id);
        if (index !== -1) state.brands[index] = action.payload;
        state.success = true;
        state.successMessage = 'Brand updated successfully';
      })
      .addCase(updateBrand.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // DELETE BRAND
      .addCase(deleteBrand.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = state.brands.filter(b => b._id !== action.payload.id);
        state.success = true;
        state.successMessage = 'Brand deleted successfully';
      })
      .addCase(deleteBrand.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // TOGGLE BRAND STATUS
      .addCase(toggleBrandStatus.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(toggleBrandStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.brands.findIndex(b => b._id === action.payload._id);
        if (index !== -1) {
          state.brands[index] = action.payload;
        }
        state.success = true;
        state.successMessage = `Brand ${action.payload.isActive ? 'activated' : 'deactivated'} successfully`;
      })
      .addCase(toggleBrandStatus.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  }
});

export const { clearError, clearSuccess } = brandSlice.actions;
export default brandSlice.reducer;
