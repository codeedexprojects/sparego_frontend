"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { getAllProducts } from "../../../redux/slices/adminProductSlice";
import { 
  fetchHomeCarousels, 
  addHomeCarousel, 
  editHomeCarousel, 
  deleteHomeCarousel 
} from "../../../redux/slices/adminHomeCarouselSlice";
import DeleteConfirmationModal from "../main-categories/components/DeleteModal";
import HomeCarouselHeader from "./components/HomeCarouselHeader";
import HomeCarouselList from "./components/HomeCarouselList";
import HomeCarouselModal from "./components/HomeCarouselModal";
import { IMG_URL } from "../../../redux/baseUrl";
import ProtectedRoute from "../../../components/admin/ProtectedRoute";

const HomeCarouselManager = () => {
  const dispatch = useDispatch();
  const { homeCarouselList, loading, error } = useSelector((s) => s.adminHomeCarousel);
  const { products } = useSelector((s) => s.adminProduct);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    products: [],
    image: null,
  });
  const [editingCarousel, setEditingCarousel] = useState(null);
  const [preview, setPreview] = useState(null);
  const [productSearch, setProductSearch] = useState("");
  useEffect(() => {
   
    dispatch(fetchHomeCarousels());
    dispatch(getAllProducts({}));
  }, [dispatch]);

  const openAddModal = () => {
    setFormData({ title: "", products: [], image: null });
    setPreview(null);
    setEditingCarousel(null);
    setProductSearch("");
    setIsModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (carousel) => {
    console.log("Editing carousel:", carousel);
    setFormData({
      title: carousel.title,
      products: carousel.products?.map(p => p._id) || [],
      image: null,
    });
    setPreview(carousel.image ? `${IMG_URL}/${carousel.image}` : null);
    setEditingCarousel(carousel);
    setProductSearch("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ title: "", products: [], image: null });
    setEditingCarousel(null);
    setPreview(null);
    setProductSearch("");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setFormData({ ...formData, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleProductSearch = (e) => {
    const searchTerm = e.target.value;
    setProductSearch(searchTerm);
    dispatch(getAllProducts({ search: searchTerm }));
  };

  const handleProductSelect = (productId) => {
    const currentProducts = [...formData.products];
    if (currentProducts.includes(productId)) {
      setFormData({
        ...formData,
        products: currentProducts.filter(id => id !== productId)
      });
    } else {
      setFormData({
        ...formData,
        products: [...currentProducts, productId]
      });
    }
  };

  const removeSelectedProduct = (productId) => {
    setFormData({
      ...formData,
      products: formData.products.filter(id => id !== productId)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    
    const form = new FormData();
    form.append("title", formData.title);
    formData.products.forEach((id) => {
      form.append("products", id);
    });
    if (formData.image) form.append("image", formData.image);

    try {
      if (editingCarousel) {
        await dispatch(editHomeCarousel({ id: editingCarousel._id, data: form })).unwrap();
        toast.success("Home carousel updated successfully");
      } else {
        await dispatch(addHomeCarousel(form)).unwrap();
        toast.success("Home carousel added successfully");
      }
      closeModal();
      dispatch(fetchHomeCarousels());
    } catch (err) {
      toast.error(err?.message || "Error saving carousel");
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await dispatch(deleteHomeCarousel(deleteConfirm._id)).unwrap();
      toast.success("Carousel deleted successfully");
      setDeleteConfirm(null);
      dispatch(fetchHomeCarousels());
    } catch (err) {
      toast.error("Failed to delete carousel");
    }
  };

  const getSelectedProducts = () => {
    return products.filter(product => formData.products.includes(product._id));
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <div className="mx-auto">
          
          

          {/* Header */}
          <HomeCarouselHeader
            carouselCount={homeCarouselList?.length || 0}
            onAddCarousel={openAddModal}
          />

          {/* Carousel List */}
          <HomeCarouselList
            carousels={homeCarouselList || []}
            loading={loading}
            error={error}
            onEdit={openEditModal}
            onDelete={setDeleteConfirm}
            onAddCarousel={openAddModal}
          />

          {/* Add/Edit Modal */}
          {isModalOpen && (
            <HomeCarouselModal
              isOpen={isModalOpen}
              onClose={closeModal}
              onSubmit={handleSubmit}
              formData={formData}
              onChange={handleChange}
              preview={preview}
              onRemoveImage={() => {
                setPreview(null);
                setFormData({...formData, image: null});
              }}
              products={products}
              productSearch={productSearch}
              onProductSearch={handleProductSearch}
              onProductSelect={handleProductSelect}
              onRemoveProduct={removeSelectedProduct}
              selectedProducts={getSelectedProducts()}
              editingCarousel={editingCarousel}
            />
          )}

          {/* Delete Confirmation Modal */}
          {deleteConfirm && (
            <DeleteConfirmationModal
              item={deleteConfirm}
              onClose={() => setDeleteConfirm(null)}
              onConfirm={confirmDelete}
              title="Delete Carousel"
              description={`Are you sure you want to delete "${deleteConfirm.title}"? This action cannot be undone.`}
            />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default HomeCarouselManager;