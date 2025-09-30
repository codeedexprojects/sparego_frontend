"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import ProtectedRoute from "../../../../../components/admin/ProtectedRoute";
import { BASE_URL } from "../../../../../redux/baseUrl";

import { 
  fetchMainCategories 
} from "../../../../../redux/slices/adminMainCategorySlice";
import { 
  fetchCategories 
} from "../../../../../redux/slices/adminCategorySlice";
import { 
  fetchSubCategories 
} from "../../../../../redux/slices/adminSubCategorySlice";
import { 
  fetchSubSubCategories 
} from "../../../../../redux/slices/adminSubSubCategorySlice";

import { ArrowLeft, Save, AlertCircle, Package, DollarSign, Tag, Image as ImageIcon, FileText, Settings, X, Plus } from "lucide-react";

const EditProduct = () => {
  const params = useParams();
  const productId = params.id;
  const dispatch = useDispatch();
  const router = useRouter();

  const { mainCategories } = useSelector((state) => state.adminMainCategory);
  const { categories } = useSelector((state) => state.adminCategory);
  const { subCategories } = useSelector((state) => state.adminSubCategory);
  const { subSubCategories } = useSelector((state) => state.adminSubSubCategory);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: 0,
    mainCategory: "",
    category: "",
    subCategory: "",
    subSubCategory: "",
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
  const [loading, setLoading] = useState(false);

  // Fetch dropdowns
  useEffect(() => {
    dispatch(fetchMainCategories());
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
    dispatch(fetchSubSubCategories());
  }, [dispatch]);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("adminToken");
        const res = await axios.get(`${BASE_URL}/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;

        setProduct({
          name: data.name || "",
          description: data.description || "",
          price: data.price || "",
          stock: data.stock || 0,
          mainCategory: data.mainCategory || "",
          category: data.category || "",
          subCategory: data.subCategory || "",
          subSubCategory: data.subSubCategory || "",
          images: data.images || [],
          overview: data.overview || "",
          specifications: data.specifications || [],
          usage: data.usage || [],
          technicalSpecs: data.technicalSpecs || [],
          warranty: data.warranty || "",
          discount: data.discount || 0,
          isActive: data.isActive ?? true,
          isPopular: data.isPopular ?? false,
          dimensions: data.dimensions || { length: "", width: "", height: "" },
          weight: data.weight || "",
        });
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  // Handlers
  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === "file") {
      const fileArray = Array.from(files).map((file) => URL.createObjectURL(file));
      setProduct((prev) => ({ ...prev, images: fileArray }));
    } else if (type === "checkbox") {
      setProduct((prev) => ({ ...prev, [name]: checked }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
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
    if (!product.price || product.price <= 0) newErrors.price = "Valid price is required";
    if (!product.mainCategory) newErrors.mainCategory = "Main category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const formData = new FormData();

      Object.keys(product).forEach((key) => {
        if (product[key] !== null && product[key] !== undefined) {
          if (Array.isArray(product[key]) || typeof product[key] === "object") {
            formData.append(key, JSON.stringify(product[key]));
          } else {
            formData.append(key, product[key]);
          }
        }
      });

      await axios.patch(`${BASE_URL}/products/${productId}`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      toast.success("Product updated successfully");
      router.push("/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => router.push("/products")} className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
              <ArrowLeft /> Back
            </button>
            <h1 className="text-2xl font-bold">Edit Product</h1>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.name ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.price ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                  />
                  {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
                </div>
              </div>

              {/* Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label>Main Category</label>
                  <select
                    name="mainCategory"
                    value={product.mainCategory}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.mainCategory ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Main Category</option>
                    {mainCategories.map((mc) => (
                      <option key={mc._id} value={mc._id}>
                        {mc.name}
                      </option>
                    ))}
                  </select>
                  {errors.mainCategory && <p className="text-red-600 text-sm mt-1">{errors.mainCategory}</p>}
                </div>

                <div>
                  <label>Category</label>
                  <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Sub Category</label>
                  <select
                    name="subCategory"
                    value={product.subCategory}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  >
                    <option value="">Select Sub Category</option>
                    {subCategories.map((sc) => (
                      <option key={sc._id} value={sc._id}>
                        {sc.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Sub Sub Category</label>
                  <select
                    name="subSubCategory"
                    value={product.subSubCategory}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  >
                    <option value="">Select Sub Sub Category</option>
                    {subSubCategories.map((ssc) => (
                      <option key={ssc._id} value={ssc._id}>
                        {ssc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label>Description</label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.description ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                />
                {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
              </div>

              {/* Images */}
              <div>
                <label>Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full"
                />
                <div className="flex flex-wrap mt-2 gap-2">
                  {product.images.map((img, idx) => (
                    <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border">
                      <img src={img} alt={`product-${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                        onClick={() => {
                          const updated = [...product.images];
                          updated.splice(idx, 1);
                          setProduct((prev) => ({ ...prev, images: updated }));
                        }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrays: specifications, usage, technicalSpecs */}
              {["specifications", "usage"].map((field) => (
                <div key={field}>
                  <label className="capitalize">{field}</label>
                  {product[field].map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-center mb-1">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayChange(field, idx, e.target.value)}
                        className="flex-1 px-3 py-2 border rounded-lg"
                      />
                      <button type="button" onClick={() => removeArrayItem(field, idx)}>
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem(field)} className="text-blue-600 flex items-center gap-1">
                    <Plus size={14} /> Add {field.slice(0, -1)}
                  </button>
                </div>
              ))}

              {/* Technical Specs */}
              <div>
                <label>Technical Specs</label>
                {product.technicalSpecs.map((spec, idx) => (
                  <div key={idx} className="flex gap-2 items-center mb-1">
                    <input
                      type="text"
                      placeholder="Key"
                      value={spec.key}
                      onChange={(e) => handleTechnicalSpecChange(idx, "key", e.target.value)}
                      className="px-3 py-2 border rounded-lg flex-1"
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={spec.value}
                      onChange={(e) => handleTechnicalSpecChange(idx, "value", e.target.value)}
                      className="px-3 py-2 border rounded-lg flex-1"
                    />
                    <button type="button" onClick={() => removeTechnicalSpec(idx)}>
                      <X size={18} />
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addTechnicalSpec} className="text-blue-600 flex items-center gap-1">
                  <Plus size={14} /> Add Spec
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700"
              >
                <Save size={16} /> Update Product
              </button>
            </form>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default EditProduct;
