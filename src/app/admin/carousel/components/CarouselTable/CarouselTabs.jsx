// components/CarouselTable/CarouselTabs.jsx
const CarouselTabs = ({ tabs, activeTab, setActiveTab, setCurrentPage, className = "" }) => {
  return (
    <div className={`flex border-b border-gray-200 mb-6 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            setActiveTab(tab.id);
            setCurrentPage(1); // Reset to first page when changing tabs
          }}
          className={`px-6 py-3 text-sm font-medium transition-all duration-200 relative ${
            activeTab === tab.id
              ? "text-indigo-600"
              : "text-gray-600 hover:text-indigo-600"
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"></span>
          )}
        </button>
      ))}
    </div>
  );
};

export default CarouselTabs;