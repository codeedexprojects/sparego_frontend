"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  fetchCategories,
  addCategory,
  editCategory,
  deleteCategory,
} from "../../../redux/slices/adminCategorySlice";
import { getHomeCards } from "../../../redux/slices/adminHomeCardSlice";
import DeleteConfirmationModal from "../main-categories/components/DeleteModal";
import CategoryHeader from "./components/CategoryHeader";
import CategoryList from "./components/CategoryList";
import CategoryModal from "./components/CategoryModal";
import ProtectedRoute from "../../../components/admin/ProtectedRoute";
import Pagination from "../../../components/shared/Pagination";

const CategoryManager = () => {
  const dispatch = useDispatch();
  const { categories = [], loading, error } = useSelector(
    (s) => s.adminCategory
  );
  const { homeCards = [] } = useSelector((s) => s.adminHomeCard);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    section: "", // Changed from mainCategory to section
    type: "",
    image: null,
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [preview, setPreview] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Paginate categories
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getHomeCards());
  }, [dispatch]);

  // Modal handlers
  const openAddModal = () => {
    setFormData({ name: "", description: "", section: "", type: "", image: null }); // Updated field
    setPreview(null);
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setFormData({
      name: cat.name || "",
      description: cat.description || "",
      section: cat.section?._id || cat.section || "", // Updated field
      type: cat.type || "",
      image: null,
    });
    setPreview(cat.image || null);
    setEditingCategory(cat);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", description: "", section: "", type: "", image: null }); // Updated field
    setEditingCategory(null);
    setPreview(null);
  };

  // Form handlers
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files?.[0]) {
      setFormData(prev => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name?.trim()) {
      toast.error("Category name is required");
      return;
    }

    const submitData = new FormData();
    submitData.append("name", formData.name.trim());
    submitData.append("description", formData.description.trim());
    submitData.append("section", formData.section || ""); // Updated field

    if (formData.type) submitData.append("type", formData.type); // type is optional
    if (formData.image) submitData.append("image", formData.image);

    try {
      if (editingCategory) {
        await dispatch(editCategory({ id: editingCategory._id, data: submitData })).unwrap();
        toast.success("Category updated successfully");
      } else {
        await dispatch(addCategory(submitData)).unwrap();
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
      toast.error(err?.message || "Failed to delete category");
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <CategoryHeader 
            categoryCount={categories.length} 
            onAddCategory={openAddModal} 
          />

          {/* Categories List */}
          <CategoryList
            categories={currentCategories}
            loading={loading}
            error={error}
            onEdit={openEditModal}
            onDelete={setDeleteConfirm}
            onAddCategory={openAddModal}
          />

          {/* Pagination */}
          {categories.length > 0 && (
            <div className="mt-6 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                totalItems={categories.length}
              />
            </div>
          )}

          {/* Add/Edit Modal */}
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
                setFormData(prev => ({ ...prev, image: null }));
              }}
              homeCards={homeCards}
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
    </ProtectedRoute>
  );
};

export default CategoryManager;