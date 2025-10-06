import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Fetch banners with filters & pagination
export const fetchDealBanners = createAsyncThunk(
  "adminDealBanner/fetchDealBanners",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const res = await axios.get(`${BASE_URL}/deal-banner?${params}`, {
        headers: getAuthHeaders(),
      });
      // Expect backend to return { banners, totalPages, currentPage, total }
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Add new banner
export const addDealBanner = createAsyncThunk(
  "adminDealBanner/addDealBanner",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/deal-banner/`, formData, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Edit banner
export const editDealBanner = createAsyncThunk(
  "adminDealBanner/editDealBanner",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${BASE_URL}/deal-banner/${id}`, data, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete banner
export const deleteDealBanner = createAsyncThunk(
  "adminDealBanner/deleteDealBanner",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/deal-banner/${id}`, {
        headers: getAuthHeaders(),
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const adminDealBannerSlice = createSlice({
  name: "adminDealBanner",
  initialState: {
    banners: [],
    loading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
    total: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch banners
      .addCase(fetchDealBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDealBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload.banners || [];
        state.totalPages = action.payload.totalPages || 1;
        state.currentPage = action.payload.currentPage || 1;
        state.total = action.payload.total || 0;
      })
      .addCase(fetchDealBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add banner
      .addCase(addDealBanner.fulfilled, (state, action) => {
        state.banners.unshift(action.payload);
        state.total += 1;
      })
      // Edit banner
      .addCase(editDealBanner.fulfilled, (state, action) => {
        const index = state.banners.findIndex(
          (b) => b._id === action.payload._id
        );
        if (index !== -1) state.banners[index] = action.payload;
      })
      // Delete banner
      .addCase(deleteDealBanner.fulfilled, (state, action) => {
        state.banners = state.banners.filter((b) => b._id !== action.payload);
        state.total -= 1;
      });
  },
});

export default adminDealBannerSlice.reducer;
