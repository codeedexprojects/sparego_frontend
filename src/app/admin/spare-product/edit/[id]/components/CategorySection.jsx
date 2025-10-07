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

        {/* Brand - Only show when section is selected */}
        {formData.section && (
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
                {brandsLoading ? 'Loading brands...' : brands.length === 0 ? 'No brands available for this section' : 'Select Brand'}
              </option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {brands.length === 0 && !brandsLoading && formData.section && (
              <p className="mt-1 text-sm text-amber-600">
                No brands available for the selected section. Please add brands for this section first.
              </p>
            )}
          </div>
        )}

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Main Category - Only show when section is selected */}
          {formData.section && (
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
                  {mainCategoriesLoading ? 'Loading...' : mainCategories.length === 0 ? 'No main categories' : 'Select Main Category'}
                </option>
                {mainCategories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Category - Only show when main category is selected */}
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
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Sub Category - Only show when category is selected */}
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
                {subCategories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Sub Sub Category - Only show when sub category is selected */}
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
                {subSubCategories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
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
      </div>
    </div>
  );
};

export default CategorySection;