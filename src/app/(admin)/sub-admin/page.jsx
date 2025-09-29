// pages/subadmins/index.jsx
"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from '../../../components/admin/ProtectedRoute';
import SubadminTable from "./components/SubAdminTable/SubAdminTable";
import { 
  getAllAdmins, 
  createSubAdmin,
  updateSubAdmin,
  deleteSubAdmin,
  toggleAdminStatus,
  updateAdminPermissions,
  bulkDeleteAdmins,
  bulkUpdatePermissions,
  clearError,
  clearOperationSuccess 
} from "../../../redux/slices/adminSubAdminManagementSlice";

const SubadminsPage = () => {
  const dispatch = useDispatch();
  const { admins, loading, error, operationSuccess } = useSelector((state) => state.adminSubAdminManagement);

  // Fetch admins on component mount
  useEffect(() => {
    dispatch(getAllAdmins());
  }, [dispatch]);

  // Handle errors
  useEffect(() => {
    if (error) {
      console.error("Sub admins error:", error?.message || error);
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

  const handleAddSubadmin = async (subadminData) => {
    try {
      await dispatch(createSubAdmin(subadminData)).unwrap();
      // Refresh admins after successful creation
      dispatch(getAllAdmins());
    } catch (error) {
      console.error("Failed to add sub admin:", error?.message || error);
    }
  };

  const handleEditSubadmin = async (oldSubadmin, newData) => {
    try {
      const adminId = oldSubadmin._id || oldSubadmin.id;
      await dispatch(updateSubAdmin({ 
        id: adminId, 
        adminData: newData 
      })).unwrap();
      // Refresh admins after successful update
      dispatch(getAllAdmins());
    } catch (error) {
      console.error("Failed to edit sub admin:", error?.message || error);
    }
  };

  const handleDeleteSubadmin = async (subadminToDelete) => {
    try {
      const adminId = subadminToDelete._id || subadminToDelete.id;
      await dispatch(deleteSubAdmin(adminId)).unwrap();
      // Refresh admins after successful deletion
      dispatch(getAllAdmins());
    } catch (error) {
      console.error("Failed to delete sub admin:", error?.message || error);
    }
  };

  const handleToggleStatus = async (subadminToToggle) => {
    try {
      const adminId = subadminToToggle._id || subadminToToggle.id;
      await dispatch(toggleAdminStatus({ 
        id: adminId, 
        currentStatus: subadminToToggle.isActive 
      })).unwrap();
      // Refresh admins after successful status toggle
      dispatch(getAllAdmins());
    } catch (error) {
      console.error("Failed to toggle sub admin status:", error?.message || error);
    }
  };

  const handleUpdatePermissions = async (subadmin, permissions) => {
    try {
      const adminId = subadmin._id || subadmin.id;
      await dispatch(updateAdminPermissions({ 
        id: adminId, 
        permissions 
      })).unwrap();
      // Refresh admins after successful permission update
      dispatch(getAllAdmins());
    } catch (error) {
      console.error("Failed to update permissions:", error?.message || error);
    }
  };

  const handleBulkDelete = async (adminIds) => {
    try {
      await dispatch(bulkDeleteAdmins(adminIds)).unwrap();
      // Refresh admins after successful bulk deletion
      dispatch(getAllAdmins());
    } catch (error) {
      console.error("Failed to bulk delete admins:", error?.message || error);
    }
  };

  const handleBulkUpdatePermissions = async (adminIds, permissions) => {
    try {
      await dispatch(bulkUpdatePermissions({ 
        adminIds, 
        permissions 
      })).unwrap();
      // Refresh admins after successful bulk permission update
      dispatch(getAllAdmins());
    } catch (error) {
      console.error("Failed to bulk update permissions:", error?.message || error);
    }
  };

  return (
    <ProtectedRoute>
      <SubadminTable
        subadmins={admins}
        loading={loading}
        error={error}
        operationSuccess={operationSuccess}
        onAddSubadmin={handleAddSubadmin}
        onEditSubadmin={handleEditSubadmin}
        onDeleteSubadmin={handleDeleteSubadmin}
        onToggleStatus={handleToggleStatus}
        onUpdatePermissions={handleUpdatePermissions}
        onBulkDelete={handleBulkDelete}
        onBulkUpdatePermissions={handleBulkUpdatePermissions}
        itemsPerPage={6}
      />
    </ProtectedRoute>
  );
};

export default SubadminsPage;