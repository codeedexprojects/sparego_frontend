"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { fetchSections } from "../../../redux/slices/sectionSlice";
import { fetchMainCategories, addMainCategory, editMainCategory, deleteMainCategory } from "../../../redux/slices/adminMainCategorySlice";
import MainCategoryHeader from "./components/MainCategoryHeader";
import MainCategoryList from "./components/MainCategoryList";
import MainCategoryModal from "./components/MainCategoryModal";
import DeleteConfirmationModal from "./components/DeleteModal";

const MainCategoryManager = () => {
  const dispatch = useDispatch();
  const { mainCategories, loading, error } = useSelector((s) => s.adminMainCategory);
  const { sections } = useSelector((s) => s.sections);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    section: "",
    type: "",
    image: null,
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    dispatch(fetchMainCategories());
    dispatch(fetchSections());
  }, [dispatch]);

  // Modal handlers
  const openAddModal = () => {
    setFormData({ name: "", description: "", section: "", type: "", image: null });
    setPreview(null);
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setFormData({
      name: cat.name,
      description: cat.description,
      section: cat.section?._id || "",
      type: cat.type,
      image: null,
    });
    setPreview(cat.image || null);
    setEditingCategory(cat);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", description: "", section: "", type: "", image: null });
    setEditingCategory(null);
    setPreview(null);
  };

  // Form handlers
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
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("section", formData.section);
    form.append("type", formData.type);
    if (formData.image) form.append("image", formData.image);

    try {
      if (editingCategory) {
        await dispatch(editMainCategory({ id: editingCategory._id, data: form })).unwrap();
        toast.success("Main category updated successfully");
      } else {
        await dispatch(addMainCategory(form)).unwrap();
        toast.success("Main category added successfully");
      }
      closeModal();
      dispatch(fetchMainCategories());
    } catch (err) {
      toast.error(err?.message || "Error saving category");
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await dispatch(deleteMainCategory(deleteConfirm._id)).unwrap();
      toast.success("Category deleted successfully");
      setDeleteConfirm(null);
      dispatch(fetchMainCategories());
    } catch (err) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <MainCategoryHeader 
          categoryCount={mainCategories.length}
          onAddCategory={openAddModal}
        />

        {/* Categories List */}
        <MainCategoryList
          categories={mainCategories}
          loading={loading}
          error={error}
          onEdit={openEditModal}
          onDelete={setDeleteConfirm}
          onAddCategory={openAddModal}
        />

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <MainCategoryModal
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
            editingCategory={editingCategory}
          />
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <DeleteConfirmationModal
            item={deleteConfirm}
            onClose={() => setDeleteConfirm(null)}
            onConfirm={confirmDelete}
            title="Delete Category"
            description={`Are you sure you want to delete "${deleteConfirm.name}"? This action cannot be undone.`}
          />
        )}
      </div>
    </div>
  );
};

export default MainCategoryManager;