// redux/slices/adminBlogSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

const getToken = () => localStorage.getItem("adminToken");

// Fetch all blogs
export const fetchBlogs = createAsyncThunk(
  "adminBlog/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/blogs/`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return res.data.blogs;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch single blog by ID
export const fetchBlog = createAsyncThunk(
  "adminBlog/fetchBlog",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/blogs/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return res.data.blog;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Add new blog
export const addBlog = createAsyncThunk(
  "adminBlog/addBlog",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/blogs/`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.blog;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Edit blog
export const editBlog = createAsyncThunk(
  "adminBlog/editBlog",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${BASE_URL}/blogs/${id}`, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.blog;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete blog
export const deleteBlog = createAsyncThunk(
  "adminBlog/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/blogs/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const adminBlogSlice = createSlice({
  name: "adminBlog",
  initialState: {
    blogs: [],
    currentBlog: null,
    loading: false,
    error: null,
    addLoading: false,
    addError: null,
    editLoading: false,
    editError: null,
    deleteLoading: false,
    deleteError: null,
  },
  reducers: {
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
    clearErrors: (state) => {
      state.error = null;
      state.addError = null;
      state.editError = null;
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch single blog
      .addCase(fetchBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
      })
      .addCase(fetchBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add blog
      .addCase(addBlog.pending, (state) => {
        state.addLoading = true;
        state.addError = null;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.addLoading = false;
        state.blogs.push(action.payload);
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.addLoading = false;
        state.addError = action.payload;
      })
      
      // Edit blog
      .addCase(editBlog.pending, (state) => {
        state.editLoading = true;
        state.editError = null;
      })
      .addCase(editBlog.fulfilled, (state, action) => {
        state.editLoading = false;
        const index = state.blogs.findIndex(
          (blog) => blog._id === action.payload._id
        );
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
        if (state.currentBlog?._id === action.payload._id) {
          state.currentBlog = action.payload;
        }
      })
      .addCase(editBlog.rejected, (state, action) => {
        state.editLoading = false;
        state.editError = action.payload;
      })
      
      // Delete blog
      .addCase(deleteBlog.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.blogs = state.blogs.filter(
          (blog) => blog._id !== action.payload
        );
        if (state.currentBlog?._id === action.payload) {
          state.currentBlog = null;
        }
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload;
      });
  },
});

export const { clearCurrentBlog, clearErrors } = adminBlogSlice.actions;
export default adminBlogSlice.reducer;