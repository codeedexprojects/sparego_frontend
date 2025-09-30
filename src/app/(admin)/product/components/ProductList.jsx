"use client";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../../../redux/slices/adminProductSlice';
import { IMG_URL } from '../../../../redux/baseUrl';
import Link from 'next/link';
import Pagination from '../../../../components/shared/Pagination';

const ProductList = () => {
const dispatch = useDispatch();
  const { products, loading, error, total, page, pages } = useSelector(state => state.adminProduct);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit }));
  }, [dispatch, currentPage, limit]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products ({total})</h1>
        <Link href="/product/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add New Product
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {/* ... table headers */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products && products.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.images && product.images[0] && (
                    <img 
                      src={`${IMG_URL}/${product.images[0]}`}  
                      alt={product.name} 
                      className="h-10 w-10 object-cover rounded" 
                    />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${product.price}
                  {product.discount && (
                    <span className="text-red-500 ml-2">-{product.discount}%</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {/* CORRECTED NAVIGATION LINKS */}
                  <Link href={`/product/edit/${product._id}`} className="text-indigo-600 hover:text-indigo-900 mr-3">
                    Edit
                  </Link>
                  <Link href={`/product/view/${product._id}`} className="text-green-600 hover:text-green-900 mr-3">
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={pages} 
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProductList;