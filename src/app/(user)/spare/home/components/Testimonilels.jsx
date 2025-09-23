"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getTestimonials } from '@/redux/slices/testimonialSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IMG_URL } from '@/redux/baseUrl';


export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const {testimonials, loading, error} = useSelector(
    (state)=>state.testimonial
  );

useEffect(()=>{
  dispatch(getTestimonials())
},[dispatch])

 
 useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [testimonials]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

   if (loading) return <p>Loading testimonials...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

    const chunkedTestimonials = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    chunkedTestimonials.push(testimonials.slice(i, i + 3));
  }


  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Our clients say
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {chunkedTestimonials.map((slideGroup, slideIndex) => (
              <div 
                key={slideIndex}
                className="w-full flex-shrink-0"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {slideGroup.map((testimonial) => (
                    <div
                      key={testimonial._id}
                      className={`rounded-lg p-6 transition-all duration-300 ${
                        testimonial.highlighted 
                          ? 'bg-red-50 border-2 border-red-100 shadow-lg' 
                          : 'bg-white border border-gray-200 shadow-sm'
                      }`}
                    >
                      {/* Quote */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        "{testimonial.title}"
                      </h3>
                      
                      {/* Review Text */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        "{testimonial.message}"
                      </p>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                          <Image
                            src={`${IMG_URL}/${testimonial.image}`}
                            alt={testimonial.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {testimonial.designation}
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