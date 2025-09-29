// pages/vehicles/index.jsx
"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from '../../../components/admin/ProtectedRoute';
import VehicleTable from "./components/VehicleTable/VehicleTable";
import {
  getVehicleBrands,
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  clearError,
  clearSuccess,
} from "../../../redux/slices/adminVehicleSlice";

const VehiclesPage = () => {
  const dispatch = useDispatch();
  const { vehicles, brands, loading, error, success, successMessage } = useSelector((state) => state.adminVehicle);
  
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    console.log("=== VEHICLES PAGE DEBUG ===");
    console.log("Fetching vehicle brands and vehicles...");
    
    dispatch(getVehicleBrands());
    // Try fetching vehicles without type filter first to see what's in the database
    dispatch(getVehicles());
  }, [dispatch]);

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Handle success messages
  useEffect(() => {
    if (success && successMessage) {
      showNotification(successMessage, "success");
      dispatch(clearSuccess());
    }
  }, [success, successMessage, dispatch]);

  useEffect(() => {
    if (error) {
      console.error("Vehicle error:", error);
      const message = typeof error === 'string' ? error : (error?.message || 'Something went wrong');
      showNotification(message, "error");
      const t = setTimeout(() => dispatch(clearError()), 4000);
      return () => clearTimeout(t);
    }
  }, [error, dispatch]);

  const handleAddVehicle = async (vehicleData) => {
    try {
      await dispatch(createVehicle(vehicleData)).unwrap();
      // Refresh vehicles list after successful creation
      dispatch(getVehicles());
    } catch (e) {
      console.error("Failed to add vehicle:", e);
    }
  };

  const handleEditVehicle = async (oldVehicle, newData) => {
    try {
      await dispatch(updateVehicle({ id: oldVehicle.id || oldVehicle._id, vehicleData: newData })).unwrap();
      // Refresh vehicles list after successful update
      dispatch(getVehicles());
    } catch (e) {
      console.error("Failed to update vehicle:", e);
    }
  };

  const handleDeleteVehicle = async (vehicleToDelete) => {
    try {
      await dispatch(deleteVehicle(vehicleToDelete.id || vehicleToDelete._id)).unwrap();
      // Refresh vehicles list after successful deletion
      dispatch(getVehicles());
    } catch (e) {
      console.error("Failed to delete vehicle:", e);
    }
  };

  return (
    <ProtectedRoute>
      {/* Success/Error Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}
      
      <VehicleTable
        vehicles={vehicles}
        brands={brands}
        onAddVehicle={handleAddVehicle}
        onEditVehicle={handleEditVehicle}
        onDeleteVehicle={handleDeleteVehicle}
        itemsPerPage={6}
        showFilters={true}
      />
    </ProtectedRoute>
  );
};

export default VehiclesPage;