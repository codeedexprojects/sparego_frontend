"use client";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { IMG_URL } from '@/redux/baseUrl';
import { getSectionBrandById } from '@/redux/slices/brandSlice';

const BrandSelectionSection = () => {
  const dispatch = useDispatch();
  const { brands, loading, error } = useSelector((state) => state.brand);

  useEffect(() => {
    const sectionId = localStorage.getItem("sectionId");
    if (sectionId) {
      dispatch(getSectionBrandById(sectionId));
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="bg-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
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
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-700">Popular Brands</h2>
        </div>
        {brands.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {brands.map((brand, index) => (
              <div
                key={`${brand._id}-${index}`}
                className="bg-white border border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="w-30 h-30 rounded mb-4 flex items-center justify-center mx-auto">
                  {brand.logo ? (
                    <Image
                      src={`${IMG_URL}/${brand.logo}`}
                      alt={`${brand.name} logo`}
                      width={80}
                      height={60}
                      className=" w-30 h-30 object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xs text-gray-400">No Logo</span>
                    </div>
                  )}
                </div>
                <div className="text-center mb-3">
                  <h3 className="font-semibold text-gray-900 text-sm">{brand.name}</h3>
                 
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No brands found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandSelectionSection;
