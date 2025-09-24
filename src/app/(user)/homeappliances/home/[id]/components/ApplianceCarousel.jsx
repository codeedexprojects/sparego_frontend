"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function WatchCarousel() {
  const slides = [
    {
      id: 1,
      title: "POWER YOUR JOURNEY WITH TRUSTED SPARES",
      description:
        "From brake pads to filters — discover OEM-grade two-wheeler and four-wheeler parts trusted by riders and mechanics alike.",
      features: [
        "🚚 Fast Nationwide Delivery",
        "🛠 100% Genuine & Tested Parts",
        "🌐 24x7 Support & Order Tracking",
      ],
      image: "/watches/watch2.png", // 👉 replace with your grouped image (car+bike+parts)
    },
    {
      id: 2,
      title: "QUALITY YOU CAN RELY ON",
      description:
        "Choose from top brands and certified spares to keep your vehicles running smoothly.",
      features: [
        "✅ OEM Certified",
        "⚡ Quick Installation",
        "📦 Hassle-free Returns",
      ],
      image: "/watches/watch2.png",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`flex flex-col md:flex-row items-center justify-between transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0 absolute inset-0"
          } bg-red-700 text-white px-6 md:px-12 lg:px-20 py-12 rounded-lg`}
        >
          {/* Left Content */}
          <div className="max-w-xl mb-8 md:mb-0">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug mb-4">
              {slide.title}
            </h2>
            <p className="text-sm md:text-base text-gray-100 mb-6">
              {slide.description}
            </p>
            <ul className="space-y-2 text-sm md:text-base">
              {slide.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Image */}
          <div className="relative w-full md:w-1/2 h-64 md:h-80 flex justify-center">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-contain"
              priority={index === 0}
            />
          </div>
        </div>
      ))}

      {/* Dot Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
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
    </section>
  );
}
