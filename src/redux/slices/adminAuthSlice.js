import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// Admin Login 
export const loginAdmin = createAsyncThunk(
  "adminAuth/loginAdmin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/admin-auth/login`, { email, password });
      console.log("Login response:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Admin login failed");
    }
  }
);

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: {
    admin: null,
    token: typeof window !== "undefined" ? localStorage.getItem("adminToken") : null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    adminLogout: (state) => {
      state.admin = null;
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");
      }
    },
    clearAdminError: (state) => {
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearOperationSuccess: (state) => {
      state.operationSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Admin Login
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        const { token, ...adminData } = action.payload;
        state.admin = adminData;
        state.token = token || null;
        state.isAuthenticated = !!token;

        if (token && typeof window !== "undefined") {
          localStorage.setItem("adminToken", token);
          localStorage.setItem("admin", JSON.stringify(adminData));
        }
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { adminLogout, clearAdminError, clearError, clearOperationSuccess } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
