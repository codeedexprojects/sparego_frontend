"use client";
import { IMG_URL } from "../../../../../redux/baseUrl";
import { useState, useEffect } from "react";

const HomeCardModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  homeCard 
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    imagePreview: null,
    buttonText: "Shop Now",
    isActive: true
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (homeCard) {
      setFormData({
        title: homeCard.title || "",
        description: homeCard.description || "",
        image: null,
        imagePreview: homeCard.image || null,
        buttonText: homeCard.buttonText || "Shop Now",
        isActive: homeCard.isActive !== undefined ? homeCard.isActive : true
      });
    } else {
      setFormData({
        title: "",
        description: "",
        image: null,
        imagePreview: null,
        buttonText: "Shop Now",
        isActive: true
      });
    }
    setErrors({});
  }, [homeCard, isOpen]);

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
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.image && !formData.imagePreview) newErrors.image = "Image is required";
    
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
            {homeCard ? "Edit Home Card" : "Add New Home Card"}
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
              placeholder="Enter card title"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Enter card description"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Button Text</label>
            <input
              type="text"
              name="buttonText"
              value={formData.buttonText}
              onChange={handleChange}
              placeholder="Enter button text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>


          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Image</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition">
                {formData.imagePreview ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <img 
                      src={`${IMG_URL}/${formData.imagePreview}`} 
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
              <span className="ml-2 text-gray-700">Active Card</span>
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
              {homeCard ? "Update" : "Add"} Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomeCardModal;