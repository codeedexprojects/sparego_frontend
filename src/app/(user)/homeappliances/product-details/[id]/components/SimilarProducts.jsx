import React from 'react';
import { Heart, Truck } from 'lucide-react';

const SimilarProducts = () => {
  const products = [
    {
      id: 1,
      image: '/home/product1.png',
      title: 'Motul 3100 Gold 4T Engine Oil - 800ml',
      price: 415,
      deliveryDays: 5,
      description: 'Semi-Synthetic Oil Designed For Scooters Liquid Performance And Smooth Engine Operation.'
    },
    {
      id: 2,
      image: '/home/product1.png',
      title: 'Shell Advance AX7 Scooter Oil - 800ml',
      price: 399,
      deliveryDays: 3,
      description: 'Provides Enhanced Engine Performance And Reduces Wear In City Traffic Conditions.'
    },
    {
      id: 3,
      image: '/home/product1.png',
      title: 'Gulf Pride 4T Plus Engine Oil - 1L',
      price: 379,
      deliveryDays: 5,
      description: 'High-Performance 4-stroke Engine Oil Ideal For Daily Use And Peak Performance.'
    },
    {
      id: 4,
      image: '/home/product1.png',
      title: 'HP Racer4 Scooter Engine Oil - 800ml',
      price: 415,
      deliveryDays: 5,
      description: 'Ultra Quick Pick-up And Smoother Gear Shifts In Scooters And 2-wheelers.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Section Title */}
      <h2 className="text-xl font-semibold text-red-600 mb-6">Similar Products</h2>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            {/* Wishlist Icon */}
            <div className="flex justify-end mb-2">
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>
            
            {/* Product Image */}
            <div className="flex justify-center mb-4">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-24 h-24 object-contain"
              />
            </div>
            
            {/* Product Title */}
            <h3 className="font-medium text-gray-900 mb-2 text-sm leading-tight">
              {product.title}
            </h3>
            
            {/* Price with Red Background */}
            <div className="mb-3">
              <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-medium">
                ₹{product.price}
              </span>
            </div>
            
            {/* Delivery Info */}
            <div className="flex items-center text-gray-600 mb-3">
              <Truck className="w-4 h-4 mr-1" />
              <span className="text-xs">Delivery Within {product.deliveryDays} Days</span>
            </div>
            
            {/* Product Description */}
            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              {product.description}
            </p>
            
            {/* Add to Cart Button */}
            <button className="w-full border border-gray-300 text-gray-700 py-2 px-3 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;