// components/UserTable/UserTable.jsx
"use client";
import { useState } from "react";
import UserTableHeader from "./UserTableHeader";
import UserTableRow from "./UserTableRow";
import UserTableFilters from "./UserTableFilters";
import Pagination from "../../../../../components/shared/Pagination";

const UserTable = ({ 
  users = [], 
  loading = false,
  error = null,
  operationSuccess = null,
  onAddUser, 
  onEditUser, 
  onViewUser, 
  onToggleUserStatus,
  onBulkToggleStatus,
  itemsPerPage = 5,
  showFilters = true
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    // Ensure user exists and is an object
    if (!user || typeof user !== 'object') {
      return false;
    }
    
    // Safe search with null/undefined checks
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === '' || 
                          (user.name && typeof user.name === 'string' && user.name.toLowerCase().includes(searchLower)) || 
                          (user.number && typeof user.number === 'string' && user.number.includes(searchTerm)) ||
                          (user.email && typeof user.email === 'string' && user.email.toLowerCase().includes(searchLower));
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && user.isActive === true) ||
                         (statusFilter === "inactive" && user.isActive === false);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Get users for current page
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 bg-white min-h-screen">
      <UserTableHeader 
        title="User Management" 
        onAddUser={null} 
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
                <p>{error?.message || "An error occurred while loading users."}</p>
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
      
      {showFilters && (
        <UserTableFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading users...</span>
        </div>
      ) : (
        <>
          {/* User Table */}
          <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Contact</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user) => (
                    <UserTableRow
                      key={user._id || user.id}
                      user={user}
                      onEdit={null}
                      onView={onViewUser}
                      onToggleStatus={onToggleUserStatus}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No users found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Component */}
          {filteredUsers.length > 0 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserTable;