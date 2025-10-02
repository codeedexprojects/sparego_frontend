import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// GET Operations
export const getAllUsers = createAsyncThunk(
  "adminUserManagement/getAllUsers",
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${BASE_URL}/user-management/`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit },
      });

      const data = response.data || {};
      return {
        users: data.users || [],
        totalUsers: data.totalUsers || data.users?.length || 0,
        currentPage: data.currentPage || page,
        totalPages: data.totalPages || 1,
      };
    } catch (error) {
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to fetch users",
        status: error?.response?.status,
      });
    }
  }
);

export const getUserById = createAsyncThunk(
  "adminUserManagement/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${BASE_URL}/user-management/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = response.data?.data || response.data?.user || response.data;

      if (!userData || typeof userData !== "object" || Object.keys(userData).length === 0) {
        throw new Error("User not found or invalid user data received");
      }

      if (!userData._id && !userData.id) {
        throw new Error("User data missing required ID field");
      }

      return userData;
    } catch (error) {
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to fetch user",
        status: error?.response?.status,
      });
    }
  }
);

// PATCH Operations
export const toggleUserStatus = createAsyncThunk(
  "adminUserManagement/toggleUserStatus",
  async ({ id, currentStatus }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.patch(
        `${BASE_URL}/user-management/${id}/toggle-status`,
        { isActive: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to toggle user status",
        status: error?.response?.status,
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
      await axios.patch(
        `${BASE_URL}/user-management/bulk/toggle-status`,
        { ids: userIds, isActive: status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return { userIds, status };
    } catch (error) {
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to bulk toggle user status",
        status: error?.response?.status,
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
  totalUsers: 0,
  totalPages: 1,
  currentPage: 1,
};

// Slice
const adminUserManagementSlice = createSlice({
  name: "adminUserManagement",
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
    clearOperationSuccess: (state) => { state.operationSuccess = null; },
    setSelectedUsers: (state, action) => { state.selectedUsers = action.payload; },
    clearSelectedUsers: (state) => { state.selectedUsers = []; },
  },
  extraReducers: (builder) => {
    builder
      // Get All Users
      .addCase(getAllUsers.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalUsers = action.payload.totalUsers;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Get User By ID
      .addCase(getUserById.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getUserById.fulfilled, (state, action) => { state.loading = false; state.currentUser = action.payload; state.error = null; })
      .addCase(getUserById.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Toggle User Status
      .addCase(toggleUserStatus.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(user => user._id === action.payload._id || user.id === action.payload.id);
        if (index !== -1) state.users[index] = action.payload;
        if (state.currentUser && (state.currentUser._id === action.payload._id || state.currentUser.id === action.payload.id)) {
          state.currentUser = action.payload;
        }
        state.operationSuccess = `User ${action.payload.isActive ? "activated" : "deactivated"} successfully`;
        state.error = null;
      })
      .addCase(toggleUserStatus.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Bulk Toggle User Status
      .addCase(bulkToggleUserStatus.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(bulkToggleUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { userIds, status } = action.payload;
        state.users = state.users.map(user => (userIds.includes(user._id) || userIds.includes(user.id) ? { ...user, isActive: status } : user));
        state.selectedUsers = [];
        state.operationSuccess = `${userIds.length} users ${status ? "activated" : "deactivated"} successfully`;
        state.error = null;
      })
      .addCase(bulkToggleUserStatus.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { clearError, clearOperationSuccess, setSelectedUsers, clearSelectedUsers } = adminUserManagementSlice.actions;
export default adminUserManagementSlice.reducer;
