"use client";
import Image from "next/image";

export default function PopularBrands() {
  const brands = [
    { id: 1, name: "Rolex", logo: "/watches/brand.png" },
    { id: 2, name: "Casio", logo: "/watches/brand.png" },
    { id: 3, name: "Tissot", logo: "/watches/brand.png" },
    { id: 4, name: "Omega", logo: "/watches/brand.png" },
    { id: 5, name: "Tangin", logo: "/watches/brand.png" },
    { id: 6, name: "Tudor", logo: "/watches/brand.png" },
    { id: 7, name: "Oris", logo: "/watches/brand.png" },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-16 bg-white">
      {/* Heading */}
      <h2 className="text-xl text-black sm:text-2xl font-semibold mb-10 relative inline-block">
        POPULAR BRANDS
        <span className="absolute -bottom-2 left-0 w-24 h-[2px] bg-red-500"></span>
      </h2>

      {/* Brands grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-items-center">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="flex flex-col items-center"
          >
            {/* Brand Card */}
            <div className="w-28 h-28 flex items-center justify-center border rounded-lg bg-white shadow-sm hover:shadow-md transition">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={80}
                height={50}
                className="object-contain"
              />
            </div>
            <p className="mt-3 text-sm font-medium text-gray-700">{brand.name}</p>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="flex justify-center mt-12">
        <button className="px-6 py-2 border border-red-400 text-red-500 rounded-full text-sm font-medium hover:bg-red-500 hover:text-white transition">
          View more
        </button>
      </div>
    </section>
  );
}
