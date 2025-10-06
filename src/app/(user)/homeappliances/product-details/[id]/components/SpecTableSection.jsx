import React from 'react';

const SpecTable = ({ product }) => {
  const getSpecifications = () => {
    const specs = [];

    // Check if technicalSpecs exists and is an array with items
    if (product?.technicalSpecs && Array.isArray(product.technicalSpecs) && product.technicalSpecs.length > 0) {
      product.technicalSpecs.forEach(spec => {
        // Ensure spec exists and has both key and value
        if (spec && spec.key && spec.value) {
          specs.push({
            key: spec.key,
            value: spec.value
          });
        }
      });
    }

    // If no specs were found, return a default message
    if (specs.length === 0) {
      return [
        { key: 'Specifications', value: 'No technical specifications available' }
      ];
    }

    return specs;
  };

  const specifications = getSpecifications();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-red-600 mb-6">Product Specifications</h2>
      <div className="overflow-x-auto">
       <div className="flex justify-center">
  <table className="border-collapse w-full max-w-4xl">
    <thead>
      <tr className="border-b-2 border-gray-200 w-100 text-center">
        <th className="text-left py-3 px-4 font-semibold text-gray-900">Specification</th>
        <th className="text-left py-3 px-4 font-semibold text-gray-900">Value</th>
      </tr>
    </thead>
    <tbody>
      {specifications.map((spec, index) => (
        <tr key={index} className="border-b border-gray-100">
          <td className="py-3 px-4 text-gray-700">{spec?.key || 'N/A'}</td>
          <td className="py-3 px-4 text-gray-900 font-medium">{spec?.value || 'N/A'}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      </div>
      
      {/* Additional product info section */}
      {product && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.partNumber && (
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-sm text-gray-600 mb-1">Part Number</div>
                <div className="font-semibold text-gray-900">{product.partNumber}</div>
              </div>
            )}
            {product.warranty && (
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-sm text-gray-600 mb-1">Warranty</div>
                <div className="font-semibold text-gray-900">{product.warranty}</div>
              </div>
            )}
            {/* {product.vehicleType && (
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-sm text-gray-600 mb-1">Vehicle Type</div>
                <div className="font-semibold text-gray-900">{product.vehicleType}</div>
              </div>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecTable;