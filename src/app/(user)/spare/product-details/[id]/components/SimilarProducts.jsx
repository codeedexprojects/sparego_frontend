"use client"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Truck } from 'lucide-react';
import { getSimilarProducts } from '@/redux/slices/productSlice';
import { useParams, useRouter } from 'next/navigation';
import { IMG_URL } from '@/redux/baseUrl';
import { addToCart } from '@/redux/slices/cartSlice';
import { toast, Toaster } from 'sonner';
import { addToWishlist, getWishlist } from '@/redux/slices/wishlistSlice';


const SimilarProducts = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();   
  const { similarProducts, similarLoading, similarError } = useSelector(
    (state) => state.product
  );
  const { wishlist } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth); // Get user from auth state

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user || !!localStorage.getItem('token') || !!localStorage.getItem('user');
  };

  useEffect(() => {
    if (id) {
      dispatch(getSimilarProducts(id));
      if (isAuthenticated()) {
        dispatch(getWishlist()); // Fetch wishlist only if authenticated
      }
    }
  }, [id, dispatch]);

  const handleAddToCart = async (e, product) => {
    e.stopPropagation();
    
    // Check authentication first
    if (!isAuthenticated()) {
      toast.error("Please login to add items to cart");
      setTimeout(() => {
        router.push('/spare/login');
      }, 1500);
      return;
    }

    try {
      const resultAction = await dispatch(addToCart({ productId: product._id, quantity: 1 }));
      if (addToCart.fulfilled.match(resultAction)) {
        toast.success(`${product.name} added to cart!`);
      } else {
        const errorMessage = resultAction.payload?.message || resultAction.payload || "Failed to add to cart";
        toast.error(typeof errorMessage === 'string' ? errorMessage : "Failed to add to cart");
      }
    } catch (error) {
      const errorMessage = error?.message || error?.response?.data?.message || "Unexpected error occurred";
      toast.error(typeof errorMessage === 'string' ? errorMessage : "Unexpected error occurred");
    }
  };

  const handleAddToWishlist = async (e, product) => {
    e.stopPropagation();
    
    // Check authentication first
    if (!isAuthenticated()) {
      toast.error("Please login to add items to wishlist");
      setTimeout(() => {
        router.push('/spare/login');
      }, 1500);
      return;
    }

    try {
      const result = await dispatch(addToWishlist({ productId: product._id })).unwrap();
      toast.success(`${product.name} added to wishlist!`);
      dispatch(getWishlist());
    } catch (error) {
      const errorMessage = error?.message || error?.response?.data?.message || "Failed to add to wishlist";
      toast.error(typeof errorMessage === 'string' ? errorMessage : "Failed to add to wishlist");
    }
  };

  // Show loading state
  if (similarLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-xl font-semibold text-red-600 mb-6">Similar Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
              <div className="flex justify-end mb-2">
                <div className="w-5 h-5 bg-gray-300 rounded"></div>
              </div>
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-gray-300 rounded"></div>
              </div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-20 mb-3"></div>
              <div className="flex items-center mb-3">
                <div className="w-4 h-4 bg-gray-300 rounded mr-1"></div>
                <div className="h-3 bg-gray-300 rounded w-32"></div>
              </div>
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show error state
  if (similarError) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-xl font-semibold text-red-600 mb-6">Similar Products</h2>
        <div className="text-center text-gray-500 py-8">
          Failed to load similar products
        </div>
      </div>
    );
  }

  // Show empty state
  if (!similarProducts || similarProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-xl font-semibold text-red-600 mb-6">Similar Products</h2>
        <div className="text-center text-gray-500 py-8">
          No similar products found
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-xl font-semibold text-red-600 mb-6">Similar Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarProducts.map((product) => (
          <div 
            key={product._id} 
            onClick={() => router.push(`/spare/product-details/${product._id}`)}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex justify-end mb-2">
              <button 
                className="transition-colors" 
                onClick={(e) => handleAddToWishlist(e, product)}
              >
                <Heart 
                  className={`w-5 h-5 ${isInWishlist(product._id) ? "text-red-500 fill-red-500" : "text-gray-400"}`} 
                />
              </button>
            </div>
            
            <div className="flex justify-center mb-4">
              <img 
                src={product.images && product.images.length > 0 
                  ? `${IMG_URL}/${product.images[0]}` 
                  : '/placeholder-image.png'} 
                alt={product.name}
                className="w-24 h-24 object-contain"
              />
            </div>
            
            <h3 className="font-medium text-gray-900 mb-2 text-sm leading-tight">
              {product.name}
            </h3>
            
            <div className="mb-3">
              <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-medium">
                ₹{product.price}
              </span>
              {product.discount > 0 && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ₹{Math.round(product.price / (1 - product.discount / 100))}
                </span>
              )}
            </div>
            
            <div className="flex items-center text-gray-600 mb-3">
              <Truck className="w-4 h-4 mr-1" />
              <span className="text-xs">Delivery Within 5 Days</span>
            </div>
            
            <p className="text-xs text-gray-600 mb-4 leading-relaxed line-clamp-2">
              {product.description}
            </p>
            
            <button 
              onClick={(e) => handleAddToCart(e, product)} 
              className="w-full border border-gray-300 text-gray-700 py-2 px-3 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <Toaster position='top-right' richColors />
    </div>
  );
};

export default SimilarProducts;