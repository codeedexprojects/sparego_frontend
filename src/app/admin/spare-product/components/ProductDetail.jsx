"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewProductById } from '../../../../redux/slices/adminProductSlice';
import { useRouter } from 'next/navigation';

const ProductDetail = ({ productId }) => {
  const router = useRouter();
const dispatch = useDispatch();
  const { currentProduct, loading, error } = useSelector(state => state.adminProduct);

  useEffect(() => {
    if (productId) {
      dispatch(viewProductById(productId));
    }
  }, [dispatch, productId]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  if (!currentProduct) return <div className="text-center py-8">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Details</h1>
        <div className="space-x-2">
          {/* CORRECTED NAVIGATION */}
          <button
            onClick={() => router.push(`/admin/product/edit/${productId}`)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Product
          </button>
          <button
            onClick={() => router.push('/admin/product')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back to List
          </button>
        </div>
      </div>
<div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          {currentProduct.images && currentProduct.images.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Images</h2>
              <div className="flex flex-wrap gap-4">
                {currentProduct.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${currentProduct.name} ${index + 1}`}
                    className="h-32 w-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              <div className="space-y-3">
                <div>
                  <label className="font-medium text-gray-700">Name:</label>
                  <p className="mt-1">{currentProduct.name}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Description:</label>
                  <p className="mt-1">{currentProduct.description || 'N/A'}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Price:</label>
                  <p className="mt-1">${currentProduct.price}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Discount:</label>
                  <p className="mt-1">{currentProduct.discount ? `${currentProduct.discount}%` : 'N/A'}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Stock:</label>
                  <p className="mt-1">{currentProduct.stock}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Additional Information</h2>
              <div className="space-y-3">
                <div>
                  <label className="font-medium text-gray-700">Vehicle Type:</label>
                  <p className="mt-1">{currentProduct.vehicleType}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Warranty:</label>
                  <p className="mt-1">{currentProduct.warranty || 'N/A'}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Part Number:</label>
                  <p className="mt-1">{currentProduct.partNumber || 'N/A'}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Status:</label>
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    currentProduct.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {currentProduct.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Popular:</label>
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    currentProduct.isPopular ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {currentProduct.isPopular ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {currentProduct.specifications && currentProduct.specifications.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Specifications</h2>
              <ul className="list-disc list-inside space-y-1">
                {currentProduct.specifications.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
          )}

          {currentProduct.technicalSpecs && currentProduct.technicalSpecs.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Technical Specifications</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                {currentProduct.technicalSpecs.map((spec, index) => (
                  <div key={index} className="flex justify-between py-2 border-b last:border-b-0">
                    <span className="font-medium">{spec.key}:</span>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;