"use client";
import React, { useEffect, useState } from "react";
import { Heart, Truck, X, ShoppingCart, ArrowLeft, Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { getWishlist, addToWishlist } from "@/redux/slices/wishlistSlice";
import { IMG_URL } from "@/redux/baseUrl";
import { useRouter } from "next/navigation";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { wishlist, loading, error } = useSelector((state) => state.wishlist);
  const [processingItems, setProcessingItems] = useState({});
  const router = useRouter();
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;



  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const handleToggleWishlist = async (productId) => {
    setProcessingItems(prev => ({ ...prev, [productId]: true }));
    
    try {
      const resultAction = await dispatch(addToWishlist({ productId }));
      
      if (addToWishlist.fulfilled.match(resultAction)) {
        const isCurrentlyInWishlist = wishlist.some(item => item._id === productId);
        
        if (isCurrentlyInWishlist) {
          toast.success("Removed from wishlist");
          dispatch(getWishlist()); 
        } else {
          toast.success("Added to wishlist");
          dispatch(getWishlist()); 
        }
      } else {
        toast.error("Failed to update wishlist");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setProcessingItems(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleAddToCart = (product) => {
    toast.success(`${product.name} added to cart`);
  };

  if (loading) return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mb-4"></div>
        <p className="text-gray-600">Loading your wishlist...</p>
      </div>
    </div>
  );
  

if (!token) {
  return (
   <div className=" flex items-center justify-center p-6 bg-gradient-to-br from-red-50 to-white">
  <div className="max-w-md w-full">
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
          <svg 
            className="w-10 h-10 text-red-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
        Your Wishlist Awaits
      </h2>
      <p className="text-gray-600 text-center mb-8 leading-relaxed">
        Sign in to access your saved items, manage your profile, and track your orders all in one place.
      </p>

      {/* Button */}
      <button
        className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all duration-200 font-semibold shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40 hover:scale-105 transform"
        onClick={() => router.push("/spare/login")}
      >
        Login to Continue
      </button>

      {/* Footer text */}
      <p className="text-sm text-gray-500 text-center mt-6">
        Don't have an account?{' '}
        <button 
          className="text-red-600 hover:text-red-700 font-medium hover:underline"
          onClick={() => router.push("/spare/register")}
        >
          Sign up
        </button>
      </p>
    </div>
  </div>
</div>
  );
}

  
  if (!wishlist.length) return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center py-12">
        <div className="relative inline-block mb-4">
          <Heart className="h-16 w-16 text-gray-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <X className="h-8 w-8 text-gray-400" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-600 mb-6">Items you save will appear here</p>
        <button 
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center mx-auto"
          onClick={() => router.push("/homeappliances/products")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center">
          <Heart className="w-6 h-6 md:w-7 md:h-7 text-red-500 fill-current mr-2" />
          My Wishlist
        </h1>
        <span className="text-gray-600 bg-red-50 px-3 py-1 rounded-full">
          {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {wishlist.map((product) => (
          <div
            key={product._id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col relative overflow-hidden"
          >
            {/* Loading overlay */}
            {processingItems[product._id] && (
              <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                <Loader className="animate-spin h-6 w-6 text-red-600" />
              </div>
            )}
            
            {/* Wishlist Icon */}
            <div className="flex justify-end mb-2">
              <button 
                onClick={() => handleToggleWishlist(product._id)}
                disabled={processingItems[product._id]}
                className={`p-1 rounded-full transition-colors ${
                  processingItems[product._id] 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-red-50'
                }`}
                aria-label="Remove from wishlist"
              >
                <Heart className="w-5 h-5 text-red-500 fill-current" />
              </button>
            </div>

            {/* Product Image */}
            <div className="flex justify-center mb-4 flex-grow">
              <img
                src={`${IMG_URL}/${product.images?.[0] || '/api/placeholder/200/200'}`} 
                alt={product.name}
                className="w-32 h-32 object-contain"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjRmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjM1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmaWxsPSIjOTk5Ij5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                }}
              />
            </div>

            {/* Product Title */}
            <h3 className="font-medium text-gray-900 mb-2 text-sm leading-tight line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>

            {/* Price */}
            <div className="mb-3">
              <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-medium">
                ₹{product.price?.toLocaleString() || '0'}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-gray-500 line-through text-sm ml-2">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex items-center text-gray-600 mb-3">
              <Truck className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="text-xs">Delivery in {product.deliveryDays || 3}-{product.deliveryDays ? product.deliveryDays + 2 : 5} days</span>
            </div>
            <p className="text-xs text-gray-600 mb-4 leading-relaxed line-clamp-2">
              {product.overview || product.description || 'No description available'}
            </p>
            <div className="mt-auto flex space-x-2">
              <button 
                className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCart className="w-4 h-4 mr-1" /> Add to Cart

              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;