import React from 'react';

const HowToUseSection = ({ product }) => {
  // Default usage instructions if none provided
  const defaultUsage = [
    "Follow manufacturer's instructions for installation",
    "Ensure compatibility with your vehicle model",
    "Consult a professional mechanic if needed"
  ];

  const usageInstructions = product?.usage && product.usage.length > 0 
    ? product.usage 
    : defaultUsage;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-red-600 mb-6">How To Use</h2>
      <ul className="space-y-3 text-gray-700">
        {usageInstructions.map((instruction, index) => (
          <li key={index} className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">
              {index + 1}
            </span>
            <span>{instruction}</span>
          </li>
        ))}
      </ul>
      
      {/* Additional usage notes */}
      {product?.warranty && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">Warranty Information</h3>
          <p className="text-blue-800">{product.warranty} warranty included</p>
        </div>
      )}
      
      {product?.compatibleVehicles && product.compatibleVehicles.length > 0 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-medium text-green-900 mb-2">Compatible Vehicles</h3>
          <div className="space-y-1">
            {product.compatibleVehicles.map((vehicle, index) => (
              <p key={index} className="text-green-800 text-sm">
                {vehicle.type} - {vehicle.modelLine} {vehicle.year} ({vehicle.modification})
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HowToUseSection;