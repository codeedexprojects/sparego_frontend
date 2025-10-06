"use client";
import { useState } from "react";
import VehicleTableHeader from "./VehicleTableHeader";
import VehicleTableRow from "./VehicleTableRow";
import VehicleTableFilters from "./VehicleTableFilters";
import VehicleModal from "./VehicleModal";
import Pagination from "../../../../../components/shared/Pagination";
import DeleteConfirmationModal from "../../../main-categories/components/DeleteModal";

const VehicleTable = ({ 
  vehicles = [], 
  brands = [], 
  onAddVehicle, 
  onEditVehicle, 
  onDeleteVehicle,
  itemsPerPage = 6,
  showFilters = true
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  // For Delete Modal
  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  const brandIdToName = new Map((brands || []).map((b) => [String(b._id || b.id), b.name]));

  const normalizedVehicles = (vehicles || []).map((v) => {
    const brandId = String((v?.brand?._id || v?.brand?.$oid || v?.brand || ""));
    const brandName = v.brandName || brandIdToName.get(brandId) || v?.brand?.name || "Unknown Brand";
    const model = v.model != null ? v.model : v.modelLine;
    return { ...v, brandId, brandName, model };
  });

  const filteredVehicles = normalizedVehicles.filter((vehicle) => {
    const modelStr = ((vehicle && vehicle.model) || "").toLowerCase();
    const brandNameStr = ((vehicle && (vehicle.brandName || (vehicle.brand && vehicle.brand.name))) || "").toLowerCase();
    const searchStr = (searchTerm || "").toLowerCase();

    const matchesSearch = modelStr.includes(searchStr) || brandNameStr.includes(searchStr);
    const matchesType = typeFilter === "all" || (vehicle && vehicle.type) === typeFilter;
    const matchesBrand = brandFilter === "all" || (vehicle && (vehicle.brand === brandFilter || (vehicle.brand && vehicle.brand._id === brandFilter)));
    const matchesYear = yearFilter === "all" || (vehicle && vehicle.year != null && vehicle.year.toString() === yearFilter);

    return matchesSearch && matchesType && matchesBrand && matchesYear;
  });

  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const uniqueYears = [
    ...new Set(normalizedVehicles.map((v) => (v && v.year != null ? v.year.toString() : null)).filter(Boolean)),
  ].sort((a, b) => b - a);

  const handleAdd = () => {
    setEditingVehicle(null);
    setIsModalOpen(true);
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleDelete = (vehicle) => {
    setVehicleToDelete(vehicle); // Open the delete modal
  };

  const confirmDelete = () => {
    if (vehicleToDelete) {
      onDeleteVehicle && onDeleteVehicle(vehicleToDelete);
      setVehicleToDelete(null);
    }
  };

  const handleSubmit = (vehicleData) => {
    if (editingVehicle) {
      onEditVehicle && onEditVehicle(editingVehicle, vehicleData);
    } else {
      onAddVehicle && onAddVehicle(vehicleData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <VehicleTableHeader title="Vehicle Management" onAddVehicle={handleAdd} />
      
      {showFilters && (
        <VehicleTableFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          brandFilter={brandFilter}
          setBrandFilter={setBrandFilter}
          yearFilter={yearFilter}
          setYearFilter={setYearFilter}
          brands={brands}
          years={uniqueYears}
        />
      )}

      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 mb-6">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Brand</th>
              <th className="px-6 py-3">Model</th>
              <th className="px-6 py-3">Year</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedVehicles.length > 0 ? (
              paginatedVehicles.map((vehicle, index) => {
                const serialNumber = filteredVehicles.length - ((currentPage - 1) * itemsPerPage + index);
                return (
                  <VehicleTableRow
                    key={vehicle._id || vehicle.id}
                    vehicle={vehicle}
                    serialNumber={serialNumber}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No vehicles found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredVehicles.length > 0 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={() => {}}
            totalItems={filteredVehicles.length}
          />
        </div>
      )}

      <VehicleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        vehicle={editingVehicle}
        brands={brands}
      />

      <DeleteConfirmationModal
        item={vehicleToDelete}
        onClose={() => setVehicleToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Vehicle"
        description={`Are you sure you want to delete ${vehicleToDelete?.brandName} ${vehicleToDelete?.model} (${vehicleToDelete?.year})?`}
      />
    </div>
  );
};

export default VehicleTable;
