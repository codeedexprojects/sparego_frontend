"use client";
import { useState, useEffect } from "react";
import { Search, X, Filter } from "lucide-react";

const SearchFilter = ({ searchTerm, onSearch, filters, onFilterChange, onReset, brands }) => {
  const [localSearch, setLocalSearch] = useState(searchTerm);

  useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    onSearch(value);
  };

  const hasActiveFilters = filters.brand || filters.status || filters.priceRange;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl shadow-lg border border-slate-200 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-slate-800">Filter Products</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200 shadow-sm"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Search Bar - Full Width */}
      <div className="mb-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by product name, SKU, or description..."
            value={localSearch}
            onChange={handleSearchInput}
            className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm transition-all duration-200"
          />
        </div>
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Brand Filter */}
        <div className="flex flex-col">
          <label className="text-xs font-medium text-slate-600 mb-1.5 ml-0.5">Brand</label>
          <select
            value={filters.brand || ""}
            onChange={(e) => onFilterChange("brand", e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer shadow-sm transition-all duration-200 hover:border-indigo-300"
          >
            <option value="">All Brands</option>
            {brands?.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex flex-col">
          <label className="text-xs font-medium text-slate-600 mb-1.5 ml-0.5">Status</label>
          <select
            value={filters.status || ""}
            onChange={(e) => onFilterChange("status", e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer shadow-sm transition-all duration-200 hover:border-indigo-300"
          >
            <option value="">All Status</option>
            <option value="active">✅ Active</option>
            <option value="inactive">⛔ Inactive</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="flex flex-col">
          <label className="text-xs font-medium text-slate-600 mb-1.5 ml-0.5">Price Range</label>
          <select
            value={filters.priceRange || ""}
            onChange={(e) => onFilterChange("priceRange", e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer shadow-sm transition-all duration-200 hover:border-indigo-300"
          >
            <option value="">All Prices</option>
            <option value="low">💰 Below ₹500</option>
            <option value="mid">💵 ₹500 - ₹1000</option>
            <option value="high">💎 Above ₹1000</option>
          </select>
        </div>
      </div>

      {/* Active Filters Badge */}
      {hasActiveFilters && (
        <div className="mt-5 pt-4 border-t border-slate-200">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-medium text-slate-600">Active Filters:</span>
            {filters.brand && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                {brands?.find(b => b._id === filters.brand)?.name || "Brand"}
                <button 
                  onClick={() => onFilterChange("brand", "")} 
                  className="hover:bg-indigo-200 rounded-full p-0.5 transition-colors duration-150"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.status && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                {filters.status === "active" ? "Active" : "Inactive"}
                <button 
                  onClick={() => onFilterChange("status", "")} 
                  className="hover:bg-purple-200 rounded-full p-0.5 transition-colors duration-150"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.priceRange && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                {filters.priceRange === "low" ? "< ₹500" : filters.priceRange === "mid" ? "₹500-1000" : "> ₹1000"}
                <button 
                  onClick={() => onFilterChange("priceRange", "")} 
                  className="hover:bg-green-200 rounded-full p-0.5 transition-colors duration-150"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;