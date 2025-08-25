"use client";
import React, { useState } from 'react';
import { Filter } from 'lucide-react';

const AutomotivePartsCatalog = () => {
  const [activeTab, setActiveTab] = useState('TWO WHEELER');
  const [showMore, setShowMore] = useState(false);

  const categories = [
    {
      title: 'Maintenance & Service',
      products: 238,
      image: '/home/part1.png',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Windscreen & Cleaning System',
      products: 238,
      image: '/home/part1.png',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Lighting & Electricals',
      products: 238,
      image: '/home/part1.png',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Fuel Filters',
      products: 238,
      image: '/home/part1.png',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Control Cables & Mechanisms',
      products: 238,
      image: '/home/part1.png',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Brake System',
      products: 238,
      image: '/home/part1.png',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Bearings & Drive',
      products: 238,
      image: '/home/part1.png',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Clutch System',
      products: 238,
      image: '/home/part1.png',
      bgColor: 'bg-teal-50'
    }
  ];

  const visibleCategories = showMore ? categories : categories.slice(0, 6);

  return (
    <div className=" mx-auto p-6 bg-gray-50 min-h-screen">
     
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-8">
          <button 
            onClick={() => setActiveTab('TWO WHEELER')}
            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'TWO WHEELER' 
                ? 'text-gray-900 border-gray-900' 
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            TWO WHEELER
          </button>
          <button 
            onClick={() => setActiveTab('FOUR WHEELER')}
            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'FOUR WHEELER' 
                ? 'text-gray-900 border-gray-900' 
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            FOUR WHEELER
          </button>
        </div>
        
        <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {visibleCategories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-3 text-sm leading-tight group-hover:text-blue-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  {category.products} Products
                </p>
              </div>
              
              <div className="flex-shrink-0 ml-4">
                <div className={`w-12 h-12 ${category.bgColor} rounded-lg flex items-center justify-center p-2`}>
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-8 h-8 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center">
        <button 
          onClick={() => setShowMore(!showMore)}
          className="px-6 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          {showMore ? 'Load less' : 'Load more'}
        </button>
      </div>
    </div>
  );
};

export default AutomotivePartsCatalog;