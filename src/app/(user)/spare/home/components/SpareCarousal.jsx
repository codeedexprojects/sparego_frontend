"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { getHomeCarousel } from "@/redux/slices/carouselSlice";
import { IMG_URL } from "@/redux/baseUrl";

export default function SparePartsCarousel() {
  const dispatch = useDispatch();
  const { carousel, loading, error } = useSelector((state) => state.carousel);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    dispatch(getHomeCarousel());
  }, [dispatch]);

  useEffect(() => {
    if (carousel.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carousel.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [carousel.length]);

  // Show loading state
  if (loading) {
    return (
      <section className="relative w-full overflow-hidden h-96 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading carousel...</p>
        </div>
      </section>
    );
  }

if (error) {
  return (
    <section className="bg-gray-100 relative overflow-hidden h-[500px] flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-600">
          Error loading carousel: {typeof error === "string" ? error : error.message || "Unknown error"}
        </p>
      </div>
    </section>
  );
}

  // Show empty state if no carousel items
  if (!carousel || carousel.length === 0) {
    return (
      <section className="relative w-full overflow-hidden h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No carousel items available</p>
        </div>
      </section>
    );
  }

  return (
<section className="relative overflow-hidden mx-4 md:mx-auto max-w-7xl ">
          {/* Slides */}
      {carousel.map((slide, index) => (
        <div
          key={slide._id}
          className={`flex flex-col md:flex-row items-center justify-between transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0 absolute inset-0"
          } bg-red-700 text-white px-6 md:px-12 lg:px-20 py-12 `}
        >
          {/* Left Content */}
          <div className="max-w-xl mb-8 md:mb-0">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug mb-4">
              {slide.title}
            </h2>
            {slide.description && (
              <p className="text-sm md:text-base text-gray-100 mb-6">
                {slide.description}
              </p>
            )}
            {slide.features && slide.features.length > 0 && (
              <ul className="space-y-2 text-sm md:text-base">
                {slide.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right Image */}
          {slide.image && (
            <div className="relative w-full md:w-1/2 h-64 md:h-80 flex justify-center">
              <Image
                src={`${IMG_URL}/${slide.image}`}
                alt={slide.title}
                fill
                className="object-contain"
                priority={index === 0}
              />
            </div>
          )}
        </div>
      ))}

      {/* Dot Navigation - Only show if multiple slides */}
      {carousel.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carousel.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white scale-125 shadow"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}