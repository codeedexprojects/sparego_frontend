"use client";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, toggleProductStatus } from '../../../../redux/slices/adminProductSlice';
import { IMG_URL } from '../../../../redux/baseUrl';
import Link from 'next/link';
import Pagination from '../../../../components/shared/Pagination';
import { toast } from 'sonner';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error, total, page: apiPage, pages } = useSelector(state => state.adminProduct);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    dispatch(getAllProducts({ page: currentPage, limit }));
  }, [dispatch, currentPage, limit]);

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    try {
      await dispatch(toggleProductStatus({ id, isActive: newStatus })).unwrap();
      toast.success(newStatus ? 'Product activated successfully' : 'Product deactivated successfully');
      dispatch(getAllProducts({ page: currentPage, limit }));
    } catch (error) {
      toast.error(error?.message || 'Failed to update product status');
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && product.isActive) ||
      (filterStatus === 'inactive' && !product.isActive);
    return matchesSearch && matchesStatus;
  });

  const getSLNo = (index) => total - ((currentPage - 1) * limit + index);

  if (loading && !products.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error && !products.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-center mb-2">
            <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-red-800 font-semibold">Error Loading Products</h3>
          </div>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => dispatch(getAllProducts({ page: currentPage, limit }))}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="mt-1 text-sm text-gray-500">
              Showing {filteredProducts?.length || 0} of {total} products
              {currentPage > 1 && ` (Page ${currentPage} of ${pages})`}
            </p>
          </div>
          <Link
            href="/admin/spare-product/add"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Add New Product
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        {filteredProducts && filteredProducts.length > 0 ? (
          <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
              {/* Desktop */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL No.</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product, index) => (
                      <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900">{getSLNo(index)}</td>
                        <td className="px-6 py-4 flex items-center">
                          <img
                            src={product.images?.[0] ? `${IMG_URL}/${product.images[0]}` : "/placeholder.png"}
                            alt={product.name}
                            className="h-16 w-16 rounded-lg object-cover border border-gray-200 mr-4"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            {product.partNumber && <div className="text-sm text-gray-500">Part: {product.partNumber}</div>}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">₹{product.price}</td>
                        <td className={`px-6 py-4 text-sm font-medium ${
                          product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
                        }`}>{product.stock} units</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {product.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium flex justify-end gap-2">
                          <Link href={`/admin/spare-product/view/${product._id}`} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">View</Link>
                          <Link href={`/admin/spare-product/edit/${product._id}`} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">Edit</Link>
                          <button
                            onClick={() => handleToggleStatus(product._id, product.isActive)}
                            className={`px-3 py-1.5 rounded-md text-white ${
                              product.isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                            }`}
                          >
                            {product.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden divide-y divide-gray-200">
                {filteredProducts.map((product, index) => (
                  <div key={product._id} className="p-4 hover:bg-gray-50">
                    <div className="flex gap-4">
                      <img
                        src={product.images?.[0] ? `${IMG_URL}/${product.images[0]}` : "/placeholder.png"}
                        alt={product.name}
                        className="h-20 w-20 rounded-lg object-cover border border-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900 truncate">
                              {getSLNo(index)}. {product.name}
                            </h3>
                            {product.partNumber && <p className="text-xs text-gray-500">Part: {product.partNumber}</p>}
                          </div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ml-2 ${
                            product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {product.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-lg font-bold text-gray-900">₹{product.price}</div>
                          <div className={`text-sm font-medium ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {product.stock} units
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/admin/spare-product/view/${product._id}`} className="flex-1 text-center px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">View</Link>
                          <Link href={`/admin/spare-product/edit/${product._id}`} className="flex-1 text-center px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">Edit</Link>
                          <button
                            onClick={() => handleToggleStatus(product._id, product.isActive)}
                            className={`flex-1 px-3 py-1.5 text-xs rounded-md text-white ${
                              product.isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                            }`}
                          >
                            {product.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            {pages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={pages}
                onPageChange={handlePageChange}
                itemsPerPage={limit}
                setItemsPerPage={setLimit}
                totalItems={total}
              />
            )}
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-sm text-gray-500">Try adjusting your filters or add new products.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
