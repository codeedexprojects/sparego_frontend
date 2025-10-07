"use client";

const SpecificationsSection = ({ 
  formData, 
  onArrayFieldChange, 
  onAddArrayField, 
  onRemoveArrayField, 
  onTechSpecChange 
}) => {
  // Ensure all data is arrays to prevent errors
  const specifications = Array.isArray(formData.specifications) ? formData.specifications : [''];
  const usage = Array.isArray(formData.usage) ? formData.usage : [''];
  const technicalSpecs = Array.isArray(formData.technicalSpecs) ? formData.technicalSpecs : [{ key: '', value: '' }];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
      <div className="space-y-6">
        {/* Product Specifications */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Specifications
          </label>
          {specifications.map((spec, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={spec}
                onChange={(e) => onArrayFieldChange('specifications', index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter specification"
              />
              {specifications.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemoveArrayField('specifications', index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => onAddArrayField('specifications')}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Add Specification
          </button>
        </div>

        {/* Usage Instructions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Usage Instructions
          </label>
          {usage.map((usageItem, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={usageItem}
                onChange={(e) => onArrayFieldChange('usage', index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter usage instruction"
              />
              {usage.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemoveArrayField('usage', index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => onAddArrayField('usage')}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Add Usage Instruction
          </button>
        </div>

        {/* Technical Specifications */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Technical Specifications
          </label>
          {technicalSpecs.map((spec, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                value={spec.key}
                onChange={(e) => onTechSpecChange(index, 'key', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Specification key (e.g., Material)"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) => onTechSpecChange(index, 'value', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Specification value (e.g., Ceramic)"
                />
                {technicalSpecs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemoveArrayField('technicalSpecs', index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onAddArrayField('technicalSpecs')}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Add Technical Specification
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecificationsSection;