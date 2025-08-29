import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// add to wishlist
export const addToWishlist = createAsyncThunk(
    "wishlist/addToWishlist",
    async (productData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${BASE_URL}/wishlist/add`,productData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to add to wishlist");
        }
    }
);

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlist: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Add to Wishlist
            .addCase(addToWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist.push(action.payload);
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default wishlistSlice.reducer;