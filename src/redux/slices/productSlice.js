import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";


// get all products 
export const getAllProducts = createAsyncThunk(
    "product/getAllProducts",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/products/product/${id}`,
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch products"
            )
        }
    }
)

export const getProductById = createAsyncThunk(
    "product/getProductById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/products/${id}`,
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch products"
            )
        }
    }
)

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        product: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // All Products
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Product by ID
            .addCase(getProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.product = null;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload; 
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },  
});

export default productSlice.reducer;