"use client";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, editProduct, viewProductById } from '../../../../redux/slices/adminProductSlice';
import { fetchSections } from '../../../../redux/slices/sectionSlice';
import { useRouter } from 'next/navigation';
import AdditionalInfoSection from './components/AdditionalInfoSection';
import BasicInfoSection from './components/BasicInfoSection';
import CategorySection from './components/CategorySection';
import DescriptionSection from './components/DescriptionSection';
import ImagesSection from './components/ImageSection';
import SpecificationsSection from './components/SpecificationSection';
import { fetchBrands } from '../../../../redux/slices/adminProductBrand';
import { fetchMainCategories } from '../../../../redux/slices/adminMainCategorySlice';
import { fetchCategories } from '../../../../redux/slices/adminCategorySlice';
import { fetchSubCategories } from '../../../../redux/slices/adminSubCategorySlice';
import { fetchSubSubCategories } from '../../../../redux/slices/adminSubSubCategorySlice';

const ProductForm = ({ productId, onSuccess, onCancel }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentProduct, loading: productLoading } = useSelector(state => state.adminProduct);
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
  const [submitting, setSubmitting] = useState(false);

  // Initial fetch
  useEffect(() => {
    dispatch(fetchSections());
    dispatch(fetchBrands());
    dispatch(fetchMainCategories());
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
    dispatch(fetchSubSubCategories());

    if (productId) {
      dispatch(viewProductById(productId));
    }
  }, [dispatch, productId]);

  // Populate when editing
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
        specifications: currentProduct.specifications?.length ? currentProduct.specifications : [''],
        usage: currentProduct.usage?.length ? currentProduct.usage : [''],
        technicalSpecs: currentProduct.technicalSpecs?.length ? currentProduct.technicalSpecs : [{ key: '', value: '' }],
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

  // Handlers
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
    setImages(files);

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
      const submitData = new FormData();

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

      // Only append optional ObjectId fields if they are not empty
      if (formData.section) submitData.append("section", formData.section);
      if (formData.mainCategory) submitData.append("mainCategory", formData.mainCategory);
      if (formData.category) submitData.append("category", formData.category);
      if (formData.subCategory) submitData.append("subCategory", formData.subCategory);
      if (formData.subSubCategory) submitData.append("subSubCategory", formData.subSubCategory);
      if (formData.productBrand) submitData.append("productBrand", formData.productBrand);

      submitData.append("specifications", JSON.stringify(formData.specifications.filter(i => i.trim() !== "")));
      submitData.append("usage", JSON.stringify(formData.usage.filter(i => i.trim() !== "")));
      
      formData.technicalSpecs.forEach((spec, index) => {
        submitData.append(`technicalSpecs[${index}][key]`, spec.key);
        submitData.append(`technicalSpecs[${index}][value]`, spec.value);
      });

      images.forEach((file) => {
        submitData.append("images", file);
      });

      if (productId) {
        await dispatch(editProduct({ id: productId, data: submitData })).unwrap();
      } else {
        await dispatch(addProduct(submitData)).unwrap();
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert(`Error saving product: ${error.message || "Please check all required fields"}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (productLoading && productId) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {productId ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {productId ? 'Update your product information' : 'Create a new product for your catalog'}
          </p>
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

          <DescriptionSection
            formData={formData}
            onInputChange={handleInputChange}
          />

          <ImagesSection
            images={images}
            imagePreviews={imagePreviews}
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

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={onCancel || (() => router.push('/product'))}
              disabled={submitting}
              className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || productLoading}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <span>{productId ? 'Update Product' : 'Add Product'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
