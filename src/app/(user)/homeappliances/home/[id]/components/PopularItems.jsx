"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { getPopularProducts } from "@/redux/slices/popularProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { IMG_URL } from "@/redux/baseUrl";
import { useRouter } from "next/navigation";

export default function PopularItems() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.popularproduct);
  const router = useRouter();

  const [sectionId, setSectionId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("sectionId");
    setSectionId(id);

    if (id) {
      dispatch(getPopularProducts({ section: id }));
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="bg-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
                <div className="w-26 h-22 bg-gray-200 rounded mb-4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 mx-auto w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded mx-auto w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-600">Error loading brands: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-16 bg-white">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl sm:text-2xl text-black font-semibold tracking-wide">POPULAR ITEMS</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div
            key={product._id} // ✅ Make sure to use _id from API
            className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition relative"
          >
            <div className="relative w-full h-70">
              <Image
                src={`${IMG_URL}/${product.images[0]}`}
                alt={product.name}
                fill
                className="object-cover"
              />
              <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-gray-100">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-black">{product.price}</span>
                <span className="text-red-500 text-sm font-medium">Dis: {product.discount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => router.push("/homeappliances/products")}
          className="px-6 py-2 border rounded-full text-sm bg-white text-black font-medium hover:bg-black hover:text-white transition"
        >
          View more
        </button>
      </div>
    </section>
  );
}
