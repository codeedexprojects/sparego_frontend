// components/CategoryModal.jsx
"use client";
import { useState, useEffect } from "react";

export const CategoryModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  category, 
  activeTab,
  showSectionField = true,
  mainCategories = [], // For main category selection
  categories = [],     // For category selection (when creating sub-categories)
  subCategories = []   // For sub-category selection (when creating sub-sub-categories)
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    section: "",
    type: "",
    mainCategory: "", // For categories
    category: "",     // For sub-categories  
    subCategory: "",  // For sub-sub-categories
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        section: category.section || "",
        type: category.type || "",
        mainCategory: category.mainCategory || category.main_category || "", // Handle both formats
        category: category.category || category.categoryId || "", // Handle both formats
        subCategory: category.subCategory || category.sub_category || "", // Handle both formats
        image: category.image || null
      });
      
      // Set image preview if category has an image
      if (category.image) {
        setImagePreview(`${IMG_URL}${category.image}`);
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData({
        name: "",
        description: "",
        section: "",
        type: "",
        mainCategory: "",
        category: "",
        subCategory: "",
        image: null
      });
      setImagePreview(null);
    }
  }, [category, isOpen]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      
      // Create preview for newly selected image
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clean up form data - remove empty fields
    const cleanedFormData = { ...formData };
    
    // Remove empty optional fields
    if (!cleanedFormData.type || cleanedFormData.type === "") {
      delete cleanedFormData.type;
    }
    
    // Remove parent reference fields that aren't needed for the current tab
    if (activeTab === "main") {
      delete cleanedFormData.mainCategory;
      delete cleanedFormData.category;
      delete cleanedFormData.subCategory;
    } else if (activeTab === "category") {
      delete cleanedFormData.category;
      delete cleanedFormData.subCategory;
    } else if (activeTab === "sub") {
      delete cleanedFormData.subCategory;
    }
    
    onSubmit(cleanedFormData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg my-8">
        <div className="flex justify-between items-center mb-6 pb-3 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {category ? "Edit Category" : "Add New Category"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 py-2">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
              placeholder="Enter category name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter category description"
            />
          </div>
          
          {/* Parent Reference Fields - Conditionally Rendered */}
          
          {/* For Categories: Show Main Category selection */}
          {activeTab === "category" && (
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Main Category</label>
              <select
                name="mainCategory"
                value={formData.mainCategory}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                required
              >
                <option value="">Select Main Category</option>
                {mainCategories.map((mainCat) => (
                  <option key={mainCat._id || mainCat.id} value={mainCat._id || mainCat.id}>
                    {mainCat.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {/* For Sub-Categories: Show Category selection */}
          {activeTab === "sub" && (
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id || cat.id} value={cat._id || cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {/* For Sub-Sub-Categories: Show Sub-Category selection */}
          {activeTab === "subSub" && (
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Sub Category</label>
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                required
              >
                <option value="">Select Sub Category</option>
                {subCategories.map((subCat) => (
                  <option key={subCat._id || subCat.id} value={subCat._id || subCat.id}>
                    {subCat.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Type <span className="text-gray-400 text-sm">(Optional)</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
            >
              <option value="">Select Type (Optional)</option>
              <option value="Two-wheeler">Two-wheeler</option>
              <option value="Four-wheeler">Four-wheeler</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
              <option value="General">General</option>
            </select>
          </div>

          {showSectionField && (
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Section</label>
              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                required
              >
                <option value="">Select Section</option>
                <option value="Home-Appliance">Home Appliance</option>
                <option value="Spare-Parts">Spare Parts</option>
                <option value="Watches">Watches</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Image</label>
            
            {/* Image Preview */}
            {imagePreview && (
              <div className="mb-4 flex justify-center">
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="h-32 w-32 object-cover rounded-lg border border-gray-300 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData(prev => ({ ...prev, image: null }));
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
            
            {/* File Upload */}
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs text-gray-500 text-center">
                    <span className="font-medium text-blue-600">Upload an image</span><br />
                    PNG, JPG up to 5MB
                  </p>
                </div>
                <input 
                  type="file" 
                  name="image" 
                  accept="image/*" 
                  onChange={handleChange} 
                  className="hidden" 
                />
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
            >
              {category ? "Update" : "Add"} Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const IMG_URL = "https://res.cloudinary.com/dgll2kfzv/image/upload/";