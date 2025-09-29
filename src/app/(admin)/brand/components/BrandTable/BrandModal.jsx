"use client";
import { useState, useEffect } from "react";

const BrandModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  brand,
  brandType = "vehicle" 
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
    image: null,
    imagePreview: null,
    // Additional fields based on brand type
    ...(brandType === "vehicle" && { vehicleType: "Two-wheeler" }),
    ...(brandType === "product" && { section: "Spare Parts" })
  });

  useEffect(() => {
    if (brand) {
      setFormData({
        name: brand.name || "",
        description: brand.description || "",
        isActive: brand.isActive !== undefined ? brand.isActive : true,
        image: null,
        imagePreview: brand.image || brand.logo || null,
        // Additional fields
        ...(brandType === "vehicle" && { vehicleType: brand.vehicleType || "Two-wheeler" }),
        ...(brandType === "product" && { section: brand.section || "Spare Parts" })
      });
    } else {
      setFormData({
        name: "",
        description: "",
        isActive: true,
        image: null,
        imagePreview: null,
        ...(brandType === "vehicle" && { vehicleType: "Two-wheeler" }),
        ...(brandType === "product" && { section: "Spare Parts" })
      });
    }
  }, [brand, brandType, isOpen]);

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {brand ? "Edit Brand" : "Add New Brand"} ({brandType})
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
            <label className="block text-sm font-medium mb-2 text-gray-700">Brand Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Vehicle Type Selector for Vehicle Brands */}
          {brandType === "vehicle" && (
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Vehicle Type</label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              >
                <option value="Two-wheeler">Two-wheeler</option>
                <option value="Four-wheeler">Four-wheeler</option>
              </select>
            </div>
          )}

          {/* Section Selector for Product Brands */}
          {brandType === "product" && (
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Product Section</label>
              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              >
                <option value="Spare Parts">Spare Parts</option>
                <option value="Watches">Watches</option>
                <option value="Home Appliances">Home Appliances</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Status</label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-700">Active</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Brand Logo</label>
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
              {brand ? "Update" : "Add"} Brand
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BrandModal;