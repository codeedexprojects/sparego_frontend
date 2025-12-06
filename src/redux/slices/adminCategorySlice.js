import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const fetchCategories = createAsyncThunk(
  "adminCategory/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${BASE_URL}/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Categories API Response:", res.data);
      return Array.isArray(res.data) 
        ? res.data 
        : res.data.categories || [];
    } catch (err) {
      console.error("Fetch error:", err);
      return rejectWithValue(err.response?.data?.message || "Failed to fetch categories");
    }
  }
);

export const addCategory = createAsyncThunk(
  "adminCategory/add",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.post(`${BASE_URL}/categories`, data, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add category");
    }
  }
);

export const editCategory = createAsyncThunk(
  "adminCategory/edit",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.patch(`${BASE_URL}/categories/${id}`, data, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to edit category");
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "adminCategory/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${BASE_URL}/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete category");
    }
  }
);

export const toggleCategoryStatus = createAsyncThunk(
  "adminCategory/toggleStatus",
  async ({ id, currentStatus }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.patch(
        `${BASE_URL}/categories/${id}`,
        { isActive: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to toggle category status");
    }
  }
);

const adminCategorySlice = createSlice({
  name: "adminCategory",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        console.log("Categories updated in Redux:", action.payload);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Fetch rejected:", action.payload);
      });

    // Add
    builder
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Edit
    builder
      .addCase(editCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) state.categories[index] = action.payload;
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Delete
    builder
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((c) => c._id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Toggle Status
    builder
      .addCase(toggleCategoryStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleCategoryStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(toggleCategoryStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminCategorySlice.reducer;