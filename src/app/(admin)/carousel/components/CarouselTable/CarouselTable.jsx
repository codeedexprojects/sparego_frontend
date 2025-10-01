// components/CarouselTable/CarouselTable.jsx
"use client";
import { useState } from "react";
import CarouselTabs from "./CarouselTabs";
import CarouselTableHeader from "./CarouselTableHeader";
import CarouselTableRow from "./CarouselTableRow";
import CarouselModal from "./CarouselModal";
import Pagination from "../../../../../components/shared/Pagination";

const CarouselTable = ({ 
  mainCarousels = [], 
  bottomCarousels = [], 
  homeCarousels = [], 
  products = [], // Array of product objects for dropdown
  onAddCarousel, 
  onEditCarousel, 
  onDeleteCarousel,
  onToggleStatus,
  itemsPerPage = 6,
  loading = false 
}) => {
  const [activeTab, setActiveTab] = useState("main");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCarousel, setEditingCarousel] = useState(null);

  const tabs = [
    { id: "main", label: "Main Carousels" },
    { id: "bottom", label: "Bottom Carousels" },
    { id: "home", label: "Home Carousels" },
  ];

  // Get current carousels based on active tab
  const getCurrentCarousels = () => {
    switch (activeTab) {
      case "main": return mainCarousels;
      case "bottom": return bottomCarousels;
      case "home": return homeCarousels;
      default: return [];
    }
  };

  const currentCarousels = getCurrentCarousels();
  const totalPages = Math.ceil(currentCarousels.length / itemsPerPage);

  // Get carousels for current page
  const paginatedCarousels = currentCarousels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAdd = () => {
    setEditingCarousel(null);
    setIsModalOpen(true);
  };

  const handleEdit = (carousel) => {
    setEditingCarousel(carousel);
    setIsModalOpen(true);
  };

  const handleDelete = (carousel) => {
    onDeleteCarousel && onDeleteCarousel(activeTab, carousel);
  };

  const handleToggleStatus = (carousel) => {
    onToggleStatus && onToggleStatus(activeTab, carousel);
  };

  const handleSubmit = (carouselData) => {
    if (editingCarousel) {
      onEditCarousel && onEditCarousel(activeTab, editingCarousel, carouselData);
    } else {
      onAddCarousel && onAddCarousel(activeTab, carouselData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <CarouselTableHeader 
        title="Carousel Management" 
        onAddCarousel={handleAdd} 
      />

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Tabs */}
        <CarouselTabs 
        tabs={tabs} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        setCurrentPage={setCurrentPage} // Add this line
        />

      {/* Carousels Grid */}
       {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {paginatedCarousels.length > 0 ? (
            paginatedCarousels.map((carousel) => (
                <CarouselTableRow
                key={carousel._id || carousel.id}
                carousel={carousel}
                carouselType={activeTab}
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
                <h3 className="text-lg font-medium text-gray-900 mb-1">No carousels found</h3>
                <p className="text-gray-500">Get started by adding a new carousel.</p>
            </div>
            )}
        </div>
       )}

      {/* Pagination Component */}
      {currentCarousels.length > 0 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Carousel Modal */}
      <CarouselModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        carousel={editingCarousel}
        carouselType={activeTab}
        products={products}
      />
    </div>
  );
};

export default CarouselTable;