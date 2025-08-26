import React from 'react';
import { Zap, Shield, Droplets, Gauge, Settings, Clock } from 'lucide-react';

const SpecificationsSection = () => {
  return (
    <div className=" p-6">
      <h2 className="text-xl font-bold text-red-600 mb-6">Specifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Power Release Technology</h3>
              <p className="text-sm text-gray-600">For Faster Acceleration</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Meets API SN4 and JASO MA2 Standards</h3>
              <p className="text-sm text-gray-600">Quality Assurance</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Droplets className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Great for City Riding and Stop-And-Go Traffic</h3>
              <p className="text-sm text-gray-600">Urban Performance</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Gauge className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Viscosity: 10W-30</h3>
              <p className="text-sm text-gray-600">Ideal for Scooters</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Settings className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Specifically Formulated for 4-Stroke Scooter Engines</h3>
              <p className="text-sm text-gray-600">Engine Compatibility</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
              <Clock className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Long-Lasting Engine Protection</h3>
              <p className="text-sm text-gray-600">Durability</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificationsSection;