import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// Helper function to create form data
const createFormData = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });
  return formData;
};

// Get all main categories
export const getMainCategories = createAsyncThunk(
  "category/getAllMainCategories",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }
      
      
      console.log("=== GET MAIN CATEGORIES DEBUG ===");
      console.log("Token:", token ? "Present" : "Missing");
      console.log("API URL:", `${BASE_URL}/main-categories/`);

      const response = await axios.get(`${BASE_URL}/main-categories/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);
      console.log("Response data type:", typeof response.data);
      console.log("Response data keys:", Object.keys(response.data || {}));
      
      if (response.data && Array.isArray(response.data)) {
        console.log("Data is array, length:", response.data.length);
        if (response.data.length > 0) {
          console.log("First item:", response.data[0]);
          console.log("First item keys:", Object.keys(response.data[0]));
        }
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        console.log("Data is nested, length:", response.data.data.length);
        if (response.data.data.length > 0) {
          console.log("First item:", response.data.data[0]);
          console.log("First item keys:", Object.keys(response.data.data[0]));
        }
      }
      
      console.log("=================================");
      
      return response.data;
    } catch (error) {
      console.error("=== GET MAIN CATEGORIES ERROR ===");
      console.error("Error:", error);
      console.error("Error response:", error.response);
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
      console.error("=================================");
      
      return rejectWithValue(error.response?.data || "Failed to fetch main categories");
    }
  }
);

// Create main category
export const createMainCategory = createAsyncThunk(
  "category/createMainCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }

      const formData = createFormData(categoryData);
      const response = await axios.post(`${BASE_URL}/main-categories/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create main category");
    }
  }
);

// Update main category
export const updateMainCategory = createAsyncThunk(
  "category/updateMainCategory",
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }

      const formData = createFormData(categoryData);
      const response = await axios.put(`${BASE_URL}/main-categories/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update main category");
    }
  }
);

// Delete main category
export const deleteMainCategory = createAsyncThunk(
  "category/deleteMainCategory",
  async (id, { rejectWithValue }) => {
    try {
      console.log("=== DELETE MAIN CATEGORY DEBUG ===");
      console.log("Deleting main category with ID:", id);
      
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No admin token found");
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }

      const url = `${BASE_URL}/main-categories/${id}/`;
      console.log("Delete URL:", url);

      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log("Delete response:", response);
      console.log("Delete successful for ID:", id);
      console.log("================================");
      
      return id;
    } catch (error) {
      console.error("=== DELETE MAIN CATEGORY ERROR ===");
      console.error("Error:", error);
      console.error("Error response:", error.response);
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
      console.error("Error message:", error.message);
      console.error("==================================");
      
      // Enhanced error handling
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          "Failed to delete main category";
      
      return rejectWithValue({ 
        message: errorMessage, 
        status: error.response?.status,
        data: error.response?.data 
      });
    }
  }
);

// Get categories by main category ID
export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (mainCategoryId, { rejectWithValue }) => {
    try {
      console.log("=== GET CATEGORIES DEBUG ===");
      console.log("Main category ID:", mainCategoryId);
      console.log("Main category ID type:", typeof mainCategoryId);
      
      const token = localStorage.getItem("adminToken");
      console.log("Admin token exists:", !!token);
      if (!token) {
        console.error("No admin token found");
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }

      // Try different endpoint formats
      const endpoints = [
        `${BASE_URL}/categories/${mainCategoryId}/`,
        `${BASE_URL}/categories/?main_category=${mainCategoryId}`,
        `${BASE_URL}/categories/${mainCategoryId}`,
        `${BASE_URL}/category/${mainCategoryId}/`
      ];
      
      let response;
      let successfulEndpoint = null;
      
      for (const url of endpoints) {
        try {
          console.log("Trying endpoint:", url);
          response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          successfulEndpoint = url;
          console.log("Success with endpoint:", url);
          break;
        } catch (endpointError) {
          console.log("Failed with endpoint:", url, "Status:", endpointError.response?.status);
          if (endpointError.response?.status === 404) {
            continue; // Try next endpoint
          } else {
            throw endpointError; // Re-throw non-404 errors
          }
        }
      }
      
      if (!response) {
        throw new Error("All endpoints failed");
      }
      
      console.log("Successful endpoint:", successfulEndpoint);
      
      console.log("Categories response:", response);
      console.log("Categories response status:", response.status);
      console.log("Categories response data:", response.data);
      console.log("Categories response data type:", typeof response.data);
      console.log("Categories response data keys:", Object.keys(response.data || {}));
      
      if (response.data && Array.isArray(response.data)) {
        console.log("Categories is array, length:", response.data.length);
        if (response.data.length > 0) {
          console.log("First category:", response.data[0]);
          console.log("First category keys:", Object.keys(response.data[0]));
        }
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        console.log("Categories is nested, length:", response.data.data.length);
        if (response.data.data.length > 0) {
          console.log("First category:", response.data.data[0]);
          console.log("First category keys:", Object.keys(response.data.data[0]));
        }
      }
      
      console.log("=================================");
      
      return response.data;
    } catch (error) {
      console.error("=== GET CATEGORIES ERROR ===");
      console.error("Error:", error);
      console.error("Error response:", error.response);
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
      console.error("Error message:", error.message);
      console.error("=================================");
      
      return rejectWithValue(error.response?.data || "Failed to fetch categories");
    }
  }
);

// Create category (second level)
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async ({ mainCategoryId, categoryData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }

      const dataToSend = {
        ...categoryData,
        main_category: mainCategoryId
      };
      const formData = createFormData(dataToSend);
      const response = await axios.post(`${BASE_URL}/categories/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create category");
    }
  }
);

// Update category (second level)
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }

      const formData = createFormData(categoryData);
      const response = await axios.put(`${BASE_URL}/categories/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update category");
    }
  }
);

// Delete category (second level)
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      console.log("=== DELETE CATEGORY DEBUG ===");
      console.log("Deleting category with ID:", id);
      
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No admin token found");
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }

      const url = `${BASE_URL}/categories/${id}/`;
      console.log("Delete URL:", url);

      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log("Delete response:", response);
      console.log("Delete successful for ID:", id);
      console.log("=============================");
      
      return id;
    } catch (error) {
      console.error("=== DELETE CATEGORY ERROR ===");
      console.error("Error:", error);
      console.error("Error response:", error.response);
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
      console.error("Error message:", error.message);
      console.error("=============================");
      
      // Enhanced error handling
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          "Failed to delete category";
      
      return rejectWithValue({ 
        message: errorMessage, 
        status: error.response?.status,
        data: error.response?.data 
      });
    }
  }
);

// Get subcategories by category ID
export const getSubCategories = createAsyncThunk(
  "category/getSubCategories",
  async (categoryId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        return rejectWithValue({ message: "No admin token found", status: 401 });
      }

      const response = await axios.get(`${BASE_URL}/sub-categories/?category=${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch subcategories");
    }
  }
);

// Create subcategory (third level)
export const createSubCategory = createAsyncThunk(
  "category/createSubCategory",
  async ({ categoryId, categoryData }, { rejectWithValue }) => {
    try {
      const dataToSend = {
        ...categoryData,
        category: categoryId
      };
      const formData = createFormData(dataToSend);
      const response = await axios.post(`${BASE_URL}/sub-categories/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create subcategory");
    }
  }
);

// Update subcategory (third level)
export const updateSubCategory = createAsyncThunk(
  "category/updateSubCategory",
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      const formData = createFormData(categoryData);
      const response = await axios.put(`${BASE_URL}/sub-categories/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update subcategory");
    }
  }
);

// Delete subcategory (third level)
export const deleteSubCategory = createAsyncThunk(
  "category/deleteSubCategory",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/sub-categories/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete subcategory");
    }
  }
);

// Get sub-subcategories by subcategory ID
export const getSubSubCategories = createAsyncThunk(
  "category/getSubSubCategories",
  async (subCategoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/sub-sub-categories/?sub_category=${subCategoryId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch sub-subcategories");
    }
  }
);

// Create sub-subcategory (fourth level)
export const createSubSubCategory = createAsyncThunk(
  "category/createSubSubCategory",
  async ({ subCategoryId, categoryData }, { rejectWithValue }) => {
    try {
      const dataToSend = {
        ...categoryData,
        sub_category: subCategoryId
      };
      const formData = createFormData(dataToSend);
      const response = await axios.post(`${BASE_URL}/sub-sub-categories/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create sub-subcategory");
    }
  }
);

// Update sub-subcategory (fourth level)
export const updateSubSubCategory = createAsyncThunk(
  "category/updateSubSubCategory",
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      const formData = createFormData(categoryData);
      const response = await axios.put(`${BASE_URL}/sub-sub-categories/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update sub-subcategory");
    }
  }
);

// Delete sub-subcategory (fourth level)
export const deleteSubSubCategory = createAsyncThunk(
  "category/deleteSubSubCategory",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/sub-sub-categories/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete sub-subcategory");
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    mainCategories: [],
    categories: [], // Second level
    subCategories: [], // Third level
    subSubCategories: [], // Fourth level
    loading: false,
    error: null,
    success: false,
    successMessage: "",
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
      state.successMessage = "";
    },
    resetCategoryState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.successMessage = "";
      state.categories = [];
      state.subCategories = [];
      state.subSubCategories = [];
    },
    clearCategories: (state) => {
      state.categories = [];
    },
    clearSubCategories: (state) => {
      state.subCategories = [];
    },
    clearSubSubCategories: (state) => {
      state.subSubCategories = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Main Categories
      .addCase(getMainCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMainCategories.fulfilled, (state, action) => {
        console.log("=== GET MAIN CATEGORIES REDUCER DEBUG ===");
        console.log("Action payload:", action.payload);
        console.log("Action payload type:", typeof action.payload);
        console.log("Action payload keys:", Object.keys(action.payload || {}));
        
        // Handle different response structures
        let categories = action.payload;
        
        if (action.payload && action.payload.data && Array.isArray(action.payload.data)) {
          console.log("Using nested data structure");
          categories = action.payload.data;
        } else if (action.payload && action.payload.results && Array.isArray(action.payload.results)) {
          console.log("Using results structure");
          categories = action.payload.results;
        } else if (Array.isArray(action.payload)) {
          console.log("Using direct array structure");
          categories = action.payload;
        } else {
          console.log("Unknown structure, using payload as is");
          categories = action.payload;
        }
        
        console.log("Final categories:", categories);
        console.log("Final categories type:", typeof categories);
        console.log("Final categories length:", categories?.length);
        console.log("=========================================");
        
        state.loading = false;
        state.mainCategories = categories;
      })
      .addCase(getMainCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createMainCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createMainCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.mainCategories.push(action.payload);
        state.success = true;
        state.successMessage = "Main category created successfully";
      })
      .addCase(createMainCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateMainCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateMainCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.mainCategories.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          state.mainCategories[index] = action.payload;
        }
        state.success = true;
        state.successMessage = "Main category updated successfully";
      })
      .addCase(updateMainCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMainCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMainCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.mainCategories = state.mainCategories.filter(cat => cat.id !== action.payload);
        state.success = true;
        state.successMessage = "Main category deleted successfully";
      })
      .addCase(deleteMainCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Categories (second level)
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        console.log("=== GET CATEGORIES REDUCER DEBUG ===");
        console.log("Action payload:", action.payload);
        console.log("Action payload type:", typeof action.payload);
        console.log("Action payload keys:", Object.keys(action.payload || {}));
        
        // Handle different response structures
        let categories = action.payload;
        
        if (action.payload && action.payload.data && Array.isArray(action.payload.data)) {
          console.log("Using nested data structure");
          categories = action.payload.data;
        } else if (action.payload && action.payload.results && Array.isArray(action.payload.results)) {
          console.log("Using results structure");
          categories = action.payload.results;
        } else if (Array.isArray(action.payload)) {
          console.log("Using direct array structure");
          categories = action.payload;
        } else {
          console.log("Unknown structure, using payload as is");
          categories = action.payload;
        }
        
        console.log("Final categories:", categories);
        console.log("Final categories type:", typeof categories);
        console.log("Final categories length:", categories?.length);
        console.log("=====================================");
        
        state.loading = false;
        state.categories = categories;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
        state.success = true;
        state.successMessage = "Category created successfully";
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
        state.success = true;
        state.successMessage = "Category updated successfully";
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(cat => cat.id !== action.payload);
        state.success = true;
        state.successMessage = "Category deleted successfully";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Subcategories (third level)
      .addCase(getSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories = action.payload;
      })
      .addCase(getSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories.push(action.payload);
        state.success = true;
        state.successMessage = "Subcategory created successfully";
      })
      .addCase(createSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.subCategories.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          state.subCategories[index] = action.payload;
        }
        state.success = true;
        state.successMessage = "Subcategory updated successfully";
        state.success = true;
        state.successMessage = "Subcategory updated successfully";
      })
      .addCase(updateSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories = state.subCategories.filter(cat => cat.id !== action.payload);
        state.success = true;
        state.successMessage = "Subcategory deleted successfully";
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Sub-subcategories (fourth level)
      .addCase(getSubSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subSubCategories = action.payload;
      })
      .addCase(getSubSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSubSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createSubSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subSubCategories.push(action.payload);
        state.success = true;
        state.successMessage = "Sub-subcategory created successfully";
      })
      .addCase(createSubSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSubSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateSubSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.subSubCategories.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          state.subSubCategories[index] = action.payload;
        }
        state.success = true;
        state.successMessage = "Sub-subcategory updated successfully";
      })
      .addCase(updateSubSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSubSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subSubCategories = state.subSubCategories.filter(cat => cat.id !== action.payload);
        state.success = true;
        state.successMessage = "Sub-subcategory deleted successfully";
      })
      .addCase(deleteSubSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearError, 
  clearSuccess, 
  resetCategoryState, 
  clearCategories, 
  clearSubCategories, 
  clearSubSubCategories 
} = categorySlice.actions;
export default categorySlice.reducer;