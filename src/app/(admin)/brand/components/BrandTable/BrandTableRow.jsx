// components/BrandTable/BrandTableRow.jsx
const BrandTableRow = ({ brand, onEdit, onDelete, brandType }) => {
  console.log("Rendering brand:", brand); // Add this for debugging
  
  // Add safety checks for brand properties
  if (!brand || typeof brand !== 'object') {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="h-48 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-500">Invalid brand data</span>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">Invalid Brand</h3>
        </div>
      </div>
    );
  }
  
  const brandName = brand.name || 'Unnamed Brand';
  const brandImage = brand.image || `https://via.placeholder.com/300x200?text=${encodeURIComponent(brandName)}`;
  
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Brand Image */}
      <div className="h-48 bg-gray-100 overflow-hidden">
        <img
          src={brandImage}
          alt={brandName}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(brandName)}`;
          }}
        />
      </div>

      {/* Brand Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {brandName}
          </h3>
          <span className={`px-2 py-1 text-xs rounded-full ${
            brand.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {brand.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {brand.description || 'No description available'}
        </p>

        {/* Additional info based on brand type */}
        {brandType === "product" && brand.section && (
          <div className="mb-2">
            <span className="text-xs font-medium text-gray-500">Section:</span>
            <span className="text-xs text-gray-700 ml-1">{brand.section}</span>
          </div>
        )}

        {brandType === "vehicle" && brand.vehicleType && (
          <div className="mb-2">
            <span className="text-xs font-medium text-gray-500">Vehicle Type:</span>
            <span className="text-xs text-gray-700 ml-1">{brand.vehicleType}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{brand.productsCount || 0} products</span>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => onEdit(brand)}
            className="flex-1 px-3 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(brand)}
            className="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandTableRow;