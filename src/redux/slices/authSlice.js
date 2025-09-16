import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// Login 
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ number }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user-auth/send-otp`,
        { number }
      );
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Register 
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, number }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user-auth/send-otp`,
        { name, number }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Register failed");
    }
  }
);

// Verify OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ userId, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user-auth/verify-otp`,
        { userId, otp }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "OTP verification failed");
    }
  }
);

// get user profile 
export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { rejectWithValue }) => { 
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get( 
        `${BASE_URL}/user-profile/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch user profile");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {

    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("tempUserId");
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.userId && typeof window !== "undefined") {
          localStorage.setItem("tempUserId", action.payload.userId);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        
        if (action.payload.userId && typeof window !== "undefined") {
          localStorage.setItem("tempUserId", action.payload.userId);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.token = action.payload.token || null;
        
        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
        }
        
        if (typeof window !== "undefined") {
          localStorage.removeItem("tempUserId");
        }
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get User Profile
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload || null;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;