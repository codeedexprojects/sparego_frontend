"use client";
import { useState, useEffect } from "react";
import BrandTableRow from "./BrandTableRow";
import BrandModal from "./BrandModal";

const BrandTable = ({
  brands,
  onAddBrand,
  onEditBrand,
  onDeleteBrand,
  brandType,
  sections = [], 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const openAddModal = () => {
    setSelectedBrand(null);
    setIsModalOpen(true);
  };

  const openEditModal = (brand) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBrand(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (formData) => {
    if (selectedBrand) {
      await onEditBrand(selectedBrand, formData);
    } else {
      await onAddBrand(formData);
    }
    handleCloseModal();
  };

  return (
    <div className="space-y-6">
      {/* Add Brand Button */}
      <div className="flex justify-end">
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Add {brandType === "product" ? "Product" : "Vehicle"} Brand
        </button>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands && brands.length > 0 ? (
          brands.map((brand, index) => (
            <BrandTableRow
              key={brand._id || index}
              brand={brand}
              onEdit={openEditModal}
              onDelete={onDeleteBrand}
              brandType={brandType}
              sections={brandType === "product" ? sections : []} // Only product brands get sections
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No brands found.</p>
        )}
      </div>

      {/* Brand Modal */}
      <BrandModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        brand={selectedBrand}
        brandType={brandType}
        sections={brandType === "product" ? sections : []} // Only pass sections for products
      />
    </div>
  );
};

export default BrandTable;
