// components/DealBannerTable/DealBannerModal.jsx
"use client";
import { useState, useEffect } from "react";

const DealBannerModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  dealBanner 
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discountText: "",
    image: null,
    imagePreview: null,
    section: "watches",
    page: "home",
    isActive: true
  });

  const [errors, setErrors] = useState({});

  // Section options
  const sectionOptions = [
    { value: "watches", label: "Watches" },
    { value: "spare-parts", label: "Spare Parts" },
    { value: "home-appliances", label: "Home Appliances" }
  ];

  // Page options
  const pageOptions = [
    { value: "home", label: "Home" },
    { value: "category", label: "Category" },
    { value: "sub-category", label: "Sub Category" },
    { value: "sub-sub-category", label: "Sub Sub Category" },
    { value: "product", label: "Product" },
    { value: "product-detail", label: "Product Detail" },
    { value: "wishlist", label: "Wishlist" },
    { value: "brand", label: "Brand" }
  ];

  useEffect(() => {
    if (dealBanner) {
      setFormData({
        title: dealBanner.title || "",
        description: dealBanner.description || "",
        discountText: dealBanner.discountText || "",
        image: null,
        imagePreview: dealBanner.image || null,
        section: dealBanner.section || "watches",
        page: dealBanner.page || "home",
        isActive: dealBanner.isActive !== undefined ? dealBanner.isActive : true
      });
    } else {
      setFormData({
        title: "",
        description: "",
        discountText: "",
        image: null,
        imagePreview: null,
        section: "watches",
        page: "home",
        isActive: true
      });
    }
    setErrors({});
  }, [dealBanner, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === "checkbox") {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      const file = files[0];
      if (file) {
        setFormData(prev => ({ 
          ...prev, 
          image: file,
          imagePreview: URL.createObjectURL(file)
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.image && !formData.imagePreview) newErrors.image = "Image is required";
    if (!formData.section) newErrors.section = "Section is required";
    if (!formData.page) newErrors.page = "Page is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {dealBanner ? "Edit Deal Banner" : "Add New Deal Banner"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter banner title"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Description (Optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={2}
              placeholder="Enter banner description"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Discount Text (Optional)</label>
            <input
              type="text"
              name="discountText"
              value={formData.discountText}
              onChange={handleChange}
              placeholder="e.g., 50% OFF, Free Shipping, etc."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Section</label>
              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                  errors.section ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              >
                {sectionOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.section && <p className="mt-1 text-sm text-red-600">{errors.section}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Page</label>
              <select
                name="page"
                value={formData.page}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                  errors.page ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              >
                {pageOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.page && <p className="mt-1 text-sm text-red-600">{errors.page}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Image</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition">
                {formData.imagePreview ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <img 
                      src={formData.imagePreview} 
                      alt="Preview" 
                      className="h-full w-full object-contain p-2"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </div>
                )}
                <input 
                  type="file" 
                  name="image" 
                  accept="image/*" 
                  onChange={handleChange} 
                  className="hidden" 
                />
              </label>
            </div>
            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
          </div>

          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-700">Active Banner</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {dealBanner ? "Update" : "Add"} Banner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DealBannerModal;