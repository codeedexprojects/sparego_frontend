import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// Helper function to create FormData for file uploads
const createFormData = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (value === null || value === undefined) return;

    // Special handling for images: append as repeated field name for multer
    if (key === "images" && Array.isArray(value)) {
      value.forEach((item) => {
        if (item instanceof File) {
          formData.append("images", item);
        } else if (typeof item === "string") {
          // In case image URL strings are provided
          formData.append("images", item);
        }
      });
      return;
    }

    // If value is a File, append directly
    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    // Arrays/objects (e.g., compatibleVehicles, dimensions) → send as JSON string
    if (Array.isArray(value) || (typeof value === "object" && !(value instanceof Blob))) {
      formData.append(key, JSON.stringify(value));
      return;
    }

    // Primitives
    formData.append(key, value);
  });
  return formData;
};

// GET Operations
export const getProducts = createAsyncThunk(
  "adminProduct/getProducts",
  async ({ category, brand, search, status } = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const params = {};
      if (category) params.category = category;
      if (brand) params.brand = brand;
      if (search) params.search = search;
      if (status) params.status = status;
      
      const response = await axios.get(`${BASE_URL}/products/`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log("Products response:", response.data);
      const data = Array.isArray(response.data) ? response.data : 
                   response.data?.products || response.data?.data || [];
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to fetch products",
        status: error?.response?.status
      });
    }
  }
);

export const getProductById = createAsyncThunk(
  "adminProduct/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${BASE_URL}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to fetch product",
        status: error?.response?.status
      });
    }
  }
);

// CREATE Operation
export const createProduct = createAsyncThunk(
  "adminProduct/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      
      // Check if there are any File objects (for upload)
      const hasFiles = Object.values(productData).some(value => 
        value instanceof File || (Array.isArray(value) && value.some(item => item instanceof File))
      );
      
      const config = hasFiles 
        ? { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } }
        : { headers: { Authorization: `Bearer ${token}` } };
      
      const dataToSend = hasFiles ? createFormData(productData) : productData;
      
      const response = await axios.post(`${BASE_URL}/products/`, dataToSend, config);
      console.log("Create product response:", response.data);
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to create product",
        status: error?.response?.status
      });
    }
  }
);

// UPDATE Operation
export const updateProduct = createAsyncThunk(
  "adminProduct/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      
      if (!token) {
        return rejectWithValue({
          message: "No authentication token found",
          status: 401
        });
      }
      
      // Check if there are any File objects (for upload)
      const hasFiles = Object.values(productData).some(value => 
        value instanceof File || (Array.isArray(value) && value.some(item => item instanceof File))
      );
      
      console.log("Has files:", hasFiles);
      console.log("Product data keys:", Object.keys(productData));
      
      const config = hasFiles 
        ? { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } }
        : { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } };
      
      const dataToSend = hasFiles ? createFormData(productData) : productData;
      
      // Validate required fields
      if (!productData.name || !productData.section || !productData.mainCategory || !productData.productBrand) {
        return rejectWithValue({
          message: "Missing required fields: name, section, mainCategory, or productBrand",
          status: 400
        });
      }
      
      console.log("Sending data to API:", dataToSend);
      console.log("Request config:", config);
      console.log("Product ID:", id);
      console.log("BASE_URL:", BASE_URL);
      console.log("Full URL:", `${BASE_URL}/products/${id}`);
      console.log("Data type:", typeof dataToSend);
      console.log("Is FormData:", dataToSend instanceof FormData);
      
      // Try the request
      let response;
      try {
        response = await axios.patch(`${BASE_URL}/products/${id}`, dataToSend, config);
      } catch (firstError) {
        console.error("First attempt failed:", firstError);
        
        // If it's a 500 error and we're sending JSON, try as FormData
        if (firstError?.response?.status === 500 && !hasFiles) {
          console.log("Retrying with FormData...");
          const formDataConfig = { 
            headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } 
          };
          const formDataToSend = createFormData(productData);
          response = await axios.patch(`${BASE_URL}/products/${id}`, formDataToSend, formDataConfig);
        } else {
          throw firstError;
        }
      }
      console.log("Update product response:", response.data);
      console.log("Response headers:", response.headers);
      console.log("Response status:", response.status);
      
      // Check if response is valid JSON
      if (response.headers['content-type']?.includes('application/json')) {
        try {
          return response.data?.data || response.data;
        } catch (parseError) {
          console.error("JSON parsing error:", parseError);
          console.error("Raw response:", response.data);
          return rejectWithValue({
            message: "Invalid JSON response from server",
            status: response.status,
            details: { rawResponse: response.data, parseError: parseError.message }
          });
        }
      } else {
        console.warn("Non-JSON response received:", response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error updating product:", error);
      console.error("Error response:", error?.response?.data);
      console.error("Error status:", error?.response?.status);
      console.error("Error headers:", error?.response?.headers);
      
      // Handle different response types
      let errorMessage = "Failed to update product";
      let errorDetails = null;
      
      if (error?.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
          errorDetails = { rawResponse: error.response.data };
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
          errorDetails = error.response.data;
        } else {
          errorMessage = JSON.stringify(error.response.data);
          errorDetails = error.response.data;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return rejectWithValue({
        message: errorMessage,
        status: error?.response?.status,
        details: errorDetails
      });
    }
  }
);

// DELETE Operation
export const deleteProduct = createAsyncThunk(
  "adminProduct/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.delete(`${BASE_URL}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return { id, data: response.data };
    } catch (error) {
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to delete product",
        status: error?.response?.status
      });
    }
  }
);

// TOGGLE STATUS Operation
export const toggleProductStatus = createAsyncThunk(
  "adminProduct/toggleProductStatus",
  async ({ id, currentStatus }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.patch(`${BASE_URL}/products/${id}`, {
        isActive: !currentStatus
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to toggle product status",
        status: error?.response?.status
      });
    }
  }
);

// BULK OPERATIONS
export const bulkDeleteProducts = createAsyncThunk(
  "adminProduct/bulkDeleteProducts",
  async (productIds, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.delete(`${BASE_URL}/products/bulk`, {
        data: { ids: productIds },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to delete products",
        status: error?.response?.status
      });
    }
  }
);

export const bulkUpdateProductStatus = createAsyncThunk(
  "adminProduct/bulkUpdateProductStatus",
  async ({ productIds, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.patch(`${BASE_URL}/products/bulk/status`, {
        ids: productIds,
        status
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.response?.data?.message || error.message || "Failed to update product status",
        status: error?.response?.status
      });
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState: {
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
    operationSuccess: null,
    selectedProducts: [],
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearOperationSuccess: (state) => {
      state.operationSuccess = null;
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    setSelectedProducts: (state, action) => {
      state.selectedProducts = action.payload;
    },
    toggleProductSelection: (state, action) => {
      const productId = action.payload;
      const index = state.selectedProducts.indexOf(productId);
      if (index > -1) {
        state.selectedProducts.splice(index, 1);
      } else {
        state.selectedProducts.push(productId);
      }
    },
    clearSelectedProducts: (state) => {
      state.selectedProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload || [];
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Product by ID
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.operationSuccess = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.operationSuccess = "Product created successfully";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.operationSuccess = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          product => product._id === action.payload._id || product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.operationSuccess = "Product updated successfully";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.operationSuccess = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          product => product._id !== action.payload.id && product.id !== action.payload.id
        );
        state.operationSuccess = "Product deleted successfully";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Toggle Product Status
      .addCase(toggleProductStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleProductStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          product => product._id === action.payload._id || product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(toggleProductStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Bulk Delete Products
      .addCase(bulkDeleteProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.operationSuccess = null;
      })
      .addCase(bulkDeleteProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          product => !state.selectedProducts.includes(product._id || product.id)
        );
        state.selectedProducts = [];
        state.operationSuccess = "Products deleted successfully";
      })
      .addCase(bulkDeleteProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Bulk Update Product Status
      .addCase(bulkUpdateProductStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.operationSuccess = null;
      })
      .addCase(bulkUpdateProductStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProducts.forEach(productId => {
          const index = state.products.findIndex(
            product => (product._id || product.id) === productId
          );
          if (index !== -1) {
            state.products[index].isActive = action.payload.status;
          }
        });
        state.selectedProducts = [];
        state.operationSuccess = "Product status updated successfully";
      })
      .addCase(bulkUpdateProductStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearError, 
  clearOperationSuccess, 
  setCurrentProduct, 
  clearCurrentProduct,
  setSelectedProducts,
  toggleProductSelection,
  clearSelectedProducts
} = adminProductSlice.actions;

export default adminProductSlice.reducer;
