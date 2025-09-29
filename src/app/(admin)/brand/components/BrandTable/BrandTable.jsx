// components/BrandTable/BrandTable.jsx
"use client";
import { useState } from "react";
import BrandTableHeader from "./BrandTableHeader";
import BrandTableRow from "./BrandTableRow";
import BrandTableFilters from "./BrandTableFilters";
import BrandModal from "./BrandModal";
import Pagination from "../../../../../components/shared/Pagination";

const BrandTable = ({ 
  brands = [], 
  onAddBrand, 
  onEditBrand, 
  onDeleteBrand,
  itemsPerPage = 6,
  showFilters = true,
  brandType = "vehicle" // Add brandType prop with default value
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);

  // Filter brands based on search and filters
  const filteredBrands = brands.filter(brand => {
    // Add safety checks for brand properties
    if (!brand || typeof brand !== 'object') {
      return false;
    }
    
    const brandName = brand.name || '';
    const brandDescription = brand.description || '';
    
    const matchesSearch = brandName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          brandDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && brand.isActive) ||
                         (statusFilter === "inactive" && !brand.isActive);
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);

  // Get brands for current page
  const paginatedBrands = filteredBrands.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAdd = () => {
    setEditingBrand(null);
    setIsModalOpen(true);
  };

  const handleEdit = (brand) => {
    setEditingBrand(brand);
    setIsModalOpen(true);
  };

  const handleDelete = (brand) => {
    const brandName = brand?.name || 'this brand';
    if (window.confirm(`Are you sure you want to delete ${brandName}?`)) {
      onDeleteBrand && onDeleteBrand(brand);
    }
  };

  const handleSubmit = (brandData) => {
    if (editingBrand) {
      onEditBrand && onEditBrand(editingBrand, brandData);
    } else {
      onAddBrand && onAddBrand(brandData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <BrandTableHeader 
        title="Brand Management" 
        onAddBrand={handleAdd} 
      />
      
      {showFilters && (
        <BrandTableFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      )}

      {/* Brand Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {paginatedBrands.length > 0 ? (
          paginatedBrands.map((brand, index) => (
            <BrandTableRow
              key={brand.id || brand._id || `brand-${index}`}
              brand={brand}
              onEdit={handleEdit}
              onDelete={handleDelete}
              brandType={brandType} // Pass brandType to each row if needed
            />
          ))
        ) : (
          <div className="col-span-full bg-gray-50 rounded-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10m4 0h4m-4 0H3m4 0v4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No brands found</h3>
            <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
      </div>

      {/* Pagination Component */}
      {filteredBrands.length > 0 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Brand Modal */}
      <BrandModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        brand={editingBrand}
        brandType={brandType} // Pass brandType to modal
      />
    </div>
  );
};

export default BrandTable;