import React, { useEffect } from 'react';
import { Heart, Truck, ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getSimilarProducts } from '@/redux/slices/productSlice';
import { IMG_URL } from '@/redux/baseUrl';

const SimilarProducts = ({ productId }) => {
  const dispatch = useDispatch();

  // ✅ Use actual Redux selector
const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (productId) {
      dispatch(getSimilarProducts(productId));
    }
  }, [dispatch, productId]);

  const calculateDiscountedPrice = (price, discount) => {
    return Math.round(price - (price * discount) / 100);
  };

  const getImageUrl = (images) => {
    if (!images || images.length === 0) {
      return '/api/placeholder/150/150'; // Fallback image
    }
    const imagePath = images[0];
    if (imagePath.startsWith('/uploads/')) {
      return imagePath;
    } else if (imagePath.startsWith('defaultUser/')) {
      return `${IMG_URL}/${imagePath}`;
    }
    return imagePath;
  };

  const handleAddToWishlist = (productId) => {
    console.log('Added to wishlist:', productId);
  };

  const handleAddToCart = (productId) => {
    console.log('Added to cart:', productId);
  };

  // ✅ Use products from Redux only (remove mockProducts unless you want demo fallback)
  const displayProducts = products || [];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-xl font-semibold text-red-600 mb-6">Similar Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse"
            >
              <div className="flex justify-end mb-2">
                <div className="w-5 h-5 bg-gray-300 rounded"></div>
              </div>
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-gray-300 rounded"></div>
              </div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
              <div className="h-6 bg-red-300 rounded w-16 mb-3"></div>
              <div className="h-3 bg-gray-300 rounded mb-3"></div>
              <div className="h-3 bg-gray-300 rounded mb-4"></div>
              <div className="h-8 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-xl font-semibold text-red-600 mb-6">Similar Products</h2>
        <div className="text-center py-8">
          <p className="text-gray-600">
            Failed to load similar products. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-xl font-semibold text-red-600 mb-6">Similar Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayProducts.map((product) => {
          const discountedPrice =
            product.discount > 0
              ? calculateDiscountedPrice(product.price, product.discount)
              : product.price;

          return (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
            >
              {/* Stock + Wishlist */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  {product.stock === 0 && (
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                      Out of Stock
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded ml-1">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleAddToWishlist(product._id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Product Image */}
              <div className="flex justify-center mb-4">
                <img
                  src={getImageUrl(product.images)}
                  alt={product.name}
                  className="w-24 h-24 object-contain"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/150/150';
                  }}
                />
              </div>

              {/* Product Info */}
              <h3 className="font-medium text-gray-900 mb-2 text-sm leading-tight line-clamp-2">
                {product.name}
              </h3>

              {product.vehicleType && (
                <div className="mb-2">
                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                    {product.vehicleType}
                  </span>
                </div>
              )}

              <div className="mb-3">
                {product.discount > 0 ? (
                  <div className="flex items-center space-x-2">
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-medium">
                      ₹{discountedPrice}
                    </span>
                    <span className="text-gray-500 text-xs line-through">
                      ₹{product.price}
                    </span>
                  </div>
                ) : (
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-medium">
                    ₹{product.price}
                  </span>
                )}
              </div>

              <div className="flex items-center text-gray-600 mb-3">
                <Truck className="w-4 h-4 mr-1" />
                <span className="text-xs">Delivery Within 3-5 Days</span>
              </div>

              <p className="text-xs text-gray-600 mb-3 leading-relaxed line-clamp-2">
                {product.description}
              </p>

              {product.technicalSpecs?.length > 0 && (
                <div className="mb-3">
                  {product.technicalSpecs.slice(0, 1).map((spec, index) => (
                    <span key={index} className="text-xs text-gray-500">
                      {spec.key}: {spec.value}
                    </span>
                  ))}
                </div>
              )}

              {product.warranty && (
                <div className="mb-3">
                  <span className="text-xs text-green-600">
                    Warranty: {product.warranty}
                  </span>
                </div>
              )}

              {/* Add to Cart */}
              <button
                onClick={() => handleAddToCart(product._id)}
                disabled={product.stock === 0}
                className={`w-full py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
                  product.stock === 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
              </button>
            </div>
          );
        })}
      </div>

      {displayProducts.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-gray-600">No similar products found.</p>
        </div>
      )}
    </div>
  );
};

export default SimilarProducts;
