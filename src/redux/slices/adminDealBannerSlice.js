import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken"); 
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const fetchDealBanners = createAsyncThunk(
  "adminDealBanner/fetchDealBanners",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/deal-banner/`, {
        headers: getAuthHeaders(),
      });
      return res.data.banners;
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

// Slice
const adminDealBannerSlice = createSlice({
  name: "adminDealBanner",
  initialState: {
    banners: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchDealBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDealBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(fetchDealBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add
      .addCase(addDealBanner.fulfilled, (state, action) => {
        state.banners.push(action.payload);
      })
      // Edit
      .addCase(editDealBanner.fulfilled, (state, action) => {
        const index = state.banners.findIndex(
          (b) => b._id === action.payload._id
        );
        if (index !== -1) {
          state.banners[index] = action.payload;
        }
      })
      // Delete
      .addCase(deleteDealBanner.fulfilled, (state, action) => {
        state.banners = state.banners.filter((b) => b._id !== action.payload);
      });
  },
});

export default adminDealBannerSlice.reducer;
