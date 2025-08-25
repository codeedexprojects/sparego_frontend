"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SpecialOffersCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const offers = [
    {
      id: 1,
      badge: "LIMITED TIME",
      title: "Up to 25% off on Spare Parts",
      description: "Genuine automotive & machinery parts — quality guaranteed. Grab fast-moving essentials today.",
      buttonText: "Shop now",
      buttonLink: "/spareparts",
      image: "/landing/carousel.png"
    },
    {
      id: 2,
      badge: "FLASH SALE",
      title: "30% off on Home Appliances",
      description: "Upgrade your home with premium cleaning tools and energy-efficient appliances at unbeatable prices.",
      buttonText: "Explore deals",
      buttonLink: "/appliances",
      image: "/landing/carousel.png"
    },
    {
      id: 3,
      badge: "EXCLUSIVE",
      title: "Premium Watches Collection",
      description: "Discover luxury timepieces from world-renowned brands. Limited edition pieces now available.",
      buttonText: "View collection",
      buttonLink: "/watches",
      image: "/landing/carousel.png"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [offers.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className=" mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Special Offers
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Save more across our four stores — limited deals, bundles, and exclusive member savings.
          </p>
        </div>

       
        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="w-full flex-shrink-0 relative min-h-[400px] overflow-hidden"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="relative z-10 flex items-center min-h-[400px] p-8 md:p-12">
                    <div className="max-w-lg text-white">
                      <div className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6 bg-red-600 text-white transform -rotate-2 shadow-lg">
                        {offer.badge}
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                        {offer.title}
                      </h3>
                      
                      <p className="text-gray-100 text-base md:text-lg mb-8 leading-relaxed">
                        {offer.description}
                      </p>
                      
                      <Link
                        href={offer.buttonLink}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        {offer.buttonText}
                        <svg 
                          className="w-4 h-4" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-3">
          {offers.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-red-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}