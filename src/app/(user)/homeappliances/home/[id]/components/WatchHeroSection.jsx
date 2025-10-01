"use client"
import Image from "next/image";
import Link from "next/link";
import { IMG_URL } from "@/redux/baseUrl";
import React from "react";
function WatchHeroSection({slides}) {
      const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [slides]);

  return (
    <div>
<section className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] bg-[#1B0002] text-white">
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
            className="object-contain sm:object-cover md:object-contain"
            priority={index === 0}
          />
        </div>
      ))}

     <div className="relative z-10 flex flex-col items-center justify-end h-full text-center pb-8 sm:pb-12 md:pb-16 px-4">
  <Link
    href={`/product/${slides[currentSlide]?.products?.[0]?._id || ""}`}
    className="inline-block px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 text-white font-semibold text-base sm:text-xl md:text-2xl rounded-lg transition uppercase"
  >
    {slides[currentSlide]?.title || "Explore Watches"}
  </Link>
</div>

    </section>
    </div>
  )
}

export default WatchHeroSection
