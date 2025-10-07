"use client";
import { useState, useEffect } from "react";

const BrandModal = ({
  isOpen,
  onClose,
  onSubmit,
  brand,
  brandType = "vehicle",
  sections = [], // Pass the sections array from parent
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
    logo: null,
    logoPreview: null,
    vehicleType: "Two-wheeler",
    section: "", // ObjectId of section, can be empty
  });

  useEffect(() => {
    if (brand) {
      setFormData({
        name: brand.name || "",
        description: brand.description || "",
        isActive: brand.isActive !== undefined ? brand.isActive : true,
        logo: null,
        logoPreview: brand.logo || brand.image || null,
        vehicleType: brand.vehicleType || "Two-wheeler",
        section: brand.section?._id || brand.section || "", // Keep empty string for optional
      });
    } else {
      setFormData({
        name: "",
        description: "",
        isActive: true,
        logo: null,
        logoPreview: null,
        vehicleType: "Two-wheeler",
        section: "", // optional
      });
    }
  }, [brand, brandType, sections, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          logo: file,
          logoPreview: URL.createObjectURL(file),
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert empty section to null for optional
    const dataToSubmit = {
      ...formData,
      section: formData.section || null,
    };

    onSubmit(dataToSubmit);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {brand ? "Edit Brand" : "Add New Brand"} ({brandType})
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Brand Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 border rounded-lg focus:ring-indigo-500"
            />
          </div>

          {/* Vehicle Type */}
          {brandType === "vehicle" && (
            <div>
              <label className="block text-sm font-medium mb-2">Vehicle Type</label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-indigo-500"
              >
                <option value="Two-wheeler">Two-wheeler</option>
                <option value="Four-wheeler">Four-wheeler</option>
              </select>
            </div>
          )}

          {/* Product Section (optional) */}
          {brandType === "product" && (
            <div>
              <label className="block text-sm font-medium mb-2">Product Section (optional)</label>
              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-indigo-500"
              >
                <option value="">-- No Section --</option>
                {sections.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Status */}
          <div>
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

          {/* Logo */}
          <div>
            <label className="block text-sm font-medium mb-2">Brand Logo</label>
            <input type="file" name="logo" accept="image/*" onChange={handleChange} />
            {formData.logoPreview && (
              <img src={formData.logoPreview} alt="Preview" className="mt-2 h-24 object-contain" />
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
              {brand ? "Update" : "Add"} Brand
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BrandModal;
