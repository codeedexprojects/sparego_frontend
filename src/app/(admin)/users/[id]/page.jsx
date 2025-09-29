// pages/users/[id].jsx
"use client";
import { useState, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import ProtectedRoute from '../../../../components/admin/ProtectedRoute';
import UserDetail from "../components/UserDetail/UserDetail";
import { 
  getUserById, 
  toggleUserStatus,
  clearError,
  clearOperationSuccess 
} from "../../../../redux/slices/adminUserManagementSlice";

const UserDetailPage = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Unwrap params Promise using React.use()
  const resolvedParams = use(params);
  
  const { currentUser, loading, error, operationSuccess } = useSelector((state) => state.adminUserManagement);

  // Fetch user on component mount
  useEffect(() => {
    if (resolvedParams.id) {
      console.log("Fetching user with ID:", resolvedParams.id);
      dispatch(getUserById(resolvedParams.id));
    }
  }, [dispatch, resolvedParams.id]);

  // Debug currentUser changes
  useEffect(() => {
    console.log("=== USER DATA DEBUG ===");
    console.log("Current user changed:", currentUser);
    console.log("Current user type:", typeof currentUser);
    console.log("Current user keys:", currentUser ? Object.keys(currentUser) : "No user object");
    console.log("Current user is null:", currentUser === null);
    console.log("Current user is undefined:", currentUser === undefined);
    console.log("Current user is empty object:", currentUser && typeof currentUser === 'object' && Object.keys(currentUser).length === 0);
    console.log("=========================");
  }, [currentUser]);

  // Debug loading and error states
  useEffect(() => {
    console.log("=== STATE DEBUG ===");
    console.log("Loading:", loading);
    console.log("Error:", error);
    console.log("Operation Success:", operationSuccess);
    console.log("===================");
  }, [loading, error, operationSuccess]);

  // Handle errors
  useEffect(() => {
    if (error) {
      console.error("User detail error:", error?.message || error);
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

  const handleBack = () => {
    router.push("/users");
  };

  const handleEdit = (user) => {
    console.log("Edit user:", user);
    // Implement edit logic
  };

  const handleToggleStatus = async (user) => {
    try {
      console.log("Toggle status called for user:", user);
      console.log("User type:", typeof user);
      console.log("User keys:", user ? Object.keys(user) : "user is null/undefined");
      console.log("Current user from Redux:", currentUser);
      
      // Early return if user object is empty or invalid
      if (!user || typeof user !== 'object' || Object.keys(user).length === 0) {
        console.error("Invalid user object provided to toggle status:", user);
        console.error("Please ensure the user data is properly loaded before attempting to toggle status");
        return;
      }
      
      const userId = user?._id || user?.id;
      console.log("User ID:", userId, "Current status:", user?.isActive);
      
      // Validate that we have a valid user ID
      if (!userId) {
        console.error("No valid user ID found:", user);
        console.error("Available user properties:", user ? Object.keys(user) : "No user object");
        console.error("This might indicate the user doesn't exist or the API returned empty data");
        
        // Try to refetch the user data
        console.log("Attempting to refetch user data...");
        dispatch(getUserById(resolvedParams.id));
        return;
      }
      
      const result = await dispatch(toggleUserStatus({ 
        id: userId, 
        currentStatus: user.isActive 
      })).unwrap();
      
      console.log("Toggle status result:", result);
    } catch (error) {
      console.error("Failed to toggle user status:", error?.message || error);
    }
  };

  return (
    <ProtectedRoute>
      <UserDetail
        userId={resolvedParams.id}
        user={currentUser}
        loading={loading}
        error={error}
        operationSuccess={operationSuccess}
        onBack={handleBack}
        onEdit={handleEdit}
        onToggleStatus={currentUser && Object.keys(currentUser).length > 0 && (currentUser._id || currentUser.id) ? handleToggleStatus : null}
      />
    </ProtectedRoute>
  );
};

export default UserDetailPage;