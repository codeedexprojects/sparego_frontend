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
import { fetchSubCategories } from "../../../redux/slices/adminSubCategorySlice";
import { getHomeCards } from "../../../redux/slices/adminHomeCardSlice"; // Add this import
import DeleteConfirmationModal from "../main-categories/components/DeleteModal";
import SubSubCategoryHeader from "./components/SubSubCategoryHeader";
import SubSubCategoryList from "./components/SubSubCategoryList";
import SubSubCategoryModal from "./components/SubSubCategoryModal";
import ProtectedRoute from "../../../components/admin/ProtectedRoute";
import Pagination from "../../../components/shared/Pagination";

const SubSubCategoryManager = () => {
  const dispatch = useDispatch();
  const { subSubCategories = [], loading, error } = useSelector(
    (s) => s.adminSubSubCategory
  );
  const { subCategories = [] } = useSelector((s) => s.adminSubCategory);
  const { homeCards = [] } = useSelector((s) => s.adminHomeCard); // Add sections

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    subCategory: "",
    section: "", // Add section
    image: null,
  });
  const [editingSubSubCategory, setEditingSubSubCategory] = useState(null);
  const [preview, setPreview] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Paginate sub-sub-categories
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentSubSubCategories = subSubCategories.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(subSubCategories.length / itemsPerPage);

  useEffect(() => {
    dispatch(fetchSubSubCategories());
    dispatch(fetchSubCategories());
    dispatch(getHomeCards()); // Fetch sections
  }, [dispatch]);

  // Modal handlers
  const openAddModal = () => {
    setFormData({ name: "", description: "", subCategory: "", section: "", image: null });
    setPreview(null);
    setEditingSubSubCategory(null);
    setIsModalOpen(true);
  };

  const openEditModal = (subSubCat) => {
    // Find the section ID from the sub-category
    const subCategory = subCategories.find(sc => sc._id === subSubCat.subCategory?._id);
    const sectionId = subCategory?.section || "";
    
    setFormData({
      name: subSubCat.name,
      description: subSubCat.description,
      subCategory: subSubCat.subCategory?._id || "",
      section: sectionId, // Set section for editing
      image: null,
    });
    setPreview(subSubCat.image || null);
    setEditingSubSubCategory(subSubCat);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", description: "", subCategory: "", section: "", image: null });
    setEditingSubSubCategory(null);
    setPreview(null);
  };

  // Form handlers
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setFormData({ ...formData, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else if (name === "section") {
      // When section changes, reset subCategory
      setFormData({ 
        ...formData, 
        section: value, 
        subCategory: "" 
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.subCategory) {
      toast.error("Please select both section and sub-category");
      return;
    }
    
    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("subCategory", formData.subCategory);
    if (formData.image) form.append("image", formData.image);
    if (formData.section) form.append("section", formData.section);

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
    <ProtectedRoute>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <SubSubCategoryHeader
            categoryCount={subSubCategories.length}
            onAddCategory={openAddModal}
          />

          {/* Sub-sub-categories List */}
          <SubSubCategoryList
            categories={currentSubSubCategories}
            loading={loading}
            error={error}
            onEdit={openEditModal}
            onDelete={setDeleteConfirm}
            onAddCategory={openAddModal}
          />

          {/* Pagination */}
          {subSubCategories.length > 0 && (
            <div className="mt-6 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                totalItems={subSubCategories.length}
              />
            </div>
          )}

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
              subCategories={subCategories}
              sections={homeCards} // Pass sections to modal
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
    </ProtectedRoute>
  );
};

export default SubSubCategoryManager;