import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";


// GET - fetch all categories
export const fetchMainCategories = createAsyncThunk(
  "mainCategories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${BASE_URL}/main-categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.categories;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch categories");
    }
  }
);

// POST - add new category
export const addMainCategory = createAsyncThunk(
  "mainCategories/add",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.post(`${BASE_URL}/main-categories`, data, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add category");
    }
  }
);

// PUT - edit category
export const editMainCategory = createAsyncThunk(
  "mainCategories/edit",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.patch(`${BASE_URL}/main-categories/${id}`, data, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to edit category");
    }
  }
);

// DELETE - delete category
export const deleteMainCategory = createAsyncThunk(
  "mainCategories/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${BASE_URL}/main-categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete category");
    }
  }
);

const mainCategorySlice = createSlice({
  name: "mainCategories",
  initialState: {
    mainCategories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch
    builder
      .addCase(fetchMainCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMainCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.mainCategories = action.payload;
      })
      .addCase(fetchMainCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add
    builder
      .addCase(addMainCategory.fulfilled, (state, action) => {
        state.mainCategories.push(action.payload);
      })
      .addCase(addMainCategory.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Edit
    builder
      .addCase(editMainCategory.fulfilled, (state, action) => {
        const index = state.mainCategories.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) state.mainCategories[index] = action.payload;
      })
      .addCase(editMainCategory.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Delete
    builder
      .addCase(deleteMainCategory.fulfilled, (state, action) => {
        state.mainCategories = state.mainCategories.filter((c) => c._id !== action.payload);
      })
      .addCase(deleteMainCategory.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default mainCategorySlice.reducer;
