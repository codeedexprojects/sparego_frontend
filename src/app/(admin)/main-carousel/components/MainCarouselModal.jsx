import React from 'react';

const MainCarouselModal = ({
    isOpen,
    onClose,
    onSubmit,
    formData,
    onChange,
    preview,
    onRemoveImage,
    sections,
    products,
    productSearch,
    onProductSearch,
    onProductSelect,
    onRemoveProduct,
    selectedProducts,
    editingCarousel
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {editingCarousel ? "Edit Main Carousel" : "Add New Main Carousel"}
                    </h2>
                </div>
                <form onSubmit={onSubmit} className="px-6 py-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <FormInput
                                label="Title *"
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={onChange}
                                placeholder="Enter carousel title"
                                required
                            />

                            <FormSelect
                                label="Section (Optional)"
                                name="section"
                                value={formData.section}
                                onChange={onChange}
                                required={false}  
                            >
                                <option value="">Select Section</option>
                                {sections.map((s) => (
                                    <option key={s._id} value={s._id}>
                                        {s.name}
                                    </option>
                                ))}
                            </FormSelect>


                            <ImageUpload
                                preview={preview}
                                onChange={onChange}
                                onRemove={onRemoveImage}
                                required={!editingCarousel}
                                label="Carousel Image *"
                            />
                        </div>

                        {/* Right Column - Products Selection */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Products *
                                </label>

                                {/* Product Search */}
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={productSearch}
                                        onChange={onProductSearch}
                                        placeholder="Search products..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    />
                                </div>

                                {/* Selected Products */}
                                {selectedProducts.length > 0 && (
                                    <div className="mb-3">
                                        <p className="text-sm font-medium text-gray-700 mb-2">Selected Products:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProducts.map((product) => (
                                                <span
                                                    key={product._id}
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                                                >
                                                    {product.name}
                                                    <button
                                                        type="button"
                                                        onClick={() => onRemoveProduct(product._id)}
                                                        className="ml-2 text-blue-600 hover:text-blue-800"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Products List */}
                                <div className="border border-gray-300 rounded-lg max-h-48 overflow-y-auto">
                                    {products.length === 0 ? (
                                        <div className="p-4 text-center text-gray-500">
                                            No products found
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-gray-200">
                                            {products.map((product) => (
                                                <div
                                                    key={product._id}
                                                    className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${formData.products.includes(product._id) ? 'bg-blue-50' : ''
                                                        }`}
                                                    onClick={() => onProductSelect(product._id)}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-3">
                                                            {product.images && product.images.length > 0 ? (
                                                                <img
                                                                    src={product.images[0]}
                                                                    alt={product.name}
                                                                    className="w-10 h-10 object-cover rounded"
                                                                />
                                                            ) : (
                                                                <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                                                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                                                <p className="text-xs text-gray-500">
                                                                    {product.productBrand?.name} • ₹{product.price}
                                                                    {product.discount > 0 && (
                                                                        <span className="text-red-600 ml-1">({product.discount}% OFF)</span>
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className={`w-4 h-4 border-2 rounded ${formData.products.includes(product._id)
                                                                ? 'bg-blue-600 border-blue-600'
                                                                : 'border-gray-300'
                                                            }`}>
                                                            {formData.products.includes(product._id) && (
                                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    {formData.products.length} product(s) selected
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Modal Actions */}
                    <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!formData.title || formData.products.length === 0 || (!editingCarousel && !preview)}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {editingCarousel ? "Update Carousel" : "Add Carousel"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Reusable Form Components
const FormInput = ({ label, name, type = "text", value, onChange, placeholder, required = false }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            placeholder={placeholder}
            required={required}
        />
    </div>
);

const FormSelect = ({ label, name, value, onChange, children, required = false }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            required={required}
        >
            {children}
        </select>
    </div>
);

const ImageUpload = ({ preview, onChange, onRemove, required = false, label }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div className="flex items-center justify-center w-full">
            {preview ? (
                <div className="relative w-full">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                    />
                    <button
                        type="button"
                        onClick={onRemove}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span>
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={onChange}
                        className="hidden"
                        required={required}
                    />
                </label>
            )}
        </div>
    </div>
);

export default MainCarouselModal;