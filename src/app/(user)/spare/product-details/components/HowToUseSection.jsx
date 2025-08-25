import React from 'react';

const HowToUseSection = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-red-600 mb-6">How To Use</h2>
      <ul className="space-y-3 text-gray-700">
        <li className="flex items-start space-x-3">
          <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">1</span>
          <span>Best Used During Regular Engine Oil Change Intervals (Approx. Every 2500-3000 Km)</span>
        </li>
        <li className="flex items-start space-x-3">
          <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">2</span>
          <span>Compatible With 2-Wheeler 4T Engines</span>
        </li>
        <li className="flex items-start space-x-3">
          <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">3</span>
          <span>Refer To Your Vehicle Manual Before Use</span>
        </li>
      </ul>
    </div>
  );
};

export default HowToUseSection;