"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "../../../../components/admin/ProtectedRoute";
import { ArrowLeft, Save, AlertCircle, Package, DollarSign, Tag, Image as ImageIcon, FileText, Settings, X, Plus } from "lucide-react";

import {
  createProduct,
  clearError,
} from "../../../../redux/slices/adminProductSlice";
import { getBrands } from "../../../../redux/slices/adminBrandSlice";
import { fetchMainCategories } from "../../../../redux/slices/adminMainCategorySlice";
import { fetchCategories } from "../../../../redux/slices/adminCategorySlice";
import { fetchSubCategories } from "../../../../redux/slices/adminSubCategorySlice";
import { fetchSubSubCategories } from "../../../../redux/slices/adminSubSubCategorySlice";
import { getVehicles } from "../../../../redux/slices/adminVehicleSlice";
import { fetchSections } from "../../../../redux/slices/sectionSlice";

const AddProduct = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading, error, operationSuccess } = useSelector(
    (state) => state.adminProduct
  );

  const { brands: productBrands } = useSelector((state) => state.adminBrand);
  const { mainCategories } = useSelector((state) => state.adminMainCategory);
  const { categories } = useSelector((state) => state.adminCategory);
  const { subCategories } = useSelector((state) => state.adminSubCategory);
  const { subSubCategories } = useSelector((state) => state.adminSubSubCategory);
  const { vehicles } = useSelector((state) => state.adminVehicle);
  const { sections } = useSelector((state) => state.sections);

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
    overview: "",
    specifications: [],
    usage: [],
    technicalSpecs: [],
    warranty: "",
    discount: 0,
    isActive: true,
    isPopular: false,
    dimensions: { length: "", width: "", height: "" },
    weight: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getBrands("product"));
    dispatch(fetchMainCategories());
    dispatch(fetchSections());
  }, [dispatch]);

  useEffect(() => {
    if (product.mainCategory) {
      dispatch(fetchCategories(product.mainCategory));
      setProduct((prev) => ({
        ...prev,
        category: "",
        subCategory: "",
        subSubCategory: "",
      }));
    }
  }, [product.mainCategory, dispatch]);

  useEffect(() => {
    if (product.category) {
      dispatch(fetchSubCategories(product.category));
      setProduct((prev) => ({
        ...prev,
        subCategory: "",
        subSubCategory: "",
      }));
    }
  }, [product.category, dispatch]);

  useEffect(() => {
    if (product.subCategory) {
      dispatch(fetchSubSubCategories(product.subCategory));
      setProduct((prev) => ({
        ...prev,
        subSubCategory: "",
      }));
    }
  }, [product.subCategory, dispatch]);

  useEffect(() => {
    if (product.section && product.section !== "" && product.vehicleType) {
      dispatch(getVehicles({ vehicleType: product.vehicleType }));
    }
  }, [product.section, product.vehicleType, dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setProduct((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      const fileArray = Array.from(files).map((file) => URL.createObjectURL(file));
      setProduct((prev) => ({ ...prev, images: fileArray }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...product[field]];
    updated[index] = value;
    setProduct((prev) => ({ ...prev, [field]: updated }));
  };

  const addArrayItem = (field) => {
    setProduct((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (field, index) => {
    const updated = [...product[field]];
    updated.splice(index, 1);
    setProduct((prev) => ({ ...prev, [field]: updated }));
  };

  const handleTechnicalSpecChange = (index, key, value) => {
    const updated = [...product.technicalSpecs];
    updated[index][key] = value;
    setProduct((prev) => ({ ...prev, technicalSpecs: updated }));
  };

  const addTechnicalSpec = () => {
    setProduct((prev) => ({
      ...prev,
      technicalSpecs: [...prev.technicalSpecs, { key: "", value: "" }],
    }));
  };

  const removeTechnicalSpec = (index) => {
    const updated = [...product.technicalSpecs];
    updated.splice(index, 1);
    setProduct((prev) => ({ ...prev, technicalSpecs: updated }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = "Product name is required";
    if (!product.description.trim()) newErrors.description = "Description is required";
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
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const productData = {
        ...product,
        price: parseFloat(product.price),
        stock: parseInt(product.stock) || 0,
        weight: product.weight ? parseFloat(product.weight) : undefined,
        dimensions: {
          length: product.dimensions.length
            ? parseFloat(product.dimensions.length)
            : undefined,
          width: product.dimensions.width
            ? parseFloat(product.dimensions.width)
            : undefined,
          height: product.dimensions.height
            ? parseFloat(product.dimensions.height)
            : undefined,
        },
        discount: parseFloat(product.discount) || 0,
      };

      const result = await dispatch(createProduct(productData));

      if (result.type.endsWith("fulfilled")) {
        dispatch(clearError());
        router.push("/products");
      }
    } catch (err) {
      console.error("Error creating product:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.push("/products")}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all font-medium"
                >
                  <ArrowLeft className="w-5 h-5" /> Back
                </button>
                <div className="h-8 w-px bg-gray-300"></div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
                  <p className="text-sm text-gray-600 mt-1">Fill in the details to create a new product</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                  Draft
                </div>
              </div>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-4 mb-6 shadow-sm">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-red-800 font-semibold">Error</h3>
                  <p className="text-red-700 text-sm mt-1">{error.message || error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={product.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.name ? "border-red-300 bg-red-50" : "border-gray-300 bg-white"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      placeholder="Enter product name"
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />{errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Product Brand <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="productBrand"
                      value={product.productBrand}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.productBrand ? "border-red-300 bg-red-50" : "border-gray-300 bg-white"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    >
                      <option value="">Select brand</option>
                      {productBrands.map((b) => (
                        <option key={b._id} value={b._id}>{b.name}</option>
                      ))}
                    </select>
                    {errors.productBrand && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />{errors.productBrand}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.description ? "border-red-300 bg-red-50" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none`}
                    placeholder="Write a detailed description..."
                  />
                  {errors.description && (
                    <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />{errors.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing & Stock */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Pricing & Stock</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.price ? "border-red-300 bg-red-50" : "border-gray-300 bg-white"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      placeholder="0.00"
                      step="0.01"
                    />
                    {errors.price && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />{errors.price}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
                    <input
                      type="number"
                      name="discount"
                      value={product.discount}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="0"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                    <input
                      type="number"
                      name="stock"
                      value={product.stock}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={product.weight}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <Tag className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Categories & Classification</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Section <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="section"
                      value={product.section}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.section ? "border-red-300 bg-red-50" : "border-gray-300 bg-white"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    >
                      <option value="">Select section</option>
                      {sections.map((s) => (
                        <option key={s._id} value={s._id}>{s.name}</option>
                      ))}
                    </select>
                    {errors.section && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />{errors.section}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Main Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="mainCategory"
                      value={product.mainCategory}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.mainCategory ? "border-red-300 bg-red-50" : "border-gray-300 bg-white"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    >
                      <option value="">Select main category</option>
                      {mainCategories.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                    {errors.mainCategory && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />{errors.mainCategory}
                      </p>
                    )}
                  </div>

                  {product.mainCategory && categories.length > 0 && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select category</option>
                        {categories.map((c) => (
                          <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {product.category && subCategories.length > 0 && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Sub Category</label>
                      <select
                        name="subCategory"
                        value={product.subCategory}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select sub category</option>
                        {subCategories.map((c) => (
                          <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {product.subCategory && subSubCategories.length > 0 && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Sub Sub Category</label>
                      <select
                        name="subSubCategory"
                        value={product.subSubCategory}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select sub sub category</option>
                        {subSubCategories.map((c) => (
                          <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                    <select
                      name="vehicleType"
                      value={product.vehicleType}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="Universal">Universal</option>
                      <option value="Two-Wheeler">Two-Wheeler</option>
                      <option value="Four-Wheeler">Four-Wheeler</option>
                    </select>
                  </div>

                  {product.section === "SpareParts" && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Part Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="partNumber"
                        value={product.partNumber}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-lg border ${
                          errors.partNumber ? "border-red-300 bg-red-50" : "border-gray-300 bg-white"
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                        placeholder="Enter part number"
                      />
                      {errors.partNumber && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />{errors.partNumber}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {product.section === "SpareParts" && vehicles.length > 0 && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Compatible Vehicles
                    </label>
                    <select
                      multiple
                      value={product.compatibleVehicles}
                      onChange={(e) => {
                        const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
                        setProduct(prev => ({ ...prev, compatibleVehicles: selected }));
                      }}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      size={5}
                    >
                      {vehicles.map((v) => (
                        <option key={v._id} value={v._id}>{v.name}</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-2">Hold Ctrl/Cmd to select multiple vehicles</p>
                  </div>
                )}
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <ImageIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Product Images</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <input
                      type="file"
                      multiple
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                  {product.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {product.images.map((img, i) => (
                        <div key={i} className="relative group">
                          <img
                            src={img}
                            alt={`Product ${i + 1}`}
                            className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 group-hover:border-blue-400 transition-all"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Overview</label>
                    <textarea
                      name="overview"
                      value={product.overview}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Brief overview of the product..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Warranty</label>
                    <input
                      name="warranty"
                      value={product.warranty}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g., 1 year manufacturer warranty"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-700">Specifications</label>
                      <button
                        type="button"
                        onClick={() => addArrayItem("specifications")}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        <Plus className="w-4 h-4" /> Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {product.specifications.map((spec, i) => (
                        <div key={i} className="flex gap-2">
                          <input
                            type="text"
                            value={spec}
                            onChange={(e) => handleArrayChange("specifications", i, e.target.value)}
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter specification"
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayItem("specifications", i)}
                            className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-700">Usage Instructions</label>
                      <button
                        type="button"
                        onClick={() => addArrayItem("usage")}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        <Plus className="w-4 h-4" /> Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {product.usage.map((item, i) => (
                        <div key={i} className="flex gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => handleArrayChange("usage", i, e.target.value)}
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter usage instruction"
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayItem("usage", i)}
                            className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <Settings className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Technical Specifications</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700">Technical Specs</label>
                    <button
                      type="button"
                      onClick={addTechnicalSpec}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      <Plus className="w-4 h-4" /> Add Spec
                    </button>
                  </div>
                  <div className="space-y-3">
                    {product.technicalSpecs.map((spec, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Property name"
                          value={spec.key}
                          onChange={(e) => handleTechnicalSpecChange(i, "key", e.target.value)}
                          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Value"
                          value={spec.value}
                          onChange={(e) => handleTechnicalSpecChange(i, "value", e.target.value)}
                          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => removeTechnicalSpec(i)}
                          className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Dimensions</label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <input
                          type="number"
                          placeholder="Length"
                          value={product.dimensions.length}
                          onChange={(e) => setProduct(prev => ({ ...prev, dimensions: {...prev.dimensions, length: e.target.value} }))}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">Length (cm)</p>
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="Width"
                          value={product.dimensions.width}
                          onChange={(e) => setProduct(prev => ({ ...prev, dimensions: {...prev.dimensions, width: e.target.value} }))}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">Width (cm)</p>
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="Height"
                          value={product.dimensions.height}
                          onChange={(e) => setProduct(prev => ({ ...prev, dimensions: {...prev.dimensions, height: e.target.value} }))}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">Height (cm)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status & Visibility */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <Settings className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Status & Visibility</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={product.isActive}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      Active Product
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        name="isPopular"
                        checked={product.isPopular}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      Popular Product
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center gap-4">
                <button
                  type="button"
                  onClick={() => router.push("/products")}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Create Product
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AddProduct;