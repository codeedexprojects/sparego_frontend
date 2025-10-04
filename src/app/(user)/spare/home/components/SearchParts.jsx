"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getAllBrands } from '@/redux/slices/brandSlice';
import { getVehicleHierarchy, setFilters } from '@/redux/slices/vehicleSlice';

export default function SearchByVehicleSection() {
  const dispatch = useDispatch();
  const router = useRouter(); 

  const { brands, loading: brandsLoading, error: brandsError } = useSelector((state) => state.brand);

  const { hierarchy, loading: hierarchyLoading, error: hierarchyError, filters } = useSelector((state) => state.vehicles);

  const [activeTab, setActiveTab] = useState('TWO WHEELER');
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    brand: false,
    modelLine: false,
    year: false,
    modification: false
  });

  const tabs = ['FOUR WHEELER', 'TWO WHEELER'];

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  useEffect(() => {
    if (filters.brand || filters.modelLine || filters.year || filters.modification) {
      dispatch(getVehicleHierarchy(filters));
    }
  }, [dispatch, filters]);

  const filteredBrands = brands && Array.isArray(brands)
    ? brands.filter(brand => {
      if (!brand.vehicleType) return false;
      const brandVehicleType = brand.vehicleType.toLowerCase().replace('-', '');
      const activeTabNormalized = activeTab.toLowerCase().replace(' ', '');
      return brandVehicleType === activeTabNormalized;
    })
    : [];

  const handleFilterChange = (filterType, value) => {
    dispatch(setFilters({ [filterType]: value }));

    if (filterType === 'brand') {
      dispatch(setFilters({ modelLine: '', year: '', modification: '' }));
    } else if (filterType === 'modelLine') {
      dispatch(setFilters({ year: '', modification: '' }));
    } else if (filterType === 'year') {
      dispatch(setFilters({ modification: '' }));
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    dispatch(setFilters({ brand: '', modelLine: '', year: '', modification: '' }));
  };

  const handleSearch = () => {
    
    const selectedBrand = filteredBrands.find(b => b._id === filters.brand);
    const brandName = selectedBrand ? encodeURIComponent(selectedBrand.name) : '';
    
    const vehicleType = activeTab === 'TWO WHEELER' ? 'two-wheeler' : 'four-wheeler';
    
    router.push(
      `/spare/search-products/${vehicleType}/${filters.brand}/${encodeURIComponent(filters.modelLine)}/${filters.year}/${encodeURIComponent(filters.modification)}`
    );
  };

  const CustomDropdown = ({ placeholder, value, options, onChange, disabled = false, type }) => {
    return (
      <div className="relative">
        <button
          onClick={() => !disabled && setIsDropdownOpen({ ...isDropdownOpen, [type]: !isDropdownOpen[type] })}
          className={`w-full px-4 py-3 text-left border-1 rounded-lg bg-white transition-colors duration-200 flex items-center justify-between ${disabled
              ? 'border-red-300 text-black cursor-not-allowed opacity-60'
              : 'border-[#BE1E2D] hover:border-red-700 cursor-pointer'
            }`}
          disabled={disabled}
        >
          <span className={value ? 'text-black' : 'text-black'}>
            {value || placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen[type] ? 'rotate-180' : ''}`} />
        </button>

        {isDropdownOpen[type] && !disabled && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border-1 border-gray-400 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option._id || option}
                onClick={() => {
                  onChange(option._id || option);
                  setIsDropdownOpen({ ...isDropdownOpen, [type]: false });
                }}
                className="w-full px-4 py-3 text-left text-black hover:bg-red-50 transition-colors duration-200"
              >
                {option.name || option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (brandsLoading) {
    return (
      <section className="py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center items-center h-64">
            <p>Loading brands...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="max-w-8xl mx-auto px-4 md:px-15">
        <div className="flex items-center justify-between mb-8">
          <div>
  <h2 className="text-2xl md:text-3xl font-medium text-gray-900 underline decoration-[#BE1E2D] underline-offset-9">
    SEARCH BY VEHICLE
  </h2>
</div>

          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`pb-2 text-sm font-medium transition-colors duration-200 border-b-1 ${activeTab === tab
                    ? 'text-red-600 border-red-600'
                    : 'text-gray-400 border-transparent hover:text-gray-600'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <CustomDropdown
              placeholder="Select brand"
              value={filters.brand ? filteredBrands.find(b => b._id === filters.brand)?.name : ''}
              options={filteredBrands}
              onChange={(value) => handleFilterChange('brand', value)}
              type="brand"
            />

            <CustomDropdown
              placeholder="Select model line"
              value={filters.modelLine}
              options={hierarchy.modelLines || []}
              onChange={(value) => handleFilterChange('modelLine', value)}
              disabled={!filters.brand}
              type="modelLine"
            />

            <CustomDropdown
              placeholder="Select year"
              value={filters.year}
              options={hierarchy.years || []}
              onChange={(value) => handleFilterChange('year', value)}
              disabled={!filters.modelLine}
              type="year"
            />

            <CustomDropdown
              placeholder="Select Modification"
              value={filters.modification}
              options={hierarchy.modifications || []}
              onChange={(value) => handleFilterChange('modification', value)}
              disabled={!filters.year}
              type="modification"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSearch}
              disabled={!filters.modification}
              className={`px-8 py-3 font-semibold rounded-lg transition-colors duration-300 transform shadow-lg ${filters.modification
                  ? 'bg-red-600 hover:bg-red-700 text-white hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              Search parts
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}