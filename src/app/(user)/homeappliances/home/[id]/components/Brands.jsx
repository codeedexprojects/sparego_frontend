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
            className="flex flex-col items-center group cursor-pointer"
          >
            {/* Brand Card with hover effect */}
            <div className="w-28 h-28 flex items-center justify-center border rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
              {/* Red fill overlay - diagonal bottom-left to top-right */}
              <div className="absolute inset-0 bg-red-500 transform -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-in-out origin-bottom-left"></div>
              
              {/* Brand logo */}
              <Image
                src={brand.logo}
                alt={brand.name}
                width={80}
                height={50}
                className="object-contain relative z-10 group-hover:brightness-0 group-hover:invert transition-all duration-300"
              />
            </div>
            <p className="mt-3 text-sm font-medium text-gray-700 group-hover:text-red-500 transition-colors duration-300">{brand.name}</p>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="flex justify-center mt-12">
        <button 
        onClick={()=>router.push}
        className="px-6 py-2 border border-red-400 text-red-500 rounded-full text-sm font-medium hover:bg-red-500 hover:text-white transition">
          View more
        </button>
      </div>
    </section>
  );
}