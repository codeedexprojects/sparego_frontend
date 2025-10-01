import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

const getToken = () => localStorage.getItem("adminToken");

// Fetch all home carousels
export const fetchHomeCarousels = createAsyncThunk(
  "adminHomeCarousel/fetchHomeCarousels",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/home-carousel/`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (Array.isArray(res.data)) {
        return res.data;
      }
      else if (res.data.homeCarousels) {
        return res.data.homeCarousels;
      }
      else if (res.data.data) {
        return res.data.data;
      }
      else {
        console.warn("Unexpected API response structure:", res.data);
        return [];
      }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Add new home carousel
export const addHomeCarousel = createAsyncThunk(
  "adminHomeCarousel/addHomeCarousel",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/home-carousel/`, formData, {
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

// Edit home carousel
export const editHomeCarousel = createAsyncThunk(
  "adminHomeCarousel/editHomeCarousel",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${BASE_URL}/home-carousel/${id}`, data, {
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

// Delete home carousel
export const deleteHomeCarousel = createAsyncThunk(
  "adminHomeCarousel/deleteHomeCarousel",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/home-carousel/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const adminHomeCarouselSlice = createSlice({
  name: "adminHomeCarousel",
  initialState: {
    homeCarouselList: [],
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
      .addCase(fetchHomeCarousels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeCarousels.fulfilled, (state, action) => {
        state.loading = false;
        state.homeCarouselList = action.payload || [];
        console.log("Redux state updated with:", action.payload); // Debug log
      })
      .addCase(fetchHomeCarousels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Fetch error:", action.payload); // Debug log
      })
      .addCase(addHomeCarousel.fulfilled, (state, action) => {
        state.homeCarouselList.push(action.payload);
      })
      .addCase(editHomeCarousel.fulfilled, (state, action) => {
        const index = state.homeCarouselList.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) {
          state.homeCarouselList[index] = action.payload;
        }
      })
      .addCase(deleteHomeCarousel.fulfilled, (state, action) => {
        state.homeCarouselList = state.homeCarouselList.filter(
          (c) => c._id !== action.payload
        );
      });
  },
});

export const { clearError } = adminHomeCarouselSlice.actions;
export default adminHomeCarouselSlice.reducer;