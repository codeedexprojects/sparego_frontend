import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

const getToken = () => localStorage.getItem("adminToken");

export const fetchMainCarousels = createAsyncThunk(
  "adminMainCarousel/fetchMainCarousels",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/main-carousel/`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return res.data.mainCarousels;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const addMainCarousel = createAsyncThunk(
  "adminMainCarousel/addMainCarousel",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/main-carousel/`, formData, {
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

// Edit main carousel
export const editMainCarousel = createAsyncThunk(
  "adminMainCarousel/editMainCarousel",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${BASE_URL}/main-carousel/${id}`, data, {
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

// Delete main carousel
export const deleteMainCarousel = createAsyncThunk(
  "adminMainCarousel/deleteMainCarousel",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/main-carousel/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const adminMainCarouselSlice = createSlice({
  name: "adminMainCarousel",
  initialState: {
    mainCarousels: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchMainCarousels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMainCarousels.fulfilled, (state, action) => {
        state.loading = false;
        state.mainCarousels = action.payload;
      })
      .addCase(fetchMainCarousels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add
      .addCase(addMainCarousel.fulfilled, (state, action) => {
        state.mainCarousels.push(action.payload);
      })
      // Edit
      .addCase(editMainCarousel.fulfilled, (state, action) => {
        const index = state.mainCarousels.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) {
          state.mainCarousels[index] = action.payload;
        }
      })
      // Delete
      .addCase(deleteMainCarousel.fulfilled, (state, action) => {
        state.mainCarousels = state.mainCarousels.filter(
          (c) => c._id !== action.payload
        );
      });
  },
});

export default adminMainCarouselSlice.reducer;
