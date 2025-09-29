"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from '../../../components/admin/ProtectedRoute';
import HomeCardTable from "./components/HomeCardTable/HomeCardTable";
import { 
  getHomeCards, 
  createHomeCard, 
  updateHomeCard, 
  deleteHomeCard, 
  toggleHomeCardStatus,
  clearError,
  clearOperationSuccess 
} from "../../../redux/slices/adminHomeCardSlice";

const HomeCardsPage = () => {
  const dispatch = useDispatch();
  const { homeCards, loading, error, operationSuccess } = useSelector((state) => state.adminHomeCard);

  // Fetch home cards on component mount
  useEffect(() => {
    dispatch(getHomeCards());
  }, [dispatch]);

  // Handle errors
  useEffect(() => {
    if (error) {
      console.error("Home card error:", error?.message || error);
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

  const handleAddHomeCard = async (homeCardData) => {
    try {
      await dispatch(createHomeCard(homeCardData)).unwrap();
    } catch (error) {
      console.error("Failed to add home card:", error?.message || error);
    }
  };

  const handleEditHomeCard = async (oldHomeCard, newData) => {
    try {
      const homeCardId = oldHomeCard._id || oldHomeCard.id;
      await dispatch(updateHomeCard({ id: homeCardId, homeCardData: newData })).unwrap();
    } catch (error) {
      console.error("Failed to update home card:", error?.message || error);
    }
  };

  const handleDeleteHomeCard = async (homeCardToDelete) => {
    try {
      const homeCardId = homeCardToDelete._id || homeCardToDelete.id;
      await dispatch(deleteHomeCard(homeCardId)).unwrap();
    } catch (error) {
      console.error("Failed to delete home card:", error?.message || error);
    }
  };

  const handleToggleStatus = async (homeCardToToggle) => {
    try {
      const homeCardId = homeCardToToggle._id || homeCardToToggle.id;
      await dispatch(toggleHomeCardStatus({ 
        id: homeCardId, 
        currentStatus: homeCardToToggle.isActive 
      })).unwrap();
    } catch (error) {
      console.error("Failed to toggle home card status:", error?.message || error);
    }
  };

  return (
    <ProtectedRoute>
      <HomeCardTable
        homeCards={homeCards}
        loading={loading}
        error={error}
        operationSuccess={operationSuccess}
        onAddHomeCard={handleAddHomeCard}
        onEditHomeCard={handleEditHomeCard}
        onDeleteHomeCard={handleDeleteHomeCard}
        onToggleStatus={handleToggleStatus}
        itemsPerPage={6}
      />
    </ProtectedRoute>
  );
};

export default HomeCardsPage;