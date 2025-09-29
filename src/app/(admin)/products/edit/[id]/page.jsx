"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from '../../../../../components/admin/ProtectedRoute';
import { ArrowLeft, Save, X, Image as ImageIcon, AlertCircle, Upload, Trash2 } from "lucide-react";
import { 
  getProductById, 
  updateProduct, 
  clearError, 
  clearOperationSuccess 
} from "../../../../../redux/slices/adminProductSlice";
import { 
  getBrands 
} from "../../../../../redux/slices/adminBrandSlice";
import { 
  getMainCategories,
  getCategories,
  getSubCategories,
  getSubSubCategories,
  clearCategories,
  clearSubCategories,
  clearSubSubCategories
} from "../../../../../redux/slices/adminCategorySlice";
import { 
  getVehicles 
} from "../../../../../redux/slices/adminVehicleSlice";

const EditProduct = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Unwrap params Promise using React.use()
  const resolvedParams = use(params);
  
  const { currentProduct, loading, error, operationSuccess } = useSelector(
    (state) => state.adminProduct
  );
  
  const { brands: productBrands } = useSelector((state) => state.adminBrand);
  const { 
    mainCategories, 
    categories, 
    subCategories, 
    subSubCategories 
  } = useSelector((state) => state.adminCategory);
  const { vehicles } = useSelector((state) => state.adminVehicle);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    section: "",
    price: "",
    stock: 0,
    mainCategory: "",
    category: "",
    subCategory: "",
    subSubCategory: "",
    vehicleType: "Universal",
    compatibleVehicles: [],
    partNumber: "",
    productBrand: "",
    images: [],
    isActive: true,
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: ""
    },
    warranty: "",
    discount: 0
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Load product data from API
  useEffect(() => {
    if (resolvedParams.id) {
      dispatch(getProductById(resolvedParams.id));
    }
  }, [dispatch, resolvedParams.id]);

  // Fetch initial data
  useEffect(() => {
    dispatch(getBrands('product'));
    dispatch(getMainCategories());
  }, [dispatch]);

  // Fetch categories when main category changes
  useEffect(() => {
    if (product.mainCategory) {
      dispatch(getCategories(product.mainCategory));
    }
  }, [product.mainCategory, dispatch]);

  // Fetch sub-categories when category changes
  useEffect(() => {
    if (product.category) {
      dispatch(getSubCategories(product.category));
    }
  }, [product.category, dispatch]);

  // Fetch sub-sub-categories when sub-category changes
  useEffect(() => {
    if (product.subCategory) {
      dispatch(getSubSubCategories(product.subCategory));
    }
  }, [product.subCategory, dispatch]);

  // Fetch vehicles when vehicle type changes (for spare parts)
  useEffect(() => {
    if (product.section === "SpareParts" && product.vehicleType) {
      dispatch(getVehicles({ vehicleType: product.vehicleType }));
    }
  }, [product.section, product.vehicleType, dispatch]);

  // Update form when product data is loaded
  useEffect(() => {
    if (currentProduct) {
      setProduct({
        name: currentProduct.name || "",
        description: currentProduct.description || "",
        section: currentProduct.section || "",
        price: String(currentProduct.price || ""),
        stock: Number(currentProduct.stock || 0),
        mainCategory: currentProduct.mainCategory?._id || currentProduct.mainCategory?.id || currentProduct.mainCategory || "",
        category: currentProduct.category?._id || currentProduct.category?.id || currentProduct.category || "",
        subCategory: currentProduct.subCategory?._id || currentProduct.subCategory?.id || currentProduct.subCategory || "",
        subSubCategory: currentProduct.subSubCategory?._id || currentProduct.subSubCategory?.id || currentProduct.subSubCategory || "",
        vehicleType: currentProduct.vehicleType || "Universal",
        compatibleVehicles: currentProduct.compatibleVehicles?.map(v => v._id || v.id || v) || [],
        partNumber: currentProduct.partNumber || "",
        productBrand: currentProduct.productBrand?._id || currentProduct.productBrand?.id || currentProduct.productBrand || "",
        images: currentProduct.images || [],
        isActive: currentProduct.isActive !== undefined ? currentProduct.isActive : true,
        weight: String(currentProduct.weight || ""),
        dimensions: {
          length: String(currentProduct.dimensions?.length || ""),
          width: String(currentProduct.dimensions?.width || ""),
          height: String(currentProduct.dimensions?.height || "")
        },
        warranty: currentProduct.warranty || "",
        discount: Number(currentProduct.discount || 0)
      });
      
      // Set image preview
      const imageUrl = currentProduct.images?.[0];
      if (imageUrl) {
        setImagePreview(imageUrl);
      }
    }
  }, [currentProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (ev) => {
          setImagePreview(ev.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!product.name || !String(product.name).trim()) newErrors.name = "Product name is required";
    if (!product.description || !String(product.description).trim()) newErrors.description = "Description is required";
    if (!product.section) newErrors.section = "Section is required";
    if (!product.price || product.price <= 0) newErrors.price = "Valid price is required";
    if (!product.mainCategory) newErrors.mainCategory = "Main category is required";
    if (!product.productBrand) newErrors.productBrand = "Product brand is required";
    if (product.section === "SpareParts" && !product.partNumber) newErrors.partNumber = "Part number is required for spare parts";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Prepare product data for API - only include defined values
      const productData = {
        name: product.name?.trim(),
        description: product.description?.trim(),
        section: product.section,
        price: parseFloat(product.price) || 0,
        stock: parseInt(product.stock) || 0,
        mainCategory: product.mainCategory,
        category: product.category || null,
        subCategory: product.subCategory || null,
        subSubCategory: product.subSubCategory || null,
        vehicleType: product.vehicleType,
        compatibleVehicles: product.compatibleVehicles,
        partNumber: product.partNumber?.trim() || null,
        productBrand: product.productBrand,
        isActive: Boolean(product.isActive),
        warranty: product.warranty?.trim() || null,
        discount: parseFloat(product.discount) || 0
      };

      // Only add weight if it has a value
      if (product.weight && product.weight.trim() !== "") {
        productData.weight = parseFloat(product.weight);
      }

      // Only add dimensions if they have values
      const dimensions = {};
      if (product.dimensions.length && product.dimensions.length.trim() !== "") {
        dimensions.length = parseFloat(product.dimensions.length);
      }
      if (product.dimensions.width && product.dimensions.width.trim() !== "") {
        dimensions.width = parseFloat(product.dimensions.width);
      }
      if (product.dimensions.height && product.dimensions.height.trim() !== "") {
        dimensions.height = parseFloat(product.dimensions.height);
      }
      
      if (Object.keys(dimensions).length > 0) {
        productData.dimensions = dimensions;
      }
      
      // Attach image file if provided
      if (imageFile) {
        productData.images = [imageFile];
      } else if (product.images && product.images.length > 0) {
        // Keep existing image URL if no new file selected
        productData.images = product.images;
      }

      console.log("Prepared product data for update:", productData);
      
      // Dispatch update action
      const result = await dispatch(updateProduct({ 
        id: resolvedParams.id, 
        productData 
      }));
      
      if (result.type.endsWith('fulfilled')) {
        // Clear any previous errors
        dispatch(clearError());
        // Redirect to products list
        router.push("/products");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/products");
  };

  // Show loading state
  if (loading && !currentProduct) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product details...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  // Show error state
  if (error && !currentProduct) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Product</h2>
            <p className="text-gray-600 mb-4">{error.message}</p>
            <button
              onClick={() => router.push("/products")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Products
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
      {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleCancel}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Products
                </button>
                <div className="h-6 w-px bg-gray-300"></div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                <span className="text-sm text-gray-500">ID: {resolvedParams.id}</span>
              </div>
        </div>
      </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                <p className="text-red-700">{error.message}</p>
              </div>
            </div>
          )}
          
          {operationSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-green-500 rounded-full mr-3"></div>
                <p className="text-green-700">{operationSuccess}</p>
              </div>
            </div>
          )}

      {/* Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
          {/* Product Name */}
          <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Product Name *
                    </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Enter product name"
            />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

                  {/* Description */}
          <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={product.description}
              onChange={handleChange}
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                        errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Enter product description"
                    />
                    {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                  </div>

                  {/* Section */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Section *
                    </label>
                    <select
                      name="section"
                      value={product.section}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.section ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select section</option>
                      <option value="SpareParts">Spare Parts</option>
                      <option value="HomeAppliances">Home Appliances</option>
                      <option value="Watches">Watches</option>
                    </select>
                    {errors.section && <p className="text-red-600 text-sm mt-1">{errors.section}</p>}
                  </div>

                  {/* Main Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Main Category *
                    </label>
                    <select
                      name="mainCategory"
                      value={product.mainCategory}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.mainCategory ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select main category</option>
                      {mainCategories.map((category, index) => (
                        <option key={category.id || category._id || index} value={category.id || category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.mainCategory && <p className="text-red-600 text-sm mt-1">{errors.mainCategory}</p>}
          </div>

                  {/* Category (Second Level) */}
                  {product.mainCategory && categories.length > 0 && (
          <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Category
                      </label>
                      <select
              name="category"
              value={product.category}
              onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Select category</option>
                        {categories.map((category, index) => (
                          <option key={category.id || category._id || index} value={category.id || category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Sub Category (Third Level) */}
                  {product.category && subCategories.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Sub Category
                      </label>
                      <select
                        name="subCategory"
                        value={product.subCategory}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Select sub category</option>
                        {subCategories.map((category, index) => (
                          <option key={category.id || category._id || index} value={category.id || category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Sub Sub Category (Fourth Level) */}
                  {product.subCategory && subSubCategories.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Sub Sub Category
                      </label>
                      <select
                        name="subSubCategory"
                        value={product.subSubCategory}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Select sub sub category</option>
                        {subSubCategories.map((category, index) => (
                          <option key={category.id || category._id || index} value={category.id || category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Product Brand */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Product Brand *
                    </label>
                    <select
                      name="productBrand"
                      value={product.productBrand}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.productBrand ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select brand</option>
                      {productBrands.map((brand, index) => (
                        <option key={brand.id || brand._id || index} value={brand.id || brand._id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                    {errors.productBrand && <p className="text-red-600 text-sm mt-1">{errors.productBrand}</p>}
          </div>

          {/* Price */}
          <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Price ($) *
                    </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
                      min="0"
                      step="0.01"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.price ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="0.00"
                    />
                    {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
          </div>

                  {/* Stock Quantity */}
          <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="0"
                    />
          </div>

                  {/* Part Number (for Spare Parts) */}
                  {product.section === "SpareParts" && (
          <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Part Number *
                      </label>
            <input
              type="text"
                        name="partNumber"
                        value={product.partNumber}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.partNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Enter part number"
                      />
                      {errors.partNumber && <p className="text-red-600 text-sm mt-1">{errors.partNumber}</p>}
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Product Image
                    </label>
                    <div 
                      className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                        isDragOver 
                          ? 'border-blue-400 bg-blue-50' 
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      {imagePreview ? (
                        <div className="space-y-4">
                          <div className="relative inline-block">
                            <img 
                              src={imagePreview} 
                              alt="Preview" 
                              className="w-32 h-32 object-cover rounded-lg mx-auto"
                            />
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-600">Current product image</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto" />
                          <div>
                            <p className="text-gray-600 mb-2">Drag & drop an image here, or</p>
                            <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                              <Upload className="w-4 h-4 mr-2" />
                              Choose File
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                              />
                            </label>
                          </div>
                          <div className="text-sm text-gray-500">
                            <p>Or enter image URL:</p>
                            <input
                              type="url"
              name="imageUrl"
                              value={product.images?.[0] || ""}
                              onChange={(e) => {
                                setProduct(prev => ({
                                  ...prev,
                                  images: e.target.value ? [e.target.value] : []
                                }));
                                if (e.target.value) {
                                  setImagePreview(e.target.value);
                                }
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Vehicle Type (for Spare Parts) */}
                  {product.section === "SpareParts" && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Vehicle Type
                      </label>
                      <select
                        name="vehicleType"
                        value={product.vehicleType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      >
                        <option value="Universal">Universal</option>
                        <option value="Two-Wheeler">Two-Wheeler</option>
                        <option value="Four-Wheeler">Four-Wheeler</option>
                      </select>
                    </div>
                  )}

                  {/* Compatible Vehicles (for Spare Parts) */}
                  {product.section === "SpareParts" && vehicles.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Compatible Vehicles
                      </label>
                      <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-xl p-3">
                        {vehicles.map((vehicle, index) => (
                          <label key={vehicle.id || vehicle._id || index} className="flex items-center mb-2">
                            <input
                              type="checkbox"
                              checked={product.compatibleVehicles.includes(vehicle.id || vehicle._id)}
                              onChange={(e) => {
                                const vehicleId = vehicle.id || vehicle._id;
                                if (e.target.checked) {
                                  setProduct(prev => ({
                                    ...prev,
                                    compatibleVehicles: [...prev.compatibleVehicles, vehicleId]
                                  }));
                                } else {
                                  setProduct(prev => ({
                                    ...prev,
                                    compatibleVehicles: prev.compatibleVehicles.filter(id => id !== vehicleId)
                                  }));
                                }
                              }}
                              className="mr-2"
                            />
                            <span className="text-sm">{vehicle.name} ({vehicle.brand?.name})</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Weight */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={product.weight}
                      onChange={handleChange}
                      min="0"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="0.0"
                    />
                  </div>

                  {/* Dimensions */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Dimensions (cm)
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Length</label>
                        <input
                          type="number"
                          name="dimensions.length"
                          value={product.dimensions.length}
                          onChange={(e) => setProduct(prev => ({
                            ...prev,
                            dimensions: { ...prev.dimensions, length: e.target.value }
                          }))}
                          min="0"
                          step="0.1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="0.0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Width</label>
                        <input
                          type="number"
                          name="dimensions.width"
                          value={product.dimensions.width}
                          onChange={(e) => setProduct(prev => ({
                            ...prev,
                            dimensions: { ...prev.dimensions, width: e.target.value }
                          }))}
                          min="0"
                          step="0.1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="0.0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Height</label>
                        <input
                          type="number"
                          name="dimensions.height"
                          value={product.dimensions.height}
                          onChange={(e) => setProduct(prev => ({
                            ...prev,
                            dimensions: { ...prev.dimensions, height: e.target.value }
                          }))}
                          min="0"
                          step="0.1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="0.0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Warranty */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Warranty
                    </label>
                    <input
                      type="text"
                      name="warranty"
                      value={product.warranty}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="e.g., 1 year manufacturer warranty"
                    />
                  </div>

                  {/* Discount */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      name="discount"
                      value={product.discount}
              onChange={handleChange}
                      min="0"
                      max="100"
                      step="1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="0"
                    />
                  </div>

                  {/* Active Status */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Product Status
                    </label>
                    <select
                      name="isActive"
                      value={product.isActive ? "active" : "inactive"}
                      onChange={(e) => setProduct(prev => ({
                        ...prev,
                        isActive: e.target.value === "active"
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                </div>
          </div>

          {/* Description */}
              <div className="mt-8">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Description *
                </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
                  rows="6"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                    errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter detailed product description"
                />
                {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
          </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Update Product
                    </>
                  )}
          </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default EditProduct;
