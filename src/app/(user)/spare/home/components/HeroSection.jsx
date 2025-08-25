"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SpareHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Find the Right Part —",
      subtitle: "Fast and Easy.",
      description: "Browse by brand, category, or vehicle compatibility.",
      buttonText: "Start Exploring",
      buttonLink: "/spareparts",
      image: "/home/carousel.png", 
    },
    {
      id: 2,
      title: "Quality Parts for",
      subtitle: "Every Machine.",
      description: "Genuine automotive and machinery components available.",
      buttonText: "Browse Parts",
      buttonLink: "/spareparts/automotive",
      image: "/home/carousel.png",
    },
    {
      id: 3,
      title: "Expert Support",
      subtitle: "When You Need It.",
      description: "Get help finding the perfect part for your vehicle.",
      buttonText: "Get Help",
      buttonLink: "/support",
      image: "/home/carousel.png", 
    }
  ];

  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); 

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="bg-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative h-[500px] sm:h-[550px] md:h-[600px] lg:h-[500px] flex items-center">
          <div className="w-full h-full">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex flex-col lg:flex-row items-center h-full px-4 sm:px-6 lg:px-12 py-8 lg:py-0">
                  {/* Text Content */}
                  <div className="w-full lg:flex-1 lg:max-w-lg text-center lg:text-left mb-8 lg:mb-0 lg:pr-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 leading-tight mb-4 md:mb-6">
                      {slide.title}
                      <br />
                      <span className="font-normal">{slide.subtitle}</span>
                    </h1>
                    
                    <p className="text-gray-600 text-base sm:text-lg mb-6 md:mb-8 leading-relaxed max-w-md mx-auto lg:mx-0">
                      {slide.description}
                    </p>
                    
                    <Link
                      href={slide.buttonLink}
                      className="inline-block px-6 sm:px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                  
                  {/* Image */}
                  <div className="w-full lg:flex-1 flex justify-center items-center">
                    <div className="w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 relative">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Navigation */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-red-600 scale-125' 
                  : 'bg-gray-400 hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}