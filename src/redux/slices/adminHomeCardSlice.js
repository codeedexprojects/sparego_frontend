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
export const getHomeCards = createAsyncThunk(
  "adminHomeCard/getHomeCards",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/home-card/`);
      console.log("Home cards response:", response.data);
      const data = Array.isArray(response.data) ? response.data : 
      response.data?.homeCards || response.data?.data || [];
      return data;
    } catch (error) {
      console.error("Error fetching home cards:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to fetch home cards",
        status: error?.response?.status
      });
    }
  }
);

export const getHomeCardById = createAsyncThunk(
  "adminHomeCard/getHomeCardById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${BASE_URL}/home-card/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error fetching home card:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to fetch home card",
        status: error?.response?.status
      });
    }
  }
);

// POST Operations
export const createHomeCard = createAsyncThunk(
  "adminHomeCard/createHomeCard",
  async (homeCardData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const isFormData = homeCardData.image instanceof File;
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      if (isFormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
      }

      const dataToSend = isFormData ? createFormData(homeCardData) : homeCardData;
      
      const response = await axios.post(`${BASE_URL}/home-card/`, dataToSend, config);
      console.log("Create home card response:", response.data);
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error creating home card:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to create home card",
        status: error?.response?.status
      });
    }
  }
);

// PATCH Operations
export const updateHomeCard = createAsyncThunk(
  "adminHomeCard/updateHomeCard",
  async ({ id, homeCardData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const isFormData = homeCardData.image instanceof File;
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      if (isFormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
      }

      const dataToSend = isFormData ? createFormData(homeCardData) : homeCardData;
      
      const response = await axios.patch(`${BASE_URL}/home-card/${id}`, dataToSend, config);
      console.log("Update home card response:", response.data);
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error updating home card:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to update home card",
        status: error?.response?.status
      });
    }
  }
);

export const toggleHomeCardStatus = createAsyncThunk(
  "adminHomeCard/toggleHomeCardStatus",
  async ({ id, currentStatus }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.patch(`${BASE_URL}/home-card/${id}`, 
        { isActive: !currentStatus }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error toggling home card status:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to toggle home card status",
        status: error?.response?.status
      });
    }
  }
);

// DELETE Operations
export const deleteHomeCard = createAsyncThunk(
  "adminHomeCard/deleteHomeCard",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.delete(`${BASE_URL}/home-card/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Delete home card response:", response.data);
      return id; // Return the ID of the deleted home card
    } catch (error) {
      console.error("Error deleting home card:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to delete home card",
        status: error?.response?.status
      });
    }
  }
);

// Bulk Operations
export const bulkDeleteHomeCards = createAsyncThunk(
  "adminHomeCard/bulkDeleteHomeCards",
  async (homeCardIds, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.delete(`${BASE_URL}/home-card/bulk`, {
        data: { ids: homeCardIds },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return homeCardIds;
    } catch (error) {
      console.error("Error bulk deleting home cards:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to bulk delete home cards",
        status: error?.response?.status
      });
    }
  }
);

export const bulkUpdateHomeCardStatus = createAsyncThunk(
  "adminHomeCard/bulkUpdateHomeCardStatus",
  async ({ homeCardIds, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.patch(`${BASE_URL}/home-card/bulk/status`, 
        { ids: homeCardIds, isActive: status }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return { homeCardIds, status };
    } catch (error) {
      console.error("Error bulk updating home card status:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to bulk update home card status",
        status: error?.response?.status
      });
    }
  }
);

// Initial state
const initialState = {
  homeCards: [],
  currentHomeCard: null,
  loading: false,
  error: null,
  operationSuccess: null,
  selectedHomeCards: [],
};

// Slice
const adminHomeCardSlice = createSlice({
  name: "adminHomeCard",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearOperationSuccess: (state) => {
      state.operationSuccess = null;
    },
    setSelectedHomeCards: (state, action) => {
      state.selectedHomeCards = action.payload;
    },
    clearSelectedHomeCards: (state) => {
      state.selectedHomeCards = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Home Cards
      .addCase(getHomeCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHomeCards.fulfilled, (state, action) => {
        state.loading = false;
        state.homeCards = action.payload;
        state.error = null;
      })
      .addCase(getHomeCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Home Card By ID
      .addCase(getHomeCardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHomeCardById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentHomeCard = action.payload;
        state.error = null;
      })
      .addCase(getHomeCardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Home Card
      .addCase(createHomeCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHomeCard.fulfilled, (state, action) => {
        state.loading = false;
        state.homeCards.push(action.payload);
        state.operationSuccess = "Home card created successfully";
        state.error = null;
      })
      .addCase(createHomeCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Home Card
      .addCase(updateHomeCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHomeCard.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.homeCards.findIndex(
          card => card._id === action.payload._id || card.id === action.payload.id
        );
        if (index !== -1) {
          state.homeCards[index] = action.payload;
        }
        if (state.currentHomeCard && 
            (state.currentHomeCard._id === action.payload._id || state.currentHomeCard.id === action.payload.id)) {
          state.currentHomeCard = action.payload;
        }
        state.operationSuccess = "Home card updated successfully";
        state.error = null;
      })
      .addCase(updateHomeCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Toggle Home Card Status
      .addCase(toggleHomeCardStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleHomeCardStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.homeCards.findIndex(
          card => card._id === action.payload._id || card.id === action.payload.id
        );
        if (index !== -1) {
          state.homeCards[index] = action.payload;
        }
        if (state.currentHomeCard && 
            (state.currentHomeCard._id === action.payload._id || state.currentHomeCard.id === action.payload.id)) {
          state.currentHomeCard = action.payload;
        }
        state.operationSuccess = `Home card ${action.payload.isActive ? 'activated' : 'deactivated'} successfully`;
        state.error = null;
      })
      .addCase(toggleHomeCardStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Home Card
      .addCase(deleteHomeCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHomeCard.fulfilled, (state, action) => {
        state.loading = false;
        state.homeCards = state.homeCards.filter(
          card => card._id !== action.payload && card.id !== action.payload
        );
        state.operationSuccess = "Home card deleted successfully";
        state.error = null;
      })
      .addCase(deleteHomeCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Bulk Delete Home Cards
      .addCase(bulkDeleteHomeCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bulkDeleteHomeCards.fulfilled, (state, action) => {
        state.loading = false;
        state.homeCards = state.homeCards.filter(
          card => !action.payload.includes(card._id) && !action.payload.includes(card.id)
        );
        state.selectedHomeCards = [];
        state.operationSuccess = `${action.payload.length} home cards deleted successfully`;
        state.error = null;
      })
      .addCase(bulkDeleteHomeCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Bulk Update Home Card Status
      .addCase(bulkUpdateHomeCardStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bulkUpdateHomeCardStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { homeCardIds, status } = action.payload;
        state.homeCards = state.homeCards.map(card => {
          if (homeCardIds.includes(card._id) || homeCardIds.includes(card.id)) {
            return { ...card, isActive: status };
          }
          return card;
        });
        state.selectedHomeCards = [];
        state.operationSuccess = `${homeCardIds.length} home cards ${status ? 'activated' : 'deactivated'} successfully`;
        state.error = null;
      })
      .addCase(bulkUpdateHomeCardStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearOperationSuccess,
  setSelectedHomeCards,
  clearSelectedHomeCards,
} = adminHomeCardSlice.actions;

export default adminHomeCardSlice.reducer;
