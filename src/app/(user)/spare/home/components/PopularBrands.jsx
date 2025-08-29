"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrands } from '@/redux/slices/brandSlice';

export default function PopularBrandsSection() {
  const [activeTab, setActiveTab] = useState('Two-wheeler');
  const dispatch = useDispatch();
  const { brands, loading, error } = useSelector((state) => state.brand);

  const tabs = ['Four-wheeler', 'Two-wheeler'];

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  const filteredBrands = brands.filter(brand => 
    brand.vehicleType === activeTab && brand.isActive
  );

  const sortedBrands = [...filteredBrands].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  const displayedBrands = sortedBrands.slice(0, 10);

  const getLogoUrl = (logoPath) => {
    
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              POPULAR BRANDS
            </h2>
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <div
                  key={tab}
                  className="pb-2 text-sm font-medium text-gray-400 border-b-2 border-transparent"
                >
                  {tab}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-6 mb-8">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 mb-3 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            POPULAR BRANDS
          </h2>
          <p className="text-red-500">Error loading brands: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex items-center justify-between mb-12">
          {/* Left - Section Title */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              POPULAR BRANDS
            </h2>
          </div>
          
          {/* Right - Tabs */}
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm font-medium transition-colors duration-200 border-b-2 ${
                  activeTab === tab 
                    ? 'text-red-600 border-red-600' 
                    : 'text-gray-400 border-transparent hover:text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Brands Grid */}
        {displayedBrands.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-6 mb-8">
              {displayedBrands.map((brand) => (
                <Link
                  key={brand._id}
                  href={`/brands/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group flex flex-col items-center"
                >
                  {/* Brand Logo Container */}
                  <div className="w-16 h-16 mb-3 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100 group-hover:border-red-200 group-hover:bg-red-50 transition-all duration-300">
                    <div className="w-10 h-10 relative">
                      <Image
                        src={getLogoUrl(brand.logo)}
                        alt={`${brand.name} logo`}
                        fill
                        className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        onError={(e) => {
                          e.target.src = '/home/brand1.png';
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Brand Name */}
                  <span className="text-xs text-gray-600 text-center font-medium group-hover:text-red-600 transition-colors duration-300">
                    {brand.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* View More Button - Only show if there are more brands */}
            {filteredBrands.length > 10 && (
              <div className="flex justify-center">
                <button className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:border-red-300 hover:text-red-600 transition-colors duration-300 text-sm">
                  View more
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No brands found for {activeTab}</p>
          </div>
        )}
      </div>
    </section>
  );
}