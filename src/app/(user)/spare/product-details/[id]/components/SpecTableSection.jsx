import React from 'react';

const SpecTable = ({ product }) => {
  // Build specifications array from product data
  const getSpecifications = () => {
    const specs = [];

    // Add technical specs from API - filter out null values
    if (product?.technicalSpecs && product.technicalSpecs.length > 0) {
      product.technicalSpecs.forEach(spec => {
        // Check if spec is not null and has key and value properties
        if (spec && spec.key && spec.value) {
          specs.push({
            key: spec.key,
            value: spec.value
          });
        }
      });
    }

    // If no valid technical specs, try to create from other product properties
    if (specs.length === 0) {
      // Add basic product information as specs
      if (product?.partNumber) {
        specs.push({ key: 'Part Number', value: product.partNumber });
      }
      if (product?.vehicleType) {
        specs.push({ 
          key: 'Vehicle Type', 
          value: typeof product.vehicleType === 'object' ? product.vehicleType.name : product.vehicleType 
        });
      }
      if (product?.warranty) {
        specs.push({ 
          key: 'Warranty', 
          value: typeof product.warranty === 'object' ? product.warranty.period : product.warranty 
        });
      }
      if (product?.stock !== undefined) {
        specs.push({ key: 'Stock', value: `${product.stock} units` });
      }
    }

    // If still no specs, show message
    if (specs.length === 0) {
      return [
        { key: 'Information', value: 'No technical specifications available for this product' }
      ];
    }

    return specs;
  };

  const specifications = getSpecifications();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-red-600 mb-6">Product Specifications</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Specification</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Value</th>
            </tr>
          </thead>
          <tbody>
            {specifications.map((spec, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-700">{spec.key}</td>
                <td className="py-3 px-4 text-gray-900 font-medium">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpecTable;