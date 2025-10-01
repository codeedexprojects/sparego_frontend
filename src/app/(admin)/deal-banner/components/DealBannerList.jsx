import { IMG_URL } from '../../../../redux/baseUrl';
import React from 'react';

const DealBannerList = ({ 
  banners, 
  loading, 
  error, 
  onEdit, 
  onDelete, 
  onAddBanner,
  pageOptions 
}) => {
  
  const getPageLabel = (pageValue) => {
    const page = pageOptions.find(p => p.value === pageValue);
    return page ? page.label : pageValue;
  };

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
          <p className="mt-3 text-gray-600">Loading deal banners...</p>
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
          <h3 className="mt-2 text-sm font-medium text-gray-900">Error loading banners</h3>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No deal banners</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first promotional banner.</p>
          <button
            onClick={onAddBanner}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Add Banner
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {banners.map((banner) => (
          <DealBannerCard 
            key={banner._id} 
            banner={banner} 
            onEdit={onEdit} 
            onDelete={onDelete}
            getPageLabel={getPageLabel}
          />
        ))}
      </div>
    </div>
  );
};

// Individual Banner Card Component
const DealBannerCard = ({ banner, onEdit, onDelete, getPageLabel }) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
    {/* Banner Image */}
    <div className="aspect-w-16 aspect-h-9 bg-gray-200 overflow-hidden">
      {banner.image ? (
        <img 
          src={`${IMG_URL}/${banner.image}`} 
          alt={banner.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
    </div>

    {/* Banner Info */}
    <div className="p-4">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900 truncate flex-1">
          {banner.title}
        </h3>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          banner.isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {banner.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      {banner.discountText && (
        <div className="mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            {banner.discountText}
          </span>
        </div>
      )}

      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {banner.description || 'No description'}
      </p>

      <div className="space-y-1 text-sm text-gray-500">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Section: {banner.section?.name || "All Sections"}
        </div>
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Page: {getPageLabel(banner.page)}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-2 mt-4 pt-3 border-t border-gray-200">
        <button
          onClick={() => onEdit(banner)}
          className="text-blue-600 hover:text-blue-800 disabled:text-blue-400 font-medium py-1 px-3 rounded-md transition-colors duration-200 text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(banner)}
          className="text-red-600 hover:text-red-800 disabled:text-red-400 font-medium py-1 px-3 rounded-md transition-colors duration-200 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default DealBannerList;