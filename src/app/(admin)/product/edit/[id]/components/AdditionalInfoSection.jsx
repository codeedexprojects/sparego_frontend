const AdditionalInfoSection = ({ formData, onInputChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Warranty Information
          </label>
          <input
            type="text"
            name="warranty"
            value={formData.warranty}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 1 year warranty"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Part Number
          </label>
          <input
            type="text"
            name="partNumber"
            value={formData.partNumber}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter part number"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-4">Product Status</label>
        <div className="flex space-x-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={onInputChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Active Product</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isPopular"
              checked={formData.isPopular}
              onChange={onInputChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Mark as Popular</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoSection;