"use client";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProduct, viewProductById } from '../../../../../redux/slices/adminProductSlice';
import { fetchSections } from '../../../../../redux/slices/sectionSlice';
import { useRouter, useParams } from 'next/navigation';
import { fetchMainCategories } from '../../../../../redux/slices/adminMainCategorySlice';
import { fetchCategories } from '../../../../../redux/slices/adminCategorySlice';
import { fetchSubCategories } from '../../../../../redux/slices/adminSubCategorySlice';
import { fetchSubSubCategories } from '../../../../../redux/slices/adminSubSubCategorySlice';
import BasicInfoSection from './components/BasicInfoSection';
import CategorySection from './components/CategorySection';
import DescriptionSection from './components/DescriptionSection';
import ImagesSection from './components/ImageSection';
import SpecificationsSection from './components/SpecificationSection';
import AdditionalInfoSection from './components/AdditionalInfoSection';
import { fetchBrands } from '../../../../../redux/slices/adminProductBrand';

const EditProductForm = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  
  const productId = params.id;
  
  const { currentProduct, loading: productLoading, error } = useSelector(state => state.adminProduct);
  const { sections, loading: sectionsLoading } = useSelector(state => state.sections);
  const { brands: productBrands, loading: brandsLoading } = useSelector(state => state.adminProductBrand);
  const { mainCategories, loading: mainCategoriesLoading } = useSelector(state => state.adminMainCategory);
  const { categories, loading: categoriesLoading } = useSelector(state => state.adminCategory);
  const { subCategories, loading: subCategoriesLoading } = useSelector(state => state.adminSubCategory);
  const { subSubCategories, loading: subSubCategoriesLoading } = useSelector(state => state.adminSubSubCategory);

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
  const [existingImages, setExistingImages] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [filteredMainCategories, setFilteredMainCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [filteredSubSubCategories, setFilteredSubSubCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Fetch all data on component mount
  useEffect(() => {
    if (productId) {
      dispatch(viewProductById(productId));
    }
    dispatch(fetchSections());
    dispatch(fetchBrands());
    dispatch(fetchMainCategories());
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
    dispatch(fetchSubSubCategories());
  }, [dispatch, productId]);

  // Populate form when currentProduct is available
  useEffect(() => {
    if (currentProduct && productId && !dataLoaded) {
      console.log('Populating form with product data:', currentProduct);
      
      // Helper function to parse array fields (handles both stringified and regular arrays)
      const parseArrayField = (field) => {
        if (!field || !field.length) return [''];
        
        try {
          if (Array.isArray(field)) {
            const filtered = field.filter(item => item && item.trim() !== '');
            return filtered.length > 0 ? filtered : [''];
          }
          
          if (typeof field === 'string') {
            const parsed = JSON.parse(field);
            if (Array.isArray(parsed)) {
              const filtered = parsed.filter(item => item && item.trim() !== '');
              return filtered.length > 0 ? filtered : [''];
            }
          }
          
          return [''];
        } catch (error) {
          console.warn('Error parsing array field:', error);
          return [''];
        }
      };

      // Helper function to parse technical specs
      const parseTechnicalSpecs = (specs) => {
        if (!specs || !specs.length) return [{ key: '', value: '' }];
        
        try {
          if (Array.isArray(specs)) {
            const filtered = specs.filter(spec => 
              spec && (spec.key || spec.value) && (spec.key.trim() !== '' || spec.value.trim() !== '')
            );
            return filtered.length > 0 ? filtered : [{ key: '', value: '' }];
          }
          
          return [{ key: '', value: '' }];
        } catch (error) {
          console.warn('Error parsing technical specs:', error);
          return [{ key: '', value: '' }];
        }
      };

      setFormData({
        name: currentProduct.name || '',
        description: currentProduct.description || '',
        price: currentProduct.price?.toString() || '',
        discount: currentProduct.discount?.toString() || '',
        stock: currentProduct.stock?.toString() || '',
        vehicleType: currentProduct.vehicleType || 'Universal',
        overview: currentProduct.overview || '',
        specifications: parseArrayField(currentProduct.specifications),
        usage: parseArrayField(currentProduct.usage),
        technicalSpecs: parseTechnicalSpecs(currentProduct.technicalSpecs),
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

      // Set existing images for preview
      if (currentProduct.images && currentProduct.images.length > 0) {
        setExistingImages(currentProduct.images);
      }

      setDataLoaded(true);
    }
  }, [currentProduct, productId, dataLoaded]);

  // Filter brands by section
  useEffect(() => {
    if (formData.section && productBrands?.length > 0) {
      const filtered = productBrands.filter(brand =>
        brand.section && brand.section._id === formData.section
      );
      setFilteredBrands(filtered);

      if (formData.productBrand) {
        const currentBrandExists = filtered.some(brand => brand._id === formData.productBrand);
        if (!currentBrandExists) {
          setFormData(prev => ({ ...prev, productBrand: '' }));
        }
      }
    } else {
      setFilteredBrands([]);
    }
  }, [formData.section, productBrands]);

  // Filter main categories by section
  useEffect(() => {
    if (formData.section && mainCategories?.length > 0) {
      const filtered = mainCategories.filter(cat =>
        cat.section && cat.section._id === formData.section
      );
      setFilteredMainCategories(filtered);

      if (formData.mainCategory) {
        const exists = filtered.some(cat => cat._id === formData.mainCategory);
        if (!exists) {
          setFormData(prev => ({
            ...prev,
            mainCategory: '',
            category: '',
            subCategory: '',
            subSubCategory: ''
          }));
        }
      }
    } else {
      setFilteredMainCategories([]);
    }
  }, [formData.section, mainCategories]);

  // Filter categories by main category
  useEffect(() => {
    if (formData.mainCategory && categories?.length > 0) {
      const filtered = categories.filter(cat =>
        cat.mainCategory && cat.mainCategory._id === formData.mainCategory
      );
      setFilteredCategories(filtered);

      if (formData.category) {
        const exists = filtered.some(cat => cat._id === formData.category);
        if (!exists) {
          setFormData(prev => ({
            ...prev,
            category: '',
            subCategory: '',
            subSubCategory: ''
          }));
        }
      }
    } else {
      setFilteredCategories([]);
    }
  }, [formData.mainCategory, categories]);

  // Filter sub categories by category
  useEffect(() => {
    if (formData.category && subCategories?.length > 0) {
      const filtered = subCategories.filter(cat =>
        cat.category && cat.category._id === formData.category
      );
      setFilteredSubCategories(filtered);

      if (formData.subCategory) {
        const exists = filtered.some(cat => cat._id === formData.subCategory);
        if (!exists) {
          setFormData(prev => ({
            ...prev,
            subCategory: '',
            subSubCategory: ''
          }));
        }
      }
    } else {
      setFilteredSubCategories([]);
    }
  }, [formData.category, subCategories]);

  // Filter sub sub categories by sub category
  useEffect(() => {
    if (formData.subCategory && subSubCategories?.length > 0) {
      const filtered = subSubCategories.filter(cat =>
        cat.subCategory && cat.subCategory._id === formData.subCategory
      );
      setFilteredSubSubCategories(filtered);

      if (formData.subSubCategory) {
        const exists = filtered.some(cat => cat._id === formData.subSubCategory);
        if (!exists) {
          setFormData(prev => ({ ...prev, subSubCategory: '' }));
        }
      }
    } else {
      setFilteredSubSubCategories([]);
    }
  }, [formData.subCategory, subSubCategories]);

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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...previews]);
  };

  const removeImagePreview = (index, type = 'new') => {
    if (type === 'new') {
      const newPreviews = [...imagePreviews];
      URL.revokeObjectURL(newPreviews[index]);
      newPreviews.splice(index, 1);
      setImagePreviews(newPreviews);

      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);
    } else {
      // Remove existing image
      const newExistingImages = [...existingImages];
      newExistingImages.splice(index, 1);
      setExistingImages(newExistingImages);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

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

    try {
      const submitData = new FormData();

      // Append simple fields
      submitData.append("name", formData.name);
      submitData.append("description", formData.description);
      submitData.append("price", parseFloat(formData.price));
      submitData.append("discount", formData.discount || 0);
      submitData.append("stock", formData.stock || 0);
      submitData.append("vehicleType", formData.vehicleType);
      submitData.append("overview", formData.overview);
      submitData.append("warranty", formData.warranty);
      submitData.append("partNumber", formData.partNumber);
      submitData.append("isActive", formData.isActive);
      submitData.append("isPopular", formData.isPopular);
      submitData.append("section", formData.section);

      if (formData.mainCategory) submitData.append("mainCategory", formData.mainCategory);
      if (formData.category) submitData.append("category", formData.category);
      if (formData.subCategory) submitData.append("subCategory", formData.subCategory);
      if (formData.subSubCategory) submitData.append("subSubCategory", formData.subSubCategory);
      if (formData.productBrand) submitData.append("productBrand", formData.productBrand);

      // Handle arrays
      const cleanSpecifications = formData.specifications.filter(item => item.trim() !== "");
      const cleanUsage = formData.usage.filter(item => item.trim() !== "");
      
      submitData.append("specifications", JSON.stringify(cleanSpecifications));
      submitData.append("usage", JSON.stringify(cleanUsage));
      
      // Handle technical specs
      const cleanTechnicalSpecs = formData.technicalSpecs.filter(spec => 
        spec.key.trim() !== "" && spec.value.trim() !== ""
      );
      cleanTechnicalSpecs.forEach((spec, index) => {
        submitData.append(`technicalSpecs[${index}][key]`, spec.key);
        submitData.append(`technicalSpecs[${index}][value]`, spec.value);
      });

      // Append new images
      images.forEach((file) => {
        submitData.append("images", file);
      });

      // If existing images were removed, you might need to handle that
      // This depends on your API - some APIs expect you to send all remaining images
      // For now, we're only sending new images and the API should keep existing ones

      console.log('Submitting edit data for product:', productId);
      
      await dispatch(editProduct({ id: productId, data: submitData })).unwrap();
      
      alert('Product updated successfully!');
      router.push("/admin/product");
      
    } catch (error) {
      console.error("Error updating product:", error);
      alert(`Error updating product: ${error.message || "Please check all required fields"}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/product');
  };

  if (productLoading && !dataLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product data...</p>
        </div>
      </div>
    );
  }

  if (error && !dataLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-center mb-2">
            <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-red-800 font-semibold">Error Loading Product</h3>
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/admin/product')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={handleCancel}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Products
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          <p className="mt-2 text-sm text-gray-600">
            Update product information for: <strong>{formData.name}</strong>
          </p>
          {currentProduct && (
            <p className="mt-1 text-xs text-gray-500">
              Product ID: {currentProduct._id}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <BasicInfoSection
            formData={formData}
            onInputChange={handleInputChange}
          />

          <CategorySection
            formData={formData}
            onInputChange={handleInputChange}
            sections={sections}
            sectionsLoading={sectionsLoading}
            brands={filteredBrands}
            brandsLoading={brandsLoading}
            mainCategories={filteredMainCategories}
            mainCategoriesLoading={mainCategoriesLoading}
            categories={filteredCategories}
            categoriesLoading={categoriesLoading}
            subCategories={filteredSubCategories}
            subCategoriesLoading={subCategoriesLoading}
            subSubCategories={filteredSubSubCategories}
            subSubCategoriesLoading={subSubCategoriesLoading}
          />

          <DescriptionSection
            formData={formData}
            onInputChange={handleInputChange}
          />

          <ImagesSection
            images={images}
            imagePreviews={imagePreviews}
            existingImages={existingImages}
            onImageChange={handleImageChange}
            onRemoveImage={removeImagePreview}
          />

          <SpecificationsSection
            formData={formData}
            onArrayFieldChange={handleArrayFieldChange}
            onAddArrayField={addArrayField}
            onRemoveArrayField={removeArrayField}
            onTechSpecChange={handleTechSpecChange}
          />

          <AdditionalInfoSection
            formData={formData}
            onInputChange={handleInputChange}
          />

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              disabled={submitting}
              className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Update Product</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;