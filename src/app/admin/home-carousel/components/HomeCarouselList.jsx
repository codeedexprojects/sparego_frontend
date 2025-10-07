import { IMG_URL } from '../../../../redux/baseUrl';
import React from 'react';

const HomeCarouselList = ({ 
  carousels, 
  loading, 
  error, 
  onEdit, 
  onDelete, 
  onAddCarousel 
}) => {
  
  console.log("HomeCarouselList received:", { carousels, loading, error });

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="text-center py-12">
          <div className="flex justify-center">
            <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="mt-3 text-gray-600">Loading carousels...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Error loading carousels</h3>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!carousels || carousels.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No carousels</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first carousel banner.</p>
          <button
            onClick={onAddCarousel}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Add Carousel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {carousels.map((carousel) => (
          <HomeCarouselCard 
            key={carousel._id || `carousel-${Math.random()}`} // fallback key if _id missing
            carousel={carousel} 
            onEdit={onEdit} 
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

// Individual Carousel Card Component
const HomeCarouselCard = ({ carousel, onEdit, onDelete }) => {
  console.log("Rendering carousel card:", carousel);
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Carousel Image */}
      <div className="aspect-w-16 aspect-h-9 bg-gray-200 overflow-hidden">
        {carousel.image ? (
          <img 
            src={`${IMG_URL}/${carousel.image}`}
            alt={carousel.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
            }}
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Carousel Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate flex-1">
            {carousel.title || "Untitled Carousel"}
          </h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            carousel.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {carousel.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        <div className="space-y-2 text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Products: {carousel.products?.length || 0}
          </div>
        </div>

        {/* Product Preview */}
        {carousel.products && carousel.products.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-medium text-gray-700 mb-1">Featured Products:</p>
            <div className="flex flex-wrap gap-1">
              {carousel.products.slice(0, 3).map((product, index) => (
                <span
                  key={product._id || `product-${index}`} // fallback key
                  className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800"
                >
                  {product.name}
                  {index === 2 && carousel.products.length > 3 && ` +${carousel.products.length - 3}`}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-2 mt-4 pt-3 border-t border-gray-200">
          <button
            onClick={() => onEdit(carousel)}
            className="text-blue-600 hover:text-blue-800 disabled:text-blue-400 font-medium py-1 px-3 rounded-md transition-colors duration-200 text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(carousel)}
            className="text-red-600 hover:text-red-800 disabled:text-red-400 font-medium py-1 px-3 rounded-md transition-colors duration-200 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeCarouselList;
