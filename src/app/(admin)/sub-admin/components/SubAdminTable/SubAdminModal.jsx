// components/SubadminTable/SubadminModal.jsx
"use client";
import { useState, useEffect } from "react";

const SubadminModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  subadmin 
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "subadmin",
    permissions: []
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // Available permissions
  const availablePermissions = [
    "users:read",
    "users:write",
    "products:read", 
    "products:write",
    "categories:read",
    "categories:write",
    "orders:read",
    "orders:write",
    "content:read",
    "content:write",
    "settings:read",
    "settings:write"
  ];

  useEffect(() => {
    if (subadmin) {
      setIsEditing(true);
      setFormData({
        name: subadmin.name || "",
        email: subadmin.email || "",
        password: "",
        confirmPassword: "",
        role: subadmin.role || "subadmin",
        permissions: subadmin.permissions || []
      });
    } else {
      setIsEditing(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "subadmin",
        permissions: []
      });
    }
    setErrors({});
  }, [subadmin, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      const { value: permissionValue } = e.target;
      setFormData(prev => {
        if (checked) {
          return { ...prev, permissions: [...prev.permissions, permissionValue] };
        } else {
          return { ...prev, permissions: prev.permissions.filter(p => p !== permissionValue) };
        }
      });
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
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!isEditing) {
      if (!formData.password) newErrors.password = "Password is required";
      if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Remove confirmPassword from submitted data
    const { confirmPassword, ...submitData } = formData;
    
    // If password is empty in edit mode, don't include it
    if (isEditing && !submitData.password) {
      delete submitData.password;
    }
    
    onSubmit(submitData);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setFormData(prev => ({ ...prev, permissions: ["*"] }));
    } else {
      setFormData(prev => ({ ...prev, permissions: [] }));
    }
  };

  const handleSelectPermission = (permission) => {
    setFormData(prev => {
      if (prev.permissions.includes(permission)) {
        return { ...prev, permissions: prev.permissions.filter(p => p !== permission) };
      } else {
        return { ...prev, permissions: [...prev.permissions, permission] };
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEditing ? "Edit Subadmin" : "Add New Subadmin"}
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
            <label className="block text-sm font-medium mb-2 text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            >
              <option value="superadmin">Super Admin</option>
              <option value="subadmin">Sub Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Password {isEditing && "(Leave blank to keep current password)"}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={isEditing ? "Enter new password" : "Enter password"}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              required={!isEditing}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          {!isEditing && (
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Permissions</label>
            <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto">
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={formData.permissions.includes("*")}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Full Access (All Permissions)</span>
              </label>
              
              <div className="border-t border-gray-200 my-2"></div>
              
              <div className="grid grid-cols-1 gap-2">
                {availablePermissions.map(permission => (
                  <label key={permission} className="flex items-center">
                    <input
                      type="checkbox"
                      value={permission}
                      checked={formData.permissions.includes(permission) || formData.permissions.includes("*")}
                      onChange={() => handleSelectPermission(permission)}
                      disabled={formData.permissions.includes("*")}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{permission}</span>
                  </label>
                ))}
              </div>
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
              {isEditing ? "Update" : "Add"} Subadmin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubadminModal;