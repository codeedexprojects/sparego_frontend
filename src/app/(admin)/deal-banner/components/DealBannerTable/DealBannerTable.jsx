// components/DealBannerTable/DealBannerTable.jsx
"use client";
import { useState } from "react";
import DealBannerTableHeader from "./DealBannerTableHeader";
import DealBannerTableRow from "./DealBannerTableRow";
import DealBannerModal from "./DealBannerModal";
import Pagination from "../../../../../components/shared/Pagination";

const DealBannerTable = ({ 
  dealBanners = [], 
  onAddDealBanner, 
  onEditDealBanner, 
  onDeleteDealBanner,
  onToggleStatus,
  itemsPerPage = 6
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDealBanner, setEditingDealBanner] = useState(null);

  const totalPages = Math.ceil(dealBanners.length / itemsPerPage);

  // Get deal banners for current page
  const paginatedDealBanners = dealBanners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAdd = () => {
    setEditingDealBanner(null);
    setIsModalOpen(true);
  };

  const handleEdit = (dealBanner) => {
    setEditingDealBanner(dealBanner);
    setIsModalOpen(true);
  };

  const handleDelete = (dealBanner) => {
    if (window.confirm(`Are you sure you want to delete the "${dealBanner.title}" deal banner?`)) {
      onDeleteDealBanner && onDeleteDealBanner(dealBanner);
    }
  };

  const handleToggleStatus = (dealBanner) => {
    onToggleStatus && onToggleStatus(dealBanner);
  };

  const handleSubmit = (dealBannerData) => {
    if (editingDealBanner) {
      onEditDealBanner && onEditDealBanner(editingDealBanner, dealBannerData);
    } else {
      onAddDealBanner && onAddDealBanner(dealBannerData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <DealBannerTableHeader 
        title="Deal Banner Management" 
        onAddDealBanner={handleAdd} 
      />
      
      {/* Deal Banners Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {paginatedDealBanners.length > 0 ? (
          paginatedDealBanners.map((dealBanner) => (
            <DealBannerTableRow
              key={dealBanner._id || dealBanner.id}
              dealBanner={dealBanner}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          ))
        ) : (
          <div className="col-span-full bg-gray-50 rounded-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No deal banners found</h3>
            <p className="text-gray-500">Get started by adding a new deal banner.</p>
          </div>
        )}
      </div>

      {/* Pagination Component */}
      {dealBanners.length > 0 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Deal Banner Modal */}
      <DealBannerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        dealBanner={editingDealBanner}
      />
    </div>
  );
};

export default DealBannerTable;