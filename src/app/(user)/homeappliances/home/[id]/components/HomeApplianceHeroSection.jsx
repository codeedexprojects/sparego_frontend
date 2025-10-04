"use client";

import Image from "next/image";
import Link from "next/link";
import { IMG_URL } from "@/redux/baseUrl";
import React from "react";

function HomeApplianceHeroSection({slides}) {
      const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [slides]);

   const productId =
    slides[currentSlide]?.products?.length > 0
      ? slides[currentSlide].products[0]._id
      : null;

  return (
<section className="relative overflow-hidden h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
  <div className="absolute inset-0">
    {slides.map((slide, index) => (
      <div
        key={slide._id}
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          index === currentSlide ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={`${IMG_URL}/${slide.image}`}
          alt={slide.title}
          fill
          className="object-cover"
          priority={index === 0}
        />
      </div>
    ))}
  </div>

  {slides.length > 0 && (
<div className="relative z-10 flex items-start h-full px-6 sm:px-8 md:px-12 lg:px-10 pt-10 sm:pt-16 md:pt-24 lg:pt-10">
        <div className="max-w-lvh">
        {/* Bold Large Title */}
        <h1 className="text-[#009FFF] text-3xl sm:text-4xl md:text-7xl lg:text-5xl font-bold mb-4 sm:mb-6 drop-shadow-2xl leading-tight">
          {slides[currentSlide]?.title || "Explore"}
        </h1>
        
        {/* Medium Description */}
        <p className="text-white text-base sm:text-lg md:text-xl mb-6 sm:mb-8 drop-shadow-lg leading-relaxed opacity-90">
          {slides[currentSlide]?.section?.name}
        </p>

        {productId ? (
          <Link
            href={`/homeappliances/product-details/${productId}`}
            className="inline-block px-6 sm:px-8 py-3 bg-blue-400 hover:bg-blue-400 text-white font-medium rounded transition-all duration-300 transform hover:scale-105 shadow-lg uppercase"
          >
            Start Exploring
          </Link>
        ) : (
          <Link
            href="/homeappliances/products"
            className="inline-block px-6 sm:px-8 py-3 bg-blue-400 hover:bg-blue-400 text-white font-medium rounded transition-all duration-300 transform hover:scale-105 shadow-lg uppercase"
          >
            Start Exploring
          </Link>
        )}
      </div>
    </div>
  )}

  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
    {slides.map((_, index) => (
      <button
        key={index}
        onClick={() => goToSlide(index)}
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          index === currentSlide
            ? "bg-white scale-125 shadow-lg"
            : "bg-white bg-opacity-50 hover:bg-opacity-75"
        }`}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
</section>

  )
}

export default HomeApplianceHeroSection
