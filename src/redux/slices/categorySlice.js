import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";


// get all main categories
export const getMainCategories = createAsyncThunk(
    "category/getAllMainCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/categories/`,
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch main categories"
            )
        }
    }
)

export const getSubCategories = createAsyncThunk(
    "category/getAllSubCategories",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/sub-categories/${id}`,
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch main categories"
            )
        }
    }
)

export const getAllSubSubById = createAsyncThunk(
    "category/getAllSubSubById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/sub-sub-categories/${id}`,
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch sub sub categories"
            )
        }
    }
)

// get all sub sub categories
export const getAllSubSubCategories = createAsyncThunk(
    "category/getAllSubSubCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/sub-sub-categories/`,
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch sub sub categories"
            )
        }
    }
)

const categorySlice = createSlice({
    name: "category",
    initialState: {
        subSubCategories: [],
        mainCategories: [],
        subCategories: [],
        subSubById: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMainCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMainCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.mainCategories = action.payload;
            })
            .addCase(getMainCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

           
            .addCase(getSubCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSubCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.subCategories = action.payload; 
            })
            .addCase(getSubCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // sub sub by id
            .addCase(getAllSubSubById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllSubSubById.fulfilled, (state, action) => {
                state.loading = false;
                state.subSubById = action.payload; 
            })
            .addCase(getAllSubSubById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getAllSubSubCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllSubSubCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.subSubCategories = action.payload;
            })
            .addCase(getAllSubSubCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default categorySlice.reducer;