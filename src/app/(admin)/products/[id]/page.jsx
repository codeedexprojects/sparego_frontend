"use client";
import { useState, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import ProtectedRoute from '../../../../components/admin/ProtectedRoute';
import { 
  ArrowLeft, 
  Package, 
  Star, 
  Edit, 
  Trash2, 
  AlertCircle,
  CheckCircle,
  Tag,
  Calendar,
  BarChart3,
  Loader2
} from "lucide-react";
import { 
  getProductById, 
  deleteProduct,
  toggleProductStatus,
  clearError,
  clearOperationSuccess 
} from "../../../../redux/slices/adminProductSlice";
import { IMG_URL, BASE_URL } from "../../../../redux/baseUrl";

// Enhanced image gallery component
const ImageGallery = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const resolveImageUrl = (path) => {
    if (!path) return "";
    if (typeof path === 'string' && /^https?:\/\//i.test(path)) return path;
    // If backend served uploads path
    if (typeof path === 'string' && path.startsWith('/uploads/')) {
      const origin = BASE_URL.replace(/\/api\/?$/, '');
      return `${origin}${path}`;
    }
    // Default to cloud/image CDN base
    return `${IMG_URL}${path}`;
  };

  // Helper function to safely get string values
  const getStringValue = (value) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value !== null) {
      return value.name || value.title || JSON.stringify(value);
    }
    return String(value || '');
  };

  // Normalize images array
  const normalizedImages = (Array.isArray(images) ? images : (images ? [images] : []))
    .map((img) => resolveImageUrl(img));
  if (normalizedImages.length === 0) {
    normalizedImages.push("https://via.placeholder.com/600x600?text=No+Image");
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={normalizedImages[selectedImage]}
          alt={getStringValue(productName)}
          className="w-full h-full object-cover"
        />
      </div>
      {normalizedImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {normalizedImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 ${
                selectedImage === index 
                  ? "border-blue-500" 
                  : "border-gray-200"
              }`}
            >
              <img
                src={image}
                alt={`${getStringValue(productName)} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Admin product actions component
const ProductActions = ({ product, onBack, onEdit, onDelete, onToggleStatus, loading }) => {
  // Helper function to safely get string values
  const getStringValue = (value) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value !== null) {
      return value.name || value.title || JSON.stringify(value);
    }
    return String(value || '');
  };

  const handleEdit = () => {
    onEdit?.(product);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${getStringValue(product.name)}"?`)) {
      onDelete?.(product);
    }
  };

  const handleToggleStatus = () => {
    onToggleStatus?.(product);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </button>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit Product
          </button>
          <button 
            onClick={handleToggleStatus}
            className={`flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-colors ${
              product.isActive !== false 
                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" 
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            {product.isActive !== false ? (
              <>
                <AlertCircle className="w-4 h-4" />
                Deactivate
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Activate
              </>
            )}
          </button>
          <button 
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 font-medium rounded-lg hover:bg-red-200 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{getStringValue(product.name)}</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-medium">{getStringValue(product.rating) || "4.8"}</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <span className="text-green-600 font-medium">{getStringValue(product.sold) || "1,234"} sold</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-gray-900">${getStringValue(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-500 line-through">${getStringValue(product.originalPrice)}</span>
                  {product.discount && (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm font-medium">
                      {getStringValue(product.discount)}% off
                    </span>
                  )}
                </>
              )}
            </div>
            
            <div className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium ${
              product.isActive !== false
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {product.isActive !== false ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              {product.isActive !== false ? "Active" : "Inactive"}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">SKU</span>
              <span className="font-semibold">{getStringValue(product.sku) || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Stock</span>
              <span className="font-semibold">{getStringValue(product.stock) || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Category</span>
              <span className="font-semibold">{getStringValue(product.category)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Brand</span>
              <span className="font-semibold">{getStringValue(product.brand)}</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-4">
          <h3 className="font-semibold text-gray-900 mb-3">Product Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Created:</span>
              <span className="font-medium">{new Date(product.createdAt || Date.now()).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Updated:</span>
              <span className="font-medium">{new Date(product.updatedAt || Date.now()).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-3">
              <BarChart3 className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Views:</span>
              <span className="font-medium">{getStringValue(product.views) || "0"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Tag className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Tags:</span>
              <span className="font-medium">{getStringValue(product.tags) || "None"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced product details tabs component
const ProductDetailsTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  // Helper function to safely get string values
  const getStringValue = (value) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value !== null) {
      return value.name || value.title || JSON.stringify(value);
    }
    return String(value || '');
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specs', label: 'Specifications' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="border-b border-gray-100">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-medium text-sm relative ${
                activeTab === tab.id
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-6">
        {activeTab === 'description' && (
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-600">
              {getStringValue(product.description) || 
                `The ${getStringValue(product.name)} is a premium device that combines cutting-edge technology 
                with elegant design. Featuring a stunning display, powerful performance, 
                and all-day battery life, it's the perfect choice for professionals and 
                creatives alike.`}
            </p>
            
            {product.features && (
              <>
                <h3 className="font-semibold text-gray-900 mt-6 mb-3">Key Features</h3>
                <ul className="text-gray-600 space-y-2">
                  {Array.isArray(product.features) ? 
                    product.features.map((feature, index) => (
                      <li key={index}>• {getStringValue(feature)}</li>
                    )) :
                    <li>• {getStringValue(product.features)}</li>
                  }
                </ul>
              </>
            )}
          </div>
        )}
        
        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">General</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Brand</span>
                  <span className="font-medium">{getStringValue(product.brand)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Model</span>
                  <span className="font-medium">{getStringValue(product.name)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{getStringValue(product.category)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SKU</span>
                  <span className="font-medium">{getStringValue(product.sku) || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Release Date</span>
                  <span className="font-medium">{getStringValue(product.releaseDate) || "N/A"}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Technical</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight</span>
                  <span className="font-medium">{getStringValue(product.weight) || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dimensions</span>
                  <span className="font-medium">{getStringValue(product.dimensions) || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Color</span>
                  <span className="font-medium">{getStringValue(product.color) || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Material</span>
                  <span className="font-medium">{getStringValue(product.material) || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      
      </div>
    </div>
  );
};

const ProductDetail = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentProduct, loading, error, operationSuccess } = useSelector((state) => state.adminProduct);

  // Unwrap params Promise using React.use()
  const resolvedParams = use(params);

  // Fetch product on component mount
  useEffect(() => {
    if (resolvedParams.id) {
      dispatch(getProductById(resolvedParams.id));
    }
  }, [dispatch, resolvedParams.id]);

  // Handle errors
  useEffect(() => {
    if (error) {
      console.error("Product detail error:", error?.message || error);
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

  // Event handlers
  const handleBack = () => {
    router.back();
  };

  const handleEdit = (product) => {
    router.push(`/products/edit/${product._id || product.id}`);
  };

  const handleDelete = async (product) => {
    try {
      const productId = product._id || product.id;
      await dispatch(deleteProduct(productId)).unwrap();
      router.push("/products");
    } catch (error) {
      console.error("Failed to delete product:", error?.message || error);
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

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Product</h3>
            <p className="text-gray-600 mb-6">{error?.message || "Failed to load product details"}</p>
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show not found state
  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Not Found</h3>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <ImageGallery 
              images={(Array.isArray(currentProduct.images) && currentProduct.images.length > 0)
                ? currentProduct.images
                : (currentProduct.imageUrl ? [currentProduct.imageUrl] : [])} 
              productName={currentProduct.name} 
            />
          </div>
          
          {/* Product Info & Actions */}
          <div>
            <ProductActions 
              product={currentProduct} 
              onBack={handleBack}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
              loading={loading}
            />
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <ProductDetailsTabs product={currentProduct} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProductDetail;