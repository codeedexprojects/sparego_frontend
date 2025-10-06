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

  // 🔹 Filters & pagination
  const [filters, setFilters] = useState({
    section: "",
    currentPage: 1,
    limit: 10, // number of banners per page
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
    image: null,
  });
  const [editingBanner, setEditingBanner] = useState(null);
  const [preview, setPreview] = useState(null);

  // Page options
  const pageOptions = [
    { value: "home", label: "Home Page" },
    { value: "category", label: "Category Page" },
    { value: "product", label: "Product Page" },
    { value: "cart", label: "Cart Page" },
    { value: "checkout", label: "Checkout Page" },
  ];

  // ✅ Fetch banners & sections
  useEffect(() => {
    dispatch(fetchDealBanners(filters));
    dispatch(fetchSections());
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
      currentPage: 1, // reset to first page
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
      image: null,
    });
    setEditingBanner(null);
    setPreview(null);
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

  // 🔹 Submit add/edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("discountText", formData.discountText);
    form.append("section", formData.section);
    form.append("page", formData.page);
    if (formData.image) form.append("image", formData.image);

    try {
      if (editingBanner) {
        await dispatch(
          editDealBanner({ id: editingBanner._id, data: form })
        ).unwrap();
        toast.success("Deal banner updated successfully");
      } else {
        await dispatch(addDealBanner(form)).unwrap();
        toast.success("Deal banner added successfully");
      }
      closeModal();
      dispatch(fetchDealBanners(filters));
    } catch (err) {
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
                setFormData({ ...formData, image: null });
              }}
              sections={sections}
              pageOptions={pageOptions}
              editingBanner={editingBanner}
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
