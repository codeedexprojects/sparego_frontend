"use client";
import { useState } from "react";
import HomeCardTableHeader from "./HomeCardTableHeader";
import HomeCardTableRow from "./HomeCardTableRow";
import HomeCardModal from "./HomeCardModal";
import Pagination from "../../../../../components/shared/Pagination";
import DeleteConfirmationModal from "../../../main-categories/components/DeleteModal";

const HomeCardTable = ({ 
  homeCards = [], 
  loading = false,
  error = null,
  operationSuccess = null,
  onAddHomeCard, 
  onEditHomeCard, 
  onDeleteHomeCard,
  onToggleStatus,
  sections = [],
  initialItemsPerPage = 6
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHomeCard, setEditingHomeCard] = useState(null);

  // Delete modal state
  const [homeCardToDelete, setHomeCardToDelete] = useState(null);

  const totalPages = Math.ceil(homeCards.length / itemsPerPage);

  const paginatedHomeCards = homeCards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAdd = () => {
    setEditingHomeCard(null);
    setIsModalOpen(true);
  };

  const handleEdit = (homeCard) => {
    setEditingHomeCard(homeCard);
    setIsModalOpen(true);
  };

  const handleDelete = (homeCard) => {
    setHomeCardToDelete(homeCard);
  };

  const confirmDelete = () => {
    if (homeCardToDelete) {
      onDeleteHomeCard && onDeleteHomeCard(homeCardToDelete);
      setHomeCardToDelete(null);
    }
  };

  const handleToggleStatus = (homeCard) => {
    onToggleStatus && onToggleStatus(homeCard);
  };

  const handleSubmit = (homeCardData) => {
    if (editingHomeCard) {
      onEditHomeCard && onEditHomeCard(editingHomeCard, homeCardData);
    } else {
      onAddHomeCard && onAddHomeCard(homeCardData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <HomeCardTableHeader title="Home Card Management" onAddHomeCard={handleAdd} />
      
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
                <p>{error?.message || "An error occurred while loading home cards."}</p>
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
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading home cards...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {paginatedHomeCards.length > 0 ? (
            paginatedHomeCards.map((homeCard) => (
              <HomeCardTableRow
                key={homeCard._id || homeCard.id}
                homeCard={homeCard}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            ))
          ) : (
            <div className="col-span-full bg-gray-50 rounded-lg p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No home cards found</h3>
              <p className="text-gray-500">Get started by adding a new home card.</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination Component */}
      {homeCards.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          totalItems={homeCards.length}
        />
      )}

      {/* Home Card Modal */}
      <HomeCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        homeCard={editingHomeCard}
        sections={sections}

      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        item={homeCardToDelete}
        onClose={() => setHomeCardToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Home Card"
        description={`Are you sure you want to delete the "${homeCardToDelete?.title}" home card?`}
      />
    </div>
  );
};

export default HomeCardTable;
