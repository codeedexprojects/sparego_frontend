import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// get home carousel
export const getHomeCarousel = createAsyncThunk(
  "carousel/getHomeCarousel",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/main-carousel/no-section`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch carousel"
      );
    }
  }
);

export const getHomeCarouselBySection = createAsyncThunk(
  "carousel/getHomeCarouselBySection",
  async (sectionId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/main-carousel/section/${sectionId}`,
        {
          // Add cache-busting headers if needed
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch carousel"
      );
    }
  }
);

export const getLandingCarousel = createAsyncThunk(
  "carousel/getLandingCarousel",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/home-carousel/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch carousel"
      );
    }
  }
);

export const getBottomCarousel = createAsyncThunk(
  "carousel/getBottomCarousel",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/bottom-carousel/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch carousel"
      );
    }
  }
);

const carouselSlice = createSlice({
  name: "carousel",
  initialState: {
    carousel: [],
    bottomCarousel: [],
    landingCarousel: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHomeCarousel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHomeCarousel.fulfilled, (state, action) => {
        state.loading = false;
        state.carousel = action.payload.mainCarousels || action.payload || [];
      })
      .addCase(getHomeCarousel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get sectionbyId carousel
         .addCase(getHomeCarouselBySection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHomeCarouselBySection.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Fix: Access mainCarousels from the API response
        state.carousel = action.payload.mainCarousels || [];
      })
      .addCase(getHomeCarouselBySection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.carousel = [];
      })
  

      // bottom carousel
      .addCase(getBottomCarousel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBottomCarousel.fulfilled, (state, action) => {
        state.loading = false;
        state.bottomCarousel = action.payload;
      })
      .addCase(getBottomCarousel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // landing carousel
      .addCase(getLandingCarousel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLandingCarousel.fulfilled, (state, action) => {
        state.loading = false;
        state.landingCarousel = action.payload;
      })
      .addCase(getLandingCarousel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default carouselSlice.reducer;
