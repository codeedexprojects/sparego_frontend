import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

// Fetch all sections
export const fetchSections = createAsyncThunk(
  "sections/fetchSections",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/sections`, getAuthHeaders());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Add section
export const addSection = createAsyncThunk(
  "sections/addSection",
  async (sectionData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/sections`,
        sectionData,
        getAuthHeaders()
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Edit section
export const editSection = createAsyncThunk(
  "sections/editSection",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/sections/${id}`,
        data,
        getAuthHeaders()
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete section
export const deleteSection = createAsyncThunk(
  "sections/deleteSection",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/sections/${id}`, getAuthHeaders());
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const sectionSlice = createSlice({
  name: "sections",
  initialState: {
    sections: [],
    count: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch sections
      .addCase(fetchSections.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload.sections || [];
        state.count = action.payload.count || 0;
        state.error = null;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add section
      .addCase(addSection.fulfilled, (state, action) => {
        state.sections.push(action.payload);
        state.count += 1;
      })

      // Edit section
      .addCase(editSection.fulfilled, (state, action) => {
        const index = state.sections.findIndex(
          (s) => s._id === action.payload._id
        );
        if (index !== -1) {
          state.sections[index] = action.payload;
        }
      })

      // Delete section
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.sections = state.sections.filter((s) => s._id !== action.payload);
        state.count -= 1;
      });
  },
});

export default sectionSlice.reducer;
