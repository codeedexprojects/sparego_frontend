"use client";
import { useState } from "react";
import BrandTableRow from "./BrandTableRow";
import BrandModal from "./BrandModal";
import DeleteConfirmationModal from "../../../main-categories/components/DeleteModal";
import BrandTableFilters from "./BrandTableFilters";

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
  const [brandToDelete, setBrandToDelete] = useState(null);

  // Filter states (remove statusFilter)
  const [searchTerm, setSearchTerm] = useState("");
  const [sectionFilter, setSectionFilter] = useState("all");

  // Filter brands based on search and section only
  const filteredBrands = brands.filter(brand => {
    // Search filter
    const matchesSearch = searchTerm === "" || 
      brand.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.description?.toLowerCase().includes(searchTerm.toLowerCase());

    // Section filter (only for product brands)
    let matchesSection = true;
    if (brandType === "product") {
      if (sectionFilter === "all") {
        matchesSection = true;
      } else if (sectionFilter === "") {
        // Filter for brands with no section (Spare Parts)
        matchesSection = !brand.section;
      } else {
        // Filter for specific section
        matchesSection = brand.section?._id === sectionFilter;
      }
    }

    return matchesSearch && matchesSection;
  });

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

  const handleDelete = (brand) => {
    setBrandToDelete(brand);
  };

  const confirmDelete = async () => {
    if (brandToDelete) {
      await onDeleteBrand(brandToDelete);
      setBrandToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters - remove statusFilter props */}
      <BrandTableFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sectionFilter={sectionFilter}
        setSectionFilter={setSectionFilter}
        sections={sections}
        brandType={brandType}
      />

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredBrands.length} of {brands.length} brands
      </div>

      {/* Rest of the component remains the same */}
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
        {filteredBrands && filteredBrands.length > 0 ? (
          filteredBrands.map((brand, index) => (
            <BrandTableRow
              key={brand._id || index}
              brand={brand}
              onEdit={openEditModal}
              onDelete={handleDelete}
              brandType={brandType}
              sections={brandType === "product" ? sections : []}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No brands found matching your filters.</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Brand Modal */}
      <BrandModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        brand={selectedBrand}
        brandType={brandType}
        sections={brandType === "product" ? sections : []}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        item={brandToDelete}
        onClose={() => setBrandToDelete(null)}
        onConfirm={confirmDelete}
        title={`Delete ${brandType === "product" ? "Product" : "Vehicle"} Brand`}
        description={`Are you sure you want to delete the brand "${brandToDelete?.name}"?`}
      />
    </div>
  );
};

export default BrandTable;