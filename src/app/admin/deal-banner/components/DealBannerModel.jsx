// components/DealBannerModal.jsx
import React from 'react';

const DealBannerModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  formData, 
  onChange, 
  preview, 
  onRemoveImage, 
  sections, 
  pageOptions,
  editingBanner,
  products = [] // Ensure products has a default value
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingBanner ? "Edit Deal Banner" : "Add New Deal Banner"}
          </h2>
        </div>
        <form onSubmit={onSubmit} className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <FormInput
                label="Title *"
                name="title"
                type="text"
                value={formData.title}
                onChange={onChange}
                placeholder="Enter banner title"
                required
              />

              <FormInput
                label="Discount Text"
                name="discountText"
                type="text"
                value={formData.discountText}
                onChange={onChange}
                placeholder="e.g., 50% OFF, Free Shipping"
              />

              <FormSelect
                label="Section"
                name="section"
                value={formData.section}
                onChange={onChange}
              >
                <option value="">Spare Parts</option>
                {sections.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.title}
                  </option>
                ))}
              </FormSelect>

              <FormSelect
                label="Page *"
                name="page"
                value={formData.page}
                onChange={onChange}
                required
              >
                <option value="">Select Page</option>
                {pageOptions.map((page) => (
                  <option key={page.value} value={page.value}>
                    {page.label}
                  </option>
                ))}
              </FormSelect>
            </div>

            {/* Right Column - FIXED: Ensure all fields are visible */}
            <div className="space-y-4">
              {/* PRODUCT ID FIELD - This was missing */}
              <FormSelect
                label="Link to Product"
                name="productId"
                value={formData.productId}
                onChange={onChange}
              >
                <option value="">No Product Link</option>
                {products && products.length > 0 ? (
                  products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>Loading products...</option>
                )}
              </FormSelect>

              {/* ACTIVE CHECKBOX */}
              <FormCheckbox
                label="Active Banner"
                name="isActive"
                checked={formData.isActive}
                onChange={onChange}
              />

              {/* IMAGE UPLOAD */}
              <ImageUpload
                preview={preview}
                onChange={onChange}
                onRemove={onRemoveImage}
                required={!editingBanner}
                label="Banner Image *"
              />
            </div>
          </div>

          {/* Description - Full Width */}
          <div className="mt-4">
            <FormTextarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={onChange}
              placeholder="Enter banner description"
              rows={3}
            />
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            >
              {editingBanner ? "Update Banner" : "Add Banner"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Form Components
const FormInput = ({ label, name, type = "text", value, onChange, placeholder, required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

const FormSelect = ({ label, name, value, onChange, children, required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
      required={required}
    >
      {children}
    </select>
  </div>
);

const FormCheckbox = ({ label, name, checked, onChange }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
    />
    <label className="ml-2 text-sm font-medium text-gray-700">{label}</label>
  </div>
);

const FormTextarea = ({ label, name, value, onChange, placeholder, rows = 3 }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
      placeholder={placeholder}
    />
  </div>
);

const ImageUpload = ({ preview, onChange, onRemove, required = false, label }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="flex items-center justify-center w-full">
      {preview ? (
        <div className="relative w-full">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
          />
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={onChange}
            className="hidden"
            required={required}
          />
        </label>
      )}
    </div>
  </div>
);

export default DealBannerModal;