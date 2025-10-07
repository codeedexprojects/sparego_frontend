import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// GET Operations
export const getAllReviews = createAsyncThunk(
  "adminReview/getAllReviews",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${BASE_URL}/reviews/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Reviews response:", response.data);
      const data = Array.isArray(response.data) ? response.data : 
                   response.data?.reviews || response.data?.data || [];
      return data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to fetch reviews",
        status: error?.response?.status
      });
    }
  }
);

export const getReviewById = createAsyncThunk(
  "adminReview/getReviewById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${BASE_URL}/reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error fetching review:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to fetch review",
        status: error?.response?.status
      });
    }
  }
);

// POST Operations - UPDATED for FormData
export const createReview = createAsyncThunk(
  "adminReview/createReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      
      // Check if reviewData is FormData (for image upload) or regular object
      const isFormData = reviewData instanceof FormData;
      
      const headers = {
        Authorization: `Bearer ${token}`
      };
      
      // Only set Content-Type for JSON, FormData sets its own content type
      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }
      
      const response = await axios.post(`${BASE_URL}/reviews/`, reviewData, {
        headers: headers
      });
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error creating review:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to create review",
        status: error?.response?.status
      });
    }
  }
);

// PATCH Operations - UPDATED for FormData
export const updateReview = createAsyncThunk(
  "adminReview/updateReview",
  async ({ id, reviewData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      
      // Check if reviewData is FormData (for image upload) or regular object
      const isFormData = reviewData instanceof FormData;
      
      const headers = {
        Authorization: `Bearer ${token}`
      };
      
      // Only set Content-Type for JSON, FormData sets its own content type
      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }
      
      const response = await axios.patch(`${BASE_URL}/reviews/${id}`, reviewData, {
        headers: headers
      });
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error updating review:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to update review",
        status: error?.response?.status
      });
    }
  }
);

export const toggleReviewStatus = createAsyncThunk(
  "adminReview/toggleReviewStatus",
  async ({ id, currentStatus }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.patch(`${BASE_URL}/reviews/${id}`, 
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
      console.error("Error toggling review status:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to toggle review status",
        status: error?.response?.status
      });
    }
  }
);

// DELETE Operations
export const deleteReview = createAsyncThunk(
  "adminReview/deleteReview",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.delete(`${BASE_URL}/reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return { id, message: response.data?.message || "Review deleted successfully" };
    } catch (error) {
      console.error("Error deleting review:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to delete review",
        status: error?.response?.status
      });
    }
  }
);

// Bulk Operations
export const bulkDeleteReviews = createAsyncThunk(
  "adminReview/bulkDeleteReviews",
  async (reviewIds, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const deletePromises = reviewIds.map(id => 
        axios.delete(`${BASE_URL}/reviews/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      );
      await Promise.all(deletePromises);
      return { reviewIds, message: "Reviews deleted successfully" };
    } catch (error) {
      console.error("Error bulk deleting reviews:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to bulk delete reviews",
        status: error?.response?.status
      });
    }
  }
);

export const bulkToggleReviewStatus = createAsyncThunk(
  "adminReview/bulkToggleReviewStatus",
  async ({ reviewIds, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const updatePromises = reviewIds.map(id => 
        axios.patch(`${BASE_URL}/reviews/${id}`, 
          { isActive: status }, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        )
      );
      await Promise.all(updatePromises);
      return { reviewIds, status };
    } catch (error) {
      console.error("Error bulk toggling review status:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to bulk toggle review status",
        status: error?.response?.status
      });
    }
  }
);

// Initial state
const initialState = {
  reviews: [],
  currentReview: null,
  loading: false,
  error: null,
  operationSuccess: null,
  selectedReviews: [],
};

// Slice
const adminReviewSlice = createSlice({
  name: "adminReview",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearOperationSuccess: (state) => {
      state.operationSuccess = null;
    },
    setSelectedReviews: (state, action) => {
      state.selectedReviews = action.payload;
    },
    clearSelectedReviews: (state) => {
      state.selectedReviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Reviews
      .addCase(getAllReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
        state.error = null;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Review By ID
      .addCase(getReviewById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviewById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReview = action.payload;
        state.error = null;
      })
      .addCase(getReviewById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Review
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.unshift(action.payload);
        state.operationSuccess = "Review created successfully";
        state.error = null;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Review
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.reviews.findIndex(
          review => review._id === action.payload._id || review.id === action.payload.id
        );
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
        if (state.currentReview && 
            (state.currentReview._id === action.payload._id || state.currentReview.id === action.payload.id)) {
          state.currentReview = action.payload;
        }
        state.operationSuccess = "Review updated successfully";
        state.error = null;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Toggle Review Status
      .addCase(toggleReviewStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleReviewStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.reviews.findIndex(
          review => review._id === action.payload._id || review.id === action.payload.id
        );
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
        if (state.currentReview && 
            (state.currentReview._id === action.payload._id || state.currentReview.id === action.payload.id)) {
          state.currentReview = action.payload;
        }
        state.operationSuccess = `Review ${action.payload.isActive ? 'activated' : 'deactivated'} successfully`;
        state.error = null;
      })
      .addCase(toggleReviewStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Review
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = state.reviews.filter(
          review => review._id !== action.payload.id && review.id !== action.payload.id
        );
        if (state.currentReview && 
            (state.currentReview._id === action.payload.id || state.currentReview.id === action.payload.id)) {
          state.currentReview = null;
        }
        state.operationSuccess = action.payload.message;
        state.error = null;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Bulk Delete Reviews
      .addCase(bulkDeleteReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bulkDeleteReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = state.reviews.filter(
          review => !action.payload.reviewIds.includes(review._id) && 
                   !action.payload.reviewIds.includes(review.id)
        );
        state.selectedReviews = [];
        state.operationSuccess = action.payload.message;
        state.error = null;
      })
      .addCase(bulkDeleteReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Bulk Toggle Review Status
      .addCase(bulkToggleReviewStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bulkToggleReviewStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { reviewIds, status } = action.payload;
        state.reviews = state.reviews.map(review => {
          if (reviewIds.includes(review._id) || reviewIds.includes(review.id)) {
            return { ...review, isActive: status };
          }
          return review;
        });
        state.selectedReviews = [];
        state.operationSuccess = `Reviews ${status ? 'activated' : 'deactivated'} successfully`;
        state.error = null;
      })
      .addCase(bulkToggleReviewStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearOperationSuccess,
  setSelectedReviews,
  clearSelectedReviews,
} = adminReviewSlice.actions;

export default adminReviewSlice.reducer;