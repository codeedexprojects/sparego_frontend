"use client";

import { useState } from "react";
import UserTableFilters from "./UserTableFilters";
import UserTableRow from "./UserTableRow";
import Pagination from "../../../../../components/shared/Pagination";

const UserTable = ({
  users = [],
  loading = false,
  error = null,
  showFilters = true,
  onViewUser,
  onToggleUserStatus,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter users based on search and status
  const filteredUsers = users.filter(user => {
    if (!user) return false;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      searchTerm === '' ||
      (user.name && user.name.toLowerCase().includes(searchLower)) ||
      (user.number && user.number.includes(searchTerm)) ||
      (user.email && user.email.toLowerCase().includes(searchLower)) ||
      (user._id && user._id.includes(searchTerm));
      
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.isActive) ||
      (statusFilter === "inactive" && !user.isActive);
    
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6 bg-white min-h-screen">
      {showFilters && (
        <UserTableFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading users...</span>
        </div>
      ) : error ? (
        <div className="text-red-600 py-6 text-center">{error}</div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map(user => (
                    <UserTableRow
                      key={user._id || user.id}
                      user={user}
                      onView={onViewUser}
                      onToggleStatus={onToggleUserStatus}
                      onEdit={null}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredUsers.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                totalItems={filteredUsers.length}
              />
          )}
        </>
      )}
    </div>
  );
};

export default UserTable;
