"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { Heart, ShoppingCart } from 'lucide-react';
import { getAllProducts } from '@/redux/slices/productSlice';
import { addToWishlist, getWishlist } from '@/redux/slices/wishlistSlice';
import { addToCart } from '@/redux/slices/cartSlice';
import { toast } from 'sonner';
import { IMG_URL } from '@/redux/baseUrl';

const AutomotiveProductsGrid = () => {
  const { id } = useParams();
  const router = useRouter(); 
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState(new Set());
  const [processingItems, setProcessingItems] = useState({});
  const [cartProcessingItems, setCartProcessingItems] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { products, loading } = useSelector((state) => state.product);
  const { wishlist, wishlistLoading } = useSelector((state) => state.wishlist);


  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    
   
    if (token) {
      dispatch(getWishlist());
    }
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getAllProducts(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (wishlist && wishlist.length > 0) {
      const wishlistIds = new Set(wishlist.map(item => item._id || item.productId));
      setFavorites(wishlistIds);
    }
  }, [wishlist]);

  const toggleFavorite = async (productId, e) => {
    e.stopPropagation(); 
    
    
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to add items to your wishlist');
      router.push('/login'); 
      return;
    }
    
    setProcessingItems(prev => ({ ...prev, [productId]: true }));
    
    try {
      const resultAction = await dispatch(addToWishlist({ productId }));
      
      if (addToWishlist.fulfilled.match(resultAction)) {
        await dispatch(getWishlist());
        
        if (favorites.has(productId)) {
          toast.success("Removed from wishlist");
        } else {
          toast.success("Added to wishlist");
        }
      } else {
        const errorMsg = resultAction.payload || "Failed to update wishlist";
        toast.error(typeof errorMsg === 'string' ? errorMsg : "Failed to update wishlist");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setProcessingItems(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleAddToCart = async (productId, e) => {
    e.stopPropagation(); 
    
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to add items to your cart');
      router.push('/login'); 
      return;
    }
    
    setCartProcessingItems(prev => ({ ...prev, [productId]: true }));
    
    try {
      const resultAction = await dispatch(addToCart({ 
        productId, 
        quantity: 1 
      }));
      
      if (addToCart.fulfilled.match(resultAction)) {
        toast.success("Added to cart successfully");
      } else {
        const errorMsg = resultAction.payload || "Failed to add to cart";
        toast.error(typeof errorMsg === 'string' ? errorMsg : "Failed to add to cart");
      }
    } catch (error) {
      toast.error("An error occurred while adding to cart");
    } finally {
      setCartProcessingItems(prev => ({ ...prev, [productId]: false }));
    }
  };

  if (loading) return (
    <div className="text-center p-6 bg-white text-black">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600 mr-2"></div>
      Loading products...
    </div>
  );

  return (
    <div className="mx-auto p-6 bg-gray-50 min-h-screen">
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => router.push(`/spare/product-details/${product._id}`)}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow cursor-pointer relative"
            >
              {processingItems[product._id] && (
                <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10 rounded-lg">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-red-600"></div>
                </div>
              )}
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-gray-900 text-sm leading-tight flex-1">
                  {product.name}
                </h3>
                <button
                  onClick={(e) => toggleFavorite(product._id, e)}
                  disabled={processingItems[product._id] || wishlistLoading}
                  className={`ml-2 p-1 rounded-full transition-colors ${
                    processingItems[product._id] || wishlistLoading
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-gray-100'
                  }`}
                  aria-label={favorites.has(product._id) ? "Remove from wishlist" : "Add to wishlist"}
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
              <p className="text-xs text-gray-600 mb-4 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-center mb-4">
                {product.images && product.images.length > 0 ? (
                  <img 
                    src={`${IMG_URL}/${product.images[0]}` }
                    alt={product.name}
                    className="w-16 h-20 object-contain"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjZjNmNGY1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGR5PSIuMzVlbSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZpbGw9IiM5OTkiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                    }}
                  />
                ) : (
                  <div className="w-16 h-20 bg-gray-100 flex items-center justify-center rounded">
                    <span className="text-xs text-gray-400">No Image</span>
                  </div>
                )}
              </div>
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
                  onClick={(e) => handleAddToCart(product._id, e)}
                  disabled={cartProcessingItems[product._id]}
                  className={`px-3 py-1.5 text-xs text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center ${
                    cartProcessingItems[product._id] ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {cartProcessingItems[product._id] ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-red-600 mr-1"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
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