"use client";
import React, { useEffect } from "react";
import { getRandomProducts } from "@/redux/slices/randomProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { IMG_URL } from "@/redux/baseUrl";

export default function FourStoresSection() {
  const dispatch = useDispatch();
  const { randomProducts, loading, error } = useSelector(
    (state) => state.randomProducts
  );

  useEffect(() => {
    dispatch(getRandomProducts());
  }, [dispatch]);

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

  return (
    <div className="bg-white">
      <section className="py-20 bg-[#EEEEEE]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-8 leading-tight">
            Four Specialized Stores. One Easy Access.
          </h2>

          <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
            Why search across multiple platforms when everything you need is
            under one roof? Our platform connects you to four unique shopping
            experiences, each dedicated to quality, authenticity, and service.
            Whether you're fixing, upgrading, styling, or cleaning — we bring
            the best of every category together.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#EEEEEE]">
        <div className="px-6">
          <div className="relative">
            <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
              {randomProducts?.products?.map((product) => (
                <div
                  key={product._id}
                  className="flex-none w-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 snap-start group hover:-translate-y-3 overflow-hidden"
                >
                  <div className="relative h-48 bg-gradient-to-br from-red-50 to-red-100 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    <img
                      src={`${IMG_URL}/${product.images[0]}`}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors duration-300">
                      {product.name}
                    </h4>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 uppercase tracking-wide">
                          Starting from
                        </span>
                        <span className="text-2xl font-bold text-red-600">
                          {product.demoPrice}
                        </span>
                      </div>

                      <button
                        id="section"
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      >
                        Explore
                      </button>
                    </div>

                    <div className="mt-4 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
