// components/CategoryPage.jsx
"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from '../../../components/admin/ProtectedRoute';
import { CategoryTabs } from "./components/CategoryTabs";
import { CategoryCard } from "./components/CategoryCards";
import { CategoryModal } from "./components/CategoryModal";
import { 
  getMainCategories,
  getCategories,
  getSubCategories,
  getSubSubCategories,
  createMainCategory,
  createCategory,
  createSubCategory,
  createSubSubCategory,
  updateMainCategory,
  updateCategory,
  updateSubCategory,
  updateSubSubCategory,
  deleteMainCategory,
  deleteCategory,
  deleteSubCategory,
  deleteSubSubCategory,
  clearError,
  clearSuccess,
  clearCategories,
  clearSubCategories,
  clearSubSubCategories
} from "../../../redux/slices/adminCategorySlices";

const CategoryPage = ({ 
  title = "Category Management", 
  description = "Manage your product categories and organization",
  tabs = [
    { id: "main", label: "Main Categories" },
    { id: "category", label: "Categories" },
    { id: "sub", label: "Sub Categories" },
    { id: "subSub", label: "Sub Sub Categories" },
  ]
}) => {
  const dispatch = useDispatch();
  const { 
    mainCategories, 
    categories, 
    subCategories, 
    subSubCategories, 
    loading, 
    error, 
    success, 
    successMessage 
  } = useSelector(state => state.adminCategory);

  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "main");
  
  // Debug activeTab changes
  useEffect(() => {
    console.log("=== ACTIVE TAB STATE DEBUG ===");
    console.log("Active tab changed to:", activeTab);
    console.log("Available tabs:", tabs);
    console.log("Tabs array:", tabs.map(t => t.id));
    console.log("=============================");
  }, [activeTab, tabs]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Load initial data on mount
  useEffect(() => {
    dispatch(getMainCategories());
  }, [dispatch]);

  // Debug main categories data structure
  useEffect(() => {
    console.log("=== MAIN CATEGORIES DATA DEBUG ===");
    console.log("Main categories:", mainCategories);
    console.log("Main categories type:", typeof mainCategories);
    console.log("Main categories length:", mainCategories?.length);
    if (mainCategories && mainCategories.length > 0) {
      console.log("First category:", mainCategories[0]);
      console.log("First category keys:", Object.keys(mainCategories[0]));
      console.log("First category _id:", mainCategories[0]._id);
      console.log("First category id:", mainCategories[0].id);
    }
    console.log("=================================");
  }, [mainCategories]);

  // Auto-select first main category when entering Category tab
  useEffect(() => {
    if (activeTab === "category" && !selectedMainCategory && (mainCategories || []).length > 0) {
      const first = mainCategories[0];
      handleMainCategorySelect(first);
    }
  }, [activeTab, selectedMainCategory, mainCategories]);

  // Auto-select first category when entering Sub tab (after main selected and categories loaded)
  useEffect(() => {
    if (activeTab === "sub" && selectedMainCategory && !selectedCategory && (categories || []).length > 0) {
      const firstCat = categories[0];
      handleCategorySelect(firstCat);
    }
  }, [activeTab, selectedMainCategory, selectedCategory, categories]);

  // Auto-select first subcategory when entering SubSub tab (after category selected and subcategories loaded)
  useEffect(() => {
    if (activeTab === "subSub" && selectedCategory && !selectedSubCategory && (subCategories || []).length > 0) {
      const firstSub = subCategories[0];
      handleSubCategorySelect(firstSub);
    }
  }, [activeTab, selectedCategory, selectedSubCategory, subCategories]);

  // Handle success/error messages
  useEffect(() => {
    if (success && successMessage) {
      showNotification(successMessage, "success");
      dispatch(clearSuccess());
    }
  }, [success, successMessage, dispatch]);

  useEffect(() => {
    if (error) {
      console.log("=== ERROR HANDLING DEBUG ===");
      console.log("Error object:", error);
      console.log("Error type:", typeof error);
      console.log("Error keys:", Object.keys(error || {}));
      
      // Extract error message safely
      let errorMessage = "An error occurred";
      
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && error.message) {
        errorMessage = error.message;
      } else if (error && error.error) {
        errorMessage = error.error;
      } else if (error && typeof error === 'object') {
        errorMessage = JSON.stringify(error);
      }
      
      console.log("Extracted error message:", errorMessage);
      console.log("===========================");
      
      showNotification(errorMessage, "error");
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Get current categories based on active tab
  const getCurrentCategories = () => {
    console.log("=== GET CURRENT CATEGORIES DEBUG ===");
    console.log("Active tab:", activeTab);
    console.log("Selected main category:", selectedMainCategory);
    console.log("Selected category:", selectedCategory);
    console.log("Selected sub category:", selectedSubCategory);
    
    let currentCategories = [];
    
    switch (activeTab) {
      case "main":
        currentCategories = mainCategories || [];
        console.log("Main categories:", currentCategories);
        break;
      case "category":
        // Filter categories by selected main category
        if (selectedMainCategory) {
          const mainCategoryId = selectedMainCategory._id || selectedMainCategory.id;
          console.log("Filtering categories by main category ID:", mainCategoryId);
          console.log("All categories:", categories);
          
          currentCategories = (categories || []).filter(cat => {
            const catMainCategoryId = cat.main_category || cat.mainCategory;
            console.log("Category:", cat.name, "Main category ID:", catMainCategoryId);
            return String(catMainCategoryId) === String(mainCategoryId);
          });
          
          console.log("Filtered categories:", currentCategories);
        } else {
          currentCategories = [];
          console.log("No main category selected, returning empty array");
        }
        break;
      case "sub":
        // Filter subcategories by selected category
        if (selectedCategory) {
          const categoryId = selectedCategory._id || selectedCategory.id;
          console.log("Filtering subcategories by category ID:", categoryId);
          console.log("All subcategories:", subCategories);
          
          currentCategories = (subCategories || []).filter(subCat => {
            const subCatCategoryId = subCat.category || subCat.categoryId;
            console.log("Subcategory:", subCat.name, "Category ID:", subCatCategoryId);
            return String(subCatCategoryId) === String(categoryId);
          });
          
          console.log("Filtered subcategories:", currentCategories);
        } else {
          currentCategories = [];
          console.log("No category selected, returning empty array");
        }
        break;
      case "subSub":
        // Filter sub-subcategories by selected subcategory
        if (selectedSubCategory) {
          const subCategoryId = selectedSubCategory._id || selectedSubCategory.id;
          console.log("Filtering sub-subcategories by subcategory ID:", subCategoryId);
          console.log("All sub-subcategories:", subSubCategories);
          
          currentCategories = (subSubCategories || []).filter(subSubCat => {
            const subSubCatSubCategoryId = subSubCat.sub_category || subSubCat.subCategoryId;
            console.log("Sub-subcategory:", subSubCat.name, "Subcategory ID:", subSubCatSubCategoryId);
            return String(subSubCatSubCategoryId) === String(subCategoryId);
          });
          
          console.log("Filtered sub-subcategories:", currentCategories);
        } else {
          currentCategories = [];
          console.log("No subcategory selected, returning empty array");
        }
        break;
      default:
        currentCategories = [];
        console.log("Unknown tab, returning empty array");
    }
    
    console.log("Final current categories:", currentCategories);
    console.log("=====================================");
    
    return currentCategories;
  };

  // Get parent information for a category
  const getParentInfo = (category) => {
    switch (activeTab) {
      case "category":
        return { label: "Main Category", value: category.main_category };
      case "sub":
        return { label: "Category", value: category.category };
      case "subSub":
        return { label: "Sub Category", value: category.sub_category };
      default:
        return null;
    }
  };

  // Find parent name by ID
  const getParentName = (parentId, parentType) => {
    console.log("=== GET PARENT NAME DEBUG ===");
    console.log("Parent ID:", parentId);
    console.log("Parent type:", parentType);
    
    switch (parentType) {
      case "main_category":
        const mainCat = mainCategories.find(cat => (cat._id || cat.id) === parentId);
        console.log("Found main category:", mainCat);
        console.log("Main category name:", mainCat?.name);
        return mainCat ? mainCat.name : `ID: ${parentId}`;
      case "category":
        const category = categories.find(cat => (cat._id || cat.id) === parentId);
        console.log("Found category:", category);
        console.log("Category name:", category?.name);
        return category ? category.name : `ID: ${parentId}`;
      case "sub_category":
        const subCategory = subCategories.find(cat => (cat._id || cat.id) === parentId);
        console.log("Found subcategory:", subCategory);
        console.log("Subcategory name:", subCategory?.name);
        return subCategory ? subCategory.name : `ID: ${parentId}`;
      default:
        return `ID: ${parentId}`;
    }
  };

  // Handle tab change
  const handleTabChange = (tabId) => {
    console.log("=== TAB CHANGE DEBUG ===");
    console.log("Switching from tab:", activeTab, "to tab:", tabId);
    
    setActiveTab(tabId);
    
    // Reset selections when changing tabs (but preserve relevant selections)
    if (tabId === "main") {
      // Going to main categories - clear all selections
      setSelectedMainCategory(null);
      setSelectedCategory(null);
      setSelectedSubCategory(null);
    } else if (tabId === "category") {
      // Going to categories - keep main category selection if exists
      setSelectedCategory(null);
      setSelectedSubCategory(null);
    } else if (tabId === "sub") {
      // Going to subcategories - keep main and category selections if exist
      setSelectedSubCategory(null);
    } else if (tabId === "subSub") {
      // Going to sub-subcategories - keep all previous selections
      // No need to clear anything
    }
    
    // Clear appropriate data when switching tabs
    if (tabId !== "category" && tabId !== "sub" && tabId !== "subSub") {
      dispatch(clearCategories());
    }
    if (tabId !== "sub" && tabId !== "subSub") {
      dispatch(clearSubCategories());
    }
    if (tabId !== "subSub") {
      dispatch(clearSubSubCategories());
    }
    
    console.log("Tab change completed");
    console.log("====================");
  };

  // Open modal for adding/editing
  const openModal = (category = null) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  // Handle form submission
  const handleSubmit = async (formData) => {
    try {
      if (editingCategory) {
        // Update existing category
        await handleEditCategory(editingCategory, formData);
        showNotification("Category updated successfully", "success");
      } else {
        // Create new category
        await handleAddCategory(formData);
        showNotification("Category created successfully", "success");
      }
      closeModal();
    } catch (error) {
      showNotification("Failed to save category: " + error.message, "error");
    }
  };

  // Add new category
  const handleAddCategory = async (formData) => {
    switch (activeTab) {
      case "main":
        await dispatch(createMainCategory(formData)).unwrap();
        break;
      case "category":
        if (selectedMainCategory) {
          await dispatch(createCategory({ 
            mainCategoryId: selectedMainCategory._id || selectedMainCategory.id, 
            categoryData: formData 
          })).unwrap();
        } else {
          throw new Error("Please select a main category first");
        }
        break;
      case "sub":
        if (selectedCategory) {
          await dispatch(createSubCategory({ 
            categoryId: selectedCategory._id || selectedCategory.id, 
            categoryData: formData 
          })).unwrap();
        } else {
          throw new Error("Please select a category first");
        }
        break;
      case "subSub":
        if (selectedSubCategory) {
          await dispatch(createSubSubCategory({ 
            subCategoryId: selectedSubCategory._id || selectedSubCategory.id, 
            categoryData: formData 
          })).unwrap();
        } else {
          throw new Error("Please select a subcategory first");
        }
        break;
    }
  };

  // Edit category
  const handleEditCategory = async (category, formData) => {
    // Extract the correct ID (handle both _id and id)
    const categoryId = category._id || category.id;
    
    if (!categoryId) {
      throw new Error("Invalid category ID");
    }
    
    console.log("Editing category with ID:", categoryId);
    console.log("Category object:", category);
    
    switch (activeTab) {
      case "main":
        await dispatch(updateMainCategory({ id: categoryId, categoryData: formData })).unwrap();
        break;
      case "category":
        await dispatch(updateCategory({ id: categoryId, categoryData: formData })).unwrap();
        break;
      case "sub":
        await dispatch(updateSubCategory({ id: categoryId, categoryData: formData })).unwrap();
        break;
      case "subSub":
        await dispatch(updateSubSubCategory({ id: categoryId, categoryData: formData })).unwrap();
        break;
    }
  };

  // Show delete confirmation
  const showDeleteConfirmation = (category) => {
    setCategoryToDelete(category);
    setShowDeleteConfirm(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (categoryToDelete) {
      try {
        // Extract the correct ID (handle both _id and id)
        const categoryId = categoryToDelete._id || categoryToDelete.id;
        
        if (!categoryId) {
          showNotification("Invalid category ID", "error");
          return;
        }
        
        console.log("Deleting category with ID:", categoryId);
        console.log("Category object:", categoryToDelete);
        
        switch (activeTab) {
          case "main":
            await dispatch(deleteMainCategory(categoryId)).unwrap();
            break;
          case "category":
            await dispatch(deleteCategory(categoryId)).unwrap();
            break;
          case "sub":
            await dispatch(deleteSubCategory(categoryId)).unwrap();
            break;
          case "subSub":
            await dispatch(deleteSubSubCategory(categoryId)).unwrap();
            break;
        }
        showNotification("Category deleted successfully", "success");
      } catch (error) {
        console.error("=== DELETE CATEGORY ERROR DEBUG ===");
        console.error("Raw error:", error);
        console.error("Error type:", typeof error);
        console.error("Error message:", error?.message);
        console.error("Error response:", error?.response);
        console.error("Error response data:", error?.response?.data);
        console.error("Error response status:", error?.response?.status);
        console.error("Error stack:", error?.stack);
        console.error("Error keys:", error ? Object.keys(error) : "No error object");
        console.error("===================================");
        
        // Extract error message with fallbacks
        let errorMessage = "Unknown error occurred";
        
        if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error?.response?.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error?.response?.data) {
          errorMessage = typeof error.response.data === 'string' 
            ? error.response.data 
            : JSON.stringify(error.response.data);
        } else if (error?.message) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
        
        showNotification("Failed to delete category: " + errorMessage, "error");
      }
    }
    setShowDeleteConfirm(false);
    setCategoryToDelete(null);
  };

  // Cancel delete
  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setCategoryToDelete(null);
  };

  // Load categories when main category is selected
  const handleMainCategorySelect = (mainCategory) => {
    const mainCategoryId = mainCategory._id || mainCategory.id;
    setSelectedMainCategory(mainCategory);
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    dispatch(clearCategories());
    dispatch(clearSubCategories());
    dispatch(clearSubSubCategories());
    dispatch(getCategories(mainCategoryId));
  };

  // Load subcategories when category is selected
  const handleCategorySelect = (category) => {
    const categoryId = category._id || category.id;
    setSelectedCategory(category);
    setSelectedSubCategory(null);
    dispatch(clearSubCategories());
    dispatch(clearSubSubCategories());
    dispatch(getSubCategories(categoryId));
  };

  // Load sub-sub categories when subcategory is selected
  const handleSubCategorySelect = (subCategory) => {
    const subCategoryId = subCategory._id || subCategory.id;
    setSelectedSubCategory(subCategory);
    dispatch(clearSubSubCategories());
    dispatch(getSubSubCategories(subCategoryId));
  };

  // Check if we can add a new category in the current tab
  const canAddCategory = () => {
    switch (activeTab) {
      case "main":
        return true;
      case "category":
        return !!selectedMainCategory;
      case "sub":
        return !!selectedCategory;
      case "subSub":
        return !!selectedSubCategory;
      default:
        return false;
    }
  };

  // Get breadcrumb path for display
  const getBreadcrumbPath = () => {
    const parts = [];
    if (selectedMainCategory) parts.push(selectedMainCategory.name);
    if (selectedCategory) parts.push(selectedCategory.name);
    if (selectedSubCategory) parts.push(selectedSubCategory.name);
    
    return parts.length > 0 ? `→ ${parts.join(" → ")}` : "";
  };

  return (
    <ProtectedRoute>
      <div className="bg-white shadow-lg rounded-xl p-6">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === "success" 
            ? "bg-green-100 border border-green-400 text-green-700" 
            : "bg-red-100 border border-red-400 text-red-700"
        }`}>
          {typeof notification.message === 'string' ? notification.message : String(notification.message || 'Unknown error')}
        </div>
      )}

      {/* Header with Title and Tabs */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-500">{description}</p>
      </div>

      {/* Reusable Tabs Component */}
      <CategoryTabs 
        tabs={tabs} 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
      />

      {/* Category Selectors for nested categories */}
      {(activeTab === "category" || activeTab === "sub" || activeTab === "subSub") && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          {activeTab === "category" && (
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Select Main Category:
              </label>
              <select
                value={String(selectedMainCategory?._id || selectedMainCategory?.id || "")}
                onChange={(e) => {
                  console.log("=== MAIN CATEGORY SELECTION DEBUG ===");
                  console.log("Selected value:", e.target.value);
                  console.log("Available main categories:", mainCategories);
                  console.log("Looking for category with ID:", e.target.value);
                  
                  const mainCat = mainCategories.find(cat => 
                    String(cat._id || cat.id) === e.target.value
                  );
                  
                  console.log("Found category:", mainCat);
                  console.log("=====================================");
                  
                  if (mainCat) {
                    handleMainCategorySelect(mainCat);
                  } else {
                    console.error("Category not found for ID:", e.target.value);
                  }
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a main category</option>
                {(mainCategories || []).map(cat => (
                  <option key={cat._id || cat.id} value={String(cat._id || cat.id)}>
                    {cat.name} (ID: {cat._id || cat.id})
                  </option>
                ))}
              </select>
            </div>
          )}

          {activeTab === "sub" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Select Main Category:
                </label>
                <select
                  value={String(selectedMainCategory?._id || selectedMainCategory?.id || "")}
                  onChange={(e) => {
                    console.log("=== SUB TAB MAIN CATEGORY SELECTION DEBUG ===");
                    console.log("Selected value:", e.target.value);
                    console.log("Available main categories:", mainCategories);
                    
                    const mainCat = mainCategories.find(cat => 
                      String(cat._id || cat.id) === e.target.value
                    );
                    
                    console.log("Found category:", mainCat);
                    console.log("=============================================");
                    
                    if (mainCat) {
                      handleMainCategorySelect(mainCat);
                    } else {
                      console.error("Category not found for ID:", e.target.value);
                    }
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose a main category</option>
                  {(mainCategories || []).map(cat => (
                    <option key={cat._id || cat.id} value={String(cat._id || cat.id)}>
                      {cat.name} (ID: {cat._id || cat.id})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Select Category:
                </label>
                <select
                  value={String(selectedCategory?._id || selectedCategory?.id || "")}
                  onChange={(e) => {
                    console.log("=== SUB TAB CATEGORY SELECTION DEBUG ===");
                    console.log("Selected value:", e.target.value);
                    console.log("Available categories:", categories);
                    
                    const category = categories.find(cat => 
                      String(cat._id || cat.id) === e.target.value
                    );
                    
                    console.log("Found category:", category);
                    console.log("=====================================");
                    
                    if (category) {
                      handleCategorySelect(category);
                    } else {
                      console.error("Category not found for ID:", e.target.value);
                    }
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled={!selectedMainCategory}
                >
                  <option value="">Choose a category</option>
                  {(categories || []).map(cat => (
                    <option key={cat._id || cat.id} value={String(cat._id || cat.id)}>
                      {cat.name} (ID: {cat._id || cat.id})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {activeTab === "subSub" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Select Main Category:
                </label>
                <select
                  value={String(selectedMainCategory?._id || selectedMainCategory?.id || "")}
                  onChange={(e) => {
                    console.log("=== SUB SUB TAB MAIN CATEGORY SELECTION DEBUG ===");
                    console.log("Selected value:", e.target.value);
                    console.log("Available main categories:", mainCategories);
                    
                    const mainCat = mainCategories.find(cat => 
                      String(cat._id || cat.id) === e.target.value
                    );
                    
                    console.log("Found category:", mainCat);
                    console.log("===============================================");
                    
                    if (mainCat) {
                      handleMainCategorySelect(mainCat);
                    } else {
                      console.error("Category not found for ID:", e.target.value);
                    }
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose a main category</option>
                  {(mainCategories || []).map(cat => (
                    <option key={cat._id || cat.id} value={String(cat._id || cat.id)}>
                      {cat.name} (ID: {cat._id || cat.id})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Select Category:
                </label>
                <select
                  value={String(selectedCategory?._id || selectedCategory?.id || "")}
                  onChange={(e) => {
                    console.log("=== SUB SUB TAB CATEGORY SELECTION DEBUG ===");
                    console.log("Selected value:", e.target.value);
                    console.log("Available categories:", categories);
                    
                    const category = categories.find(cat => 
                      String(cat._id || cat.id) === e.target.value
                    );
                    
                    console.log("Found category:", category);
                    console.log("=========================================");
                    
                    if (category) {
                      handleCategorySelect(category);
                    } else {
                      console.error("Category not found for ID:", e.target.value);
                    }
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled={!selectedMainCategory}
                >
                  <option value="">Choose a category</option>
                  {(categories || []).map(cat => (
                    <option key={cat._id || cat.id} value={String(cat._id || cat.id)}>
                      {cat.name} (ID: {cat._id || cat.id})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Select Subcategory:
                </label>
                <select
                  value={String(selectedSubCategory?._id || selectedSubCategory?.id || "")}
                  onChange={(e) => {
                    console.log("=== SUB SUB TAB SUBCATEGORY SELECTION DEBUG ===");
                    console.log("Selected value:", e.target.value);
                    console.log("Available subcategories:", subCategories);
                    
                    const subCat = subCategories.find(cat => 
                      String(cat._id || cat.id) === e.target.value
                    );
                    
                    console.log("Found subcategory:", subCat);
                    console.log("=============================================");
                    
                    if (subCat) {
                      handleSubCategorySelect(subCat);
                    } else {
                      console.error("Subcategory not found for ID:", e.target.value);
                    }
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled={!selectedCategory}
                >
                  <option value="">Choose a subcategory</option>
                  {(subCategories || []).map(cat => (
                    <option key={cat._id || cat.id} value={String(cat._id || cat.id)}>
                      {cat.name} (ID: {cat._id || cat.id})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {tabs.find((t) => t.id === activeTab)?.label}
            <span className="text-sm text-gray-500 ml-2">
              {getBreadcrumbPath()}
            </span>
          </h2>
          <button
            onClick={() => openModal()}
            disabled={loading || !canAddCategory()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            )}
            {loading ? 'Loading...' : 'Add New'}
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Category Cards Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(getCurrentCategories() || []).length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
                <p className="text-gray-500 mb-4">
                  {canAddCategory() 
                    ? "Get started by creating your first category." 
                    : "Please select a parent category first."}
                </p>
                {canAddCategory() && (
                  <button
                    onClick={() => openModal()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Category
                  </button>
                )}
              </div>
            ) : (
              (getCurrentCategories() || []).map((category, index) => {
                const parentInfo = getParentInfo(category);
                const parentType = activeTab === "category" ? "main_category" : 
                                  activeTab === "sub" ? "category" : "sub_category";
                
                return (
                  <CategoryCard
                    key={category.id ?? `${category.name || 'category'}-${index}`}
                    category={category}
                    onEdit={openModal}
                    onDelete={showDeleteConfirmation}
                    parentInfo={parentInfo}
                    parentName={parentInfo ? getParentName(parentInfo.value, parentType) : null}
                  />
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Category Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        mainCategories={mainCategories}
        categories={categories}
        subCategories={subCategories}
        category={editingCategory}
        activeTab={activeTab}
        showSectionField={activeTab === "main"}
        parentInfo={editingCategory ? getParentInfo(editingCategory) : null}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Confirm Delete
              </h3>
              <p className="text-gray-600">
                Are you sure you want to delete "{categoryToDelete?.name}"? This action cannot be undone.
              </p>
              {getParentInfo(categoryToDelete) && (
                <p className="text-gray-500 text-sm mt-2">
                  Parent: {getParentInfo(categoryToDelete).label}: {getParentInfo(categoryToDelete).value}
                </p>
              )}
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </ProtectedRoute>
  );
};

export default CategoryPage;