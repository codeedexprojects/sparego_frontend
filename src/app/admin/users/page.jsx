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
import { toast } from 'sonner';

const UsersPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { users, loading, error, operationSuccess, totalPages, currentPage } = useSelector(state => state.adminUserManagement);

  const [page, setPage] = useState(currentPage || 1);

  const fetchUsers = (pageNumber) => {
    setPage(pageNumber);
    dispatch(getAllUsers({ page: pageNumber, limit: 10 }));
  };

  useEffect(() => { fetchUsers(page); }, []);

  useEffect(() => { if (error) { const t = setTimeout(() => dispatch(clearError()), 4000); return () => clearTimeout(t); } }, [error, dispatch]);
  useEffect(() => { if (operationSuccess) { const t = setTimeout(() => dispatch(clearOperationSuccess()), 3000); return () => clearTimeout(t); } }, [operationSuccess, dispatch]);

  const handleViewUser = (user) => { 
    const userId = user._id || user.id; 
    router.push(`/admin/users/${userId}`); 
  };
  
  const handleToggleUserStatus = async (user) => {
    try {
      const newStatus = !user.isActive;
      await dispatch(toggleUserStatus({ id: user._id || user.id, currentStatus: user.isActive })).unwrap();
      toast.success(newStatus ? 'User activated successfully' : 'User deactivated successfully');
      // Refetch users to update the list
      dispatch(getAllUsers({ page: currentPage || page, limit: 10 }));
    } catch (error) {
      toast.error(error?.message || 'Failed to update user status');
    }
  };
  
  const handleBulkToggleStatus = async (userIds, status) => {
    try {
      await dispatch(bulkToggleUserStatus({ userIds, status })).unwrap();
      toast.success(`${userIds.length} user(s) ${status ? 'activated' : 'deactivated'} successfully`);
      // Refetch users to update the list
      dispatch(getAllUsers({ page: currentPage || page, limit: 10 }));
    } catch (error) {
      toast.error(error?.message || 'Failed to update user status');
    }
  };

  return (
    <ProtectedRoute>
      <UserTable
        users={users}
        loading={loading}
        error={error}
        operationSuccess={operationSuccess}
        onViewUser={handleViewUser}
        onToggleUserStatus={handleToggleUserStatus}
        onBulkToggleStatus={handleBulkToggleStatus}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={fetchUsers}
        itemsPerPage={10}
        showFilters={true}
      />
    </ProtectedRoute>
  );
};

export default UsersPage;
