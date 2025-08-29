"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { getAllSubSubById } from "@/redux/slices/categorySlice";

const AutomotivePartsCatalog = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const router = useRouter();

  // Use subSubById from redux
  const { subSubById, loading } = useSelector((state) => state.category);

  useEffect(() => {
    if (id) {
      dispatch(getAllSubSubById(id));
    }
  }, [id, dispatch]);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-bold mb-4 text-black">Sub Sub Categories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {subSubById?.map((item) => (
          <div
            key={item._id}
            onClick={() => router.push(`/spare/products/${item._id}`)} // 🔹 navigate on click
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h3 className="font-medium text-gray-900 mb-3 text-sm">
              {item.name}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              {item.subCategory?.name}
            </p>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <span className="text-xs text-gray-400">No Img</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutomotivePartsCatalog;
