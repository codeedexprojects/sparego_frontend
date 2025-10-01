"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function FullBackgroundHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      buttonText: "Start Exploring",
      buttonLink: "/spareparts",
      description: "Explore timeless designs and modern innovations — premium watches built for precision, durability, and elegance.",
      image: "/watches/watch.png",
    },
    {
      id: 2,
      buttonText: "Browse Parts",
      buttonLink: "/spareparts/automotive",
      description: "Genuine automotive and machinery components available.",
      image: "/watches/watch.png",
    },
    {
      id: 3,
      buttonText: "Get Help",
      buttonLink: "/support",
      description: "Get help finding the perfect part for your vehicle.",
      image: "/watches/watch.png",
    },
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
    <section className="relative overflow-hidden h-[500px] sm:h-[550px] md:h-[600px] lg:h-[700px]">
      {/* Background Images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.buttonText}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Content overlay - only button + description */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full text-center pb-16">
        <Link
          href={slides[currentSlide].buttonLink}
          className="inline-block px-8 sm:px-10 py-4 bg-white hover:bg-gray-50 text-black font-medium text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-red-600/25"
        >
          {slides[currentSlide].buttonText}
        </Link>

        <p className="mt-4 text-white text-sm sm:text-base max-w-md drop-shadow-lg">
          {slides[currentSlide].description}
        </p>
      </div>

      {/* Dot Navigation */}
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
  );
}
