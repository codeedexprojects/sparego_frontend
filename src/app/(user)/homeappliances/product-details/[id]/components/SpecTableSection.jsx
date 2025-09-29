import React from 'react';

const SpecTable = ({ product }) => {
  const getSpecifications = () => {
    const specs = [];

    if (product?.technicalSpecs && product.technicalSpecs.length > 0) {
      product.technicalSpecs.forEach(spec => {
        specs.push({
          key: spec.key,
          value: spec.value
        });
      });
    }

   
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