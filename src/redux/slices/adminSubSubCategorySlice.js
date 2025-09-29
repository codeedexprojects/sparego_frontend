import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// GET - fetch all sub-sub-categories
export const fetchSubSubCategories = createAsyncThunk(
  "adminSubSubCategory/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${BASE_URL}/sub-sub-categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return Array.isArray(res.data) ? res.data : res.data.subSubCategories || res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch sub-sub-categories");
    }
  }
);

// POST - add new sub-sub-category
export const addSubSubCategory = createAsyncThunk(
  "adminSubSubCategory/add",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.post(`${BASE_URL}/sub-sub-categories`, data, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add sub-sub-category");
    }
  }
);

// PUT - edit sub-sub-category
export const editSubSubCategory = createAsyncThunk(
  "adminSubSubCategory/edit",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.patch(`${BASE_URL}/sub-sub-categories/${id}`, data, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to edit sub-sub-category");
    }
  }
);

// DELETE - delete sub-sub-category
export const deleteSubSubCategory = createAsyncThunk(
  "adminSubSubCategory/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${BASE_URL}/sub-sub-categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete sub-sub-category");
    }
  }
);

const adminSubSubCategorySlice = createSlice({
  name: "adminSubSubCategory",
  initialState: {
    subSubCategories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch
    builder
      .addCase(fetchSubSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subSubCategories = action.payload;
      })
      .addCase(fetchSubSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add
    builder
      .addCase(addSubSubCategory.fulfilled, (state, action) => {
        state.subSubCategories.push(action.payload);
      })
      .addCase(addSubSubCategory.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Edit
    builder
      .addCase(editSubSubCategory.fulfilled, (state, action) => {
        const index = state.subSubCategories.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) state.subSubCategories[index] = action.payload;
      })
      .addCase(editSubSubCategory.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Delete
    builder
      .addCase(deleteSubSubCategory.fulfilled, (state, action) => {
        state.subSubCategories = state.subSubCategories.filter((c) => c._id !== action.payload);
      })
      .addCase(deleteSubSubCategory.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default adminSubSubCategorySlice.reducer;
