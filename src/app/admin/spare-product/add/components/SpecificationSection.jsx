"use client";

const SpecificationsSection = ({
  formData,
  onArrayFieldChange,
  onAddArrayField,
  onRemoveArrayField,
  onTechSpecChange
}) => {
  const safeSpecifications = Array.isArray(formData.specifications) ? formData.specifications : [''];
  const safeUsage = Array.isArray(formData.usage) ? formData.usage : [''];
  const safeTechnicalSpecs = Array.isArray(formData.technicalSpecs) ? formData.technicalSpecs : [{ key: '', value: '' }];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
      <div className="space-y-6">

        {/* Product Specifications */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Specifications
          </label>
          {safeSpecifications.map((spec, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={spec}
                onChange={(e) => onArrayFieldChange('specifications', index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter specification"
              />
              {safeSpecifications.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemoveArrayField('specifications', index)}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => onAddArrayField('specifications')}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Add Specification
          </button>
        </div>

        {/* Usage Instructions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Usage Instructions
          </label>
          {safeUsage.map((usageItem, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={usageItem}
                onChange={(e) => onArrayFieldChange('usage', index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter usage instruction"
              />
              {safeUsage.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemoveArrayField('usage', index)}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => onAddArrayField('usage')}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Add Usage Instruction
          </button>
        </div>

        {/* Technical Specifications */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Technical Specifications
          </label>
          {safeTechnicalSpecs.map((spec, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                value={spec.key}
                onChange={(e) => onTechSpecChange(index, 'key', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Specification key"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) => onTechSpecChange(index, 'value', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Specification value"
                />
                {safeTechnicalSpecs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemoveArrayField('technicalSpecs', index)}
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
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
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Add Technical Specification
          </button>
        </div>

      </div>
    </div>
  );
};

export default SpecificationsSection;
