"use client";
import React from 'react';
import { Truck, Headphones, Shield, Tag } from 'lucide-react';

export default function FeaturesBenefitsSection() {
  const features = [
    {
      id: 1,
      icon: (
        <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4zm0 6h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8zm2 2v4h2v-4H5zm4 0v4h2v-4H9zm4 0v4h2v-4h-2z"/>
          <path d="M7 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2H7V2z"/>
        </svg>
      ),
      title: "FREE SHIPPING",
      subtitle: "For orders from $1000"
    },
    {
      id: 2,
      icon: (
        <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      title: "SUPPORT 24/7",
      subtitle: "Call us anytime"
    },
    {
      id: 3,
      icon: (
        <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
        </svg>
      ),
      title: "100% SAFETY",
      subtitle: "Only secure payment"
    },
    {
      id: 4,
      icon: (
        <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1H5C3.89,1 3,1.89 3,3V7H9V9H3V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V9M19,19H5V17H19V19Z"/>
        </svg>
      ),
      title: "HOT OFFERS",
      subtitle: "Discount up to 75 %"
    }
  ];

  return (
    
    <section className="py-6 bg-gray-100 border-y border-gray-200">
      <div className="">
        <div className="lg:px-6">
          <div className="flex overflow-x-auto scrollbar-hide gap-6 px-4 lg:hidden pb-2">
            {features.map((feature) => (
              <div 
                key={feature.id}
                className="flex items-center gap-4 min-w-[280px] flex-shrink-0"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {feature.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden lg:grid lg:grid-cols-4 gap-6 px-6">
            {features.map((feature, index) => (
              <div 
                key={feature.id}
                className={`flex items-center gap-4 ${
                  index < features.length - 1 ? 'lg:border-r lg:border-gray-300 lg:pr-6' : ''
                }`}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {feature.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;  /* Safari and Chrome */
        }
      `}</style>
    </section>
  );
}