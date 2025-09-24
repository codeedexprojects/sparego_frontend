"use client";
import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

export default function PopularItems() {
  const [activeTab, setActiveTab] = useState("Men");

  const products = [
    {
      id: 1,
      title: "Parmigiane Fleurier",
      subtitle: "Toric watches",
      price: "₹9999",
      discount: "50% off",
      image: "/watches/watch1.jpg",
    },
    {
      id: 2,
      title: "Rolex greenery",
      subtitle: "Rolex",
      price: "₹12000",
      discount: "50% off",
      image: "/watches/watch1.jpg",
    },
    {
      id: 3,
      title: "Rolex greenery",
      subtitle: "Rolex",
      price: "₹20500",
      discount: "50% off",
      image: "/watches/watch1.jpg",
    },
    {
      id: 4,
      title: "Rolex greenery",
      subtitle: "Rolex",
      price: "₹4500",
      discount: "50% off",
      image: "/watches/watch1.jpg",
    },
    {
      id: 5,
      title: "Parmigiane Fleurier",
      subtitle: "Toric watches",
      price: "₹12345",
      discount: "50% off",
      image: "/watches/watch1.jpg",
    },
    {
      id: 6,
      title: "Rolex greenery",
      subtitle: "Rolex",
      price: "₹45456",
      discount: "50% off",
      image: "/watches/watch1.jpg",
    },
    {
      id: 7,
      title: "Rolex greenery",
      subtitle: "Rolex",
      price: "₹4987",
      discount: "50% off",
      image: "/watches/watch1.jpg",
    },
    {
      id: 8,
      title: "Rolex greenery",
      subtitle: "Rolex",
      price: "₹2344",
      discount: "50% off",
      image: "/watches/watch1.jpg",
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-16 bg-white">
      {/* Heading */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl sm:text-2xl text-black font-semibold tracking-wide">
          POPULAR ITEMS
        </h2>
        <div className="flex space-x-6 text-gray-600 text-lg">
          <button
            onClick={() => setActiveTab("Men")}
            className={`pb-1 ${
              activeTab === "Men"
                ? "text-black border-b-2 border-red-500"
                : "hover:text-black"
            }`}
          >
            Men
          </button>
          <button
            onClick={() => setActiveTab("Women")}
            className={`pb-1 ${
              activeTab === "Women"
                ? "text-black border-b-2 border-red-500"
                : "hover:text-black"
            }`}
          >
            Women
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition relative"
          >
            {/* Image */}
            <div className="relative w-full h-60">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
              />
              <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-gray-100">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">
                {product.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{product.subtitle}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-black">
                  {product.price}
                </span>
                <span className="text-red-500 text-sm font-medium">
                  {product.discount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More */}
      <div className="flex justify-center mt-10">
        <button className="px-6 py-2 border rounded-full text-sm bg-white text-black font-medium hover:bg-black hover:text-white transition">
          View more
        </button>
      </div>
    </section>
  );
}
