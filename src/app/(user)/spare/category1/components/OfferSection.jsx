"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryBanners } from "@/redux/slices/bannerSlice"; // adjust path if needed

export default function PromotionalBannerSection() {
  const dispatch = useDispatch();
  const { categoryBanners, loading, error } = useSelector((state) => state.banner);

  useEffect(() => {
    dispatch(getCategoryBanners());
  }, [dispatch]);

  
  const limitedBanners = categoryBanners?.banners?.slice(0, 2) || [];

  if (loading) {
    return (
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="text-center text-gray-600">Loading banners...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="text-center text-red-500">Failed to load banners</div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {limitedBanners.map((promo, index) => (
            <div
              key={promo._id}
              className={`${
                index === 0 ? "bg-red-600 text-white" : "bg-gray-200 text-gray-900"
              } rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 md:p-8 min-h-[250px] sm:min-h-[200px]">
                {/* Content */}
                <div className="flex-1 w-full sm:pr-4 md:pr-6 text-center sm:text-left mb-4 sm:mb-0">
                  <h3
                    className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 leading-tight`}
                  >
                    {promo.title}
                  </h3>

                  {/* Discount Badge */}
                  {promo.discountText && (
                    <div className="inline-block bg-yellow-400 text-black text-base sm:text-lg font-bold px-3 sm:px-4 py-1 sm:py-2 rounded mb-3 sm:mb-4">
                      {promo.discountText}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed opacity-90 max-w-sm mx-auto sm:mx-0">
                    {promo.description}
                  </p>

                  {/* CTA Button */}
                  <Link
                    href={`/deals/${promo.section || "offer"}`}
                    className={`inline-block px-4 sm:px-6 py-2 border-2 rounded font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-105 ${
                      index === 0
                        ? "border-white text-white hover:bg-white hover:text-red-600"
                        : "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                    }`}
                  >
                    Explore deals
                  </Link>
                </div>

                {/* Image */}
                <div className="flex-shrink-0 order-first sm:order-last">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 relative mx-auto">
                    <Image
                      src={`/uploads/${promo.image}`}
                      alt={promo.title}
                      fill
                      className="object-contain drop-shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {limitedBanners.length === 0 && (
            <div className="col-span-2 text-center text-gray-500">
              No banners available
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
