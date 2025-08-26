import React from 'react';

const SpecTable = () => {
  return (
    <div className=" p-6">
      <h2 className="text-xl font-bold text-red-600 mb-6">Product Specifications</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Spec</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 text-gray-700">Volume</td>
              <td className="py-3 px-4 text-gray-900 font-medium">1000ml</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 text-gray-700">Oil Type</td>
              <td className="py-3 px-4 text-gray-900 font-medium">Semi-Synthetic</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 text-gray-700">Compatibility</td>
              <td className="py-3 px-4 text-gray-900 font-medium">Honda, TVS, Hero</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 text-gray-700">Viscosity Grade</td>
              <td className="py-3 px-4 text-gray-900 font-medium">10W-30</td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-gray-700">Shelf Life</td>
              <td className="py-3 px-4 text-gray-900 font-medium">3 Years</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpecTable;