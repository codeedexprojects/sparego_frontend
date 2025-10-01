"use client";
import { Edit, Trash, Trash2 } from "lucide-react";
import { fetchSections, editSection, addSection, deleteSection } from "../../../redux/slices/sectionSlice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import ProtectedRoute from "../../../components/admin/ProtectedRoute";

const SectionManager = () => {
  const dispatch = useDispatch();
  const { sections, loading, error } = useSelector((state) => state.sections);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sectionName, setSectionName] = useState("");
  const [editingSection, setEditingSection] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // holds section for confirmation modal

  // Load sections on mount
  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  // Open modal for adding
  const openAddModal = () => {
    setSectionName("");
    setEditingSection(null);
    setIsModalOpen(true);
  };

  // Open modal for editing
  const openEditModal = (section) => {
    setSectionName(section.name);
    setEditingSection(section);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSectionName("");
    setEditingSection(null);
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sectionName.trim()) {
      toast.error("Section name is required");
      return;
    }

    try {
      if (editingSection) {
        await dispatch(editSection({ id: editingSection._id, data: { name: sectionName } })).unwrap();
        toast.success("Section updated successfully");
      } else {
        await dispatch(addSection({ name: sectionName })).unwrap();
        toast.success("Section added successfully");
      }
      closeModal();
      dispatch(fetchSections()); // refresh list
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await dispatch(deleteSection(deleteConfirm._id)).unwrap();
      toast.success("Section deleted successfully");
      setDeleteConfirm(null);
      dispatch(fetchSections());
    } catch (err) {
      toast.error(err?.message || "Failed to delete");
    }
  };

  return (
    <ProtectedRoute>
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Section Manager</h1>
          <p className="text-gray-600 mt-2">Manage your application sections</p>
        </div>

        {/* Add Section Button */}
        <div className="mb-6">
          <button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Section
          </button>
        </div>

        {/* Sections List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="text-center py-6">Loading...</div>
          ) : error ? (
            <div className="text-center py-6 text-red-500">{error}</div>
          ) : sections.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="mt-2 text-sm font-medium text-gray-900">No sections</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new section.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {sections.map((section) => (
                <li key={section._id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{section.name}</h3>
                        <p className="text-sm text-gray-500">ID: {section._id}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openEditModal(section)}
                        className="text-blue-600 hover:text-blue-800 font-medium py-1 px-3 rounded-md transition-colors duration-200"
                      >
                        <Edit></Edit>
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(section)}
                        className="text-red-600 hover:text-red-800 font-medium py-1 px-3 rounded-md transition-colors duration-200"
                      >
                        <Trash2></Trash2>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingSection ? "Edit Section" : "Add New Section"}
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="px-6 py-4">
                <div className="mb-4">
                  <label htmlFor="sectionName" className="block text-sm font-medium text-gray-700 mb-2">
                    Section Name
                  </label>
                  <input
                    type="text"
                    id="sectionName"
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                    placeholder="Enter section name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    autoFocus
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    {editingSection ? "Update Section" : "Add Section"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
              <div className="px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Delete Section</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Are you sure you want to delete <span className="font-semibold">{deleteConfirm.name}</span>?
                </p>
              </div>
              <div className="flex justify-end space-x-3 px-6 py-4 border-t">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default SectionManager;
