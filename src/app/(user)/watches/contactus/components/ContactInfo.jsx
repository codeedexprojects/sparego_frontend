import React from 'react';

const ContactInfoSection = () => {
  return (
    <div className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column - Contact Info */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <span className="text-red-500 text-sm font-medium">Contact Info</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight">
              We are always happy to assist you
            </h2>
          </div>

          {/* Middle Column - Email Address */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <h3 className="text-red-500 text-sm font-medium mb-2">Email Address</h3>
              <div className="w-8 h-0.5 bg-gray-800 mb-4"></div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-900 font-medium mb-2">support@sparego.in</p>
            </div>
            
            <div>
              <p className="text-gray-600 text-sm mb-1">Assistance hours</p>
              <p className="text-gray-600 text-sm">Monday - Friday 9 am to 8 pm EST</p>
            </div>
          </div>

          {/* Right Column - Number */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <h3 className="text-red-500 text-sm font-medium mb-2">Number</h3>
              <div className="w-8 h-0.5 bg-gray-800 mb-4"></div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-900 font-medium mb-2">+91 8978 543 210</p>
            </div>
            
            <div>
              <p className="text-gray-600 text-sm mb-1">Assistance hours</p>
              <p className="text-gray-600 text-sm">Monday - Friday 9 am to 8 pm EST</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactInfoSection;