"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { fetchCategories, addCategory, editCategory, deleteCategory } from "../../../redux/slices/adminCategorySlice";
import { fetchMainCategories } from "../../../redux/slices/adminMainCategorySlice";
import DeleteConfirmationModal from "../main-categories/components/DeleteModal";
import CategoryHeader from "./components/CategoryHeader";
import CategoryList from "./components/CategoryList";
import CategoryModal from "./components/CategoryModal";
import ProtectedRoute from "../../../components/admin/ProtectedRoute";

const CategoryManager = () => {
  const dispatch = useDispatch();
const { categories = [], loading, error } = useSelector((s) => s.adminCategory);
  const { mainCategories } = useSelector((s) => s.adminMainCategory);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    mainCategory: "",
    type: "",
    image: null,
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchMainCategories());
  }, [dispatch]);

  // Modal handlers
  const openAddModal = () => {
    setFormData({ name: "", description: "", mainCategory: "", type: "", image: null });
    setPreview(null);
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setFormData({
      name: cat.name,
      description: cat.description,
      mainCategory: cat.mainCategory?._id || "",
      type: cat.type,
      image: null,
    });
    setPreview(cat.image || null);
    setEditingCategory(cat);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", description: "", mainCategory: "", type: "", image: null });
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
    form.append("mainCategory", formData.mainCategory);
    form.append("type", formData.type);
    if (formData.image) form.append("image", formData.image);

    try {
      if (editingCategory) {
        await dispatch(editCategory({ id: editingCategory._id, data: form })).unwrap();
        toast.success("Category updated successfully");
      } else {
        await dispatch(addCategory(form)).unwrap();
        toast.success("Category added successfully");
      }
      closeModal();
      dispatch(fetchCategories());
    } catch (err) {
      toast.error(err?.message || "Error saving category");
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await dispatch(deleteCategory(deleteConfirm._id)).unwrap();
      toast.success("Category deleted successfully");
      setDeleteConfirm(null);
      dispatch(fetchCategories());
    } catch (err) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto">
          <CategoryHeader
            categoryCount={categories.length}
            onAddCategory={openAddModal}
          />

          <CategoryList
            categories={categories}
            loading={loading}
            error={error}
            onEdit={openEditModal}
            onDelete={setDeleteConfirm}
            onAddCategory={openAddModal}
          />

          {isModalOpen && (
            <CategoryModal
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
              mainCategories={mainCategories}
              editingCategory={editingCategory}
            />
          )}

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
    </ProtectedRoute>
  );
};

export default CategoryManager;