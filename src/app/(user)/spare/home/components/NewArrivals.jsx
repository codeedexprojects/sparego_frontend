"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { getFullProductList } from "@/redux/slices/productSlice";
import { IMG_URL } from "@/redux/baseUrl";

export default function NewArrivalsSection() {
  const [activeTab, setActiveTab] = useState("FOUR WHEELER");
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const tabs = ["FOUR WHEELER", "TWO WHEELER"];

  useEffect(() => {
    dispatch(getFullProductList());
  }, [dispatch]);

  const filterProductsByVehicleType = (vehicleType) => {
    if (!products || !products.products) return [];

    return products.products
      .filter((product) => {
        const productVehicleType =
          product.vehicleType || product.mainCategory?.name || "";
        return productVehicleType
          .toLowerCase()
          .includes(vehicleType.toLowerCase().replace(" ", ""));
      })
      .slice(0, 4);
  };

  const formatProductData = (products) => {
    return products.map((product) => ({
      id: product._id,
      title: product.name,
      description: product.description || "",
      brand: product.productBrand?.name || "Multiple brands", 
      discount: product.discount ? `${product.discount}% off` : "Special offer",
      image:
        product.images && product.images.length > 0
          ? `${IMG_URL}/${product.images[0]}`
          : "/home/product1.png",
      link: `/spare/product-details/${product._id}`,
      price: product.price,
      originalPrice:
        product.originalPrice ||
        Math.round(product.price / (1 - (product.discount || 0) / 100)),
    }));
  };

  const productsData = {
    "FOUR WHEELER": formatProductData(
      filterProductsByVehicleType("Four-Wheeler")
    ),
    "TWO WHEELER": formatProductData(
      filterProductsByVehicleType("Two-Wheeler")
    ),
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                NEW ARRIVALS
              </h2>
            </div>
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className="pb-2 text-sm font-medium text-gray-400 border-b-2 border-transparent"
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse"
              >
                <div className="mb-4 flex justify-center">
                  <div className="w-40 h-40 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            Error loading products: {typeof error === "string" ? error : error?.message || "Unknown error"}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-8xl mx-auto px-4 md:px-15">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 gap-4">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
              NEW ARRIVALS
            </h2>
          </div>
          <div className="flex space-x-4 md:space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm font-medium transition-colors duration-200 border-b-2 ${
                  activeTab === tab
                    ? "text-red-600 border-red-600"
                    : "text-gray-400 border-transparent hover:text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        {/* Scrollable container for mobile, grid for desktop */}
        <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-4 pb-4">
            {productsData[activeTab].length > 0 ? (
              productsData[activeTab].map((product) => (
                <div key={product.id} className="flex-shrink-0 w-[160px]">
                  <Link href={product.link}>
                    <div className="relative bg-white border border-gray-200 rounded-lg p-3 hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
                      {product.discount && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-md z-10">
                          {product.discount}
                        </div>
                      )}
                      <div className="mb-3 flex justify-center">
                        <div className="w-28 h-28 relative">
                          <Image
                            src={product.image} 
                            alt={product.title}
                            fill
                            className="object-contain"
                            onError={(e) => {
                              e.target.src = '/home/product1.png';
                            }}
                            sizes="160px"
                            priority={false}
                          />
                        </div>
                      </div>
                      <div className="mt-auto">
                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                          {product.title}
                        </h3>
                        <p className="text-xs text-gray-500 mb-1 line-clamp-1">
                          {product.brand}
                        </p>
                        <div className="flex flex-col">
                          <span className="text-base font-bold text-gray-900">
                            ₹{product.price}
                          </span>
                          {product.originalPrice && product.originalPrice !== product.price && (
                            <span className="text-xs text-gray-500 line-through">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="w-full text-center py-12">
                <p className="text-gray-500">No products found for {activeTab}</p>
              </div>
            )}
          </div>
        </div>

        {/* Grid layout for tablet and desktop */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsData[activeTab].length > 0 ? (
            productsData[activeTab].map((product) => (
              <div key={product.id} className="group">
                <Link href={product.link}>
                  <div className="relative bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
                    {product.discount && (
                      <div className="absolute bottom-5 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                        {product.discount}
                      </div>
                    )}
                    <div className="mb-4 flex justify-center flex-grow">
                      <div className="w-40 h-40 relative">
                        <Image
                          src={product.image} 
                          alt={product.title}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = '/home/product1.png';
                          }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          priority={false}
                        />
                      </div>
                    </div>
                    <div className="mt-auto">
                      <h3 className="text-md font-semibold text-gray-900 line-clamp-2 h-8">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {product.description}
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        {product.brand}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-gray-900">
                            ₹{product.price}
                          </span>
                          {product.originalPrice && product.originalPrice !== product.price && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center py-12">
              <p className="text-gray-500">No products found for {activeTab}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}