"use client";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getSubCategories, getAllSubSubById } from "@/redux/slices/categorySlice";
import { IMG_URL } from "@/redux/baseUrl";

const SubCategoryPage = () => {
  const { id } = useParams();   
  const dispatch = useDispatch();
  const router = useRouter();

  const { subCategories, loading, error } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    if (id) {
      dispatch(getSubCategories(id));
    }
  }, [dispatch, id]);

  const handleSubCategoryClick = async (subId) => {
    // 🔹 Fetch sub-subcategories first
    const result = await dispatch(getAllSubSubById(subId)).unwrap();

    if (result && result.length > 0) {
      // has sub-subcategories → go to SubSubCategoryPage
      router.push(`/spare/category3/${subId}`);
    } else {
      // no sub-subcategories → go directly to products
      router.push(`/spare/products/${subId}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    const errorMessage = typeof error === 'object' ? error.message || 'An error occurred' : error;
    return (
      <div className=" bg-white flex justify-center  items-center h-64">
        <p className="text-red-500">Error: {errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-6 text-black">Subcategories</h1>

      {subCategories && subCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {subCategories.map((sub) => (
            <div
              key={sub._id}
              className="bg-white rounded-lg border border-gray-700 p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleSubCategoryClick(sub._id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-3 text-sm leading-tight">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Type: {sub.type}
                  </p>
                </div>

                <div className="flex-shrink-0 ml-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center p-2">
                    <img
                      src={`${IMG_URL}${sub.image}`}
                      alt={sub.name}
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No subcategories found.</p>
      )}
    </div>
  );
};

export default SubCategoryPage;
