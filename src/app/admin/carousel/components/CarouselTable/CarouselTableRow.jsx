import { IMG_URL } from "../../../../../redux/baseUrl";

// components/CarouselTable/CarouselTableRow.jsx
const CarouselTableRow = ({ carousel, carouselType, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 flex flex-col transition-all hover:shadow-md">
      {/* Carousel Image */}
      <div className="h-40 w-full mb-2 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
        {carousel.image ? (
          <img
            src={`${IMG_URL}${carousel.image}`}
            alt={carousel.title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )}
      </div>
      {carousel.image && (
        <div className="mb-4 bg-gray-50 rounded px-2 py-1 text-xs text-gray-600 break-all flex items-center justify-between gap-2">
          <span className="truncate">
            {`${IMG_URL}${carousel.image}`}
          </span>
          <button
            onClick={() => navigator.clipboard && navigator.clipboard.writeText(`${IMG_URL}${carousel.image}`)}
            className="px-2 py-1 text-[11px] bg-gray-200 hover:bg-gray-300 rounded"
            title="Copy image URL"
          >
            Copy
          </button>
        </div>
      )}

      {/* Carousel Details */}
      <div className="flex-1 mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{carousel.title}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
            carousel.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {carousel.isActive ? 'Active' : 'Inactive'}
          </span>
          {(carouselType === "main" || carouselType === "home") && carousel.products && (
            <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
              {carousel.products.length} products
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500">
          Created: {new Date(carousel.createdAt || Date.now()).toLocaleDateString()}
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
        {onEdit && (
          <button
            onClick={() => onEdit(carousel)}
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
            onClick={() => onToggleStatus(carousel)}
            className={`px-3 py-2 text-sm rounded-lg transition-colors flex items-center gap-1 ${
              carousel.isActive
                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              {carousel.isActive ? (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              )}
            </svg>
            {carousel.isActive ? 'Deactivate' : 'Activate'}
          </button>
        )}
        {onDelete && (
          <button 
            onClick={() => onDelete(carousel)}
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

export default CarouselTableRow;