// redux/slices/adminBrandSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../baseUrl';

// Async thunks
export const getBrands = createAsyncThunk(
  'brand/getBrands',
  async (brandType, { rejectWithValue }) => {
    try {
      console.log("=== GET BRANDS DEBUG ===");
      console.log("Brand type:", brandType);
      
      const token = localStorage.getItem("adminToken");
      console.log("Admin token exists:", !!token);
      if (!token) {
        console.error("No admin token found");
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }

      const endpoint = brandType === 'product' ? '/brands/product/' : '/brands/vehicle/';
      const url = `${BASE_URL}${endpoint}`;
      console.log("API URL:", url);
      
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log("Brands response:", response);
      console.log("Brands response data:", response.data);
      console.log("Brands response status:", response.status);
      console.log("=========================");
      
      return response.data;
    } catch (error) {
      console.error("=== GET BRANDS ERROR ===");
      console.error("Error:", error);
      console.error("Error response:", error.response);
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
      console.error("=========================");
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch brands');
    }
  }
);

export const createBrand = createAsyncThunk(
  'brand/createBrand',
  async ({ brandData, brandType }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }

      const endpoint = brandType === 'product' ? '/brands/product/' : '/brands/vehicle/';
      const response = await axios.post(`${BASE_URL}${endpoint}`, brandData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create brand');
    }
  }
);

export const updateBrand = createAsyncThunk(
  'brand/updateBrand',
  async ({ id, brandData, brandType }, { rejectWithValue }) => {
    try {
      console.log("=== UPDATE BRAND DEBUG ===");
      console.log("Brand ID:", id);
      console.log("Brand type:", brandType);
      console.log("Brand data:", brandData);
      console.log("Brand data keys:", brandData ? Object.keys(brandData) : "No keys");
      
      const token = localStorage.getItem("adminToken");
      console.log("Admin token exists:", !!token);
      if (!token) {
        console.error("No admin token found");
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }

      const endpoint = brandType === 'product' ? `/brands/product/${id}/` : `/brands/vehicle/${id}/`;
      const url = `${BASE_URL}${endpoint}`;
      console.log("API URL:", url);
      
      // Check if brandData has files (image upload)
      const hasFiles = brandData.image && brandData.image instanceof File;
      console.log("Has files:", hasFiles);
      
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      let dataToSend = brandData;
      
      // If there are files, use FormData
      if (hasFiles) {
        const formData = new FormData();
        Object.keys(brandData).forEach(key => {
          if (brandData[key] !== null && brandData[key] !== undefined) {
            formData.append(key, brandData[key]);
          }
        });
        dataToSend = formData;
        config.headers['Content-Type'] = 'multipart/form-data';
      } else {
        config.headers['Content-Type'] = 'application/json';
      }
      
      console.log("Data to send:", dataToSend);
      console.log("Config:", config);
      console.log("Is FormData:", dataToSend instanceof FormData);
      
      let response;
      try {
        // Try PATCH first (most common pattern)
        response = await axios.patch(url, dataToSend, config);
        console.log("Update brand response (PATCH):", response);
        console.log("Update brand response data:", response.data);
        console.log("Update brand response status:", response.status);
      } catch (patchError) {
        console.log("PATCH failed, trying PUT...");
        console.log("PATCH error:", patchError.response?.status, patchError.response?.data);
        
        // If PATCH fails with 500, try PUT
        if (patchError.response?.status === 500) {
          try {
            response = await axios.put(url, dataToSend, config);
            console.log("Update brand response (PUT):", response);
            console.log("Update brand response data:", response.data);
            console.log("Update brand response status:", response.status);
          } catch (putError) {
            console.error("Both PATCH and PUT failed");
            throw putError;
          }
        } else {
          throw patchError;
        }
      }
      
      console.log("==========================");
      
      return response.data;
    } catch (error) {
      console.error("=== UPDATE BRAND ERROR ===");
      console.error("Error:", error);
      console.error("Error response:", error.response);
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
      console.error("Error response headers:", error.response?.headers);
      console.error("==========================");
      
      // Enhanced error handling
      let errorMessage = 'Failed to update brand';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return rejectWithValue({
        message: errorMessage,
        status: error.response?.status || 500,
        data: error.response?.data
      });
    }
  }
);

export const deleteBrand = createAsyncThunk(
  'brand/deleteBrand',
  async ({ id, brandType }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }

      const endpoint = brandType === 'product' ? `/brands/product/${id}/` : `/brands/vehicle/${id}/`;
      await axios.delete(`${BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return { id, brandType };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete brand');
    }
  }
);

const brandSlice = createSlice({
  name: 'brand',
  initialState: {
    brands: [],
    loading: false,
    error: null,
    success: false,
    successMessage: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Brands
      .addCase(getBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        console.log("=== GET BRANDS FULFILLED ===");
        console.log("Action payload:", action.payload);
        console.log("Payload type:", typeof action.payload);
        console.log("Is array:", Array.isArray(action.payload));
        console.log("Payload keys:", action.payload ? Object.keys(action.payload) : "No keys");
        console.log("=============================");
        
        state.loading = false;
        // Handle different response structures
        if (Array.isArray(action.payload)) {
          state.brands = action.payload;
        } else if (action.payload?.data && Array.isArray(action.payload.data)) {
          state.brands = action.payload.data;
        } else if (action.payload?.brands && Array.isArray(action.payload.brands)) {
          state.brands = action.payload.brands;
        } else {
          console.warn("Unexpected brands response structure:", action.payload);
          state.brands = [];
        }
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Brand
      .addCase(createBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brands.push(action.payload);
        state.success = true;
        state.successMessage = 'Brand created successfully';
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Brand
      .addCase(updateBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.brands.findIndex(brand => brand.id === action.payload.id);
        if (index !== -1) {
          state.brands[index] = action.payload;
        }
        state.success = true;
        state.successMessage = 'Brand updated successfully';
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Brand
      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = state.brands.filter(brand => brand.id !== action.payload);
        state.success = true;
        state.successMessage = 'Brand deleted successfully';
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = brandSlice.actions;
export default brandSlice.reducer;