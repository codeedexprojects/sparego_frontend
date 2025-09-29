"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  fetchSubCategories,
  addSubCategory,
  editSubCategory,
  deleteSubCategory,
} from "../../../redux/slices/adminSubCategorySlice";
import { fetchCategories } from "../../../redux/slices/adminCategorySlice"; // fetch main categories from categories slice
import DeleteConfirmationModal from "../main-categories/components/DeleteModal";
import SubCategoryHeader from "./components/SubCategoryHeader";
import SubCategoryList from "./components/SubCategoryList";
import SubCategoryModal from "./components/SubCategoryModal";

const SubCategoryManager = () => {
  const dispatch = useDispatch();
  const { subCategories = [], loading, error } = useSelector(
    (s) => s.adminSubCategory
  );
  const { categories: mainCategories } = useSelector((s) => s.adminCategory); // use categories as main categories

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    type: "",
    image: null,
  });
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    dispatch(fetchSubCategories());
    dispatch(fetchCategories()); // fetch categories to use as main categories
  }, [dispatch]);

  // Modal handlers
  const openAddModal = () => {
    setFormData({ name: "", description: "", category: "", type: "", image: null });
    setPreview(null);
    setEditingSubCategory(null);
    setIsModalOpen(true);
  };

  const openEditModal = (subCat) => {
    setFormData({
      name: subCat.name,
      description: subCat.description,
      category: subCat.category?._id || "",
      type: subCat.type,
      image: null,
    });
    setPreview(subCat.image || null);
    setEditingSubCategory(subCat);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", description: "", category: "", type: "", image: null });
    setEditingSubCategory(null);
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
    form.append("category", formData.category);
    form.append("type", formData.type);
    if (formData.image) form.append("image", formData.image);

    try {
      if (editingSubCategory) {
        await dispatch(
          editSubCategory({ id: editingSubCategory._id, data: form })
        ).unwrap();
        toast.success("Sub-category updated successfully");
      } else {
        await dispatch(addSubCategory(form)).unwrap();
        toast.success("Sub-category added successfully");
      }
      closeModal();
      dispatch(fetchSubCategories());
    } catch (err) {
      toast.error(err?.message || "Error saving sub-category");
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await dispatch(deleteSubCategory(deleteConfirm._id)).unwrap();
      toast.success("Sub-category deleted successfully");
      setDeleteConfirm(null);
      dispatch(fetchSubCategories());
    } catch (err) {
      toast.error("Failed to delete sub-category");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <SubCategoryHeader
          categoryCount={subCategories.length}
          onAddCategory={openAddModal}
        />

        {/* Sub-categories List */}
        <SubCategoryList
          categories={subCategories}
          loading={loading}
          error={error}
          onEdit={openEditModal}
          onDelete={setDeleteConfirm}
          onAddCategory={openAddModal}
        />

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <SubCategoryModal
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
            mainCategories={mainCategories} // categories from adminCategorySlice
            editingCategory={editingSubCategory}
          />
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <DeleteConfirmationModal
            item={deleteConfirm}
            onClose={() => setDeleteConfirm(null)}
            onConfirm={confirmDelete}
            title="Delete Sub-category"
            description={`Are you sure you want to delete "${deleteConfirm.name}"? This action cannot be undone.`}
          />
        )}
      </div>
    </div>
  );
};

export default SubCategoryManager;
