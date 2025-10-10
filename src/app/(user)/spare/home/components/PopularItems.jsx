"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubSubCategories } from "@/redux/slices/categorySlice";
import { IMG_URL } from "@/redux/baseUrl";
import { useRouter } from "next/navigation";

export default function PopularItemsSection() {
  const dispatch = useDispatch();
  const { subSubCategories, loading } = useSelector((state) => state.category);
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("Two-wheeler");
  const tabs = ["Two-wheeler", "Four-wheeler"];

  useEffect(() => {
    dispatch(getAllSubSubCategories());
  }, [dispatch]);

  const filteredItems = subSubCategories.filter(
    (item) => item.type === activeTab
  );

  // ✅ navigate dynamically to the sub-sub-category page
  const handleCardClick = (item) => {
    router.push(`/spare/sub-sub-category/${item._id}`);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-8xl mx-auto px-4 md:px-15">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 underline text-solid decoration-[#BE1E2D] underline-offset-9">
            POPULAR ITEM
          </h2>

          {/* Tabs */}
          <div className="flex justify-center">
            <div className="flex space-x-12 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-6 text-lg font-medium tracking-wide transition-colors duration-200 ${
                    activeTab === tab
                      ? "text-black border-b-4 border-red-600"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* ✅ Desktop grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredItems.slice(0, 7).map((item, index) => (
                <div key={item._id}>
                  {index === 6 ? (
                    // "View all" card
                    <div
                      onClick={() => router.push("/spare/sub-sub-category")}
                      className="bg-white border border-gray-200 rounded-lg p-6 h-[120px] flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300 cursor-pointer group overflow-hidden relative"
                    >
                      <div className="text-gray-600 group-hover:text-white transition-colors duration-300 flex items-center gap-2 z-10">
                        <span className="text-lg font-medium">View all</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                      <div className="absolute inset-0 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </div>
                  ) : (
                    // ✅ clickable category card
                    <div
                      onClick={() => handleCardClick(item)} // 👈 added click handler
                      className="bg-white border border-gray-600 rounded-lg p-4 hover:bg-red-600 hover:border-red-600 hover:shadow-xl transition-all duration-300 cursor-pointer group h-[120px] overflow-hidden relative"
                    >
                      <div className="absolute inset-0 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      <div className="flex items-center h-full gap-4 relative z-10">
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-white mb-2 leading-tight transition-colors duration-300">
                            {item.name}
                          </h3>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="w-25 h-25 relative overflow-hidden rounded-lg">
                            <Image
                              src={`${IMG_URL}/${item.image}`}
                              alt={item.name}
                              fill
                              className="object-contain group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* ✅ Mobile horizontal scroll */}
            <div className="md:hidden">
              <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory">
                {filteredItems.slice(0, 7).map((item, index) => (
                  <div
                    key={item._id}
                    className="flex-shrink-0 snap-start"
                    onClick={() => handleCardClick(item)} // 👈 added click handler
                  >
                    {index === 6 ? (
                      <div
                        onClick={() => router.push("/spare/sub-sub-category")}
                        className="bg-white border border-gray-200 rounded-lg p-6 h-[120px] w-[280px] flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300 cursor-pointer group overflow-hidden relative"
                      >
                        <div className="text-gray-600 group-hover:text-white transition-colors duration-300 flex items-center gap-2 z-10">
                          <span className="text-lg font-medium">View all</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                        <div className="absolute inset-0 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </div>
                    ) : (
                      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-red-600 hover:border-red-600 hover:shadow-xl transition-all duration-300 cursor-pointer group h-[120px] w-[280px] overflow-hidden relative">
                        <div className="absolute inset-0 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        <div className="flex items-center h-full gap-4 relative z-10">
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-white mb-2 leading-tight transition-colors duration-300">
                              {item.name}
                            </h3>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="w-20 h-20 relative overflow-hidden rounded-lg">
                              <Image
                                src={`${IMG_URL}/${item.image}`}
                                alt={item.name}
                                fill
                                className="object-contain group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
