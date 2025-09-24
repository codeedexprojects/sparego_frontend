"use client";
import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, Home, Package } from 'lucide-react';
import Header from '@/components/user/homeappliance/Header';
import Footer from '@/components/landing/Footer';

const OrderConfirmedPage = () => {
  const [animateCheck, setAnimateCheck] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimateCheck(true), 300);
    const timer2 = setTimeout(() => setShowContent(true), 800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div>
        <Header></Header>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            
            {/* Success Animation */}
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-2xl mb-6 transform transition-all duration-1000 ${animateCheck ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              
              <div className={`transition-all duration-800 delay-300 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Order Confirmed!
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Thank you for your purchase. Your order has been successfully placed and we'll send you a confirmation email shortly.
                </p>
              </div>
            </div>
    
            {/* Action Buttons */}
            <div className={`space-y-4 transition-all duration-800 delay-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
             
              
              <button className="w-full bg-white border-2 border-gray-200 text-gray-700 py-4 px-6 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center group">
                <Home className="w-5 h-5 mr-3" />
                Continue Shopping
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
    
            {/* Success Message */}
            <div className={`mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 text-center transition-all duration-800 delay-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-emerald-800 font-medium">
                🎉 Your order is being prepared!
              </p>
              <p className="text-emerald-700 text-sm mt-2">
                We'll notify you once it's ready for shipping.
              </p>
            </div>
    
          </div>
        </div>
        <Footer></Footer>
    </div>
  );
};

export default OrderConfirmedPage;