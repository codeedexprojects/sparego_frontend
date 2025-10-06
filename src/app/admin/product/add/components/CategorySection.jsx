import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVehicles } from "../../../../../redux/slices/adminVehicleSlice";

const CategorySection = ({ 
  formData, 
  onInputChange, 
  sections, 
  sectionsLoading, 
  brands, 
  brandsLoading,
  mainCategories,
  mainCategoriesLoading,
  categories,
  categoriesLoading,
  subCategories,
  subCategoriesLoading,
  subSubCategories,
  subSubCategoriesLoading
}) => {
  const dispatch = useDispatch();
  const { vehicles, loading: vehiclesLoading } = useSelector(state => state.adminVehicle);
  const [vehicleOptions, setVehicleOptions] = useState([]);

  // Fetch vehicles whenever vehicleType changes
  useEffect(() => {
    if (formData.vehicleType && formData.vehicleType !== "Universal") {
      dispatch(getVehicles({ vehicleType: formData.vehicleType }));
    } else {
      setVehicleOptions([]);
    }
  }, [dispatch, formData.vehicleType]);

  useEffect(() => {
    setVehicleOptions(vehicles);
  }, [vehicles]);

  const handleCompatibleVehiclesChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    onInputChange({
      target: {
        name: "compatibleVehicles",
        value: options
      }
    });
  };

  // Helper function to handle optional selects
  const handleOptionalSelectChange = (e) => {
    const value = e.target.value || null; // convert empty string to null
    onInputChange({
      target: {
        name: e.target.name,
        value
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorization</h3>
      <div className="space-y-4">
        
        {/* Section (optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section
          </label>
          <select
            name="section"
            value={formData.section || ""}
            onChange={handleOptionalSelectChange}
            disabled={sectionsLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <option value="">Select Section (optional)</option>
            {sections.map((section) => (
              <option key={section._id} value={section._id}>
                {section.name}
              </option>
            ))}
          </select>
        </div>

        {/* Brand (optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand
          </label>
          <select
            name="productBrand"
            value={formData.productBrand || ""}
            onChange={handleOptionalSelectChange}
            disabled={brandsLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <option value="">Select Brand (optional)</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        {/* Main Category (optional) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Category
            </label>
            <select
              name="mainCategory"
              value={formData.mainCategory || ""}
              onChange={handleOptionalSelectChange}
              disabled={mainCategoriesLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <option value="">Select Main Category (optional)</option>
              {mainCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category || ""}
              onChange={handleOptionalSelectChange}
              disabled={categoriesLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <option value="">Select Category (optional)</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sub Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sub Category
            </label>
            <select
              name="subCategory"
              value={formData.subCategory || ""}
              onChange={handleOptionalSelectChange}
              disabled={subCategoriesLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <option value="">Select Sub Category (optional)</option>
              {subCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sub Sub Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sub Sub Category
            </label>
            <select
              name="subSubCategory"
              value={formData.subSubCategory || ""}
              onChange={handleOptionalSelectChange}
              disabled={subSubCategoriesLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <option value="">Select Sub Sub Category (optional)</option>
              {subSubCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Vehicle Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle Type
          </label>
          <select
            name="vehicleType"
            value={formData.vehicleType || "Universal"}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Universal">Universal</option>
            <option value="Two-Wheeler">Two-Wheeler</option>
            <option value="Four-Wheeler">Four-Wheeler</option>
          </select>
        </div>

        {/* Compatible Vehicles Multi-Select */}
        {formData.vehicleType !== "Universal" && vehicleOptions.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compatible Vehicles
            </label>
            <select
              multiple
              value={formData.compatibleVehicles || []}
              onChange={handleCompatibleVehiclesChange}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {vehicleOptions.map(vehicle => (
                <option key={vehicle._id} value={vehicle._id}>
                  {vehicle.brand?.name || ""} - {vehicle.modelLine || vehicle.model}
                </option>
              ))}
            </select>
            {vehiclesLoading && (
              <p className="mt-1 text-sm text-gray-500">Loading vehicles...</p>
            )}
          </div>
        )}

        {/* Selected Compatible Vehicles Tags */}
        {formData.compatibleVehicles && formData.compatibleVehicles.length > 0 && (
          <div className="mt-3">
            <p className="text-sm font-medium text-gray-700 mb-2">Selected Compatible Vehicles:</p>
            <div className="flex flex-wrap gap-2">
              {formData.compatibleVehicles.map((vehicleId) => {
                const vehicle = vehicleOptions.find(v => v._id === vehicleId);
                if (!vehicle) return null;
                return (
                  <span
                    key={vehicle._id}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                  >
                    {vehicle.brand?.name || ""} - {vehicle.modelLine || vehicle.model}
                    <button
                      type="button"
                      onClick={() => {
                        const updated = formData.compatibleVehicles.filter(id => id !== vehicle._id);
                        onInputChange({ target: { name: "compatibleVehicles", value: updated } });
                      }}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
