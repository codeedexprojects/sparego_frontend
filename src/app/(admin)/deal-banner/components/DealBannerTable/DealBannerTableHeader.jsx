// components/DealBannerTable/DealBannerTableHeader.jsx
const DealBannerTableHeader = ({ title = "Deal Banner Management", onAddDealBanner }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-500">Manage promotional deal banners for different sections</p>
      </div>
      {onAddDealBanner && (
        <button 
          onClick={onAddDealBanner}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 mt-4 md:mt-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Banner
        </button>
      )}
    </div>
  );
};

export default DealBannerTableHeader;