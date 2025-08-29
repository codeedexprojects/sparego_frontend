"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubSubCategories } from "@/redux/slices/categorySlice";

export default function PopularItemsSection() {
  const dispatch = useDispatch();
  const { subSubCategories, loading } = useSelector((state) => state.category);

  const [activeTab, setActiveTab] = useState("Two-wheeler");
  const tabs = ["Two-wheeler", "Four-wheeler"];

  useEffect(() => {
    dispatch(getAllSubSubCategories());
  }, [dispatch]);


  const filteredItems = subSubCategories.filter(
    (item) => item.type === activeTab
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
       
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            POPULAR ITEM
          </h2>

          {/* Centered Tabs */}
          <div className="flex justify-center">
            <div className="flex space-x-12 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-4 text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab
                      ? "text-black border-b-2 border-red-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.slice(0, 7).map((item, index) => (
              <div key={item._id}>
                {index === 6 ? (
                  // 8th Card: View All
                  <div className="bg-white border border-gray-200 rounded-lg p-6 h-[120px] flex items-center justify-center hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                    <div className="text-gray-600 group-hover:text-red-600 transition-colors duration-300 flex items-center gap-2">
                      <span className="text-lg font-medium">View all</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                ) : (
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer group h-[120px]">
                    <div className="flex items-center h-full gap-4">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-2 leading-tight">
                          {item.name}
                        </h3>
                        {/* <p className="text-xs text-gray-500">
                          {item.subCategory?.name}
                        </p> */}
                         <p className="text-xs text-gray-500">
                        {item.productCount} Products
                      </p>
                      </div>

                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 relative">
                          <Image
                            src={item.image || "/placeholder.png"}
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
        )}
      </div>
    </section>
  );
}
