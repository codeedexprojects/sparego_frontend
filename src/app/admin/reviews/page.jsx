// pages/reviews/index.jsx
"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from '../../../components/admin/ProtectedRoute';
import ReviewTable from "./components/ReviewTable/ReviewTable";
import { 
  getAllReviews, 
  createReview,
  updateReview,
  deleteReview,
  toggleReviewStatus,
  bulkDeleteReviews,
  bulkToggleReviewStatus,
  clearError,
  clearOperationSuccess 
} from "../../../redux/slices/adminReviewSlice";
import { toast } from 'sonner';

const ReviewsPage = () => {
  const dispatch = useDispatch();
  const { reviews, loading, error, operationSuccess } = useSelector((state) => state.adminReview);

  // Fetch reviews on component mount
  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  // Handle errors
  useEffect(() => {
    if (error) {
      console.error("Reviews error:", error?.message || error);
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

  const handleAddReview = async (reviewData) => {
    try {
      await dispatch(createReview(reviewData)).unwrap();
    } catch (error) {
      console.error("Failed to add review:", error?.message || error);
    }
  };

  const handleEditReview = async (oldReview, newData) => {
    try {
      const reviewId = oldReview._id || oldReview.id;
      await dispatch(updateReview({ 
        id: reviewId, 
        reviewData: newData 
      })).unwrap();
      // Refresh reviews after successful update
      dispatch(getAllReviews());
    } catch (error) {
      console.error("Failed to edit review:", error?.message || error);
    }
  };

  const handleDeleteReview = async (reviewToDelete) => {
    try {
      const reviewId = reviewToDelete._id || reviewToDelete.id;
      await dispatch(deleteReview(reviewId)).unwrap();
      // Refresh reviews after successful deletion
      dispatch(getAllReviews());
    } catch (error) {
      console.error("Failed to delete review:", error?.message || error);
    }
  };

  const handleToggleStatus = async (reviewToToggle) => {
    try {
      const reviewId = reviewToToggle._id || reviewToToggle.id;
      const newStatus = !reviewToToggle.isActive;
      await dispatch(toggleReviewStatus({ 
        id: reviewId, 
        currentStatus: reviewToToggle.isActive 
      })).unwrap();
      toast.success(newStatus ? 'Review activated successfully' : 'Review deactivated successfully');
      // Refresh reviews after successful status toggle
      dispatch(getAllReviews());
    } catch (error) {
      toast.error(error?.message || 'Failed to update review status');
    }
  };

  const handleBulkDelete = async (reviewIds) => {
    try {
      await dispatch(bulkDeleteReviews(reviewIds)).unwrap();
      // Refresh reviews after successful bulk deletion
      dispatch(getAllReviews());
    } catch (error) {
      console.error("Failed to bulk delete reviews:", error?.message || error);
    }
  };

  const handleBulkToggleStatus = async (reviewIds, status) => {
    try {
      await dispatch(bulkToggleReviewStatus({ 
        reviewIds, 
        status 
      })).unwrap();
      toast.success(`${reviewIds.length} review(s) ${status ? 'activated' : 'deactivated'} successfully`);
      // Refresh reviews after successful bulk status toggle
      dispatch(getAllReviews());
    } catch (error) {
      toast.error(error?.message || 'Failed to update review status');
    }
  };

  return (
    <ProtectedRoute>
      <ReviewTable
        reviews={reviews}
        loading={loading}
        error={error}
        operationSuccess={operationSuccess}
        onAddReview={handleAddReview}
        onEditReview={handleEditReview}
        onDeleteReview={handleDeleteReview}
        onToggleStatus={handleToggleStatus}
        onBulkDelete={handleBulkDelete}
        onBulkToggleStatus={handleBulkToggleStatus}
        itemsPerPage={6}
        showFilters={true}
      />
    </ProtectedRoute>
  );
};

export default ReviewsPage;