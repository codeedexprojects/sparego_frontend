// pages/users/index.jsx
"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import ProtectedRoute from '../../../components/admin/ProtectedRoute';
import UserTable from "./components/UserTable/UserTable";
import { 
  getAllUsers, 
  toggleUserStatus,
  bulkToggleUserStatus,
  clearError,
  clearOperationSuccess 
} from "../../../redux/slices/adminUserManagementSlice";

const UsersPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { users, loading, error, operationSuccess } = useSelector((state) => state.adminUserManagement);

  // Fetch users on component mount
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Handle errors
  useEffect(() => {
    if (error) {
      console.error("User management error:", error?.message || error);
      const timer = setTimeout(() => dispatch(clearError()), 4000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  // Handle success messages
  useEffect(() => {
    if (operationSuccess) {
      console.log("Success:", operationSuccess);
      const timer = setTimeout(() => dispatch(clearOperationSuccess()), 3000);
      return () => clearTimeout(timer);
    }
  }, [operationSuccess, dispatch]);

  // Adding and editing users are disabled in admin UI

  const handleViewUser = (user) => {
    const userId = user._id || user.id;
    router.push(`/users/${userId}`);
  };

  const handleToggleUserStatus = async (userToToggle) => {
    try {
      const userId = userToToggle._id || userToToggle.id;
      await dispatch(toggleUserStatus({ 
        id: userId, 
        currentStatus: userToToggle.isActive 
      })).unwrap();
    } catch (error) {
      console.error("Failed to toggle user status:", error?.message || error);
    }
  };

  const handleBulkToggleStatus = async (userIds, status) => {
    try {
      await dispatch(bulkToggleUserStatus({ 
        userIds, 
        status 
      })).unwrap();
    } catch (error) {
      console.error("Failed to bulk toggle user status:", error?.message || error);
    }
  };

  return (
    <ProtectedRoute>
      <UserTable
        users={users}
        loading={loading}
        error={error}
        operationSuccess={operationSuccess}
        onAddUser={null}
        onEditUser={null}
        onViewUser={handleViewUser}
        onToggleUserStatus={handleToggleUserStatus}
        onBulkToggleStatus={handleBulkToggleStatus}
        itemsPerPage={5}
        showFilters={true}
      />
    </ProtectedRoute>
  );
};

export default UsersPage;