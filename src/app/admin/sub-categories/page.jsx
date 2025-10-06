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
import { fetchCategories } from "../../../redux/slices/adminCategorySlice";
import DeleteConfirmationModal from "../main-categories/components/DeleteModal";
import SubCategoryHeader from "./components/SubCategoryHeader";
import SubCategoryList from "./components/SubCategoryList";
import SubCategoryModal from "./components/SubCategoryModal";
import ProtectedRoute from "../../../components/admin/ProtectedRoute";
import Pagination from "../../../components/shared/Pagination";

const SubCategoryManager = () => {
  const dispatch = useDispatch();
  const { subCategories = [], loading, error } = useSelector(
    (s) => s.adminSubCategory
  );
  const { categories: mainCategories } = useSelector((s) => s.adminCategory);

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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Paginate sub-categories
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentSubCategories = subCategories.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(subCategories.length / itemsPerPage);

  useEffect(() => {
    dispatch(fetchSubCategories());
    dispatch(fetchCategories());
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
      name: subCat.name || "",
      description: subCat.description || "",
      category: subCat.category?._id || "",
      type: subCat.type || "", // type is optional
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
    if (name === "image" && files?.[0]) {
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
    
    if (formData.type) form.append("type", formData.type); // type is optional
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
    <ProtectedRoute>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <SubCategoryHeader
            categoryCount={subCategories.length}
            onAddCategory={openAddModal}
          />

          {/* Sub-categories List */}
          <SubCategoryList
            categories={currentSubCategories}
            loading={loading}
            error={error}
            onEdit={openEditModal}
            onDelete={setDeleteConfirm}
            onAddCategory={openAddModal}
          />

          {/* Pagination */}
          {subCategories.length > 0 && (
            <div className="mt-6 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                totalItems={subCategories.length}
              />
            </div>
          )}

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
              mainCategories={mainCategories}
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
    </ProtectedRoute>
  );
};

export default SubCategoryManager;
