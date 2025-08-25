"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PromotionalBannerSection() {
  const promotions = [
    {
      id: 1,
      title: "Chain Sprocket Kit",
      discount: "15% OFF",
      description: "Smooth rides start here. Precision fit for top two-wheeler brands.",
      buttonText: "Explore deals",
      buttonLink: "/deals/chain-sprocket",
      image: "/home/offer1.png",
      bgColor: "bg-red-600",
      discountBg: "bg-yellow-400",
      textColor: "text-white"
    },
    {
      id: 2,
      title: "Car Steering Kit -",
      discount: "50% OFF",
      description: "Smooth rides start here. Precision fit for top four-wheeler brands.",
      buttonText: "Explore deals", 
      buttonLink: "/deals/steering-kit",
      image: "/home/offer2.png",
      bgColor: "bg-gray-200",
      discountBg: "bg-yellow-400",
      textColor: "text-gray-900"
    }
  ];

  return (
    <section className="py-8 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className={`${promo.bgColor} rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              {/* Mobile: Vertical Stack, Desktop: Horizontal Flex */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 md:p-8 min-h-[250px] sm:min-h-[200px]">
                
                {/* Content */}
                <div className="flex-1 w-full sm:pr-4 md:pr-6 text-center sm:text-left mb-4 sm:mb-0">
                  {/* Title */}
                  <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold ${promo.textColor} mb-2 sm:mb-3 leading-tight`}>
                    {promo.title}
                  </h3>
                  
                  {/* Discount Badge */}
                  <div className={`inline-block ${promo.discountBg} text-black text-base sm:text-lg font-bold px-3 sm:px-4 py-1 sm:py-2 rounded mb-3 sm:mb-4`}>
                    {promo.discount}
                  </div>
                  
                  {/* Description */}
                  <p className={`${promo.textColor} text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed opacity-90 max-w-sm mx-auto sm:mx-0`}>
                    {promo.description}
                  </p>
                  
                  {/* CTA Button */}
                  <Link
                    href={promo.buttonLink}
                    className={`inline-block px-4 sm:px-6 py-2 border-2 rounded font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-105 ${
                      promo.id === 1 
                        ? 'border-white text-white hover:bg-white hover:text-red-600' 
                        : 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
                    }`}
                  >
                    {promo.buttonText}
                  </Link>
                </div>
                
                {/* Image */}
                <div className="flex-shrink-0 order-first sm:order-last">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 relative mx-auto">
                    <Image
                      src={promo.image}
                      alt={promo.title}
                      fill
                      className="object-contain drop-shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}