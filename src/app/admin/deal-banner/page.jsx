"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { fetchSections } from "../../../redux/slices/sectionSlice";
import {
  fetchDealBanners,
  addDealBanner,
  editDealBanner,
  deleteDealBanner,
} from "../../../redux/slices/adminDealBannerSlice";
import { getAllProducts } from "../../../redux/slices/adminProductSlice";
import DeleteConfirmationModal from "../main-categories/components/DeleteModal";
import DealBannerHeader from "./components/DealBannerHeader";
import DealBannerList from "./components/DealBannerList";
import DealBannerModal from "./components/DealBannerModel";
import Pagination from "../../../components/shared/Pagination";
import ProtectedRoute from "../../../components/admin/ProtectedRoute";

const DealBannerManager = () => {
  const dispatch = useDispatch();
  const { banners, loading, error, totalPages, currentPage, totalItems } =
    useSelector((s) => s.adminDealBanner);
  const { sections } = useSelector((s) => s.sections);
  const { products: productData, loading: productsLoading } = useSelector((s) => s.adminProduct); // Get products from store

  // 🔹 Filters & pagination
  const [filters, setFilters] = useState({
    section: "",
    currentPage: 1,
    limit: 10,
  });

  const [itemsPerPage, setItemsPerPage] = useState(10);

  // 🔹 Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discountText: "",
    section: "",
    page: "",
    productId: "",
    isActive: true,
    image: null,
  });
  const [editingBanner, setEditingBanner] = useState(null);
  const [preview, setPreview] = useState(null);

  // Page options - updated to match model enum
  const pageOptions = [
    { value: "home", label: "Home Page" },
    { value: "category", label: "Category Page" },
    { value: "sub-category", label: "Sub Category Page" },
    { value: "sub-sub-category", label: "Sub Sub Category Page" },
    { value: "product", label: "Product Page" },
    { value: "product-detail", label: "Product Detail Page" },
    { value: "wishlist", label: "Wishlist Page" },
    { value: "brand", label: "Brand Page" },
  ];

  // Extract products from productData - FIXED
  const products = productData?.products || productData || [];

  // ✅ Fetch banners, sections, and products
  useEffect(() => {
    dispatch(fetchDealBanners(filters));
    dispatch(fetchSections());
    // Fetch products for dropdown - with error handling
    dispatch(getAllProducts({ page: 1, limit: 1000 })).catch((err) => {
      console.error("Failed to fetch products:", err);
    });
  }, [dispatch, filters]);

  // 🔹 Filter handler
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, currentPage: 1 }));
  };

  // 🔹 Pagination handler
  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, currentPage: page }));
  };

  // 🔹 Items per page change
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setFilters((prev) => ({
      ...prev,
      limit: value,
      currentPage: 1,
    }));
  };

  // 🔹 Modal handlers
  const openAddModal = () => {
    setFormData({
      title: "",
      description: "",
      discountText: "",
      section: "",
      page: "",
      productId: "",
      isActive: true,
      image: null,
    });
    setPreview(null);
    setEditingBanner(null);
    setIsModalOpen(true);
  };

  const openEditModal = (banner) => {
    setFormData({
      title: banner.title,
      description: banner.description,
      discountText: banner.discountText,
      section: banner.section?._id || "",
      page: banner.page,
      productId: banner.productId?._id || banner.productId || "",
      isActive: banner.isActive !== undefined ? banner.isActive : true,
      image: null,
    });
    setPreview(banner.image || null);
    setEditingBanner(banner);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      title: "",
      description: "",
      discountText: "",
      section: "",
      page: "",
      productId: "",
      isActive: true,
      image: null,
    });
    setEditingBanner(null);
    setPreview(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (name === "image" && files[0]) {
      setFormData(prev => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else if (type === "checkbox") {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // 🔹 Submit add/edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.page) {
      toast.error("Title and Page are required fields");
      return;
    }

    if (!editingBanner && !formData.image) {
      toast.error("Banner image is required");
      return;
    }

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("description", formData.description);
    submitData.append("discountText", formData.discountText);
    submitData.append("section", formData.section);
    submitData.append("page", formData.page);
    submitData.append("productId", formData.productId);
    submitData.append("isActive", formData.isActive);
    
    if (formData.image) {
      submitData.append("image", formData.image);
    }

    try {
      if (editingBanner) {
        await dispatch(
          editDealBanner({ id: editingBanner._id, data: submitData })
        ).unwrap();
        toast.success("Deal banner updated successfully");
      } else {
        await dispatch(addDealBanner(submitData)).unwrap();
        toast.success("Deal banner added successfully");
      }
      closeModal();
      dispatch(fetchDealBanners(filters));
    } catch (err) {
      console.error("Error saving deal banner:", err);
      toast.error(err?.message || "Error saving deal banner");
    }
  };

  // 🔹 Confirm delete
  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await dispatch(deleteDealBanner(deleteConfirm._id)).unwrap();
      toast.success("Deal banner deleted successfully");
      setDeleteConfirm(null);
      dispatch(fetchDealBanners(filters));
    } catch (err) {
      toast.error("Failed to delete deal banner");
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <div className="mx-auto">
          {/* Header with filters */}
          <DealBannerHeader
            bannerCount={banners.length}
            onAddBanner={openAddModal}
            sections={sections}
            selectedSection={filters.section}
            onFilterChange={handleFilterChange}
          />

          {/* Banner list */}
          <DealBannerList
            banners={banners}
            loading={loading}
            error={error}
            onEdit={openEditModal}
            onDelete={setDeleteConfirm}
            onAddBanner={openAddModal}
            pageOptions={pageOptions}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={filters.currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={handleItemsPerPageChange}
              totalItems={totalItems || banners.length}
            />
          )}

          {/* Add/Edit Modal */}
          {isModalOpen && (
            <DealBannerModal
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
              pageOptions={pageOptions}
              editingBanner={editingBanner}
              products={products} // Pass products to modal
              productsLoading={productsLoading} // Pass loading state
            />
          )}

          {/* Delete Confirmation Modal */}
          {deleteConfirm && (
            <DeleteConfirmationModal
              item={deleteConfirm}
              onClose={() => setDeleteConfirm(null)}
              onConfirm={confirmDelete}
              title="Delete Banner"
              description={`Are you sure you want to delete "${deleteConfirm.title}"? This action cannot be undone.`}
            />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DealBannerManager;