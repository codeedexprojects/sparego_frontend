import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// GET - fetch all sub-categories
export const fetchSubCategories = createAsyncThunk(
  "adminSubCategory/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${BASE_URL}/sub-categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Sub-Categories API Response:", res.data);
      return Array.isArray(res.data) 
        ? res.data 
        : res.data.subCategories || [];
    } catch (err) {
      console.error("Fetch error:", err);
      return rejectWithValue(err.response?.data?.message || "Failed to fetch sub-categories");
    }
  }
);

// POST - add new sub-category
export const addSubCategory = createAsyncThunk(
  "adminSubCategory/add",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.post(`${BASE_URL}/sub-categories`, data, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add sub-category");
    }
  }
);

// PUT - edit sub-category
export const editSubCategory = createAsyncThunk(
  "adminSubCategory/edit",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.patch(`${BASE_URL}/sub-categories/${id}`, data, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to edit sub-category");
    }
  }
);

// DELETE - delete sub-category
export const deleteSubCategory = createAsyncThunk(
  "adminSubCategory/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${BASE_URL}/sub-categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete sub-category");
    }
  }
);

// PATCH - toggle sub-category status
export const toggleSubCategoryStatus = createAsyncThunk(
  "adminSubCategory/toggleStatus",
  async ({ id, currentStatus }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.patch(
        `${BASE_URL}/sub-categories/${id}`,
        { isActive: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to toggle sub-category status");
    }
  }
);

const adminSubCategorySlice = createSlice({
  name: "adminSubCategory",
  initialState: {
    subCategories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch
    builder
      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories = action.payload;
        console.log("Sub-categories updated in Redux:", action.payload);
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Fetch rejected:", action.payload);
      });

    // Add
    builder
      .addCase(addSubCategory.fulfilled, (state, action) => {
        state.subCategories.push(action.payload);
      })
      .addCase(addSubCategory.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Edit
    builder
      .addCase(editSubCategory.fulfilled, (state, action) => {
        const index = state.subCategories.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) state.subCategories[index] = action.payload;
      })
      .addCase(editSubCategory.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Delete
    builder
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.subCategories = state.subCategories.filter((c) => c._id !== action.payload);
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Toggle Status
    builder
      .addCase(toggleSubCategoryStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleSubCategoryStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.subCategories.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.subCategories[index] = action.payload;
        }
      })
      .addCase(toggleSubCategoryStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSubCategorySlice.reducer;
