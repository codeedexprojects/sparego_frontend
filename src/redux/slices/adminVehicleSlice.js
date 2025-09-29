import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// VEHICLE TYPES: "Two-Wheeler" | "Four-Wheeler"

export const getVehicleBrands = createAsyncThunk(
  "adminVehicle/getVehicleBrands",
  async (vehicleType, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }

      const response = await axios.get(`${BASE_URL}/brands/vehicle/`, {
        params: vehicleType ? { type: vehicleType } : undefined,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return Array.isArray(response.data) ? response.data : (response.data?.data || []);
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message || "Failed to fetch vehicle brands");
    }
  }
);

export const getVehicles = createAsyncThunk(
  "adminVehicle/getVehicles",
  async ({ vehicleType, brandId } = {}, { rejectWithValue }) => {
    try {
      console.log("=== GET VEHICLES DEBUG ===");
      console.log("Vehicle type:", vehicleType);
      console.log("Brand ID:", brandId);
      
      const token = localStorage.getItem("adminToken");
      console.log("Admin token exists:", !!token);
      if (!token) {
        console.error("No admin token found");
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }

      const params = {};
      if (vehicleType) params.type = vehicleType;
      if (brandId) params.brand = brandId;
      
      console.log("API params:", params);
      console.log("Params object keys:", Object.keys(params));
      console.log("Params object values:", Object.values(params));
      console.log("Is params empty:", Object.keys(params).length === 0);
      const url = `${BASE_URL}/vehicles/`;
      console.log("API URL:", url);
      
      let response;
      try {
        // Try with current params first
        response = await axios.get(url, { 
          params,
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("First attempt successful");
      } catch (firstError) {
        console.log("First attempt failed, trying without params...");
        console.log("First error:", firstError.response?.status, firstError.response?.data);
        
        // If first attempt fails, try without any params
        if (firstError.response?.status === 400 || firstError.response?.status === 422) {
          try {
            response = await axios.get(url, { 
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            console.log("Second attempt (no params) successful");
          } catch (secondError) {
            console.log("Second attempt also failed");
            throw secondError;
          }
        } else {
          throw firstError;
        }
      }
      
      console.log("Vehicles response:", response);
      console.log("Vehicles response data:", response.data);
      console.log("Vehicles response status:", response.status);
      console.log("Response data type:", typeof response.data);
      console.log("Is array:", Array.isArray(response.data));
      console.log("Response data keys:", response.data ? Object.keys(response.data) : "No keys");
      console.log("Response data.data:", response.data?.data);
      console.log("Response data.data type:", typeof response.data?.data);
      console.log("Response data.data is array:", Array.isArray(response.data?.data));
      console.log("==========================");
      
      const vehicles = Array.isArray(response.data) ? response.data : (response.data?.data || []);
      console.log("Final vehicles array:", vehicles);
      console.log("Final vehicles length:", vehicles.length);
      console.log("First vehicle:", vehicles[0]);
      
      return vehicles;
    } catch (error) {
      console.error("=== GET VEHICLES ERROR ===");
      console.error("Error:", error);
      console.error("Error response:", error.response);
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
      console.error("==========================");
      
      return rejectWithValue(error?.response?.data?.message || error?.message || "Failed to fetch vehicles");
    }
  }
);

export const createVehicle = createAsyncThunk(
  "adminVehicle/createVehicle",
  async (vehicleData, { rejectWithValue }) => {
    try {
      console.log("=== CREATE VEHICLE DEBUG ===");
      console.log("Vehicle data:", vehicleData);
      
      const token = localStorage.getItem("adminToken");
      console.log("Admin token exists:", !!token);
      if (!token) {
        console.error("No admin token found");
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }

      // Map frontend field names to API field names
      const apiData = {
        ...vehicleData,
        modelLine: vehicleData.model, // Map 'model' to 'modelLine'
      };
      
      // Remove the 'model' field if it exists to avoid confusion
      if (apiData.model) {
        delete apiData.model;
      }
      
      console.log("API data:", apiData);
      const url = `${BASE_URL}/vehicles/`;
      console.log("API URL:", url);

      const response = await axios.post(url, apiData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log("Create vehicle response:", response);
      console.log("Create vehicle response data:", response.data);
      console.log("Create vehicle response status:", response.status);
      console.log("=============================");
      
      return response.data?.data || response.data;
    } catch (error) {
      console.error("=== CREATE VEHICLE ERROR ===");
      console.error("Error:", error);
      console.error("Error response:", error.response);
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
      console.error("=============================");
      
      return rejectWithValue(error?.response?.data?.message || error?.message || "Failed to create vehicle");
    }
  }
);

export const updateVehicle = createAsyncThunk(
  "adminVehicle/updateVehicle",
  async ({ id, vehicleData }, { rejectWithValue }) => {
    try {
      console.log("=== UPDATE VEHICLE DEBUG ===");
      console.log("Vehicle ID:", id);
      console.log("Vehicle data:", vehicleData);
      
      const token = localStorage.getItem("adminToken");
      console.log("Admin token exists:", !!token);
      if (!token) {
        console.error("No admin token found");
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }

      // Map frontend field names to API field names
      const apiData = {
        ...vehicleData,
        modelLine: vehicleData.model, // Map 'model' to 'modelLine'
      };
      
      // Remove the 'model' field if it exists to avoid confusion
      if (apiData.model) {
        delete apiData.model;
      }
      
      console.log("API data:", apiData);
      
      let response;
      try {
        // Try PATCH first (most common pattern)
        const url = `${BASE_URL}/vehicles/${id}/`;
        console.log("API URL (PATCH):", url);
        
        response = await axios.patch(url, apiData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("PATCH successful");
      } catch (patchError) {
        console.log("PATCH failed, trying PUT...");
        console.log("PATCH error:", patchError.response?.status, patchError.response?.data);
        
        try {
          // Try PUT as fallback
          const url = `${BASE_URL}/vehicles/${id}/`;
          console.log("API URL (PUT):", url);
          
          response = await axios.put(url, apiData, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log("PUT successful");
        } catch (putError) {
          console.log("PUT failed, trying singular endpoint...");
          console.log("PUT error:", putError.response?.status, putError.response?.data);
          
          try {
            // Try singular endpoint
            const url = `${BASE_URL}/vehicle/${id}/`;
            console.log("API URL (singular PATCH):", url);
            
            response = await axios.patch(url, apiData, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            console.log("Singular PATCH successful");
          } catch (singularError) {
            console.log("All attempts failed");
            throw singularError;
          }
        }
      }
      
      console.log("Update vehicle response:", response);
      console.log("Update vehicle response data:", response.data);
      console.log("Update vehicle response status:", response.status);
      console.log("=============================");
      
      return response.data?.data || response.data;
    } catch (error) {
      console.error("=== UPDATE VEHICLE ERROR ===");
      console.error("Error:", error);
      console.error("Error response:", error.response);
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
      console.error("=============================");
      
      return rejectWithValue(error?.response?.data?.message || error?.message || "Failed to update vehicle");
    }
  }
);

export const deleteVehicle = createAsyncThunk(
  "adminVehicle/deleteVehicle",
  async (id, { rejectWithValue }) => {
    try {
      console.log("=== DELETE VEHICLE DEBUG ===");
      console.log("Vehicle ID:", id);
      
      const token = localStorage.getItem("adminToken");
      console.log("Admin token exists:", !!token);
      if (!token) {
        console.error("No admin token found");
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }

      let response;
      try {
        // Try plural endpoint first
        const url = `${BASE_URL}/vehicles/${id}/`;
        console.log("API URL (DELETE):", url);
        
        response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("DELETE successful");
      } catch (deleteError) {
        console.log("DELETE failed, trying singular endpoint...");
        console.log("DELETE error:", deleteError.response?.status, deleteError.response?.data);
        
        try {
          // Try singular endpoint
          const url = `${BASE_URL}/vehicle/${id}/`;
          console.log("API URL (singular DELETE):", url);
          
          response = await axios.delete(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log("Singular DELETE successful");
        } catch (singularError) {
          console.log("All DELETE attempts failed");
          throw singularError;
        }
      }
      
      console.log("Delete vehicle response:", response);
      console.log("=============================");
      
      return id;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message || "Failed to delete vehicle");
    }
  }
);

const initialState = {
  brands: [],
  vehicles: [],
  loading: false,
  error: null,
  success: false,
  successMessage: null,
};

const adminVehicleSlice = createSlice({
  name: "adminVehicle",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
      state.successMessage = null;
    },
    resetAdminVehicleState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVehicleBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVehicleBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload || [];
      })
      .addCase(getVehicleBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload || [];
      })
      .addCase(getVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVehicle.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.vehicles.push(action.payload);
        state.success = true;
        state.successMessage = 'Vehicle created successfully';
      })
      .addCase(createVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        if (!updated || !updated.id) return;
        const index = state.vehicles.findIndex(v => v.id === updated.id);
        if (index !== -1) state.vehicles[index] = updated;
        state.success = true;
        state.successMessage = 'Vehicle updated successfully';
      })
      .addCase(updateVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = state.vehicles.filter(v => v.id !== action.payload);
        state.success = true;
        state.successMessage = 'Vehicle deleted successfully';
      })
      .addCase(deleteVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess, resetAdminVehicleState } = adminVehicleSlice.actions;
export default adminVehicleSlice.reducer;


