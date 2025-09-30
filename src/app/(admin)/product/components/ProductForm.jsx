"use client";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, editProduct, viewProductById } from '../../../../redux/slices/adminProductSlice';
import { fetchSections } from '../../../../redux/slices/sectionSlice';
import { useRouter } from 'next/navigation';

const ProductForm = ({ productId }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentProduct, loading: productLoading } = useSelector(state => state.adminProduct);
  const { sections, loading: sectionsLoading } = useSelector(state => state.sections);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    stock: '',
    vehicleType: 'Universal',
    overview: '',
    specifications: [''],
    usage: [''],
    technicalSpecs: [{ key: '', value: '' }],
    warranty: '',
    partNumber: '',
    isActive: true,
    isPopular: false,
    section: '',
    mainCategory: '',
    category: '',
    subCategory: '',
    subSubCategory: '',
    productBrand: ''
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Fetch sections when component mounts
    dispatch(fetchSections());
    
    if (productId) {
      dispatch(viewProductById(productId));
    }
    
    // Fetch categories and brands
    fetchCategories();
    fetchBrands();
  }, [dispatch, productId]);

  useEffect(() => {
    if (currentProduct && productId) {
      setFormData({
        name: currentProduct.name || '',
        description: currentProduct.description || '',
        price: currentProduct.price || '',
        discount: currentProduct.discount || '',
        stock: currentProduct.stock || '',
        vehicleType: currentProduct.vehicleType || 'Universal',
        overview: currentProduct.overview || '',
        specifications: currentProduct.specifications && currentProduct.specifications.length ? 
          currentProduct.specifications : [''],
        usage: currentProduct.usage && currentProduct.usage.length ? 
          currentProduct.usage : [''],
        technicalSpecs: currentProduct.technicalSpecs && currentProduct.technicalSpecs.length ? 
          currentProduct.technicalSpecs : [{ key: '', value: '' }],
        warranty: currentProduct.warranty || '',
        partNumber: currentProduct.partNumber || '',
        isActive: currentProduct.isActive !== undefined ? currentProduct.isActive : true,
        isPopular: currentProduct.isPopular !== undefined ? currentProduct.isPopular : false,
        section: currentProduct.section?._id || currentProduct.section || '',
        mainCategory: currentProduct.mainCategory?._id || currentProduct.mainCategory || '',
        category: currentProduct.category?._id || currentProduct.category || '',
        subCategory: currentProduct.subCategory?._id || currentProduct.subCategory || '',
        subSubCategory: currentProduct.subSubCategory?._id || currentProduct.subSubCategory || '',
        productBrand: currentProduct.productBrand?._id || currentProduct.productBrand || ''
      });
      setImagePreviews(currentProduct.images || []);
    }
  }, [currentProduct, productId]);

  // Mock function to fetch categories - replace with your actual API call
  const fetchCategories = async () => {
    try {
      const mockCategories = [
        { _id: '1', name: 'Engine Parts' },
        { _id: '2', name: 'Brake System' },
        { _id: '3', name: 'Suspension' },
        { _id: '4', name: 'Electrical' },
        { _id: '5', name: 'Exhaust System' }
      ];
      setCategories(mockCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Mock function to fetch brands - replace with your actual API call
  const fetchBrands = async () => {
    try {
      const mockBrands = [
        { _id: '1', name: 'Bosch' },
        { _id: '2', name: 'Delphi' },
        { _id: '3', name: 'Denso' },
        { _id: '4', name: 'NGK' },
        { _id: '5', name: 'Mobil' }
      ];
      setBrands(mockBrands);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayFieldChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], field === 'technicalSpecs' ? { key: '', value: '' } : '']
    }));
  };

  const removeArrayField = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleTechSpecChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      technicalSpecs: prev.technicalSpecs.map((spec, i) => 
        i === index ? { ...spec, [field]: value } : spec
      )
    }));
  };

  const addTechSpec = () => {
    addArrayField('technicalSpecs');
  };

  const removeTechSpec = (index) => {
    removeArrayField('technicalSpecs', index);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    
    // Create previews and clean up old ones
    imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImagePreview = (index) => {
    const newPreviews = [...imagePreviews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);

    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Validate required fields
    if (!formData.section) {
      alert('Section is required');
      setSubmitting(false);
      return;
    }

    if (!formData.name || !formData.price) {
      alert('Product name and price are required');
      setSubmitting(false);
      return;
    }
    
    const submitData = new FormData();
    
    // Append form data
    Object.keys(formData).forEach(key => {
      if (key === 'specifications' || key === 'usage') {
        // Filter out empty values and append each item
        formData[key]
          .filter(item => item.trim() !== '')
          .forEach(item => submitData.append(key, item));
      } else if (key === 'technicalSpecs') {
        // Filter out empty technical specs and stringify
        const filteredSpecs = formData[key].filter(spec => 
          spec.key.trim() !== '' && spec.value.trim() !== ''
        );
        if (filteredSpecs.length > 0) {
          submitData.append(key, JSON.stringify(filteredSpecs));
        }
      } else if (formData[key] !== '' && formData[key] !== null && formData[key] !== undefined) {
        submitData.append(key, formData[key]);
      }
    });
    
    // Append images
    images.forEach(image => {
      submitData.append('images', image);
    });

    try {
      if (productId) {
        await dispatch(editProduct({ id: productId, data: submitData })).unwrap();
      } else {
        await dispatch(addProduct(submitData)).unwrap();
      }
      router.push('/product');
    } catch (error) {
      console.error('Error saving product:', error);
      alert(`Error saving product: ${error.message || 'Please check all required fields'}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (productLoading && productId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">Loading product data...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {productId ? 'Edit Product' : 'Add New Product'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount (%)
            </label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>
        </div>

        {/* Required Section Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section *
          </label>
          <select
            name="section"
            value={formData.section}
            onChange={handleInputChange}
            required
            disabled={sectionsLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <option value="">
              {sectionsLoading ? 'Loading sections...' : 'Select Section'}
            </option>
            {sections.map((section) => (
              <option key={section._id} value={section._id}>
                {section.name}
              </option>
            ))}
          </select>
          {sectionsLoading && (
            <p className="text-sm text-gray-500 mt-1">Loading sections...</p>
          )}
        </div>

        {/* Category Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Category
            </label>
            <select
              name="mainCategory"
              value={formData.mainCategory}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Main Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sub Category
            </label>
            <select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Sub Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand
            </label>
            <select
              name="productBrand"
              value={formData.productBrand}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product description"
          />
        </div>

        {/* Overview */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Overview
          </label>
          <textarea
            name="overview"
            value={formData.overview}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product overview"
          />
        </div>

        {/* Vehicle Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle Type
          </label>
          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Universal">Universal</option>
            <option value="Two-Wheeler">Two-Wheeler</option>
            <option value="Four-Wheeler">Four-Wheeler</option>
          </select>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-500 mt-1">
            You can select multiple images
          </p>
          
          {imagePreviews.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Previews:
              </label>
              <div className="flex flex-wrap gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={preview} 
                      alt={`Preview ${index + 1}`} 
                      className="h-24 w-24 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImagePreview(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Specifications */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specifications
          </label>
          {formData.specifications.map((spec, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={spec}
                onChange={(e) => handleArrayFieldChange('specifications', index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter specification"
              />
              {formData.specifications.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField('specifications', index)}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField('specifications')}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Add Specification
          </button>
        </div>

        {/* Usage */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Usage Instructions
          </label>
          {formData.usage.map((usageItem, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={usageItem}
                onChange={(e) => handleArrayFieldChange('usage', index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter usage instruction"
              />
              {formData.usage.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField('usage', index)}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField('usage')}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Add Usage Instruction
          </button>
        </div>

        {/* Technical Specifications */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Technical Specifications
          </label>
          {formData.technicalSpecs.map((spec, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                value={spec.key}
                onChange={(e) => handleTechSpecChange(index, 'key', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Specification key"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) => handleTechSpecChange(index, 'value', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Specification value"
                />
                {formData.technicalSpecs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTechSpec(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addTechSpec}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Add Technical Specification
          </button>
        </div>

        {/* Additional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Warranty Information
            </label>
            <input
              type="text"
              name="warranty"
              value={formData.warranty}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 1 year warranty"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Part Number
            </label>
            <input
              type="text"
              name="partNumber"
              value={formData.partNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter part number"
            />
          </div>
        </div>

        {/* Status */}
        <div className="flex space-x-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Active Product</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isPopular"
              checked={formData.isPopular}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Mark as Popular</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={() => router.push('/product')}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting || productLoading}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? 'Saving...' : (productId ? 'Update Product' : 'Add Product')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;