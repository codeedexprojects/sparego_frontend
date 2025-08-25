"use client";
import React, { useState } from 'react';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: 'India',
    address: '',
    state: '',
    town: '',
    pinCode: '',
    email: '',
    phoneNumber: '',
    saveInfo: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const subtotal = 1020.00;
  const offerPrice = -20;
  const total = 999.00;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Side - My Address Form */}
          <div className="bg-white p-8 rounded-lg">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">My Address</h2>
              <button className="text-blue-600 hover:text-blue-800 underline text-sm">
                Log in
              </button>
            </div>

            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full p-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full p-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Country/Region */}
              <div>
                <input
                  type="text"
                  name="country"
                  placeholder="Country/Region"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full p-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Address */}
              <div>
                <textarea
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* State, Town, Pin code */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full p-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="town"
                    placeholder="Town"
                    value={formData.town}
                    onChange={handleInputChange}
                    className="w-full p-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="pinCode"
                    placeholder="Pin code"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    className="w-full p-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Phone Number */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Phone number</h3>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Save Info Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Save this information for next time
                </label>
              </div>
            </div>
          </div>

          {/* Right Side - Your Order */}
          <div className="bg-white p-8 rounded-lg h-fit">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Your order</h2>

            {/* Product Item */}
            <div className="flex items-start gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="relative">
                <img 
                  src="/home/product1.png" 
                  alt="Castrol Power1 4T Engine Oil"
                  className="w-16 h-20 object-contain"
                />
                <div className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  1
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-gray-900 mb-1">
                  Castrol Power1 4T Engine Oil
                </h3>
                <p className="text-sm text-gray-500 mb-1">Castrol</p>
                <p className="text-xs text-gray-400">Fits your Honda Activa 2022REY</p>
              </div>
              <div className="text-right">
                <span className="font-semibold text-gray-900">₹999</span>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>offer price</span>
                <span>{offerPrice}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-gray-900 border-t border-gray-200 pt-3">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* WhatsApp Button */}
            <div className="mt-3 mb-3">
              <div className="flex items-left justify-left w-full  text-black py-3  rounded  transition-colors">
                <div className="w-5 h-5 mr-2 text-green-500">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
                  </svg>
                </div>
                Send your Order via WhatsApp
              </div>
            </div>

            {/* Privacy Policy Text */}
            <p className="text-xs text-gray-600 leading-relaxed mb-6">
              Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our{' '}
              <button className="text-blue-600 hover:text-blue-800 underline">
                privacy policy
              </button>
              .
            </p>

            {/* Place Order Button */}
            <button className="w-full bg-red-600 text-white py-4 px-6 rounded font-medium hover:bg-red-700 transition-colors text-lg">
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;