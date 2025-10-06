import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../baseUrl";


export const getBottCarousel = createAsyncThunk(
  "carousel/getBottomCarousel",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/bottom-carousel/no-section`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch carousel"
      );
    }
  }
);

export const getBottomCarouselbySection = createAsyncThunk(
  "carousel/getBottomCarouselbySection",
  async (sectionId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/bottom-carousel/section/${sectionId}`,
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

const bottomCarouselSlice = createSlice({
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
      .addCase(getBottomCarousel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBottomCarousel.fulfilled, (state, action) => {
        state.loading = false;
        state.carousel = action.payload.mainCarousels || action.payload || [];
      })
      .addCase(getBottomCarousel.rejected, (state, action) => {
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

