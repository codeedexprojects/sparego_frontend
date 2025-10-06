"use client";
import React from 'react';
import { Truck, Headphones, Shield, Tag, Headset, ShieldCheck, BadgePercent } from 'lucide-react';

export default function FeaturesBenefitsSection() {
  const features = [
    {
      id: 1,
      icon: (
       <Truck className="w-10 h-10 text-[#BE1E2D]"  />
      ),
      title: "FREE SHIPPING",
      subtitle: "For orders from $1000"
    },
    {
      id: 2,
      icon: (
              <Headset className="w-10 h-10 text-[#BE1E2D]"  />

      ),
      title: "SUPPORT 24/7",
      subtitle: "Call us anytime"
    },
    {
      id: 3,
      icon: (
              <ShieldCheck className="w-10 h-10 text-[#BE1E2D]"  />

      ),
      title: "100% SAFETY",
      subtitle: "Only secure payment"
    },
    {
      id: 4,
      icon: (
              <BadgePercent className="w-10 h-10 text-[#BE1E2D]"  />

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
                <div className="flex-shrink-0 w-12 h-12  rounded-full flex items-center justify-center">
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
                <div className="flex-shrink-0 w-12 h-12  rounded-full flex items-center justify-center">
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


