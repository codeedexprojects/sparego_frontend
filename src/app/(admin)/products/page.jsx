"use client";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import ProtectedRoute from '../../../components/admin/ProtectedRoute';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Package, 
  Star, 
  Eye, 
  Edit, 
  Trash2, 
  MoreVertical,
  TrendingUp,
  ShoppingCart,
  AlertCircle,
  CheckCircle,
  X,
  SlidersHorizontal,
  Download,
  Upload
} from "lucide-react";
import { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  toggleProductStatus,
  bulkDeleteProducts,
  bulkUpdateProductStatus,
  clearError,
  clearOperationSuccess 
} from "../../../redux/slices/adminProductSlice";
import { IMG_URL } from "../../../redux/baseUrl";

// Mock SearchFilter component
const SearchFilter = ({ searchTerm, onSearch, filters, onFilterChange, onReset, categories = [], brands = [] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search products by name, brand, or category..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <select 
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[140px] text-gray-900"
            value={filters.category}
            onChange={(e) => onFilterChange("category", e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={`category-${index}-${category}`} value={category}>{category}</option>
            ))}
          </select>
          
          <select 
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[120px] text-gray-900"
            value={filters.brand}
            onChange={(e) => onFilterChange("brand", e.target.value)}
          >
            <option value="">All Brands</option>
            {brands.map((brand, index) => (
              <option key={`brand-${index}-${brand}`} value={brand}>{brand}</option>
            ))}
          </select>
          
          <select 
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[120px] text-gray-900"
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          
          <button
            onClick={onReset}
            className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-gray-600 hover:text-gray-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Mock Pagination component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 border rounded-lg ${
            page === currentPage 
              ? "bg-blue-600 text-white border-blue-600" 
              : "border-gray-200 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

// Mock ProductTable component
const ProductTable = ({ products, viewMode, onEdit, onView, onDelete, onToggleStatus }) => {
  // Helper function to safely get string values
  const getStringValue = (value) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value !== null) {
      return value.name || value.title || JSON.stringify(value);
    }
    return String(value || '');
  };

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={product._id || product.id || `product-${index}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-square overflow-hidden">
              <img
                src={`${IMG_URL}/${product.imageUrl || product.images?.[0] || "https://via.placeholder.com/300x300?text=No+Image"}`}
                alt={getStringValue(product.name)}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{getStringValue(product.name)}</h3>
              <p className="text-sm text-gray-500 mb-2">{getStringValue(product.brand)}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-lg text-gray-900">${getStringValue(product.price)}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  product.isActive !== false ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {product.isActive !== false ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onView?.(product)}
                  className="flex-1 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4 mx-auto text-gray-600" />
                </button>
                <button
                  onClick={() => onEdit?.(product)}
                  className="flex-1 p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4 mx-auto text-blue-600" />
                </button>
                <button
                  onClick={() => onDelete?.(product)}
                  className="flex-1 p-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 mx-auto text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Product</th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Category</th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Price</th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Rating</th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product, index) => (
              <tr key={product._id || product.id || `product-${index}`} className="hover:bg-gray-50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={`${IMG_URL}/${product.imageUrl || product.images?.[0] || "https://via.placeholder.com/48x48?text=No+Image"}`}
                      alt={getStringValue(product.name)}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-gray-100"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{getStringValue(product.name)}</h3>
                      <p className="text-sm text-gray-500">{getStringValue(product.brand)}</p>
                    </div>
                  </div>
                </td>
                
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {getStringValue(product.category)}
                  </span>
                </td>
                
                <td className="py-4 px-6">
                  <span className="font-semibold text-gray-900 text-lg">${getStringValue(product.price)}</span>
                </td>
                
                <td className="py-4 px-6">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                    product.isActive !== false
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {product.isActive !== false ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <AlertCircle className="w-3 h-3" />
                    )}
                    {product.isActive !== false ? "Active" : "Inactive"}
                  </div>
                </td>
                
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{getStringValue(product.rating) || "4.5"}</span>
                    <span className="text-xs text-gray-400">({getStringValue(product.reviews) || "124"})</span>
                  </div>
                </td>
                
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onView?.(product)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button 
                      onClick={() => onEdit?.(product)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button 
                      onClick={() => onDelete?.(product)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Products = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { products, loading, error, operationSuccess, selectedProducts } = useSelector((state) => state.adminProduct);

  // Local state
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch products on component mount
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Handle errors
  useEffect(() => {
    if (error) {
      console.error("Product error:", error?.message || error);
      const timer = setTimeout(() => dispatch(clearError()), 4000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  // Handle success messages
  useEffect(() => {
    if (operationSuccess) {
      console.log("Success:", operationSuccess);
      const timer = setTimeout(() => dispatch(clearOperationSuccess()), 3000);
      return () => clearTimeout(timer);
    }
  }, [operationSuccess, dispatch]);

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    let result = products || [];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product =>
        (product.name || "").toLowerCase().includes(term) ||
        (product.brand || "").toLowerCase().includes(term) ||
        (product.category || "").toLowerCase().includes(term) ||
        (product.description || "").toLowerCase().includes(term)
      );
    }
    
    if (categoryFilter) {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    if (brandFilter) {
      result = result.filter(product => product.brand === brandFilter);
    }
    
    if (statusFilter) {
      if (statusFilter === "active") {
        result = result.filter(product => product.isActive !== false);
      } else if (statusFilter === "inactive") {
        result = result.filter(product => product.isActive === false);
      }
    }
    
    return result;
  }, [products, searchTerm, categoryFilter, brandFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get unique categories and brands for filters
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => String(p.category || '')).filter(Boolean))];
    return uniqueCategories;
  }, [products]);

  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(products.map(p => String(p.brand || '')).filter(Boolean))];
    return uniqueBrands;
  }, [products]);

  // Event handlers
  const handleAddProduct = () => {
    router.push("/products/addProducts");
  };

  const handleEditProduct = (product) => {
    router.push(`/products/edit/${product._id || product.id}`);
  };

  const handleViewProduct = (product) => {
    router.push(`/products/${product._id || product.id}`);
  };

  const handleDeleteProduct = async (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      try {
        const productId = product._id || product.id;
        await dispatch(deleteProduct(productId)).unwrap();
      } catch (error) {
        console.error("Failed to delete product:", error?.message || error);
      }
    }
  };

  const handleToggleStatus = async (product) => {
    try {
      const productId = product._id || product.id;
      await dispatch(toggleProductStatus({ 
        id: productId, 
        currentStatus: product.isActive 
      })).unwrap();
    } catch (error) {
      console.error("Failed to toggle product status:", error?.message || error);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) {
      try {
        await dispatch(bulkDeleteProducts(selectedProducts)).unwrap();
      } catch (error) {
        console.error("Failed to delete products:", error?.message || error);
      }
    }
  };

  const handleBulkStatusUpdate = async (status) => {
    if (selectedProducts.length === 0) return;
    try {
      await dispatch(bulkUpdateProductStatus({ 
        productIds: selectedProducts, 
        status 
      })).unwrap();
    } catch (error) {
      console.error("Failed to update product status:", error?.message || error);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case "category":
        setCategoryFilter(value);
        break;
      case "brand":
        setBrandFilter(value);
        break;
      case "status":
        setStatusFilter(value);
        break;
    }
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setBrandFilter("");
    setStatusFilter("");
    setCurrentPage(1);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
              <p className="text-gray-600">Manage your product inventory and listings</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleAddProduct}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <SearchFilter
            searchTerm={searchTerm}
            onSearch={handleSearch}
            filters={{
              category: categoryFilter,
              brand: brandFilter,
              status: statusFilter
            }}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            categories={categories}
            brands={brands}
          />

          {/* Bulk Actions */}
          {selectedProducts.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
              <span className="text-blue-700 font-medium">
                {selectedProducts.length} product(s) selected
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkStatusUpdate(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Activate
                </button>
                <button
                  onClick={() => handleBulkStatusUpdate(false)}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Deactivate
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-gray-200">
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "table" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
            
            <span className="text-sm text-gray-600">
              {filteredProducts.length} product(s) found
            </span>
          </div>

          <select className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option>Sort by: Name</option>
            <option>Sort by: Price</option>
            <option>Sort by: Stock</option>
            <option>Sort by: Category</option>
          </select>
        </div>

        {/* Products Display */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first product</p>
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors mx-auto"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <ProductTable 
              products={currentProducts} 
              viewMode={viewMode}
              onEdit={handleEditProduct}
              onView={handleViewProduct}
              onDelete={handleDeleteProduct}
              onToggleStatus={handleToggleStatus}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Products;