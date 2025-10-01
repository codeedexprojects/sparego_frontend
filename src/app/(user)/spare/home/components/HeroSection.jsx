"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { getHomeCarousel } from "@/redux/slices/carouselSlice";
import { IMG_URL } from "@/redux/baseUrl";

export default function SpareHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const { carousel, loading, error } = useSelector((state) => state.carousel);

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

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <section className="bg-gray-100 relative overflow-hidden h-[500px] sm:h-[550px] md:h-[600px] lg:h-[500px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading carousel...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-100 relative overflow-hidden h-[500px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">
            Error loading carousel:{" "}
            {typeof error === "string"
              ? error
              : error.message || "Unknown error"}
          </p>
        </div>
      </section>
    );
  }

  if (carousel.length === 0) {
    return (
      <section className="bg-gray-100 relative overflow-hidden h-[500px] sm:h-[550px] md:h-[600px] lg:h-[500px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No carousel items available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F3F3F3] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative h-[500px] sm:h-[550px] md:h-[600px] lg:h-[500px] flex items-center">
          <div className="w-full h-full">
            {carousel.map((slide, index) => {
              // Get the first product ID if products exist
              const productId = slide.products && slide.products.length > 0 
                ? slide.products[0]._id 
                : null;
              
              return (
                <div
                  key={slide._id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row items-center h-full px-4 sm:px-6 lg:px-12 py-8 lg:py-0">
                    {/* Text Content */}
                    <div className="w-full lg:flex-1 text-center lg:text-left mb-8 lg:mb-0 lg:pr-8">
                      <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 leading-tight mb-4 md:mb-6">
                        {slide.title}
                      </h1>

                      {productId ? (
                        <Link
                          href={`/spare/product-details/${productId}`}
                          className="inline-block px-6 sm:px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          Start Exploring
                        </Link>
                      ) : (
                        <Link
                          href="/spareparts"
                          className="inline-block px-6 sm:px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          Start Exploring
                        </Link>
                      )}
                    </div>

                    {/* Image */}
                    <div className="w-full lg:flex-1 flex justify-center items-center">
                      <div className="w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 relative">
                        <Image
                          src={`${IMG_URL}/${slide.image}`} 
                          alt={slide.title}
                          fill
                          className="object-contain drop-shadow-2xl"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot Navigation */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {carousel.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-1 h-1 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-red-600 scale-125"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="bg-white p-5 "></div>
    </section>
  );
}