"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  fetchSubSubCategories,
  addSubSubCategory,
  editSubSubCategory,
  deleteSubSubCategory,
} from "../../../redux/slices/adminSubSubCategorySlice";
import { fetchSubCategories } from "../../../redux/slices/adminSubCategorySlice"; // fetch sub-categories
import DeleteConfirmationModal from "../main-categories/components/DeleteModal";
import SubSubCategoryHeader from "./components/SubSubCategoryHeader";
import SubSubCategoryList from "./components/SubSubCategoryList";
import SubSubCategoryModal from "./components/SubSubCategoryModal";

const SubSubCategoryManager = () => {
  const dispatch = useDispatch();
  const { subSubCategories = [], loading, error } = useSelector(
    (s) => s.adminSubSubCategory
  );
  const { subCategories = [] } = useSelector((s) => s.adminSubCategory); // use sub-categories

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    subCategory: "", // this will hold subCategory _id
    type: "",
    image: null,
  });
  const [editingSubSubCategory, setEditingSubSubCategory] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    dispatch(fetchSubSubCategories());
    dispatch(fetchSubCategories()); // fetch sub-categories for selection
  }, [dispatch]);

  // Modal handlers
  const openAddModal = () => {
    setFormData({ name: "", description: "", subCategory: "", type: "", image: null });
    setPreview(null);
    setEditingSubSubCategory(null);
    setIsModalOpen(true);
  };

  const openEditModal = (subSubCat) => {
    setFormData({
      name: subSubCat.name,
      description: subSubCat.description,
      subCategory: subSubCat.subCategory?._id || "",
      type: subSubCat.type,
      image: null,
    });
    setPreview(subSubCat.image || null);
    setEditingSubSubCategory(subSubCat);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", description: "", subCategory: "", type: "", image: null });
    setEditingSubSubCategory(null);
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
    form.append("subCategory", formData.subCategory); // subCategory instead of category
    form.append("type", formData.type);
    if (formData.image) form.append("image", formData.image);

    try {
      if (editingSubSubCategory) {
        await dispatch(
          editSubSubCategory({ id: editingSubSubCategory._id, data: form })
        ).unwrap();
        toast.success("Sub-sub-category updated successfully");
      } else {
        await dispatch(addSubSubCategory(form)).unwrap();
        toast.success("Sub-sub-category added successfully");
      }
      closeModal();
      dispatch(fetchSubSubCategories());
    } catch (err) {
      toast.error(err?.message || "Error saving sub-sub-category");
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await dispatch(deleteSubSubCategory(deleteConfirm._id)).unwrap();
      toast.success("Sub-sub-category deleted successfully");
      setDeleteConfirm(null);
      dispatch(fetchSubSubCategories());
    } catch (err) {
      toast.error("Failed to delete sub-sub-category");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <SubSubCategoryHeader
          categoryCount={subSubCategories.length}
          onAddCategory={openAddModal}
        />

        {/* Sub-sub-categories List */}
        <SubSubCategoryList
          categories={subSubCategories}
          loading={loading}
          error={error}
          onEdit={openEditModal}
          onDelete={setDeleteConfirm}
          onAddCategory={openAddModal}
        />

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <SubSubCategoryModal
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
            subCategories={subCategories} // sub-categories list for selection
            editingCategory={editingSubSubCategory}
          />
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <DeleteConfirmationModal
            item={deleteConfirm}
            onClose={() => setDeleteConfirm(null)}
            onConfirm={confirmDelete}
            title="Delete Sub-sub-category"
            description={`Are you sure you want to delete "${deleteConfirm.name}"? This action cannot be undone.`}
          />
        )}
      </div>
    </div>
  );
};

export default SubSubCategoryManager;
