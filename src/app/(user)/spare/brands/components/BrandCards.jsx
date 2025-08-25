"use client";
import React, { useState } from 'react';


const BrandSelectionSection = () => {
  const [activeTab, setActiveTab] = useState('TWO WHEELER');

  const brands = [
    {
      id: 1,
      name: 'Hero',
      subtitle: 'MotoCorp',
      parts: '124 Parts',
      logo: '/about/brand.png',
      logoType: 'hero' // for styling
    },
    {
      id: 2,
      name: 'Harley',
      subtitle: 'Davidson',
      parts: '124 Parts',
      logo: '/about/brand.png',
      logoType: 'harley'
    },
    {
      id: 3,
      name: 'Honda',
      subtitle: '',
      parts: '124 Parts',
      logo: '/about/brand.png',
      logoType: 'honda'
    },
    {
      id: 4,
      name: 'TVS Motor',
      subtitle: '',
      parts: '124 Parts',
      logo: '/about/brand.png',
      logoType: 'tvs'
    },
    {
      id: 5,
      name: 'Bajaj Auto',
      subtitle: '',
      parts: '124 Parts',
      logo: '/about/brand.png',
      logoType: 'bajaj'
    },
    {
      id: 6,
      name: 'Yamaha',
      subtitle: '',
      parts: '124 Parts',
      logo: '/about/brand.png',
      logoType: 'yamaha'
    },
    {
      id: 7,
      name: 'Royal',
      subtitle: 'Enfield',
      parts: '124 Parts',
      logo: '/about/brand.png',
      logoType: 'royal'
    },
    {
      id: 8,
      name: 'KTM',
      subtitle: '',
      parts: '124 Parts',
      logo: '/about/brand.png',
      logoType: 'ktm'
    }
  ];

  const getBrandStyles = (logoType) => {
    const styles = {
      hero: 'bg-red-50',
      harley: 'bg-orange-50',
      honda: 'bg-red-50',
      tvs: 'bg-blue-50',
      bajaj: 'bg-blue-50',
      yamaha: 'bg-red-50',
      royal: 'bg-yellow-50',
      ktm: 'bg-orange-50'
    };
    return styles[logoType] || 'bg-gray-50';
  };

  return (
    <div className="bg-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Tabs */}
        <div className="flex mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('TWO WHEELER')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'TWO WHEELER'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            TWO WHEELER
          </button>
          <button
            onClick={() => setActiveTab('FOUR WHEELER')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'FOUR WHEELER'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            FOUR WHEELER
          </button>
        </div>

        {/* Popular Brands Label */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-700">Popular Brands</h2>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Brand Logo */}
              <div className={`w-26 h-22  rounded mb-4 flex items-center justify-center mx-auto`}>
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Brand Name */}
              <div className="text-center mb-3">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {brand.name}
                </h3>
                {brand.subtitle && (
                  <p className="text-sm text-gray-900">
                    {brand.subtitle}
                  </p>
                )}
              </div>

              {/* Parts Count */}
              <div className="text-center">
                <span className="text-xs text-gray-500 font-medium">
                  {brand.parts}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center">
          <button className="px-8 py-2 border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors rounded">
            Load more
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandSelectionSection;