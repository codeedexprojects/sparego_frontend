"use client";
import Image from "next/image";
import Link from "next/link";
import { IMG_URL } from "@/redux/baseUrl";
import React from "react";
function WatchHeroSection({ slides }) {
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
    <div>
       <section className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] bg-[#1B0002] text-white overflow-hidden">
      {/* Background Slides */}
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

      {/* Text + Button */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full text-center pb-8 sm:pb-12 md:pb-16 px-4 bg-black/30">
        {/* Title */}
        {/* <h2 className="text-white font-bold text-2xl sm:text-4xl md:text-3xl mb-6 drop-shadow-lg">
          {slides[currentSlide]?.title || "Explore Watches"}
        </h2> */}

        {/* Button */}
        {productId ? (
          <Link
            href={`/homeappliances/product-details/${productId}`}
            className="inline-block px-6 sm:px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-all duration-300 transform hover:scale-105 shadow-lg uppercase"
          >
            Start Exploring
          </Link>
        ) : (
          <Link
            href="/homeappliances/products"
            className="inline-block px-6 sm:px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-all duration-300 transform hover:scale-105 shadow-lg uppercase"
          >
            Start Exploring
          </Link>
        )}
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-red-600 scale-125"
                : "bg-gray-400 hover:bg-gray-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
    </div>
  );
}

export default WatchHeroSection;
