import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const getProductsByVehicle = createAsyncThunk(
  "product/getProductsByVehicle",
  async (vehicleParams, { rejectWithValue }) => {
    try {
      const { type, brand, modelLine, year, modification } = vehicleParams;
      if (!type || !brand || !modelLine || !year || !modification) {
        return rejectWithValue("All vehicle parameters are required");
      }
      const response = await axios.get(
        `${BASE_URL}/products/vehicle`,
        {
          params: {
            type,
            brand,
            modelLine,
            year,
            modification
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch products by vehicle");
    }
  }
);

// get all products 
export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/products/product/${id}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch products"
      )
    }
  }
)

export const getFullProductList = createAsyncThunk(
  "product/getFullProductList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/products/`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch products"
      )
    }
  }
)

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/products/${id}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch products"
      )
    }
  }
)

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    vehicleProducts: [], 
    product: null,
    loading: false,
    vehicleLoading: false, 
    error: null,
    vehicleError: null, 
  },
  reducers: {
   
    clearVehicleProducts: (state) => {
      state.vehicleProducts = [];
      state.vehicleError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Products by Vehicle
      .addCase(getProductsByVehicle.pending, (state) => {
        state.vehicleLoading = true;
        state.vehicleError = null;
      })
      .addCase(getProductsByVehicle.fulfilled, (state, action) => {
        state.vehicleLoading = false;
        state.vehicleProducts = action.payload;
      })
      .addCase(getProductsByVehicle.rejected, (state, action) => {
        state.vehicleLoading = false;
        state.vehicleError = action.payload;
      })
      
      // All Products
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Product by ID
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.product = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload; 
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Full Product List
      .addCase(getFullProductList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFullProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getFullProductList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },  
});

export const { clearVehicleProducts } = productSlice.actions;
export default productSlice.reducer;