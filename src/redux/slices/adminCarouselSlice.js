import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// Normalize helper
const normalizeData = (payload) => (payload && payload.data !== undefined ? payload.data : payload);

// Helpers for multipart handling
const isFile = (v) => typeof File !== 'undefined' && v instanceof File;
const buildFormData = (data) => {
  const fd = new FormData();
  Object.entries(data || {}).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) {
      value.forEach((item) => fd.append(`${key}[]`, item));
    } else {
      fd.append(key, value);
    }
  });
  return fd;
};

// Get all carousels by type
export const getCarousels = createAsyncThunk(
  "carousel/getCarousels",
  async (carouselType, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }

      const endpoint = carouselType === "main" 
        ? "main-carousel" 
        : carouselType === "bottom" 
          ? "bottom-carousel" 
          : "home-carousel";
      
      const response = await axios.get(`${BASE_URL}/${endpoint}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = Array.isArray(response.data) ? response.data : normalizeData(response.data) || [];
      return { type: carouselType, data };
    } catch (error) {
      const message = error?.response?.data?.message || error?.response?.data?.detail || error?.message || "Failed to fetch carousels";
      return rejectWithValue({ message, status: error?.response?.status });
    }
  }
);

// Add new carousel
export const addCarousel = createAsyncThunk(
  "carousel/addCarousel",
  async ({ carouselType, carouselData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }

      const endpoint = carouselType === "main" 
        ? "main-carousel" 
        : carouselType === "bottom" 
          ? "bottom-carousel" 
          : "home-carousel";
      const useMultipart = carouselData && (isFile(carouselData.image));
      const payload = useMultipart ? buildFormData({
        title: carouselData.title,
        image: carouselData.image,
        isActive: carouselData.isActive,
        // send products as repeated field if array
        ...(Array.isArray(carouselData.products) ? { products: carouselData.products } : {})
      }) : carouselData;
      const headers = useMultipart 
        ? { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } 
        : { Authorization: `Bearer ${token}` };
      const response = await axios.post(`${BASE_URL}/${endpoint}/`, payload, { headers });
      const data = normalizeData(response.data);
      return { type: carouselType, data };
    } catch (error) {
      const message = error?.response?.data?.message || error?.response?.data?.detail || error?.message || "Failed to add carousel";
      return rejectWithValue({ message, status: error?.response?.status });
    }
  }
);

// Update carousel
export const updateCarousel = createAsyncThunk(
  "carousel/updateCarousel",
  async ({ carouselType, carouselId, carouselData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }

      const endpoint = carouselType === "main" 
        ? "main-carousel" 
        : carouselType === "bottom" 
          ? "bottom-carousel" 
          : "home-carousel";
      const useMultipart = carouselData && (isFile(carouselData.image));
      const payload = useMultipart ? buildFormData({
        title: carouselData.title,
        image: carouselData.image,
        isActive: carouselData.isActive,
        ...(Array.isArray(carouselData.products) ? { products: carouselData.products } : {})
      }) : carouselData;
      const headers = useMultipart 
        ? { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } 
        : { Authorization: `Bearer ${token}` };
      const response = await axios.put(`${BASE_URL}/${endpoint}/${carouselId}/`, payload, { headers });
      const data = normalizeData(response.data);
      return { type: carouselType, data };
    } catch (error) {
      const message = error?.response?.data?.message || error?.response?.data?.detail || error?.message || "Failed to update carousel";
      return rejectWithValue({ message, status: error?.response?.status });
    }
  }
);

// Delete carousel
export const deleteCarousel = createAsyncThunk(
  "carousel/deleteCarousel",
  async ({ carouselType, carouselId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }

      const endpoint = carouselType === "main" 
        ? "main-carousel" 
        : carouselType === "bottom" 
          ? "bottom-carousel" 
          : "home-carousel";
      await axios.delete(`${BASE_URL}/${endpoint}/${carouselId}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return { type: carouselType, id: carouselId };
    } catch (error) {
      const message = error?.response?.data?.message || error?.response?.data?.detail || error?.message || "Failed to delete carousel";
      return rejectWithValue({ message, status: error?.response?.status });
    }
  }
);

// Toggle carousel status
export const toggleCarouselStatus = createAsyncThunk(
  "carousel/toggleCarouselStatus",
  async ({ carouselType, carouselId, currentStatus }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }

      const endpoint = carouselType === "main" 
        ? "main-carousel" 
        : carouselType === "bottom" 
          ? "bottom-carousel" 
          : "home-carousel";
      const response = await axios.patch(`${BASE_URL}/${endpoint}/${carouselId}/`, {
        isActive: !currentStatus
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = normalizeData(response.data);
      return { type: carouselType, data };
    } catch (error) {
      const message = error?.response?.data?.message || error?.response?.data?.detail || error?.message || "Failed to toggle carousel status";
      return rejectWithValue({ message, status: error?.response?.status });
    }
  }
);

const carouselSlice = createSlice({
  name: "carousel",
  initialState: {
    mainCarousels: [],
    bottomCarousels: [],
    homeCarousels: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get carousels
      .addCase(getCarousels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCarousels.fulfilled, (state, action) => {
        state.loading = false;
        state[`${action.payload.type}Carousels`] = action.payload.data || [];
      })
      .addCase(getCarousels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: "Failed to fetch carousels" };
      })
      // Add carousel
      .addCase(addCarousel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCarousel.fulfilled, (state, action) => {
        state.loading = false;
        const list = state[`${action.payload.type}Carousels`];
        if (action.payload.data) list.push(action.payload.data);
      })
      .addCase(addCarousel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: "Failed to add carousel" };
      })
      // Update carousel
      .addCase(updateCarousel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCarousel.fulfilled, (state, action) => {
        state.loading = false;
        const carousels = state[`${action.payload.type}Carousels`];
        const updated = action.payload.data;
        if (!updated) return;
        const id = updated._id || updated.id;
        const index = carousels.findIndex(item => (item._id || item.id) === id);
        if (index !== -1) {
          carousels[index] = updated;
        }
      })
      .addCase(updateCarousel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: "Failed to update carousel" };
      })
      // Delete carousel
      .addCase(deleteCarousel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCarousel.fulfilled, (state, action) => {
        state.loading = false;
        state[`${action.payload.type}Carousels`] = state[`${action.payload.type}Carousels`]
          .filter(item => (item._id || item.id) !== action.payload.id);
      })
      .addCase(deleteCarousel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: "Failed to delete carousel" };
      })
      // Toggle carousel status
      .addCase(toggleCarouselStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleCarouselStatus.fulfilled, (state, action) => {
        state.loading = false;
        const carousels = state[`${action.payload.type}Carousels`];
        const updated = action.payload.data;
        if (!updated) return;
        const id = updated._id || updated.id;
        const index = carousels.findIndex(item => (item._id || item.id) === id);
        if (index !== -1) {
          carousels[index] = updated;
        }
      })
      .addCase(toggleCarouselStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: "Failed to toggle carousel status" };
      });
  },
});

export const { clearError } = carouselSlice.actions;
export default carouselSlice.reducer;


