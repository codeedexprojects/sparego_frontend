"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function PopularItemsSection() {
  const [activeTab, setActiveTab] = useState('TWO WHEELER');

  const tabs = ['TWO WHEELER', 'FOUR WHEELER'];

  const itemsData = {
    'TWO WHEELER': [
      {
        id: 1,
        title: "Brake Pads / Disc Rotors",
        productCount: "230 Products",
        image: "/home/part1.png"
      },
      {
        id: 2,
        title: "Oil Filters",
        productCount: "190 Products", 
        image: "/home/part2.png"
      },
      {
        id: 3,
        title: "Chain Sprocket Kit",
        productCount: "95 Products",
        image: "/home/part3.png"
      },
      {
        id: 4,
        title: "Indicators & Headlights",
        productCount: "123 Products",
        image: "/home/part1.png"
      },
      {
        id: 5,
        title: "Brake Pads / Disc Rotors",
        productCount: "230 Products",
        image: "/home/part1.png"
      },
      {
        id: 6,
        title: "Brake Pads / Disc Rotors", 
        productCount: "230 Products",
        image: "/home/part2.png"
      },
      {
        id: 7,
        title: "Rear View Mirrors",
        productCount: "340 Products",
        image: "/home/part3.png"
      }
    ],
    'FOUR WHEELER': [
      {
        id: 8,
        title: "Engine Oil & Filters",
        productCount: "450 Products",
        image: "/home/part1.png"
      },
      {
        id: 9,
        title: "Brake Systems",
        productCount: "320 Products",
        image: "/home/part2.png"
      },
      {
        id: 10,
        title: "Suspension Parts",
        productCount: "275 Products", 
        image: "/home/part3.png"
      },
      {
        id: 11,
        title: "Electrical Components",
        productCount: "180 Products",
        image: "/home/part1.png"
      },
      {
        id: 12,
        title: "Body Parts",
        productCount: "560 Products",
        image: "/home/part2.png"
      },
      {
        id: 13,
        title: "Air Filters",
        productCount: "210 Products",
        image: "/home/part2.png"
      },
      {
        id: 14,
        title: "Transmission Parts",
        productCount: "390 Products",
        image: "/home/part3.png"
      }
    ]
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            POPULAR ITEM
          </h2>
          
          {/* Centered Tabs */}
          <div className="flex justify-center">
            <div className="flex space-x-12 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-4 text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab 
                      ? 'text-black border-b-2 border-red-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {itemsData[activeTab].slice(0, 7).map((item, index) => (
            <div key={item.id}>
              {index === 6 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-6 h-[120px] flex items-center justify-center hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                  <div className="text-gray-600 group-hover:text-red-600 transition-colors duration-300 flex items-center gap-2">
                    <span className="text-lg font-medium">View all</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer group h-[120px]">
                  <div className="flex items-center h-full gap-4">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {item.productCount}
                      </p>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 relative">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}