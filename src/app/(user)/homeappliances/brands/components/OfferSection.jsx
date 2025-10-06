"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { IMG_URL } from "@/redux/baseUrl";
import { getBrandBanners } from "@/redux/slices/dynamicBannerSlice";

export default function PromotionalBannerSection({ page = "brand" }) {
  const dispatch = useDispatch();
  const { bannersBySection, loading, error } = useSelector(
    (state) => state.dynamicBanners
  );
  const [sectionId, setSectionId] = useState(null);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("sectionId"); 
    if (id) {
      setSectionId(id); 
      dispatch(getBrandBanners(id)); 
    }
  }, [dispatch]);

  useEffect(() => {
    if (sectionId && bannersBySection[sectionId]?.[page]) {
      setBanners(bannersBySection[sectionId][page]);
    } else {
      setBanners([]);
    }
  }, [bannersBySection, sectionId, page]);

  const limitedBanners = banners.slice(0, 2);

  // Debug logs - uncomment to troubleshoot
  // console.log('Debug Info:');
  // console.log('sectionId:', sectionId);
  // console.log('page:', page);
  // console.log('bannersBySection:', bannersBySection);
  // console.log('banners:', banners);

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
        <div className="text-center text-red-500">Failed to load banners: {JSON.stringify(error)}</div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {limitedBanners.map((promo, index) => {
            const productId = promo.productId?._id || promo.productId;
           const productUrl = productId ? `/homeappliances/product-details/${productId}` : `/homeappliances/brands`;
           return(
            <div
              key={`${promo._id}-${index}`}
              className={`${
                index === 0 ? "bg-red-600 text-white" : "bg-gray-200 text-gray-900"
              } rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 md:p-8 min-h-[250px] sm:min-h-[200px]">
                <div className="flex-1 w-full sm:pr-4 md:pr-6 text-center sm:text-left mb-4 sm:mb-0">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 leading-tight">
                    {promo.title}
                  </h3>
                  {promo.discountText && (
                    <div className="inline-block bg-yellow-400 text-black text-base sm:text-lg font-bold px-3 sm:px-4 py-1 sm:py-2 rounded mb-3 sm:mb-4">
                      {promo.discountText}
                    </div>
                  )}
                  <p className="text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed opacity-90 max-w-sm mx-auto sm:mx-0">
                    {promo.description}
                  </p>
                  <Link
                    href={productUrl}
                    className={`inline-block px-4 sm:px-6 py-2 border-2 rounded font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-105 ${
                      index === 0
                        ? "border-white text-white hover:bg-white hover:text-red-600"
                        : "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                    }`}
                  >
                    Explore deals
                  </Link>
                </div>
                <div className="flex-shrink-0 order-first sm:order-last">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-96 md:h-48 lg:w-96 lg:h-56 relative mx-auto">
                    <Image
                      src={`${IMG_URL}/${promo.image}`}
                      alt={promo.title}
                      fill
                      className="object-contain drop-shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )
})}

          {limitedBanners.length === 0 && (
            <div className="col-span-2 text-center text-gray-500">
              No banners available for {page}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}