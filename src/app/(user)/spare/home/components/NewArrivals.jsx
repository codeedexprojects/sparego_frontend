"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function NewArrivalsSection() {
  const [activeTab, setActiveTab] = useState('FOUR WHEELER');

  const tabs = ['FOUR WHEELER', 'TWO WHEELER'];

  const productsData = {
    'FOUR WHEELER': [
      {
        id: 1,
        title: "Brake Pads & Discs",
        brands: "20 brands",
        products: "350 products",
        discount: "50% off",
        image: "/home/product1.png",
        link: "/products/brake-pads-discs"
      },
      {
        id: 2,
        title: "Suspension Parts", 
        brands: "34 brands",
        products: "245 products",
        discount: "67% off",
        image: "/home/product2.png",
        link: "/products/suspension-parts"
      },
      {
        id: 3,
        title: "Steering's",
        brands: "45 brands", 
        products: "123 products",
        discount: "56% off",
        image: "/home/product3.png",
        link: "/products/steering"
      },
      {
        id: 4,
        title: "Wiper Blades",
        brands: "12 brands",
        products: "987 products", 
        discount: "56% off",
        image: "/home/part1.png",
        link: "/products/wiper-blades"
      }
    ],
    'TWO WHEELER': [
      {
        id: 5,
        title: "Chain & Sprockets",
        brands: "15 brands",
        products: "280 products",
        discount: "45% off", 
        image: "/home/part2.png",
        link: "/products/chain-sprockets"
      },
      {
        id: 6,
        title: "Brake Systems",
        brands: "22 brands",
        products: "195 products",
        discount: "60% off",
        image: "/home/part3.png", 
        link: "/products/brake-systems"
      },
      {
        id: 7,
        title: "Air Filters",
        brands: "18 brands",
        products: "165 products",
        discount: "35% off",
        image: "/home/product2.png",
        link: "/products/air-filters"
      },
      {
        id: 8,
        title: "Headlights",
        brands: "25 brands", 
        products: "320 products",
        discount: "50% off",
        image: "/home/product3.png",
        link: "/products/headlights"
      }
    ]
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header with Tabs */}
        <div className="flex items-center justify-between mb-12">
          {/* Left - Section Title */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              NEW ARRIVALS
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

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsData[activeTab].map((product) => (
            <Link
              key={product.id}
              href={product.link}
              className="group"
            >
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
                {/* Product Image */}
                <div className="mb-6 flex justify-center">
                  <div className="w-24 h-24 relative">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-1">
                    {product.brands}
                  </p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-gray-500">
                      {product.products}
                    </span>
                    <span className="text-sm font-semibold text-red-600">
                      {product.discount}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}