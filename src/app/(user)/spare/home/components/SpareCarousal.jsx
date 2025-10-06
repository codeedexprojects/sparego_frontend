"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { IMG_URL } from "@/redux/baseUrl";
import { getBottomCarousel } from "@/redux/slices/carouselSlice";

export default function SparePartsCarousel() {
  const dispatch = useDispatch();
  const { bottomCarousel, loading, error } = useSelector((state) => state.carousel);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    dispatch(getBottomCarousel());
  }, [dispatch]);

  useEffect(() => {
    if (bottomCarousel.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % bottomCarousel.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [bottomCarousel.length]);

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
  if (!bottomCarousel || bottomCarousel.length === 0) {
    return (
      <section className="relative w-full overflow-hidden h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No carousel items available</p>
        </div>
      </section>
    );
  }

  return (
<section className="relative overflow-hidden max-w-8xl mx-auto  ">
          {/* Slides */}
      {bottomCarousel.map((slide, index) => (
       <div
    key={slide._id}
    className={`flex flex-col md:flex-row items-center justify-between transition-opacity duration-700 ease-in-out ${
      index === currentSlide ? "opacity-100" : "opacity-0 absolute inset-0"
    } px-6 md:px-12 lg:px-20 py-12 relative min-h-[400px] md:min-h-[500px] lg:min-h-[450px] max-w-9xl mx-auto `}
  >
          {slide.image && (
              <Image
                src={`${IMG_URL}/${slide.image}`}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
          )}
        </div>
      ))}

      {/* Dot Navigation - Only show if multiple slides */}
      {bottomCarousel.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {bottomCarousel.map((_, index) => (
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