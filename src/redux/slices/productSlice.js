import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// Products by Vehicle
export const getProductsByVehicle = createAsyncThunk(
  "product/getProductsByVehicle",
  async (vehicleParams, { rejectWithValue }) => {
    try {
      const { type, brand, modelLine, year, modification } = vehicleParams;
      if (!type || !brand || !modelLine || !year || !modification) {
        return rejectWithValue("All vehicle parameters are required");
      }
      const response = await axios.get(`${BASE_URL}/products/vehicle`, {
        params: { type,  productBrand: brand, modelLine, year, modification },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch products by vehicle"
      );
    }
  }
);

// All Products
export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/category/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch products"
      );
    }
  }
);

// Full Product List
export const getFullProductList = createAsyncThunk(
  "product/getFullProductList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch products"
      );
    }
  }
);

// Product by ID
export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch product");
    }
  }
);

// Search Products
export const searchProducts = createAsyncThunk(
  "product/searchproducts",
  async ({ search }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/all`, {
        params: { search: search || "" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to search product"
      );
    }
  }
);

export const searchProductsBySection = createAsyncThunk(
  "product/searchProductsBySection",
  async ({ search, sectionId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/all`, {
        params: {
                    sectionId: sectionId || "", 

          search: search || "",
        },
      });
      return response.data.products; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to search product"
      );
    }
  }
);

// Similar Products
export const getSimilarProducts = createAsyncThunk(
  "product/getSimilarProducts",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/products/similar-products/${id}`
      );
      return response.data?.products;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch products"
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    vehicleProducts: [],
    similarProducts: [],
    searchResults:[],

    product: null,

    // loading & error states
    loading: false,
    error: null,

    vehicleLoading: false,
    vehicleError: null,

    similarLoading: false,
    similarError: null,
  },
  reducers: {
    clearVehicleProducts: (state) => {
      state.vehicleProducts = [];
      state.vehicleError = null;
    },
    clearSimilarProducts: (state) => {
      state.similarProducts = [];
      state.similarError = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.error = null;
    },
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

      // Search
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.products || [];
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      })

      // SearchById

      .addCase(searchProductsBySection.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProductsBySection.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload; 
      })
      .addCase(searchProductsBySection.rejected, (state, action) => {
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
      })

      // Similar Products
      .addCase(getSimilarProducts.pending, (state) => {
        state.similarLoading = true;
        state.similarError = null;
      })
      .addCase(getSimilarProducts.fulfilled, (state, action) => {
        state.similarLoading = false;
        state.similarProducts = action.payload;
      })
      .addCase(getSimilarProducts.rejected, (state, action) => {
        state.similarLoading = false;
        state.similarError = action.payload;
      });
  },
});

export const { clearVehicleProducts, clearSimilarProducts } =
  productSlice.actions;
export default productSlice.reducer;
