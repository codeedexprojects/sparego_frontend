"use client";
import React, { useState } from 'react';
import { Heart, Filter } from 'lucide-react';

const AutomotiveProductsGrid = () => {
  const [activeTab, setActiveTab] = useState('TWO WHEELER');
  const [favorites, setFavorites] = useState(new Set());

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const products = [
    {
      id: 1,
      name: 'Castrol Power1 Engine Oil',
      description: '800ml | Semi-synthetic | 4T',
      price: '₹380',
      image: '/home/product1.png'
    },
    {
      id: 2,
      name: 'Motul Scooter Power Oil',
      description: '800ml | Semi-synthetic | 4T',
      price: '₹430',
      image: '/home/product2.png'
    },
    {
      id: 3,
      name: 'Shell Advance A7 Scooter Oil',
      description: '800ml | Semi-synthetic | 10W-30',
      price: '₹425',
      image: '/home/product1.png'
    },
    {
      id: 4,
      name: 'Castrol Activ Scooter Oil',
      description: '800ml | Semi-synthetic | 4T',
      price: '₹399',
      image: '/home/product1.png'
    },
    {
      id: 5,
      name: 'Shell Ultra 4T Engine Oil',
      description: '800ml | Semi-synthetic | 4T',
      price: '₹529',
      image: '/home/product1.png'
    },
    {
      id: 6,
      name: 'Castrol Power1 Engine Oil',
      description: '800ml | Semi-synthetic | 4T',
      price: '₹399',
      image: '/home/product1.png'
    }
  ];

  return (
    <div className=" mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header with tabs */}
      <div className="flex space-x-8 mb-6">
        <button 
          onClick={() => setActiveTab('TWO WHEELER')}
          className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'TWO WHEELER' 
              ? 'text-gray-900 border-gray-900' 
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          TWO WHEELER
        </button>
        <button 
          onClick={() => setActiveTab('FOUR WHEELER')}
          className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'FOUR WHEELER' 
              ? 'text-gray-900 border-gray-900' 
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          FOUR WHEELER
        </button>
      </div>

      {/* Filter Section */}
      <div className="flex items-center space-x-4 mb-6">
        <span className="text-sm text-gray-600">Filtered By:</span>
        <span className="text-sm text-gray-900">Honda Activa - 2022</span>
        <button className="text-sm text-red-500 hover:text-red-600">
          Change Vehicle
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow"
          >
            {/* Product Header with Favorite */}
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium text-gray-900 text-sm leading-tight flex-1">
                {product.name}
              </h3>
              <button
                onClick={() => toggleFavorite(product.id)}
                className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Heart 
                  className={`w-4 h-4 ${
                    favorites.has(product.id) 
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
              <img 
                src={product.image} 
                alt={product.name}
                className="w-16 h-20 object-contain"
              />
            </div>

            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-red-600">
                {product.price}
              </span>
              <button className="px-3 py-1.5 text-xs text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutomotiveProductsGrid;