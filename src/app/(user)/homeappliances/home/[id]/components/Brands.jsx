"use client";
import { IMG_URL } from "@/redux/baseUrl";
import { getSectionBrandById } from "@/redux/slices/brandSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PopularBrands() {
const dispatch = useDispatch();
const {brands, loading, error}=useSelector((state)=>state.brand)
  const router = useRouter()


  useEffect(() => {
    const sectionId = localStorage.getItem("sectionId");
    if (sectionId) {
      dispatch(getSectionBrandById(sectionId));
    }
  }, [dispatch]);

  return (
   <section className="py-12 px-4 sm:px-6 lg:px-16 bg-white">
      <h2 className="text-xl text-black sm:text-2xl font-semibold mb-10 relative inline-block">
        POPULAR BRANDS
        <span className="absolute -bottom-2 left-0 w-24 h-[2px] bg-red-500"></span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-items-center">
        {brands?.map((brand) => (
          <div
            key={brand._id}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-28 h-28 flex items-center justify-center border rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-red-500 transform -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-in-out origin-bottom-left"></div>

              <Image
                src={`${IMG_URL}/${brand.logo}`} 
                alt={brand.name}
                width={80}
                height={50}
                className="object-contain relative z-10 group-hover:brightness-0 group-hover:invert transition-all duration-300"
              />
            </div>
            <p className="mt-3 text-sm font-medium text-gray-700 group-hover:text-red-500 transition-colors duration-300">
              {brand.name}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={() => router.push("/homeappliances/brands")}
          className="px-6 py-2 border border-red-400 text-red-500 rounded-full text-sm font-medium hover:bg-red-500 hover:text-white transition"
        >
          View more
        </button>
      </div>
    </section>
  );
}