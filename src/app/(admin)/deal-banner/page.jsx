"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { fetchSections } from "../../../redux/slices/sectionSlice";
import { 
  fetchDealBanners, 
  addDealBanner, 
  editDealBanner, 
  deleteDealBanner 
} from "../../../redux/slices/adminDealBannerSlice";
import DeleteConfirmationModal from "../main-categories/components/DeleteModal";
import DealBannerHeader from "./components/DealBannerHeader";
import DealBannerList from "./components/DealBannerList";
import DealBannerModal from "./components/DealBannerModel";

const DealBannerManager = () => {
  const dispatch = useDispatch();
  const { banners, loading, error } = useSelector((s) => s.adminDealBanner);
  const { sections } = useSelector((s) => s.sections);

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

  useEffect(() => {
    dispatch(fetchDealBanners());
    dispatch(fetchSections());
  }, [dispatch]);

  // Open add modal
  const openAddModal = () => {
    setFormData({ 
      title: "", 
      description: "", 
      discountText: "", 
      section: "", 
      page: "", 
      image: null 
    });
    setPreview(null);
    setEditingBanner(null);
    setIsModalOpen(true);
  };

  // Open edit modal
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
      image: null 
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
        await dispatch(editDealBanner({ id: editingBanner._id, data: form })).unwrap();
        toast.success("Deal banner updated successfully");
      } else {
        await dispatch(addDealBanner(form)).unwrap();
        toast.success("Deal banner added successfully");
      }
      closeModal();
      dispatch(fetchDealBanners());
    } catch (err) {
      toast.error(err?.message || "Error saving deal banner");
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await dispatch(deleteDealBanner(deleteConfirm._id)).unwrap();
      toast.success("Deal banner deleted successfully");
      setDeleteConfirm(null);
      dispatch(fetchDealBanners());
    } catch (err) {
      toast.error("Failed to delete deal banner");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <DealBannerHeader
          bannerCount={banners.length}
          onAddBanner={openAddModal}
        />

        {/* Banners List */}
        <DealBannerList
          banners={banners}
          loading={loading}
          error={error}
          onEdit={openEditModal}
          onDelete={setDeleteConfirm}
          onAddBanner={openAddModal}
          pageOptions={pageOptions}
        />

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
              setFormData({...formData, image: null});
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
  );
};

export default DealBannerManager;