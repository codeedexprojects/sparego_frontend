"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    [
      {
        id: 1,
        quote: "Reliable parts, fast delivery!",
        review: "Sparego has been a game-changer for my garage. The quality of spare parts and fast delivery service keep my customers happy every time.",
        name: "Ramesh Kumar,",
        title: "Auto Mechanic, Bengaluru",
        avatar: "/testimonials/ramesh-avatar.jpg",
        highlighted: false
      },
      {
        id: 2,
        quote: "Reliable parts, fast delivery!",
        review: "Sparego has been a game-changer for my garage. The quality of spare parts and fast delivery service keep my customers happy every time.",
        name: "Ramesh Kumar,",
        title: "Auto Mechanic, Bengaluru",
        avatar: "/testimonials/ramesh-avatar-2.jpg",
        highlighted: true
      },
      {
        id: 3,
        quote: "Reliable parts, fast delivery!",
        review: "Sparego has been a game-changer for my garage. The quality of spare parts and fast delivery service keep my customers happy every time.",
        name: "Ramesh Kumar,",
        title: "Auto Mechanic, Bengaluru",
        avatar: "/testimonials/ramesh-avatar-3.jpg",
        highlighted: false
      }
    ],
    [
      {
        id: 4,
        quote: "Excellent service and quality!",
        review: "The wide range of products and quick delivery has made my workshop operations much smoother. Highly recommend Sparego for all automotive needs.",
        name: "Priya Sharma,",
        title: "Workshop Owner, Delhi",
        avatar: "/testimonials/priya-avatar.jpg",
        highlighted: false
      },
      {
        id: 5,
        quote: "Best parts supplier in town!",
        review: "Quality products, competitive prices, and exceptional customer service. Sparego has become our go-to supplier for all vehicle parts.",
        name: "Amit Patel,",
        title: "Fleet Manager, Mumbai",
        avatar: "/testimonials/amit-avatar.jpg",
        highlighted: true
      },
      {
        id: 6,
        quote: "Outstanding product range!",
        review: "From two-wheelers to four-wheelers, they have everything. The authenticity of parts and timely delivery is what sets them apart.",
        name: "Suresh Reddy,",
        title: "Auto Parts Dealer, Hyderabad",
        avatar: "/testimonials/suresh-avatar.jpg",
        highlighted: false
      }
    ]
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Our clients say
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonials.map((slideGroup, slideIndex) => (
              <div 
                key={slideIndex}
                className="w-full flex-shrink-0"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {slideGroup.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className={`rounded-lg p-6 transition-all duration-300 ${
                        testimonial.highlighted 
                          ? 'bg-red-50 border-2 border-red-100 shadow-lg' 
                          : 'bg-white border border-gray-200 shadow-sm'
                      }`}
                    >
                      {/* Quote */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        "{testimonial.quote}"
                      </h3>
                      
                      {/* Review Text */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        "{testimonial.review}"
                      </p>
                      
                      {/* Customer Info */}
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Name and Title */}
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {testimonial.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Navigation */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-red-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonials ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}