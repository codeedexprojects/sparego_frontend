"use client";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { getAllBrands } from '@/redux/slices/brandSlice';
import { IMG_URL } from '@/redux/baseUrl';

const BrandSelectionSection = () => {
  const dispatch = useDispatch();
  const { brands, loading, error } = useSelector((state) => state.brand);
  const [activeTab, setActiveTab] = useState('TWO WHEELER');

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  const filteredBrands = brands && Array.isArray(brands)
    ? brands.filter(brand => {
        if (!brand.vehicleType) return false;
        
        const brandVehicleType = brand.vehicleType.toLowerCase().replace('-', '').replace(' ', '');
        const activeTabNormalized = activeTab.toLowerCase().replace(' ', '');
        return brandVehicleType === activeTabNormalized;
      })
    : [];

  if (loading) {
    return (
      <div className="bg-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex mb-8 border-b border-gray-200">
            <button className="px-6 py-3 font-medium text-sm border-b-2 border-black text-black">
              TWO WHEELER
            </button>
            <button className="px-6 py-3 font-medium text-sm border-b-2 border-transparent text-gray-500">
              FOUR WHEELER
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
                <div className="w-26 h-22 bg-gray-200 rounded mb-4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 mx-auto w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded mx-auto w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-600">Error loading brands: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
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
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-700">Popular Brands</h2>
        </div>
        {filteredBrands.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {filteredBrands.map((brand) => (
              <div
                key={brand._id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="w-26 h-22 rounded mb-4 flex items-center justify-center mx-auto">
                  {brand.logo ? (
                    <Image
                      src={`${IMG_URL}/${brand.logo}`}
                      alt={`${brand.name} logo`}
                      width={80}
                      height={60}
                      className="object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xs text-gray-400">No Logo</span>
                    </div>
                  )}
                  {brand.logo && (
                    <div className="hidden w-full h-full items-center justify-center">
                      <span className="text-xs text-gray-400">No Logo</span>
                    </div>
                  )}
                </div>
                <div className="text-center mb-3">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {brand.name}
                  </h3>
                  {brand.description && (
                    <p className="text-sm text-gray-900">
                      {brand.description}
                    </p>
                  )}
                </div>
                <div className="text-center">
                  <span className="text-xs text-gray-500 font-medium">
                    {brand.partsCount || '0'} Parts
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No brands found for {activeTab}</p>
          </div>
        )}
        {filteredBrands.length > 0 && (
          <div className="text-center">
            <button className="px-8 py-2 border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors rounded">
              Load more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandSelectionSection;