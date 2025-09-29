// components/DealBannerTable/DealBannerTableRow.jsx
const DealBannerTableRow = ({ dealBanner, onEdit, onDelete, onToggleStatus }) => {
  // Section badge colors
  const sectionColors = {
    "watches": "bg-purple-100 text-purple-800",
    "spare-parts": "bg-blue-100 text-blue-800",
    "home-appliances": "bg-green-100 text-green-800"
  };

  // Page badge colors
  const pageColors = {
    "home": "bg-pink-100 text-pink-800",
    "category": "bg-yellow-100 text-yellow-800",
    "sub-category": "bg-orange-100 text-orange-800",
    "sub-sub-category": "bg-red-100 text-red-800",
    "product": "bg-indigo-100 text-indigo-800",
    "product-detail": "bg-teal-100 text-teal-800",
    "wishlist": "bg-cyan-100 text-cyan-800",
    "brand": "bg-gray-100 text-gray-800"
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 flex flex-col transition-all hover:shadow-md h-full">
      {/* Deal Banner Image */}
      <div className="h-40 w-full mb-4 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
        {dealBanner.image ? (
          <img
            src={dealBanner.image}
            alt={dealBanner.title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        )}
      </div>

      {/* Deal Banner Details */}
      <div className="flex-1 mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{dealBanner.title}</h3>
        
        {dealBanner.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{dealBanner.description}</p>
        )}
        
        {dealBanner.discountText && (
          <p className="text-sm font-medium text-red-600 mb-3">{dealBanner.discountText}</p>
        )}

        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
            sectionColors[dealBanner.section] || 'bg-gray-100 text-gray-800'
          }`}>
            {dealBanner.section.replace('-', ' ')}
          </span>
          
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
            pageColors[dealBanner.page] || 'bg-gray-100 text-gray-800'
          }`}>
            {dealBanner.page.replace('-', ' ')}
          </span>
          
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
            dealBanner.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {dealBanner.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
        
        <div className="text-xs text-gray-500">
          <p>Created: {new Date(dealBanner.createdAt || Date.now()).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
        {onEdit && (
          <button
            onClick={() => onEdit(dealBanner)}
            className="px-3 py-2 text-sm bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit
          </button>
        )}
        {onToggleStatus && (
          <button 
            onClick={() => onToggleStatus(dealBanner)}
            className={`px-3 py-2 text-sm rounded-lg transition-colors flex items-center gap-1 ${
              dealBanner.isActive
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              {dealBanner.isActive ? (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              )}
            </svg>
            {dealBanner.isActive ? 'Deactivate' : 'Activate'}
          </button>
        )}
        {onDelete && (
          <button 
            onClick={() => onDelete(dealBanner)}
            className="px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default DealBannerTableRow;