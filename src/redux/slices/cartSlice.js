import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (productData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${BASE_URL}/cart/add`, productData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to add to cart");
        }
    }
);

export const buyNow = createAsyncThunk(
    "cart/buyNow",
    async (productData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${BASE_URL}/cart/buy-now`, productData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to buy now");
        }
    }
);


export const getCart = createAsyncThunk(
    "cart/getCart",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `${BASE_URL}/cart`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            return response.data.cart;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to get cart");
        }
    }
);

export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async (productId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const id = typeof productId === 'object' ? productId.productId : productId;    
            const response = await axios.delete(
                `${BASE_URL}/cart/remove/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to remove from cart");
        }
    }
);

export const updateCartItem = createAsyncThunk(
    "cart/updateCartItem",
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.patch(
                `${BASE_URL}/cart/update`,
                { 
                    productId,
                    quantity 
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update cart item");
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Add to Cart
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                // Optionally, you can push the new item to the cart array
                // state.cart.push(action.payload);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get Cart
            .addCase(getCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Remove from Cart
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                // Optionally, you can filter out the removed item from the cart array
                // state.cart = state.cart.filter(item => item.id !== action.payload.id);
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Cart Item
            .addCase(updateCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.loading = false;
                // Optionally, you can update the item in the cart array
                // const index = state.cart.findIndex(item => item.id === action.payload.id);
                // if (index !== -1) {
                //     state.cart[index] = action.payload;
                // }
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Buy Now
            .addCase(buyNow.pending, (state) => {
                state.loading = true;  
                state.error = null;
            })
            .addCase(buyNow.fulfilled, (state, action) => {
                state.loading = false;
                // Optionally, you can handle the buy now response
            })
            .addCase(buyNow.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default cartSlice.reducer;