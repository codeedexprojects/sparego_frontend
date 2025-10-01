// components/CarouselTable/CarouselModal.jsx
"use client";
import { useState, useEffect } from "react";

const CarouselModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  carousel,
  carouselType,
  products = []
}) => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    imagePreview: null,
    products: [],
    isActive: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (carousel) {
      setFormData({
        title: carousel.title || "",
        image: null,
        imagePreview: carousel.image || null,
        products: carousel.products || [],
        isActive: carousel.isActive !== undefined ? carousel.isActive : true
      });
    } else {
      setFormData({
        title: "",
        image: null,
        imagePreview: null,
        products: [],
        isActive: true
      });
    }
    setErrors({});
    setIsSubmitting(false);
  }, [carousel, carouselType, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === "checkbox") {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      const file = files[0];
      if (file) {
        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          setErrors(prev => ({ ...prev, image: "File size must be less than 5MB" }));
          return;
        }
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          setErrors(prev => ({ ...prev, image: "Please select an image file" }));
          return;
        }

        setFormData(prev => ({ 
          ...prev, 
          image: file,
          imagePreview: URL.createObjectURL(file)
        }));
        
        // Clear error if valid file is selected
        if (errors.image) {
          setErrors(prev => ({ ...prev, image: "" }));
        }
      }
    } else if (name === "products") {
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
      setFormData(prev => ({ ...prev, products: selectedOptions }));
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
    if (formData.title.length > 100) newErrors.title = "Title must be less than 100 characters";
    
    // Image validation - only require for new carousels or when editing without existing image
    if (!formData.image && !formData.imagePreview && carouselType !== "main") {
      if (!carousel || !carousel.image) {
        newErrors.image = "Image is required";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {carousel ? "Edit Carousel" : "Add New Carousel"}
            <span className="text-sm font-normal text-gray-500 ml-2">({carouselType})</span>
          </h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Enter carousel title"
              required
            />
            {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
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
            {errors.image && <p className="text-sm text-red-600 mt-1">{errors.image}</p>}
          </div>

          {products.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Link Products (optional)</label>
              <select
                name="products"
                multiple
                value={formData.products}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              >
                {products.map((p) => (
                  <option key={p.id || p._id} value={String(p.id || p._id)}>{p.name || p.title}</option>
                ))}
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

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              {carousel ? "Update" : "Add"} Carousel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarouselModal;