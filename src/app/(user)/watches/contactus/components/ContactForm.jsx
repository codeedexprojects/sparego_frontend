"use client";
import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, ArrowRight } from 'lucide-react';

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    yourName: '',
    emailAddress: '',
    phoneNumber: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-white py-16 px-6">
      <div className=" mx-auto">
        <div className="flex justify-between items-start mb-12">
          {/* Left Side - Form Content */}
          <div className="flex-1 pr-8">
            {/* Get Started Label */}
            <div className="mb-6">
              <span className="text-red-500 text-sm font-medium">Get Started</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl font-bold text-gray-900 mb-12 leading-tight">
              Get in touch with us. We're here to assist you.
            </h1>

            {/* Contact Form */}
            <div className="space-y-8">
              {/* Name, Email, Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="yourName"
                    value={formData.yourName}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full pb-3 border-0 border-b border-gray-300 bg-transparent focus:outline-none focus:border-red-500 transition-colors placeholder-gray-500"
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="w-full pb-3 border-0 border-b border-gray-300 bg-transparent focus:outline-none focus:border-red-500 transition-colors placeholder-gray-500"
                  />
                </div>
                <div className="relative">
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Phone Number (optional)"
                    className="w-full pb-3 border-0 border-b border-gray-300 bg-transparent focus:outline-none focus:border-red-500 transition-colors placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message"
                  rows={4}
                  className="w-full pb-3 border-0 border-b border-gray-300 bg-transparent focus:outline-none focus:border-red-500 transition-colors placeholder-gray-500 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  onClick={handleSubmit}
                  className="bg-red-600 text-white px-8 py-3 rounded-full font-medium hover:bg-red-700 transition-colors flex items-center"
                >
                  Leave us a Message
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Social Media Icons */}
          <div className="flex flex-col space-y-4">
            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
              <Facebook className="w-5 h-5 text-blue-600" />
            </button>
            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
              <Instagram className="w-5 h-5 text-pink-600" />
            </button>
            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
              <Twitter className="w-5 h-5 text-blue-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFormSection;