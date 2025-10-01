"use client";
import { useState } from "react";
import UserTableFilters from "./UserTableFilters";
import UserTableRow from "./UserTableRow";
import Pagination from "../../../../../components/shared/Pagination";

const UserTable = ({
  users = [],
  loading = false,
  error = null,
  operationSuccess = null,
  onViewUser,
  onToggleUserStatus,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 10,
  showFilters = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = users.filter(user => {
    if (!user) return false;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === '' ||
      (user.name && user.name.toLowerCase().includes(searchLower)) ||
      (user.number && user.number.includes(searchTerm)) ||
      (user.email && user.email.toLowerCase().includes(searchLower));
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.isActive) ||
      (statusFilter === "inactive" && !user.isActive);
    return matchesSearch && matchesStatus;
  });

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
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead>{/* Add headers */}</thead>
              <tbody>
                {filteredUsers.length > 0 ? filteredUsers.map(user => (
                  <UserTableRow
                    key={user._id || user.id}
                    user={user}
                    onView={onViewUser}
                    onToggleStatus={onToggleUserStatus}
                    onEdit={null}
                  />
                )) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default UserTable;
