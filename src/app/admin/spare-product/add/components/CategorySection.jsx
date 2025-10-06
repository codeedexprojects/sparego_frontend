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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorization</h3>
      <div className="space-y-4">
        {/* Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section <span className="text-red-500">*</span>
          </label>
          <select
            name="section"
            value={formData.section}
            onChange={onInputChange}
            required
            disabled={sectionsLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <option value="">
              {sectionsLoading ? 'Loading sections...' : 'Select Section'}
            </option>
            {sections.map((section) => (
              <option key={section._id} value={section._id}>
                {section.name}
              </option>
            ))}
          </select>
        </div>

        {/* Brand - Available regardless of section selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand
          </label>
          <select
            name="productBrand"
            value={formData.productBrand}
            onChange={onInputChange}
            disabled={brandsLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <option value="">
              {brandsLoading ? 'Loading brands...' : 'Select Brand'}
            </option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Main Category - Available regardless of section selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Category
            </label>
            <select
              name="mainCategory"
              value={formData.mainCategory}
              onChange={onInputChange}
              disabled={mainCategoriesLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <option value="">
                {mainCategoriesLoading ? 'Loading...' : 'Select Main Category'}
              </option>
              {mainCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {formData.mainCategory && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={onInputChange}
                disabled={categoriesLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="">
                  {categoriesLoading ? 'Loading...' : categories.length === 0 ? 'No categories' : 'Select Category'}
                </option>
                {categories
                  .filter(cat => cat.mainCategory && cat.mainCategory._id === formData.mainCategory)
                  .map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))
                }
              </select>
            </div>
          )}

          {formData.category && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sub Category
              </label>
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={onInputChange}
                disabled={subCategoriesLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="">
                  {subCategoriesLoading ? 'Loading...' : subCategories.length === 0 ? 'No sub categories' : 'Select Sub Category'}
                </option>
                {subCategories
                  .filter(cat => cat.category && cat.category._id === formData.category)
                  .map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))
                }
              </select>
            </div>
          )}

          {formData.subCategory && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sub Sub Category
              </label>
              <select
                name="subSubCategory"
                value={formData.subSubCategory}
                onChange={onInputChange}
                disabled={subSubCategoriesLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="">
                  {subSubCategoriesLoading ? 'Loading...' : subSubCategories.length === 0 ? 'No sub sub categories' : 'Select Sub Sub Category'}
                </option>
                {subSubCategories
                  .filter(cat => cat.subCategory && cat.subCategory._id === formData.subCategory)
                  .map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))
                }
              </select>
            </div>
          )}
        </div>

        {/* Vehicle Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle Type
          </label>
          <select
            name="vehicleType"
            value={formData.vehicleType}
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