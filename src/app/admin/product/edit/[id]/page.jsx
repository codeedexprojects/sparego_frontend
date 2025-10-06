"use client";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useParams } from 'next/navigation';

import { editProduct, viewProductById } from '../../../../../redux/slices/adminProductSlice';
import { fetchSections } from '../../../../../redux/slices/sectionSlice';
import { fetchBrands } from '../../../../../redux/slices/adminProductBrand';
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

const EditProductForm = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  
  const productId = params?.id; // ensure it's defined
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
    section: null,
    mainCategory: null,
    category: null,
    subCategory: null,
    subSubCategory: null,
    productBrand: null,
    compatibleVehicles: []
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Fetch product & all related data
  useEffect(() => {
    if (productId) dispatch(viewProductById(productId));
    dispatch(fetchSections());
    dispatch(fetchBrands());
    dispatch(fetchMainCategories());
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
    dispatch(fetchSubSubCategories());
  }, [dispatch, productId]);

  // Populate formData when currentProduct is available
  useEffect(() => {
    if (currentProduct && !dataLoaded) {
      setFormData({
        name: currentProduct.name || '',
        description: currentProduct.description || '',
        price: currentProduct.price?.toString() || '',
        discount: currentProduct.discount?.toString() || '',
        stock: currentProduct.stock?.toString() || '',
        vehicleType: currentProduct.vehicleType || 'Universal',
        overview: currentProduct.overview || '',
        specifications: Array.isArray(currentProduct.specifications) ? currentProduct.specifications : [''],
        usage: Array.isArray(currentProduct.usage) ? currentProduct.usage : [''],
        technicalSpecs: Array.isArray(currentProduct.technicalSpecs) ? currentProduct.technicalSpecs : [{ key: '', value: '' }],
        warranty: currentProduct.warranty || '',
        partNumber: currentProduct.partNumber || '',
        isActive: currentProduct.isActive ?? true,
        isPopular: currentProduct.isPopular ?? false,
        section: currentProduct.section?._id || null,
        mainCategory: currentProduct.mainCategory?._id || null,
        category: currentProduct.category?._id || null,
        subCategory: currentProduct.subCategory?._id || null,
        subSubCategory: currentProduct.subSubCategory?._id || null,
        productBrand: currentProduct.productBrand?._id || null,
        compatibleVehicles: currentProduct.compatibleVehicles || []
      });

      if (currentProduct.images?.length > 0) setExistingImages(currentProduct.images);
      setDataLoaded(true);
    }
  }, [currentProduct, dataLoaded]);

  // Handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value || null }));
  };

  const handleArrayFieldChange = (field, index, value) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].map((v, i) => i === index ? value : v) }));
  };

  const addArrayField = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], field === 'technicalSpecs' ? { key: '', value: '' } : ''] }));
  };

  const removeArrayField = (field, index) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  const handleTechSpecChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      technicalSpecs: prev.technicalSpecs.map((spec, i) => i === index ? { ...spec, [field]: value } : spec)
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
    const previews = files.map(f => URL.createObjectURL(f));
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
      const newExisting = [...existingImages];
      newExisting.splice(index, 1);
      setExistingImages(newExisting);
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!formData.name || !formData.price) {
      alert('Product name and price are required');
      setSubmitting(false);
      return;
    }

    try {
      if (!productId) throw new Error("Product ID missing");

      const submitData = new FormData();

      // Simple fields
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

      // Optional references
      submitData.append("section", formData.section || '');
      submitData.append("mainCategory", formData.mainCategory || '');
      submitData.append("category", formData.category || '');
      submitData.append("subCategory", formData.subCategory || '');
      submitData.append("subSubCategory", formData.subSubCategory || '');
      submitData.append("productBrand", formData.productBrand || '');

      // Arrays
      submitData.append("specifications", JSON.stringify(formData.specifications.filter(i => i.trim() !== "")));
      submitData.append("usage", JSON.stringify(formData.usage.filter(i => i.trim() !== "")));
      formData.technicalSpecs
        .filter(spec => spec.key.trim() && spec.value.trim())
        .forEach((spec, i) => {
          submitData.append(`technicalSpecs[${i}][key]`, spec.key);
          submitData.append(`technicalSpecs[${i}][value]`, spec.value);
        });

      // Images
      images.forEach(file => submitData.append("images", file));

      await dispatch(editProduct({ id: productId, data: submitData })).unwrap();
      alert('Product updated successfully!');
      router.push("/admin/product");

    } catch (err) {
      console.error(err);
      alert(`Error updating product: ${err.message || "Please check all required fields"}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => router.push('/admin/product');

  if (productLoading && !dataLoaded) return <p>Loading product...</p>;
  if (error && !dataLoaded) return <p>Error loading product: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6">

          <BasicInfoSection formData={formData} onInputChange={handleInputChange} />

          <CategorySection
            formData={formData}
            onInputChange={handleInputChange}
            sections={sections}
            sectionsLoading={sectionsLoading}
            brands={productBrands}
            brandsLoading={brandsLoading}
            mainCategories={mainCategories}
            mainCategoriesLoading={mainCategoriesLoading}
            categories={categories}
            categoriesLoading={categoriesLoading}
            subCategories={subCategories}
            subCategoriesLoading={subCategoriesLoading}
            subSubCategories={subSubCategories}
            subSubCategoriesLoading={subSubCategoriesLoading}
          />

          <DescriptionSection formData={formData} onInputChange={handleInputChange} />
          <ImagesSection 
            images={images} 
            imagePreviews={imagePreviews || []} 
            existingImages={existingImages || []} 
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
          <AdditionalInfoSection formData={formData} onInputChange={handleInputChange} />

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button type="button" onClick={handleCancel} disabled={submitting} className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={submitting} className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              {submitting ? <span>Updating...</span> : <span>Update Product</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
