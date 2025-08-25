"use client";
import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

const MyCart = () => {
  const [quantity, setQuantity] = useState(1);
  const pricePerItem = 798;
  const totalPrice = pricePerItem * quantity;
  const savings = 28;

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className=" mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 border-b-2 border-red-500 pb-2 inline-block">
          MY Cart
        </h1>
      </div>
      
      {/* Cart Item Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="flex items-center gap-8">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <div className="w-28 h-32 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
              <img 
                src="/home/product1.png" 
                alt="Castrol Power1 4T Engine Oil"
                className="w-20 h-24 object-contain"
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div className="flex-grow">
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Castrol Power1 4T Engine Oil
            </h3>
            
            {/* WhatsApp Message */}
            <div className="flex items-center mb-6">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
                </svg>
              </div>
              <span className="text-sm text-gray-600">
                You'll be redirected to WhatsApp to complete your order
              </span>
            </div>
            
            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleQuantityChange(-1)}
                className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors text-red-500"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              
              <span className="text-lg text-black font-medium min-w-[2rem] text-center px-4">
                {quantity}
              </span>
              
              <button 
                onClick={() => handleQuantityChange(1)}
                className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors text-red-500"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Price Section */}
          <div className="text-right min-w-[200px]">
            <div className="mb-3">
              <div className="text-sm text-red-500 font-medium mb-1">TO PAY</div>
              <div className="text-3xl font-bold text-gray-900">₹{totalPrice}</div>
            </div>
            
            {/* Savings Box */}
            <div className="bg-green-50 border border-green-200 rounded px-3 py-2 mb-4">
              <span className="text-sm text-green-700 font-medium">SAVINGS OF ₹{savings}</span>
            </div>
            
            {/* Place Order Button */}
            <button className="w-full bg-red-600 text-white px-6 py-3 rounded font-medium hover:bg-red-700 transition-colors">
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;