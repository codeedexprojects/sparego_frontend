import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// GET Operations
export const getAllAdmins = createAsyncThunk(
  "adminSubAdminManagement/getAllAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${BASE_URL}/sub-admin-management/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Admins response:", response.data);
      const data = Array.isArray(response.data) ? response.data : 
                   response.data?.admins || response.data?.data || [];
      return data;
    } catch (error) {
      console.error("Error fetching admins:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to fetch admins",
        status: error?.response?.status
      });
    }
  }
);

export const getAdminById = createAsyncThunk(
  "adminSubAdminManagement/getAdminById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${BASE_URL}/sub-admin-management/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error fetching admin:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to fetch admin",
        status: error?.response?.status
      });
    }
  }
);

// POST Operations
export const createSubAdmin = createAsyncThunk(
  "adminSubAdminManagement/createSubAdmin",
  async (adminData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post(`${BASE_URL}/sub-admin-management/`, adminData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error creating sub admin:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to create sub admin",
        status: error?.response?.status
      });
    }
  }
);

// PATCH Operations
export const updateSubAdmin = createAsyncThunk(
  "adminSubAdminManagement/updateSubAdmin",
  async ({ id, adminData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.patch(`${BASE_URL}/sub-admin-management/${id}`, adminData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error updating sub admin:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to update sub admin",
        status: error?.response?.status
      });
    }
  }
);

export const toggleAdminStatus = createAsyncThunk(
  "adminSubAdminManagement/toggleAdminStatus",
  async ({ id, currentStatus }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.patch(`${BASE_URL}/sub-admin-management/${id}`, 
        { isActive: !currentStatus }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error toggling admin status:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to toggle admin status",
        status: error?.response?.status
      });
    }
  }
);

export const updateAdminPermissions = createAsyncThunk(
  "adminSubAdminManagement/updateAdminPermissions",
  async ({ id, permissions }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.patch(`${BASE_URL}/sub-admin-management/${id}`, 
        { permissions }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error updating admin permissions:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to update admin permissions",
        status: error?.response?.status
      });
    }
  }
);

// DELETE Operations
export const deleteSubAdmin = createAsyncThunk(
  "adminSubAdminManagement/deleteSubAdmin",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.delete(`${BASE_URL}/sub-admin-management/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return { id, message: response.data?.message || "Sub admin deleted successfully" };
    } catch (error) {
      console.error("Error deleting sub admin:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to delete sub admin",
        status: error?.response?.status
      });
    }
  }
);

// Bulk Operations
export const bulkDeleteAdmins = createAsyncThunk(
  "adminSubAdminManagement/bulkDeleteAdmins",
  async (adminIds, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const deletePromises = adminIds.map(id => 
        axios.delete(`${BASE_URL}/sub-admin-management/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      );
      await Promise.all(deletePromises);
      return { adminIds, message: "Admins deleted successfully" };
    } catch (error) {
      console.error("Error bulk deleting admins:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to bulk delete admins",
        status: error?.response?.status
      });
    }
  }
);

export const bulkUpdatePermissions = createAsyncThunk(
  "adminSubAdminManagement/bulkUpdatePermissions",
  async ({ adminIds, permissions }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const updatePromises = adminIds.map(id => 
        axios.patch(`${BASE_URL}/sub-admin-management/${id}`, 
          { permissions }, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        )
      );
      await Promise.all(updatePromises);
      return { adminIds, permissions };
    } catch (error) {
      console.error("Error bulk updating permissions:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to bulk update permissions",
        status: error?.response?.status
      });
    }
  }
);

// Initial state
const initialState = {
  admins: [],
  currentAdmin: null,
  loading: false,
  error: null,
  operationSuccess: null,
  selectedAdmins: [],
};

// Slice
const adminSubAdminManagementSlice = createSlice({
  name: "adminSubAdminManagement",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearOperationSuccess: (state) => {
      state.operationSuccess = null;
    },
    setSelectedAdmins: (state, action) => {
      state.selectedAdmins = action.payload;
    },
    clearSelectedAdmins: (state) => {
      state.selectedAdmins = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Admins
      .addCase(getAllAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload;
        state.error = null;
      })
      .addCase(getAllAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Admin By ID
      .addCase(getAdminById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAdmin = action.payload;
        state.error = null;
      })
      .addCase(getAdminById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Sub Admin
      .addCase(createSubAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admins.unshift(action.payload);
        state.operationSuccess = "Sub admin created successfully";
        state.error = null;
      })
      .addCase(createSubAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Sub Admin
      .addCase(updateSubAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubAdmin.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.admins.findIndex(
          admin => admin._id === action.payload._id || admin.id === action.payload.id
        );
        if (index !== -1) {
          state.admins[index] = action.payload;
        }
        if (state.currentAdmin && 
            (state.currentAdmin._id === action.payload._id || state.currentAdmin.id === action.payload.id)) {
          state.currentAdmin = action.payload;
        }
        state.operationSuccess = "Sub admin updated successfully";
        state.error = null;
      })
      .addCase(updateSubAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Toggle Admin Status
      .addCase(toggleAdminStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleAdminStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.admins.findIndex(
          admin => admin._id === action.payload._id || admin.id === action.payload.id
        );
        if (index !== -1) {
          state.admins[index] = action.payload;
        }
        if (state.currentAdmin && 
            (state.currentAdmin._id === action.payload._id || state.currentAdmin.id === action.payload.id)) {
          state.currentAdmin = action.payload;
        }
        state.operationSuccess = `Admin ${action.payload.isActive ? 'activated' : 'deactivated'} successfully`;
        state.error = null;
      })
      .addCase(toggleAdminStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Admin Permissions
      .addCase(updateAdminPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdminPermissions.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.admins.findIndex(
          admin => admin._id === action.payload._id || admin.id === action.payload.id
        );
        if (index !== -1) {
          state.admins[index] = action.payload;
        }
        if (state.currentAdmin && 
            (state.currentAdmin._id === action.payload._id || state.currentAdmin.id === action.payload.id)) {
          state.currentAdmin = action.payload;
        }
        state.operationSuccess = "Admin permissions updated successfully";
        state.error = null;
      })
      .addCase(updateAdminPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Sub Admin
      .addCase(deleteSubAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = state.admins.filter(
          admin => admin._id !== action.payload.id && admin.id !== action.payload.id
        );
        if (state.currentAdmin && 
            (state.currentAdmin._id === action.payload.id || state.currentAdmin.id === action.payload.id)) {
          state.currentAdmin = null;
        }
        state.operationSuccess = action.payload.message;
        state.error = null;
      })
      .addCase(deleteSubAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Bulk Delete Admins
      .addCase(bulkDeleteAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bulkDeleteAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = state.admins.filter(
          admin => !action.payload.adminIds.includes(admin._id) && 
                   !action.payload.adminIds.includes(admin.id)
        );
        state.selectedAdmins = [];
        state.operationSuccess = action.payload.message;
        state.error = null;
      })
      .addCase(bulkDeleteAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Bulk Update Permissions
      .addCase(bulkUpdatePermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bulkUpdatePermissions.fulfilled, (state, action) => {
        state.loading = false;
        const { adminIds, permissions } = action.payload;
        state.admins = state.admins.map(admin => {
          if (adminIds.includes(admin._id) || adminIds.includes(admin.id)) {
            return { ...admin, permissions };
          }
          return admin;
        });
        state.selectedAdmins = [];
        state.operationSuccess = "Admin permissions updated successfully";
        state.error = null;
      })
      .addCase(bulkUpdatePermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearOperationSuccess,
  setSelectedAdmins,
  clearSelectedAdmins,
} = adminSubAdminManagementSlice.actions;

export default adminSubAdminManagementSlice.reducer;
