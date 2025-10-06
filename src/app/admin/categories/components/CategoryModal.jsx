import React from "react";

const CategoryModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onChange,
  preview,
  onRemoveImage,
  mainCategories,
  editingCategory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingCategory ? "Edit Category" : "Add New Category"}
          </h2>
        </div>
        <form onSubmit={onSubmit} className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <FormInput
                label="Name *"
                name="name"
                value={formData.name}
                onChange={onChange}
                placeholder="Enter category name"
                required
              />

              <FormSelect
                label="Main Category *"
                name="mainCategory"
                value={formData.mainCategory}
                onChange={onChange}
                required
              >
                <option value="">Select Main Category</option>
                {mainCategories.map((mc) => (
                  <option key={mc._id} value={mc._id}>
                    {mc.name}
                  </option>
                ))}
              </FormSelect>

              {/* Type is now optional */}
              <FormSelect
                label="Type (Optional)"
                name="type"
                value={formData.type || ""}
                onChange={onChange}
              >
                <option value="">Select Type</option>
                <option value="Two-wheeler">Two Wheeler</option>
                <option value="Four-wheeler">Four Wheeler</option>
              </FormSelect>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <ImageUpload
                preview={preview}
                onChange={onChange}
                onRemove={onRemoveImage}
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <FormTextarea
              label="Description"
              name="description"
              value={formData.description || ""}
              onChange={onChange}
              placeholder="Enter category description"
              rows={3}
            />
          </div>

          {/* Actions */}
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
              {editingCategory ? "Update Category" : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable form components
const FormInput = ({ label, name, value, onChange, placeholder, required }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input
      type="text"
      name={name}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
    />
  </div>
);

const FormSelect = ({ label, name, value, onChange, children, required }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <select
      name={name}
      value={value || ""}
      onChange={onChange}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
    >
      {children}
    </select>
  </div>
);

const FormTextarea = ({ label, name, value, onChange, placeholder, rows }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <textarea
      name={name}
      value={value || ""}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
    />
  </div>
);

const ImageUpload = ({ preview, onChange, onRemove }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
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
            ✕
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <p className="text-sm text-gray-500 font-semibold">Click to upload</p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
          <input type="file" name="image" accept="image/*" onChange={onChange} className="hidden" />
        </label>
      )}
    </div>
  </div>
);

export default CategoryModal;
