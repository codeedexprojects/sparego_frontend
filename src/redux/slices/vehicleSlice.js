import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// Get vehicle hierarchy based on selected filters
export const getVehicleHierarchy = createAsyncThunk(
  "vehicles/getVehicleHierarchy",
  async (filters, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      
      if (filters.brand) params.append('brand', filters.brand);
      if (filters.modelLine) params.append('modelLine', filters.modelLine);
      if (filters.year) params.append('year', filters.year);
      if (filters.modification) params.append('modification', filters.modification);
      
      const response = await axios.get(
        `${BASE_URL}/vehicles/hierarchy?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch vehicle hierarchy");
    }
  }
);

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState: {
    hierarchy: {
      types: [],
      brands: [],
      modelLines: [],
      years: [],
      modifications: []
    },
    loading: false,
    error: null,
    filters: {
      brand: '',
      modelLine: '',
      year: '',
      modification: ''
    }
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        brand: '',
        modelLine: '',
        year: '',
        modification: ''
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Vehicle Hierarchy
      .addCase(getVehicleHierarchy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVehicleHierarchy.fulfilled, (state, action) => {
        state.loading = false;
        state.hierarchy = action.payload;
      })
      .addCase(getVehicleHierarchy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;