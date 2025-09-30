"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import ProtectedRoute from '../../../components/admin/ProtectedRoute';
import { getProducts, deleteProduct, toggleProductStatus, clearError, clearOperationSuccess } from "../../../redux/slices/adminProductSlice";
import { getBrands } from "../../../redux/slices/adminBrandSlice";
import SearchFilter from './components/SearchFilter';
import ProductTable from './components/ProductTable';
import Pagination from '../../../components/shared/Pagination';

const Products = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  
  // Make sure your Redux slice is structured correctly
  const { products, loading, error, operationSuccess, total, pages } = useSelector((state) => state.adminProduct);
  const { brands } = useSelector((state) => state.adminBrand);

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    brand: "",
    status: "",
    priceRange: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch products & brands
  useEffect(() => {
    const apiFilters = {
      search: searchTerm || undefined,
      productBrand: filters.brand || undefined,
      status: filters.status || undefined,
      minPrice: filters.priceRange === "low" ? 0 : filters.priceRange === "mid" ? 500 : filters.priceRange === "high" ? 1000 : undefined,
      maxPrice: filters.priceRange === "low" ? 500 : filters.priceRange === "mid" ? 1000 : undefined,
      page: currentPage,
      limit: itemsPerPage,
    };

    // Remove undefined values
    const cleanFilters = Object.fromEntries(
      Object.entries(apiFilters).filter(([_, value]) => value !== undefined)
    );

    dispatch(getProducts(cleanFilters));
  }, [dispatch, searchTerm, filters.brand, filters.status, filters.priceRange, currentPage]);

  useEffect(() => {
    dispatch(getBrands("product"));
  }, [dispatch]);

  useEffect(() => { 
    if (error) {
      const timer = setTimeout(() => dispatch(clearError()), 4000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);
  
  useEffect(() => { 
    if (operationSuccess) {
      const timer = setTimeout(() => dispatch(clearOperationSuccess()), 3000);
      return () => clearTimeout(timer);
    }
  }, [operationSuccess, dispatch]);

  const handleAddProduct = () => router.push("/products/addProducts");
  
  const handleDeleteProduct = (productId) => { 
    if (confirm(`Are you sure you want to delete this product?`)) {
      dispatch(deleteProduct(productId));
    }
  };
  
  const handleToggleStatus = (product) => {
    dispatch(toggleProductStatus({ 
      id: product._id || product.id, 
      currentStatus: product.isActive 
    }));
  };

  const handleSearch = (value) => { 
    setSearchTerm(value); 
    setCurrentPage(1); 
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => { 
    setSearchTerm(""); 
    setFilters({
      brand: "",
      status: "",
      priceRange: ""
    });
    setCurrentPage(1); 
  };

  // Use pages from backend or calculate from total
  const totalPages = pages || (total ? Math.ceil(total / itemsPerPage) : 1);
  
  // Ensure products is an array
  const productList = Array.isArray(products) ? products : [];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
              <p className="text-gray-600">
                {total !== undefined ? `${total} total products` : 'Manage your product inventory'}
              </p>
            </div>
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Product
            </button>
          </div>

          {/* Search & Filters */}
          <SearchFilter
            searchTerm={searchTerm}
            onSearch={handleSearch}
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            brands={brands || []}
          />

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          {/* Success Message */}
          {operationSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {operationSuccess}
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : productList.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Products Found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || filters.brand || filters.status || filters.priceRange
                  ? "Try adjusting your filters or search criteria"
                  : "Get started by adding your first product"}
              </p>
              {!(searchTerm || filters.brand || filters.status || filters.priceRange) && (
                <button
                  onClick={handleAddProduct}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Your First Product
                </button>
              )}
            </div>
          ) : (
            <>
              <ProductTable
                products={productList}
                onDelete={handleDeleteProduct}
                onToggleStatus={handleToggleStatus}
              />
              
              {totalPages > 1 && (
                <div className="mt-6">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Products;