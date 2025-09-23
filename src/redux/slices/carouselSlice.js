import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// get home carousel 
export const getHomeCarousel = createAsyncThunk(
    "carousel/getHomeCarousel",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/main-carousel/`,
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch carousel"
            )
        }
    }
)

export const getLandingCarousel = createAsyncThunk(
    "carousel/getLandingCarousel",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/home-carousel/`,
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch carousel"
            )
        }
    }
)

export const getBottomCarousel = createAsyncThunk(
    "carousel/getBottomCarousel",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/bottom-carousel/`,
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch carousel"
            )
        }
    }
)

const carouselSlice = createSlice({
    name: "carousel",
    initialState: {
        carousel: [],
        bottomCarousel:[],
        landingCarousel:[],
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
                state.carousel = action.payload;
            })
            .addCase(getHomeCarousel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
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