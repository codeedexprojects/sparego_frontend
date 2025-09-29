import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// GET Operations
export const getAllUsers = createAsyncThunk(
  "adminUserManagement/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${BASE_URL}/user-management/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Users response:", response.data);
      const data = Array.isArray(response.data) ? response.data : 
                   response.data?.users || response.data?.data || [];
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to fetch users",
        status: error?.response?.status
      });
    }
  }
);

export const getUserById = createAsyncThunk(
  "adminUserManagement/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      console.log("=== GET USER BY ID DEBUG ===");
      console.log("Fetching user by ID:", id);
      console.log("ID type:", typeof id);
      console.log("ID is valid:", id && id !== '');
      
      const token = localStorage.getItem("adminToken");
      console.log("Admin token exists:", !!token);
      console.log("Token length:", token ? token.length : 0);
      
      const url = `${BASE_URL}/user-management/${id}`;
      console.log("API URL:", url);
      
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log("Raw response:", response);
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);
      console.log("Response data type:", typeof response.data);
      console.log("Response data keys:", response.data ? Object.keys(response.data) : "No data");
      
      const userData = response.data?.data || response.data?.user || response.data;
      console.log("Extracted user data:", userData);
      console.log("User data type:", typeof userData);
      console.log("User data keys:", userData ? Object.keys(userData) : "No user data");
      console.log("User data _id:", userData?._id);
      console.log("User data id:", userData?.id);
      console.log("User data name:", userData?.name);
      console.log("User data email:", userData?.email);
      console.log("=============================");
      
      // Check if user data is valid
      if (!userData || typeof userData !== 'object' || Object.keys(userData).length === 0) {
        console.error("Invalid user data received:", userData);
        throw new Error("User not found or invalid user data received");
      }
      
      // Check if user has a valid ID
      if (!userData._id && !userData.id) {
        console.error("User data missing ID:", userData);
        throw new Error("User data missing required ID field");
      }
      
      return userData;
    } catch (error) {
      console.error("=== GET USER BY ID ERROR ===");
      console.error("Error fetching user:", error);
      console.error("Error message:", error.message);
      console.error("Error response:", error.response);
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
      console.error("Error response headers:", error.response?.headers);
      console.error("=============================");
      
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to fetch user",
        status: error?.response?.status
      });
    }
  }
);

// PATCH Operations
export const toggleUserStatus = createAsyncThunk(
  "adminUserManagement/toggleUserStatus",
  async ({ id, currentStatus }, { rejectWithValue }) => {
    try {
      console.log("Toggle status API call - ID:", id, "Current status:", currentStatus);
      const token = localStorage.getItem("adminToken");
      console.log("Admin token:", token ? "Present" : "Missing");
      
      const url = `${BASE_URL}/user-management/${id}/toggle-status`;
      const payload = { isActive: !currentStatus };
      console.log("API URL:", url);
      console.log("Payload:", payload);
      
      const response = await axios.patch(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log("Toggle status response:", response.data);
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error toggling user status:", error);
      console.error("Error response:", error?.response?.data);
      console.error("Error status:", error?.response?.status);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to toggle user status",
        status: error?.response?.status
      });
    }
  }
);

// Bulk Operations
export const bulkToggleUserStatus = createAsyncThunk(
  "adminUserManagement/bulkToggleUserStatus",
  async ({ userIds, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.patch(`${BASE_URL}/user-management/bulk/toggle-status`, 
        { ids: userIds, isActive: status }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return { userIds, status };
    } catch (error) {
      console.error("Error bulk toggling user status:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to bulk toggle user status",
        status: error?.response?.status
      });
    }
  }
);

// Initial state
const initialState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  operationSuccess: null,
  selectedUsers: [],
};

// Slice
const adminUserManagementSlice = createSlice({
  name: "adminUserManagement",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearOperationSuccess: (state) => {
      state.operationSuccess = null;
    },
    setSelectedUsers: (state, action) => {
      state.selectedUsers = action.payload;
    },
    clearSelectedUsers: (state) => {
      state.selectedUsers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get User By ID
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Toggle User Status
      .addCase(toggleUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(
          user => user._id === action.payload._id || user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        if (state.currentUser && 
            (state.currentUser._id === action.payload._id || state.currentUser.id === action.payload.id)) {
          state.currentUser = action.payload;
        }
        state.operationSuccess = `User ${action.payload.isActive ? 'activated' : 'deactivated'} successfully`;
        state.error = null;
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Bulk Toggle User Status
      .addCase(bulkToggleUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bulkToggleUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { userIds, status } = action.payload;
        state.users = state.users.map(user => {
          if (userIds.includes(user._id) || userIds.includes(user.id)) {
            return { ...user, isActive: status };
          }
          return user;
        });
        state.selectedUsers = [];
        state.operationSuccess = `${userIds.length} users ${status ? 'activated' : 'deactivated'} successfully`;
        state.error = null;
      })
      .addCase(bulkToggleUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearOperationSuccess,
  setSelectedUsers,
  clearSelectedUsers,
} = adminUserManagementSlice.actions;

export default adminUserManagementSlice.reducer;
