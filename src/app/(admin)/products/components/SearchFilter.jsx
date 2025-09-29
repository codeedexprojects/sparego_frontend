"use client";
import { useState } from "react";

const SearchFilter = ({ searchTerm, onSearch, filters, onFilterChange, onReset }) => {
  const [localSearch, setLocalSearch] = useState(searchTerm);

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    onSearch(value);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        {/* Search Box */}
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="Search products..."
            value={localSearch}
            onChange={handleSearchInput}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Category Filter */}
        <select
          value={filters.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">All Categories</option>
          <option value="Smartphones">Smartphones</option>
          <option value="Laptops">Laptops</option>
          <option value="Accessories">Accessories</option>
        </select>

        {/* Brand Filter */}
        <select
          value={filters.brand}
          onChange={(e) => onFilterChange("brand", e.target.value)}
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">All Brands</option>
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
          <option value="Dell">Dell</option>
        </select>

        {/* Price Range */}
        <select
          value={filters.priceRange}
          onChange={(e) => onFilterChange("priceRange", e.target.value)}
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">All Prices</option>
          <option value="low">Below ₹500</option>
          <option value="mid">₹500 - ₹1000</option>
          <option value="high">Above ₹1000</option>
        </select>

        {/* Stock Filter */}
        <select
          value={filters.stock}
          onChange={(e) => onFilterChange("stock", e.target.value)}
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">All Stock</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      {/* Reset Button */}
      <div className="mt-3 text-right">
        <button
          onClick={onReset}
          className="text-sm text-red-500 hover:underline"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
