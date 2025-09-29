// components/ReviewTable/ReviewTable.jsx
"use client";
import { useState } from "react";
import ReviewTableHeader from "./ReviewTableHeader";
import ReviewTableRow from "./ReviewTableRow";
import ReviewTableFilters from "./ReviewTableFilters";
import ReviewModal from "./ReviewModal";
import Pagination from "../../../../../components/shared/Pagination";

const ReviewTable = ({ 
  reviews = [], 
  loading = false,
  error = null,
  operationSuccess = null,
  onAddReview, 
  onEditReview, 
  onDeleteReview,
  onToggleStatus,
  onBulkDelete,
  onBulkToggleStatus,
  itemsPerPage = 6,
  showFilters = true
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  // Helper function to safely get string values
  const getStringValue = (value) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value !== null) {
      return value.name || value.title || JSON.stringify(value);
    }
    return String(value || '');
  };

  // Filter reviews based on search and filters
  const filteredReviews = reviews.filter(review => {
    const title = getStringValue(review.title);
    const message = getStringValue(review.message);
    const name = getStringValue(review.name);
    const designation = getStringValue(review.designation);
    
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          designation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && review.isActive) ||
                         (statusFilter === "inactive" && !review.isActive);
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);

  // Get reviews for current page
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAdd = () => {
    setEditingReview(null);
    setIsModalOpen(true);
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setIsModalOpen(true);
  };

  const handleDelete = (review) => {
    if (window.confirm(`Are you sure you want to delete the review by ${review.name}?`)) {
      onDeleteReview && onDeleteReview(review);
    }
  };

  const handleToggleStatus = (review) => {
    onToggleStatus && onToggleStatus(review);
  };

  const handleSubmit = (reviewData) => {
    if (editingReview) {
      onEditReview && onEditReview(editingReview, reviewData);
    } else {
      onAddReview && onAddReview(reviewData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <ReviewTableHeader 
        title="Review Management" 
        onAddReview={handleAdd} 
      />
      
      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error?.message || "An error occurred"}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {operationSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Success</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>{operationSuccess}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mb-6 flex items-center justify-center py-8">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading reviews...</span>
          </div>
        </div>
      )}
      
      {showFilters && (
        <ReviewTableFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      )}

      {/* Reviews Table */}
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 mb-6">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3">Reviewer</th>
              <th className="px-6 py-3">Designation</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Message</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedReviews.length > 0 ? (
              paginatedReviews.map((review, index) => (
                <ReviewTableRow
                  key={review._id || review.id || `review-${index}`}
                  review={review}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleStatus={handleToggleStatus}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No reviews found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      {filteredReviews.length > 0 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Review Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        review={editingReview}
      />
    </div>
  );
};

export default ReviewTable;