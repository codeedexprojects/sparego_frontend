"use client";
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function SearchByVehicleSection() {
  const [activeTab, setActiveTab] = useState('TWO WHEELER');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedModification, setSelectedModification] = useState('');

  const tabs = ['FOUR WHEELER', 'TWO WHEELER'];

  const vehicleData = {
    'FOUR WHEELER': {
      brands: ['Honda', 'Toyota', 'Hyundai', 'Maruti Suzuki', 'Tata', 'Mahindra'],
      models: ['City', 'Civic', 'Accord', 'CR-V', 'Jazz'],
      years: ['2024', '2023', '2022', '2021', '2020', '2019'],
      modifications: ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid']
    },
    'TWO WHEELER': {
      brands: ['Honda', 'Yamaha', 'Bajaj', 'TVS', 'Hero', 'Royal Enfield'],
      models: ['Activa', 'CB Shine', 'Splendor', 'Apache', 'FZ'],
      years: ['2024', '2023', '2022', '2021', '2020', '2019'],
      modifications: ['Standard', 'Disc Brake', 'Electric Start', 'Alloy Wheel']
    }
  };

  const handleSearch = () => {
    console.log('Searching for:', {
      vehicleType: activeTab,
      brand: selectedBrand,
      model: selectedModel,
      year: selectedYear,
      modification: selectedModification
    });
  };

  const CustomDropdown = ({ placeholder, value, options, onChange, disabled = false }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`w-full px-4 py-3 text-left border rounded-lg bg-white transition-colors duration-200 flex items-center justify-between ${
            disabled 
              ? 'border-gray-200 text-black cursor-not-allowed' 
              : 'border-gray-300 hover:border-gray-400 cursor-pointer'
          }`}
          disabled={disabled}
        >
          <span className={value ? 'text-black' : 'text-black'}>
            {value || placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && !disabled && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left text-black hover:bg-gray-50 transition-colors duration-200"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header with Tabs */}
        <div className="flex items-center justify-between mb-8">
          {/* Left - Section Title */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              SEARCH BY VEHICLE
            </h2>
          </div>
          
          {/* Right - Tabs */}
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  // Reset selections when switching tabs
                  setSelectedBrand('');
                  setSelectedModel('');
                  setSelectedYear('');
                  setSelectedModification('');
                }}
                className={`pb-2 text-sm font-medium transition-colors duration-200 border-b-2 ${
                  activeTab === tab 
                    ? 'text-red-600 border-red-600' 
                    : 'text-gray-400 border-transparent hover:text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Search Form */}
        <div className=" ">
          {/* Dropdown Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Brand Selector */}
            <CustomDropdown
              placeholder="Select brand"
              value={selectedBrand}
              options={vehicleData[activeTab].brands}
              onChange={setSelectedBrand}
            />

            {/* Model Selector */}
            <CustomDropdown
              placeholder="Select model line"
              value={selectedModel}
              options={vehicleData[activeTab].models}
              onChange={setSelectedModel}
              disabled={!selectedBrand}
            />

            {/* Year Selector */}
            <CustomDropdown
              placeholder="Select year"
              value={selectedYear}
              options={vehicleData[activeTab].years}
              onChange={setSelectedYear}
              disabled={!selectedModel}
            />

            {/* Modification Selector */}
            <CustomDropdown
              placeholder="Select Modification"
              value={selectedModification}
              options={vehicleData[activeTab].modifications}
              onChange={setSelectedModification}
              disabled={!selectedYear}
            />
          </div>

          {/* Search Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSearch}
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300 transform hover:scale-105 shadow-lg"
            >
              Search parts
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}