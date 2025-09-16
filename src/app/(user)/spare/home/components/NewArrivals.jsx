"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { getFullProductList } from '@/redux/slices/productSlice';

export default function NewArrivalsSection() {
  const [activeTab, setActiveTab] = useState('FOUR WHEELER');
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  const tabs = ['FOUR WHEELER', 'TWO WHEELER'];

  useEffect(() => {
    dispatch(getFullProductList());
  }, [dispatch]);

  // Filter products based on vehicle type and get only 4 products
  const filterProductsByVehicleType = (vehicleType) => {
    if (!products || !products.products) return [];
    
    return products.products
      .filter(product => {
        // Normalize vehicle type comparison
        const productVehicleType = product.vehicleType || product.mainCategory?.name || '';
        return productVehicleType.toLowerCase().includes(vehicleType.toLowerCase().replace(' ', ''));
      })
      .slice(0, 4); // Get only first 4 products
  };

  // Format product data for display
  const formatProductData = (products) => {
    return products.map(product => ({
      id: product._id,
      title: product.name,
      brand: product.brand?.name || 'Multiple brands',
      discount: product.discount ? `${product.discount}% off` : 'Special offer',
      image: product.images && product.images.length > 0 
        ? `/uploads/${product.images[0]}` 
        : '/home/product1.png', // Fallback image
      link: `/spare/product-details/${product._id}`,
      price: product.price,
      originalPrice: product.originalPrice || Math.round(product.price / (1 - (product.discount || 0) / 100))
    }));
  };

  const productsData = {
    'FOUR WHEELER': formatProductData(filterProductsByVehicleType('Four-Wheeler')),
    'TWO WHEELER': formatProductData(filterProductsByVehicleType('Two-Wheeler'))
  };

  // Show loading state
  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                NEW ARRIVALS
              </h2>
            </div>
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className="pb-2 text-sm font-medium text-gray-400 border-b-2 border-transparent"
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
                <div className="mb-4 flex justify-center">
                  <div className="w-40 h-40 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <p className="text-red-600">Error loading products: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header with Tabs */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
          {/* Left - Section Title */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              NEW ARRIVALS
            </h2>
          </div>
          
          {/* Right - Tabs */}
          <div className="flex space-x-4 md:space-x-8">
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

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsData[activeTab].length > 0 ? (
            productsData[activeTab].map((product) => (
              <div key={product.id} className="group">
                <Link href={product.link}>
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
                    {/* Discount Badge */}
                    {product.discount && (
                      <div className="absolute bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md ml-2 mt-2 z-10">
                        {product.discount}
                      </div>
                    )}
                    
                    {/* Product Image */}
                    <div className="mb-4 flex justify-center flex-grow">
                      <div className="w-40 h-40 relative">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = '/home/product1.png'; // Fallback image
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="mt-auto">
                      <h3 className="text-md font-semibold text-gray-900 mb-1 line-clamp-2 h-12">
                        {product.title}
                      </h3>
                      
                      <p className="text-sm text-gray-500 mb-2">
                        {product.brand}
                      </p>
                      
                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-gray-900">
                            ₹{product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                        <button className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            // No products found message
            <div className="col-span-4 text-center py-12">
              <p className="text-gray-500">No products found for {activeTab}</p>
            </div>
          )}
        </div>

        {/* View All Button */}
        {productsData[activeTab].length > 0 && (
          <div className="text-center mt-12">
            <Link
              href={`/products?vehicleType=${activeTab.toLowerCase().replace(' ', '-')}`}
              className="inline-block px-8 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              View All {activeTab} Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}