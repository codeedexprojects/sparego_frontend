const ImagesSection = ({ images, imagePreviews, onImageChange, onRemoveImage }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Images
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onImageChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-sm text-gray-500 mt-1">
          You can select multiple images
        </p>
        
        {imagePreviews.length > 0 && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Previews:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={preview} 
                    alt={`Preview ${index + 1}`} 
                    className="h-24 w-full object-cover rounded-lg border-2 border-gray-200 group-hover:border-gray-400 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagesSection;