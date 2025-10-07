"use client";
import { IMG_URL } from "@/redux/baseUrl";
import { useState, useEffect } from "react";

const ReviewModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  review 
}) => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    name: "",
    designation: "",
    isActive: true,
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (review) {
      setFormData({
        title: review.title || "",
        message: review.message || "",
        name: review.name || "",
        designation: review.designation || "",
        isActive: review.isActive !== undefined ? review.isActive : true,
        image: review.image || null
      });
      
      // Set image preview for existing review
      if (review.image) {
        if (typeof review.image === 'string') {
          setImagePreview(review.image);
        } else if (review.image.url) {
          setImagePreview(review.image.url);
        }
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData({
        title: "",
        message: "",
        name: "",
        designation: "",
        isActive: true,
        image: null
      });
      setImagePreview(null);
    }
    setErrors({});
  }, [review, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, image: 'Please select a valid image file (JPEG, PNG, GIF, WebP)' }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size should be less than 5MB' }));
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      // Clear image error
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: "" }));
      }
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.designation.trim()) newErrors.designation = "Designation is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Create FormData to handle file upload
    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("message", formData.message);
    submitData.append("name", formData.name);
    submitData.append("designation", formData.designation);
    submitData.append("isActive", formData.isActive);
    
    if (formData.image instanceof File) {
      submitData.append("image", formData.image);
    } else if (formData.image && !review) {
      // If it's not a file but exists (like a URL from existing review during edit), we might need to handle it differently
      // This depends on your backend API
      submitData.append("image", formData.image);
    }
    
    onSubmit(submitData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {review ? "Edit Review" : "Add New Review"}
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
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Reviewer Image</label>
            <div className="flex items-center space-x-4">
              {imagePreview ? (
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300">
                    <img 
                      src={`${IMG_URL}/${imagePreview}`} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border border-gray-300 border-dashed">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                <p className="text-xs text-gray-500 mt-1">JPEG, PNG, GIF, WebP. Max 5MB.</p>
                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Reviewer Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter reviewer name"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Enter reviewer designation"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                errors.designation ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.designation && <p className="mt-1 text-sm text-red-600">{errors.designation}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Review Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter review title"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Review Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Enter review message"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
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
              <span className="ml-2 text-gray-700">Active Review</span>
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
              {review ? "Update" : "Add"} Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal; 