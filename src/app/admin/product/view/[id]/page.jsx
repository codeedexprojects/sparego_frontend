"use client";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { IMG_URL } from '../../../../../redux/baseUrl';
import { viewProductById } from '../../../../../redux/slices/adminProductSlice';

const ProductViewPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const router = useRouter();
  const { currentProduct, loading, error } = useSelector(state => state.adminProduct);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const productId = params.id;

  useEffect(() => {
    if (productId) {
      dispatch(viewProductById(productId));
    }
  }, [dispatch, productId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-center mb-2">
            <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-red-800 font-semibold">Error Loading Product</h3>
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/admin/product')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Product Not Found</h3>
          <p className="text-gray-500 mb-4">The product you're looking for doesn't exist.</p>
          <Link 
            href="/admin/product"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Helper function to parse specifications and usage (since they seem to be stringified arrays)
  const parseArrayField = (field) => {
    if (!field || !field.length) return [];
    
    try {
      // If it's already an array, return it
      if (Array.isArray(field)) {
        return field.filter(item => item && item.trim() !== '');
      }
      
      // If it's a string that looks like JSON, parse it
      if (typeof field === 'string') {
        const parsed = JSON.parse(field);
        return Array.isArray(parsed) ? parsed.filter(item => item && item.trim() !== '') : [];
      }
      
      return [];
    } catch (error) {
      // If parsing fails, treat it as a regular array
      return Array.isArray(field) ? field.filter(item => item && item.trim() !== '') : [];
    }
  };

  const specifications = parseArrayField(currentProduct.specifications);
  const usage = parseArrayField(currentProduct.usage);
  const technicalSpecs = currentProduct.technicalSpecs?.filter(spec => 
    spec.key && spec.value && spec.key.trim() !== '' && spec.value.trim() !== ''
  ) || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Link 
                  href="/admin/product"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Products
                </Link>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{currentProduct.name}</h1>
              <p className="mt-1 text-sm text-gray-500">
                Product ID: {currentProduct._id}
              </p>
            </div>
            <div className="flex gap-3">
              <Link 
                href={`/admin/product/edit/${currentProduct._id}`}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Product
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
                {currentProduct.images && currentProduct.images.length > 0 ? (
                  <img 
                    src={`${IMG_URL}/${currentProduct.images[activeImageIndex]}`}
                    alt={currentProduct.name}
                    className="w-full h-96 object-cover"
                  />
                ) : (
                  <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {currentProduct.images && currentProduct.images.length > 1 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Product Images</h3>
                <div className="grid grid-cols-4 gap-2">
                  {currentProduct.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`aspect-w-1 aspect-h-1 bg-gray-100 rounded-md overflow-hidden border-2 ${
                        activeImageIndex === index ? 'border-blue-500' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={`${IMG_URL}/${image}`}
                        alt={`${currentProduct.name} ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            {/* Basic Information Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Product Name</label>
                  <p className="mt-1 text-sm text-gray-900 font-medium">{currentProduct.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Part Number</label>
                  <p className="mt-1 text-sm text-gray-900">{currentProduct.partNumber || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Price</label>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">${currentProduct.price}</span>
                    {currentProduct.discount > 0 && (
                      <span className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded">
                        {currentProduct.discount}% OFF
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Stock</label>
                  <p className={`mt-1 text-sm font-medium ${
                    currentProduct.stock > 10 ? 'text-green-600' : 
                    currentProduct.stock > 0 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {currentProduct.stock} units
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      currentProduct.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      <span className={`w-1.5 h-1.5 mr-1.5 rounded-full ${
                        currentProduct.isActive ? 'bg-green-400' : 'bg-red-400'
                      }`}></span>
                      {currentProduct.isActive ? 'Active' : 'Inactive'}
                    </span>
                    {currentProduct.isPopular && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Popular
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Vehicle Type</label>
                  <p className="mt-1 text-sm text-gray-900 capitalize">{currentProduct.vehicleType}</p>
                </div>
              </div>
            </div>

            {/* Category Information Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Category Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Section</label>
                  <p className="mt-1 text-sm text-gray-900">{currentProduct.section?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Brand</label>
                  <div className="mt-1 flex items-center gap-2">
                    {currentProduct.productBrand?.logo && (
                      <img 
                        src={`${IMG_URL}/${currentProduct.productBrand.logo}`}
                        alt={currentProduct.productBrand.name}
                        className="w-6 h-6 object-cover rounded"
                      />
                    )}
                    <span className="text-sm text-gray-900">{currentProduct.productBrand?.name || 'N/A'}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Main Category</label>
                  <p className="mt-1 text-sm text-gray-900">{currentProduct.mainCategory?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <p className="mt-1 text-sm text-gray-900">{currentProduct.category?.name}</p>
                </div>
                {currentProduct.subCategory && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Sub Category</label>
                    <p className="mt-1 text-sm text-gray-900">{currentProduct.subCategory?.name}</p>
                  </div>
                )}
                {currentProduct.subSubCategory && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Sub Sub Category</label>
                    <p className="mt-1 text-sm text-gray-900">{currentProduct.subSubCategory?.name}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description & Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description & Overview</h2>
              <div className="space-y-4">
                {currentProduct.description && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Description</label>
                    <p className="mt-1 text-sm text-gray-900 leading-relaxed">{currentProduct.description}</p>
                  </div>
                )}
                {currentProduct.overview && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Overview</label>
                    <p className="mt-1 text-sm text-gray-900 leading-relaxed">{currentProduct.overview}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Specifications */}
            {specifications.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h2>
                <ul className="space-y-2">
                  {specifications.map((spec, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-900">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Usage Instructions */}
            {usage.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Usage Instructions</h2>
                <ul className="space-y-2">
                  {usage.map((usageItem, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="text-sm text-gray-900">{usageItem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technical Specifications */}
            {technicalSpecs.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Technical Specifications</h2>
                <div className="space-y-3">
                  {technicalSpecs.map((spec, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-sm font-medium text-gray-500">{spec.key}</span>
                      <span className="text-sm text-gray-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentProduct.warranty && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Warranty</label>
                    <p className="mt-1 text-sm text-gray-900">{currentProduct.warranty}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-500">Created At</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(currentProduct.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Updated At</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(currentProduct.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewPage;