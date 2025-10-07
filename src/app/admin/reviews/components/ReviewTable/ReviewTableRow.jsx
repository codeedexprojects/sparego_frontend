import { IMG_URL } from "@/redux/baseUrl";
const ReviewTableRow = ({ review, serialNumber, onEdit, onDelete, onToggleStatus }) => {
  // Helper function to safely get string values
  const getStringValue = (value) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value !== null) {
      return value.name || value.title || JSON.stringify(value);
    }
    return String(value || '');
  };

  // Helper function to get image URL
  const getImageUrl = (image) => {
    if (!image) return null;
    
    if (typeof image === 'string') {
      return image;
    }
    
    if (typeof image === 'object') {
      return image.url || image.path || image.src || null;
    }
    
    return null;
  };

  const imageUrl = getImageUrl(review.image);

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Serial Number */}
      <td className="px-6 py-4 font-medium text-gray-900">{serialNumber}</td>

      {/* Image */}
      <td className="px-6 py-4">
        {imageUrl ? (
          <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
            <img 
              src={`${IMG_URL}/${imageUrl}`} 
              alt={getStringValue(review.name)}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div 
              className="w-full h-full bg-gray-100 flex items-center justify-center hidden"
              style={{ display: 'none' }}
            >
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
      </td>

      {/* Reviewer Name */}
      <td className="px-6 py-4">
        <div className="font-medium text-gray-900">{getStringValue(review.name)}</div>
      </td>

      {/* Designation */}
      <td className="px-6 py-4 text-gray-900">{getStringValue(review.designation)}</td>

      {/* Title */}
      <td className="px-6 py-4 text-gray-900">{getStringValue(review.title)}</td>

      {/* Message */}
      <td className="px-6 py-4 text-gray-900 max-w-xs truncate">{getStringValue(review.message)}</td>

      {/* Status */}
      <td className="px-6 py-4">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
          review.isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {review.isActive ? 'Active' : 'Inactive'}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex space-x-2">
          {onEdit && (
            <button
              onClick={() => onEdit(review)}
              className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Edit
            </button>
          )}
          {onToggleStatus && (
            <button 
              onClick={() => onToggleStatus(review)}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                review.isActive
                  ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {review.isActive ? 'Deactivate' : 'Activate'}
            </button>
          )}
          {onDelete && (
            <button 
              onClick={() => onDelete(review)}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ReviewTableRow;