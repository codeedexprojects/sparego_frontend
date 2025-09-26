"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getHomeCarouselBySection } from "@/redux/slices/carouselSlice";
import { IMG_URL } from "@/redux/baseUrl";

export default function FullBackgroundHeroSection() {
  const dispatch = useDispatch();
  const { carousel, loading, error } = useSelector((state) => state.carousel);

  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const sectionId = localStorage.getItem("sectionId");
    if (sectionId) {
      dispatch(getHomeCarouselBySection(sectionId));
    }
  }, [dispatch]);

  const slides = carousel?.mainCarousels || [];

  useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [slides]);

  const goToSlide = (index) => setCurrentSlide(index);

  if (loading) {
    return (
      <section className="h-[500px] flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading carousel...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="h-[500px] flex items-center justify-center bg-gray-100">
        <p className="text-red-600">
          {typeof error === "string" ? error : error.message}
        </p>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden h-[500px] sm:h-[550px] md:h-[600px] lg:h-[700px]">
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
        <div className="relative z-10 flex flex-col items-center justify-end h-full text-center pb-16">
          <Link
            href={`/product/${slides[currentSlide]?.products?.[0]?._id || ""}`}
            className="inline-block px-8 sm:px-10 py-4 bg-white hover:bg-gray-50 text-black font-medium text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-red-600/25"
          >
            {slides[currentSlide]?.title || "Explore"}
          </Link>

          <p className="mt-4 text-white text-sm sm:text-base max-w-md drop-shadow-lg">
            {slides[currentSlide]?.section?.name}
          </p>
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
  );
}
