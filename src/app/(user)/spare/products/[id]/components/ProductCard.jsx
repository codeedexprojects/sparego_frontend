"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';  // ✅ import useRouter
import { Heart } from 'lucide-react';
import { getAllProducts } from '@/redux/slices/productSlice';

const AutomotiveProductsGrid = () => {
  const { id } = useParams();
  const router = useRouter(); 
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState(new Set());


  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    if (id) {
      dispatch(getAllProducts(id));
    }
  }, [id, dispatch]);

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  if (loading) return <p className="text-center p-6 bg-white text-black">Loading products...</p>;

  return (
    <div className="mx-auto p-6 bg-gray-50 min-h-screen">
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => router.push(`/spare/product-details/${product._id}`)} // ✅ redirect
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow cursor-pointer"
            >
              {/* Product Header with Favorite */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-gray-900 text-sm leading-tight flex-1">
                  {product.name}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // ✅ prevent card click from firing
                    toggleFavorite(product._id);
                  }}
                  className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      favorites.has(product._id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                  />
                </button>
              </div>

              {/* Product Description */}
              <p className="text-xs text-gray-600 mb-4">
                {product.description}
              </p>

              {/* Product Image */}
              <div className="flex justify-center mb-4">
                {product.images && product.images.length > 0 ? (
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-16 h-20 object-contain"
                  />
                ) : (
                  <div className="w-16 h-20 bg-gray-100 flex items-center justify-center">
                    <span className="text-xs text-gray-400">No Image</span>
                  </div>
                )}
              </div>

              {/* Price and Add to Cart */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-red-600">
                  ₹{product.price}
                  {product.discount > 0 && (
                    <span className="text-xs text-gray-500 line-through ml-1">
                      ₹{Math.round(product.price / (1 - product.discount/100))}
                    </span>
                  )}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // ✅ prevent card redirect when clicking Add to Cart
                  }}
                  className="px-3 py-1.5 text-xs text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Add to Cart
                </button>
              </div>

              {/* Additional product info */}
              {product.partNumber && (
                <div className="mt-2 text-xs text-gray-500">
                  Part #: {product.partNumber}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">No products found for this category.</p>
        </div>
      )}
    </div>
  );
};

export default AutomotiveProductsGrid;
