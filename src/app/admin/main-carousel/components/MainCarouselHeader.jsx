// components/MainCarouselHeader.jsx
import React from 'react';

const MainCarouselHeader = ({ carouselCount, onAddCarousel }) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Main Carousels</h1>
          <p className="text-gray-600 mt-2">
            Manage homepage carousel banners ({carouselCount} carousels)
          </p>
        </div>
        <button
          onClick={onAddCarousel}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center shadow-sm"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Carousel
        </button>
      </div>
    </div>
  );
};

export default MainCarouselHeader;