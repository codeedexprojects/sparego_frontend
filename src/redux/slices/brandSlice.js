import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// get all brands
export const getAllBrands = createAsyncThunk(
    "brand/getAllBrands",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/brands/vehicle/`,
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch brands"
            )
        }
    }
)

const brandSlice = createSlice({
    name: "brand",
    initialState: {
        brands: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllBrands.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllBrands.fulfilled, (state, action) => {
                state.loading = false;
                state.brands = action.payload;
            })
            .addCase(getAllBrands.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default brandSlice.reducer;