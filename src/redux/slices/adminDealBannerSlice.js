import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// Helper function to create FormData for file uploads
const createFormData = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });
  return formData;
};

// GET Operations
export const getDealBanners = createAsyncThunk(
  "adminDealBanner/getDealBanners",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${BASE_URL}/deal-banner/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log("Deal banners response:", response.data);
      const data = Array.isArray(response.data) ? response.data : 
                   response.data?.banners || response.data?.data || [];
      return data;
    } catch (error) {
      console.error("Error fetching deal banners:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to fetch deal banners",
        status: error?.response?.status
      });
    }
  }
);

export const getDealBannerById = createAsyncThunk(
  "adminDealBanner/getDealBannerById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${BASE_URL}/deal-banner/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to fetch deal banner",
        status: error?.response?.status
      });
    }
  }
);

// CREATE Operation
export const createDealBanner = createAsyncThunk(
  "adminDealBanner/createDealBanner",
  async (dealBannerData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      
      // Check if image is a File object (for upload)
      const isFormData = dealBannerData.image instanceof File;
      const config = isFormData 
        ? { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } }
        : { headers: { Authorization: `Bearer ${token}` } };
      
      const dataToSend = isFormData ? createFormData(dealBannerData) : dealBannerData;
      
      const response = await axios.post(`${BASE_URL}/deal-banner/`, dataToSend, config);
      console.log("Create deal banner response:", response.data);
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error creating deal banner:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to create deal banner",
        status: error?.response?.status
      });
    }
  }
);

// UPDATE Operation
export const updateDealBanner = createAsyncThunk(
  "adminDealBanner/updateDealBanner",
  async ({ id, dealBannerData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      
      // Check if image is a File object (for upload)
      const isFormData = dealBannerData.image instanceof File;
      const config = isFormData 
        ? { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } }
        : { headers: { Authorization: `Bearer ${token}` } };
      
      const dataToSend = isFormData ? createFormData(dealBannerData) : dealBannerData;
      
      const response = await axios.patch(`${BASE_URL}/deal-banner/${id}`, dataToSend, config);
      console.log("Update deal banner response:", response.data);
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error updating deal banner:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to update deal banner",
        status: error?.response?.status
      });
    }
  }
);

// DELETE Operation
export const deleteDealBanner = createAsyncThunk(
  "adminDealBanner/deleteDealBanner",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.delete(`${BASE_URL}/deal-banner/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return { id, data: response.data };
    } catch (error) {
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to delete deal banner",
        status: error?.response?.status
      });
    }
  }
);

// GET Banners by Section and Page (Frontend Route)
export const getBannersBySectionAndPage = createAsyncThunk(
  "adminDealBanner/getBannersBySectionAndPage",
  async ({ section, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/deal-banner/${section}/${page}`);
      console.log("Banners by section/page response:", response.data);
      const data = Array.isArray(response.data) ? response.data : response.data?.data || [];
      return data;
    } catch (error) {
      console.error("Error fetching banners by section/page:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to fetch banners",
        status: error?.response?.status
      });
    }
  }
);

// TOGGLE STATUS Operation (using updateDealBanner)
export const toggleDealBannerStatus = createAsyncThunk(
  "adminDealBanner/toggleDealBannerStatus",
  async ({ id, currentStatus }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.patch(`${BASE_URL}/deal-banner/${id}`, {
        isActive: !currentStatus
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to toggle deal banner status",
        status: error?.response?.status
      });
    }
  }
);

const adminDealBannerSlice = createSlice({
  name: "adminDealBanner",
  initialState: {
    dealBanners: [],
    currentDealBanner: null,
    loading: false,
    error: null,
    operationSuccess: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearOperationSuccess: (state) => {
      state.operationSuccess = null;
    },
    setCurrentDealBanner: (state, action) => {
      state.currentDealBanner = action.payload;
    },
    clearCurrentDealBanner: (state) => {
      state.currentDealBanner = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Deal Banners
      .addCase(getDealBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDealBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.dealBanners = action.payload || [];
      })
      .addCase(getDealBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Deal Banner by ID
      .addCase(getDealBannerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDealBannerById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDealBanner = action.payload;
      })
      .addCase(getDealBannerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Deal Banner
      .addCase(createDealBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.operationSuccess = null;
      })
      .addCase(createDealBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.dealBanners.push(action.payload);
        state.operationSuccess = "Deal banner created successfully";
      })
      .addCase(createDealBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Deal Banner
      .addCase(updateDealBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.operationSuccess = null;
      })
      .addCase(updateDealBanner.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.dealBanners.findIndex(
          banner => banner._id === action.payload._id || banner.id === action.payload.id
        );
        if (index !== -1) {
          state.dealBanners[index] = action.payload;
        }
        state.operationSuccess = "Deal banner updated successfully";
      })
      .addCase(updateDealBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Deal Banner
      .addCase(deleteDealBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.operationSuccess = null;
      })
      .addCase(deleteDealBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.dealBanners = state.dealBanners.filter(
          banner => banner._id !== action.payload.id && banner.id !== action.payload.id
        );
        state.operationSuccess = "Deal banner deleted successfully";
      })
      .addCase(deleteDealBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Toggle Deal Banner Status
      .addCase(toggleDealBannerStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleDealBannerStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.dealBanners.findIndex(
          banner => banner._id === action.payload._id || banner.id === action.payload.id
        );
        if (index !== -1) {
          state.dealBanners[index] = action.payload;
        }
      })
      .addCase(toggleDealBannerStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Banners by Section and Page
      .addCase(getBannersBySectionAndPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBannersBySectionAndPage.fulfilled, (state, action) => {
        state.loading = false;
        // This could be stored in a separate state for frontend banners
        // For now, we'll just log it
        console.log("Frontend banners loaded:", action.payload);
      })
      .addCase(getBannersBySectionAndPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearError, 
  clearOperationSuccess, 
  setCurrentDealBanner, 
  clearCurrentDealBanner 
} = adminDealBannerSlice.actions;

export default adminDealBannerSlice.reducer;
