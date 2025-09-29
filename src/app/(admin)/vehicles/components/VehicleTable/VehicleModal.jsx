// components/VehicleTable/VehicleModal.jsx
"use client";
import { useState, useEffect } from "react";

const VehicleModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  vehicle,
  brands = []
}) => {
  const [formData, setFormData] = useState({
    type: "Two-Wheeler",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    modification: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (vehicle) {
      setFormData({
        type: vehicle.type || "Two-Wheeler",
        brand: vehicle.brand || "",
        model: vehicle.model || "",
        year: vehicle.year || new Date().getFullYear(),
        modification: vehicle.modification || ""
      });
    } else {
      setFormData({
        type: "Two-Wheeler",
        brand: "",
        model: "",
        year: new Date().getFullYear(),
        modification: ""
      });
    }
    setErrors({});
  }, [vehicle, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.type) newErrors.type = "Vehicle type is required";
    if (!formData.brand) newErrors.brand = "Brand is required";
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (!formData.year || formData.year < 1900 || formData.year > new Date().getFullYear()) {
      newErrors.year = "Valid year is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onSubmit(formData);
  };

  if (!isOpen) return null;

  // Generate year options (from 1900 to current year)
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYear; year >= 1900; year--) {
    yearOptions.push(year);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {vehicle ? "Edit Vehicle" : "Add New Vehicle"}
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
            <label className="block text-sm font-medium mb-2 text-gray-700">Vehicle Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                errors.type ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            >
              <option value="Two-Wheeler">Two-Wheeler</option>
              <option value="Four-Wheeler">Four-Wheeler</option>
            </select>
            {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Brand</label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                errors.brand ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            >
              <option value="">Select Brand</option>
              {brands.map(brand => (
                <option key={brand._id || brand.id} value={brand._id || brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {errors.brand && <p className="mt-1 text-sm text-red-600">{errors.brand}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="Enter model name"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                errors.model ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.model && <p className="mt-1 text-sm text-red-600">{errors.model}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Year</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                errors.year ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            >
              <option value="">Select Year</option>
              {yearOptions.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Modification (Optional)</label>
            <input
              type="text"
              name="modification"
              value={formData.modification}
              onChange={handleChange}
              placeholder="Enter modification details (e.g., ABS, Disc Brake)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
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
              {vehicle ? "Update" : "Add"} Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleModal;