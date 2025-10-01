import { IMG_URL } from '../../../../../../redux/baseUrl';

const ImagesSection = ({ 
  images, 
  imagePreviews, 
  existingImages = [], 
  onImageChange, 
  onRemoveImage 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h3>
      
      {/* Upload Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload New Images
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onImageChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-sm text-gray-500 mt-1">
          You can select multiple images. New images will be added to existing ones.
        </p>
      </div>
      
      {/* Existing Images */}
      {existingImages.length > 0 && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Existing Images
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {existingImages.map((image, index) => (
              <div key={`existing-${index}`} className="relative group">
                <img 
                  src={`${IMG_URL}/${image}`} 
                  alt={`Existing ${index + 1}`} 
                  className="h-24 w-full object-cover rounded-lg border-2 border-gray-200 group-hover:border-gray-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => onRemoveImage(index, 'existing')}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                  title="Remove image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* New Image Previews */}
      {imagePreviews.length > 0 && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Image Previews
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {imagePreviews.map((preview, index) => (
              <div key={`new-${index}`} className="relative group">
                <img 
                  src={preview} 
                  alt={`Preview ${index + 1}`} 
                  className="h-24 w-full object-cover rounded-lg border-2 border-gray-200 group-hover:border-gray-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => onRemoveImage(index, 'new')}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                  title="Remove image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* No Images Message */}
      {existingImages.length === 0 && imagePreviews.length === 0 && (
        <div className="mt-4 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm text-gray-500">No images uploaded yet</p>
        </div>
      )}
    </div>
  );
};

export default ImagesSection;