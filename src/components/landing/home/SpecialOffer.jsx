"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getLandingCarousel } from "@/redux/slices/carouselSlice";
import { IMG_URL } from "@/redux/baseUrl";

export default function SpecialOffersCarousel() {
  const dispatch = useDispatch();
  const { landingCarousel, loading, error } = useSelector((s) => s.carousel);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    dispatch(getLandingCarousel());
  }, [dispatch]);

  useEffect(() => {
    if (!landingCarousel.length) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % landingCarousel.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [landingCarousel]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % landingCarousel.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + landingCarousel.length) % landingCarousel.length
    );
  };

  if (loading) return <p className="text-center py-8">Loading carousel…</p>;
  if (error)
    return <p className="text-center text-red-500 py-8">Error: {error}</p>;

  return (
    <section className="py-16 bg-gray-50" id="shop">
      <div className="mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Special Offers
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Save more across our four stores — limited deals, bundles, and
            exclusive member savings.
          </p>
        </div>

        {landingCarousel.length > 0 && (
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {landingCarousel.map((offer) => (
                  <div
                    key={offer._id}
                    className="w-full flex-shrink-0 relative min-h-[400px] overflow-hidden"
                  >
                    <div className="absolute inset-0">
                      <img
                        src={`${IMG_URL}/${offer.image}`}
                        alt={offer.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="relative z-10 flex items-center min-h-[400px] p-8 md:p-12 bg-black/40">
                      <div className="max-w-lg text-white">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                          {offer.title}
                        </h3>

                        <Link
                          href="/shop"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          Shop Now
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
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
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}

        <div className="flex justify-center mt-8 space-x-3">
          {landingCarousel.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-red-600 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
