"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { fetchSections } from "../../../redux/slices/sectionSlice";
import { getHomeCards } from "../../../redux/slices/adminHomeCardSlice";
import {
  fetchMainCarousels,
  addMainCarousel,
  editMainCarousel,
  deleteMainCarousel,
  toggleMainCarouselStatus
} from "../../../redux/slices/adminMainCarouselSlice";
import MainCarouselHeader from "./components/MainCarouselHeader";
import MainCarouselList from "./components/MainCarouselList";
import MainCarouselModal from "./components/MainCarouselModal";
import DeleteConfirmationModal from "../main-categories/components/DeleteModal";
import Pagination from "../../../components/shared/Pagination";
import ProtectedRoute from "../../../components/admin/ProtectedRoute";

const MainCarouselManager = () => {
  const dispatch = useDispatch();
  const { mainCarousels = [], loading, error } = useSelector((s) => s.adminMainCarousel);
  const { homeCards: sections = [] } = useSelector((s) => s.adminHomeCard); // Fixed selector name
  const { products = [] } = useSelector((s) => s.adminProduct);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    section: "",
    products: [],
    image: null,
  });
  const [editingCarousel, setEditingCarousel] = useState(null);
  const [preview, setPreview] = useState(null);
  const [productSearch, setProductSearch] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchMainCarousels());
    dispatch(fetchSections());
    dispatch(getHomeCards({}));
  }, [dispatch]);

  // Modal handlers
  const openAddModal = () => {
    setFormData({ title: "", section: "", products: [], image: null });
    setPreview(null);
    setEditingCarousel(null);
    setProductSearch("");
    setIsModalOpen(true);
  };

  const openEditModal = (carousel) => {
    setFormData({
      title: carousel.title || "",
      section: carousel.section?._id || carousel.section || "",
      products: carousel.products?.map(p => p._id || p) || [],
      image: null,
    });
    setPreview(carousel.image || null);
    setEditingCarousel(carousel);
    setProductSearch("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ title: "", section: "", products: [], image: null });
    setEditingCarousel(null);
    setPreview(null);
    setProductSearch("");
  };

  // Form handlers
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setFormData(prev => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleProductSearch = (e) => {
    const searchTerm = e.target.value;
    setProductSearch(searchTerm);
    // You might want to dispatch a search action here if needed
    // dispatch(getHomeCards({ search: searchTerm }));
  };

  const handleProductSelect = (productId) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.includes(productId)
        ? prev.products.filter(id => id !== productId)
        : [...prev.products, productId],
    }));
  };

  const removeSelectedProduct = (productId) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter(id => id !== productId)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title?.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!editingCarousel && !formData.image) {
      toast.error("Image is required for new carousel");
      return;
    }

    const form = new FormData();
    form.append("title", formData.title.trim());
    if (formData.section) form.append("section", formData.section);
    formData.products.forEach(id => form.append("products", id));
    if (formData.image) form.append("image", formData.image);

    try {
      if (editingCarousel) {
        await dispatch(editMainCarousel({ 
          id: editingCarousel._id, 
          data: form 
        })).unwrap();
        toast.success("Main carousel updated successfully");
      } else {
        await dispatch(addMainCarousel(form)).unwrap();
        toast.success("Main carousel added successfully");
      }
      closeModal();
      dispatch(fetchMainCarousels());
    } catch (err) {
      toast.error(err?.message || "Error saving carousel");
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await dispatch(deleteMainCarousel(deleteConfirm._id)).unwrap();
      toast.success("Carousel deleted successfully");
      setDeleteConfirm(null);
      dispatch(fetchMainCarousels());
    } catch (err) {
      toast.error(err?.message || "Failed to delete carousel");
    }
  };

  const handleToggleStatus = async (carousel) => {
    try {
      const newStatus = !carousel.isActive;
      await dispatch(toggleMainCarouselStatus({ 
        id: carousel._id, 
        currentStatus: carousel.isActive 
      })).unwrap();
      toast.success(newStatus ? 'Main carousel activated successfully' : 'Main carousel deactivated successfully');
      dispatch(fetchMainCarousels());
    } catch (error) {
      toast.error(error?.message || 'Failed to update main carousel status');
    }
  };

  const getSelectedProducts = () =>
    products.filter(product => 
      formData.products.includes(product._id) || 
      formData.products.includes(product.id)
    );

  // Pagination calculations
  const totalPages = Math.ceil(mainCarousels.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCarousels = mainCarousels.slice(startIndex, startIndex + itemsPerPage);

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(productSearch.toLowerCase()) ||
    product.title?.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <div className="mx-auto">
          <MainCarouselHeader
            carouselCount={mainCarousels.length}
            onAddCarousel={openAddModal}
          />

          <MainCarouselList
            carousels={paginatedCarousels}
            loading={loading}
            error={error}
            onEdit={openEditModal}
            onDelete={setDeleteConfirm}
            onAddCarousel={openAddModal}
            onToggleStatus={handleToggleStatus}
          />

          {/* Pagination */}
          {mainCarousels.length > 0 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                totalItems={mainCarousels.length}
              />
            </div>
          )}

          {isModalOpen && (
            <MainCarouselModal
              isOpen={isModalOpen}
              onClose={closeModal}
              onSubmit={handleSubmit}
              formData={formData}
              onChange={handleChange}
              preview={preview}
              onRemoveImage={() => {
                setPreview(null);
                setFormData(prev => ({ ...prev, image: null }));
              }}
              sections={sections}
              products={filteredProducts} // Pass filtered products
              productSearch={productSearch}
              onProductSearch={handleProductSearch}
              onProductSelect={handleProductSelect}
              onRemoveProduct={removeSelectedProduct}
              selectedProducts={getSelectedProducts()}
              editingCarousel={editingCarousel}
            />
          )}

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

export default MainCarouselManager;