// pages/deal-banners/index.jsx
"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from '../../../components/admin/ProtectedRoute';
import DealBannerTable from "./components/DealBannerTable/DealBannerTable";
import { 
  getDealBanners, 
  createDealBanner, 
  updateDealBanner, 
  deleteDealBanner,
  toggleDealBannerStatus,
  clearError,
  clearOperationSuccess 
} from "../../../redux/slices/adminDealBannerSlice";

const DealBannersPage = () => {
  const dispatch = useDispatch();
  const { dealBanners, loading, error, operationSuccess } = useSelector((state) => state.adminDealBanner);

  // Fetch deal banners on component mount
  useEffect(() => {
    dispatch(getDealBanners());
  }, [dispatch]);

  // Handle errors
  useEffect(() => {
    if (error) {
      console.error("Deal banner error:", error?.message || error);
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

  const handleAddDealBanner = async (dealBannerData) => {
    try {
      await dispatch(createDealBanner(dealBannerData)).unwrap();
    } catch (error) {
      console.error("Failed to add deal banner:", error?.message || error);
    }
  };

  const handleEditDealBanner = async (oldDealBanner, newData) => {
    try {
      const dealBannerId = oldDealBanner._id || oldDealBanner.id;
      await dispatch(updateDealBanner({ id: dealBannerId, dealBannerData: newData })).unwrap();
    } catch (error) {
      console.error("Failed to update deal banner:", error?.message || error);
    }
  };

  const handleDeleteDealBanner = async (dealBannerToDelete) => {
    try {
      const dealBannerId = dealBannerToDelete._id || dealBannerToDelete.id;
      await dispatch(deleteDealBanner(dealBannerId)).unwrap();
    } catch (error) {
      console.error("Failed to delete deal banner:", error?.message || error);
    }
  };

  const handleToggleStatus = async (dealBannerToToggle) => {
    try {
      const dealBannerId = dealBannerToToggle._id || dealBannerToToggle.id;
      await dispatch(toggleDealBannerStatus({ 
        id: dealBannerId, 
        currentStatus: dealBannerToToggle.isActive 
      })).unwrap();
    } catch (error) {
      console.error("Failed to toggle deal banner status:", error?.message || error);
    }
  };

  return (
    <ProtectedRoute>
      <DealBannerTable
        dealBanners={dealBanners}
        onAddDealBanner={handleAddDealBanner}
        onEditDealBanner={handleEditDealBanner}
        onDeleteDealBanner={handleDeleteDealBanner}
        onToggleStatus={handleToggleStatus}
        itemsPerPage={6}
      />
    </ProtectedRoute>
  );
};

export default DealBannersPage;