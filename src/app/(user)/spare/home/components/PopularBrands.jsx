"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PopularBrandsSection() {
  const [activeTab, setActiveTab] = useState('TWO WHEELER');

  const tabs = ['FOUR WHEELER', 'TWO WHEELER'];

  const brandsData = {
    'TWO WHEELER': [
      {
        id: 1,
        name: 'Yamaha',
        logo: '/home/brand1.png',
        link: '/brands/yamaha'
      },
      {
        id: 2,
        name: 'Bajaj',
        logo: '/home/brand1.png',
        link: '/brands/bajaj'
      },
      {
        id: 3,
        name: 'TVS',
        logo: '/home/brand1.png',
        link: '/brands/tvs'
      },
      {
        id: 4,
        name: 'Honda',
        logo: '/home/brand1.png',
        link: '/brands/honda'
      },
      {
        id: 5,
        name: 'Royal Enfield',
        logo: '/home/brand1.png',
        link: '/brands/royal-enfield'
      },
      {
        id: 6,
        name: 'KTM',
        logo: '/home/brand1.png',
        link: '/brands/ktm'
      },
      {
        id: 7,
        name: 'Kawasaki',
        logo: '/home/brand1.png',
        link: '/brands/kawasaki'
      },
      {
        id: 8,
        name: 'Vespa',
        logo: '/home/brand1.png',
        link: '/brands/vespa'
      },
      {
        id: 9,
        name: 'Harley davidson',
        logo: '/home/brand1.png',
        link: '/brands/harley-davidson'
      },
      {
        id: 10,
        name: 'Triumph',
        logo: '/home/brand1.png',
        link: '/brands/triumph'
      }
    ],
    'FOUR WHEELER': [
      {
        id: 11,
        name: 'Toyota',
        logo: '/home/brand1.png',
        link: '/brands/toyota'
      },
      {
        id: 12,
        name: 'Honda',
        logo: '/home/brand1.png',
        link: '/brands/honda-cars'
      },
      {
        id: 13,
        name: 'Hyundai',
        logo: '/home/brand1.png',
        link: '/brands/hyundai'
      },
      {
        id: 14,
        name: 'Maruti Suzuki',
        logo: '/home/brand1.png',
        link: '/brands/maruti'
      },
      {
        id: 15,
        name: 'Tata',
        logo: '/home/brand1.png',
        link: '/brands/tata'
      },
      {
        id: 16,
        name: 'Mahindra',
        logo: '/home/brand1.png',
        link: '/brands/mahindra'
      },
      {
        id: 17,
        name: 'Ford',
        logo: '/home/brand1.png',
        link: '/brands/ford'
      },
      {
        id: 18,
        name: 'Volkswagen',
        logo: '/home/brand1.png',
        link: '/brands/volkswagen'
      },
      {
        id: 19,
        name: 'BMW',
        logo: '/home/brand1.png',
        link: '/brands/bmw'
      },
      {
        id: 20,
        name: 'Mercedes',
        logo: '/home/brand1.png',
        link: '/brands/mercedes'
      }
    ]
  };

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
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-6 mb-8">
          {brandsData[activeTab].slice(0, 10).map((brand) => (
            <Link
              key={brand.id}
              href={brand.link}
              className="group flex flex-col items-center"
            >
              {/* Brand Logo Container */}
              <div className="w-16 h-16 mb-3 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100 group-hover:border-red-200 group-hover:bg-red-50 transition-all duration-300">
                <div className="w-10 h-10 relative">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    fill
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
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

        {/* View More Button */}
        <div className="flex justify-center">
          <button className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:border-red-300 hover:text-red-600 transition-colors duration-300 text-sm">
            View more
          </button>
        </div>
      </div>
    </section>
  );
}