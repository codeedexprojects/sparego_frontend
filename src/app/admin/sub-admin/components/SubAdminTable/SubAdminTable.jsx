// components/SubadminTable/SubadminTable.jsx
"use client";
import { useState } from "react";
import SubadminTableHeader from "./SubAdminTableHeader";
import SubadminTableRow from "./SubAdminTableRow";
import SubadminModal from "./SubAdminModal";
import Pagination from "../../../../../components/shared/Pagination";

const SubadminTable = ({ 
  subadmins = [], 
  loading = false,
  error = null,
  operationSuccess = null,
  onAddSubadmin, 
  onEditSubadmin, 
  onDeleteSubadmin,
  onToggleStatus,
  onUpdatePermissions,
  onBulkDelete,
  onBulkUpdatePermissions,
  itemsPerPage = 6
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubadmin, setEditingSubadmin] = useState(null);

  // Helper function to safely get string values
  const getStringValue = (value) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value !== null) {
      return value.name || value.title || JSON.stringify(value);
    }
    return String(value || '');
  };

  // Filter subadmins based on search and filters
  const filteredSubadmins = subadmins.filter(subadmin => {
    const name = getStringValue(subadmin.name);
    const email = getStringValue(subadmin.email);
    
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || subadmin.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredSubadmins.length / itemsPerPage);

  // Get subadmins for current page
  const paginatedSubadmins = filteredSubadmins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAdd = () => {
    setEditingSubadmin(null);
    setIsModalOpen(true);
  };

  const handleEdit = (subadmin) => {
    setEditingSubadmin(subadmin);
    setIsModalOpen(true);
  };

  const handleDelete = (subadmin) => {
    if (window.confirm(`Are you sure you want to delete ${subadmin.name}?`)) {
      onDeleteSubadmin && onDeleteSubadmin(subadmin);
    }
  };

  const handleSubmit = (subadminData) => {
    if (editingSubadmin) {
      onEditSubadmin && onEditSubadmin(editingSubadmin, subadminData);
    } else {
      onAddSubadmin && onAddSubadmin(subadminData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <SubadminTableHeader 
        title="Subadmin Management" 
        onAddSubadmin={handleAdd} 
      />
      
      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error?.message || "An error occurred"}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {operationSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Success</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>{operationSuccess}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mb-6 flex items-center justify-center py-8">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading admins...</span>
          </div>
        </div>
      )}
      
      {/* Filters */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name or email"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="superadmin">Super Admin</option>
              <option value="subadmin">Sub Admin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subadmins Table */}
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 mb-6">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3">Admin</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Permissions</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedSubadmins.length > 0 ? (
              paginatedSubadmins.map((subadmin, index) => (
                <SubadminTableRow
                  key={subadmin._id || subadmin.id || `subadmin-${index}`}
                  subadmin={subadmin}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleStatus={onToggleStatus}
                  onUpdatePermissions={onUpdatePermissions}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No subadmins found</h3>
                    <p className="text-gray-500">Try adjusting your search or add a new subadmin.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      {filteredSubadmins.length > 0 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Subadmin Modal */}
      <SubadminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        subadmin={editingSubadmin}
      />
    </div>
  );
};

export default SubadminTable;