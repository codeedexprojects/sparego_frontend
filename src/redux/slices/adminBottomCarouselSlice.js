import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

const getToken = () => localStorage.getItem("adminToken");

// Fetch all bottom carousels
export const fetchBottomCarousels = createAsyncThunk(
  "adminBottomCarousel/fetchBottomCarousels",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/bottom-carousel/`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (Array.isArray(res.data)) {
        return res.data; 
      } else if (res.data.bottomCarousels && Array.isArray(res.data.bottomCarousels)) {
        return res.data.bottomCarousels; 
      } else if (res.data.data && Array.isArray(res.data.data)) {
        return res.data.data; 
      } else {
        console.warn("Unexpected API response structure:", res.data);
        return []; 
      }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Add new bottom carousel
export const addBottomCarousel = createAsyncThunk(
  "adminBottomCarousel/addBottomCarousel",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/bottom-carousel/`, formData, {
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

// Edit bottom carousel
export const editBottomCarousel = createAsyncThunk(
  "adminBottomCarousel/editBottomCarousel",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${BASE_URL}/bottom-carousel/${id}`, data, {
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

// Delete bottom carousel
export const deleteBottomCarousel = createAsyncThunk(
  "adminBottomCarousel/deleteBottomCarousel",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/bottom-carousel/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Toggle bottom carousel status
export const toggleBottomCarouselStatus = createAsyncThunk(
  "adminBottomCarousel/toggleBottomCarouselStatus",
  async ({ id, currentStatus }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/bottom-carousel/${id}`,
        { isActive: !currentStatus },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const adminBottomCarouselSlice = createSlice({
  name: "adminBottomCarousel",
  initialState: {
    bottomCarousels: [], // Initialize as empty array
    loading: false,
    error: null,
  },
  reducers: {
    // Clear error if needed
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchBottomCarousels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBottomCarousels.fulfilled, (state, action) => {
        state.loading = false;
        state.bottomCarousels = action.payload || []; 
      })
      .addCase(fetchBottomCarousels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.bottomCarousels = [];
      })
      // Add
      .addCase(addBottomCarousel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBottomCarousel.fulfilled, (state, action) => {
        state.loading = false;
        state.bottomCarousels.push(action.payload);
      })
      .addCase(addBottomCarousel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Edit
      .addCase(editBottomCarousel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editBottomCarousel.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bottomCarousels.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) {
          state.bottomCarousels[index] = action.payload;
        }
      })
      .addCase(editBottomCarousel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteBottomCarousel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBottomCarousel.fulfilled, (state, action) => {
        state.loading = false;
        state.bottomCarousels = state.bottomCarousels.filter(
          (c) => c._id !== action.payload
        );
      })
      .addCase(deleteBottomCarousel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Toggle Status
      .addCase(toggleBottomCarouselStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleBottomCarouselStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bottomCarousels.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) {
          state.bottomCarousels[index] = action.payload;
        }
      })
      .addCase(toggleBottomCarouselStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = adminBottomCarouselSlice.actions;
export default adminBottomCarouselSlice.reducer;