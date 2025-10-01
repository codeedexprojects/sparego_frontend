// components/MainCategoryHeader.jsx
import React from 'react';

const MainCategoryHeader = ({ categoryCount, onAddCategory }) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Main Categories</h1>
          <p className="text-gray-600 mt-2">
            Manage your main product categories ({categoryCount} categories)
          </p>
        </div>
        <button
          onClick={onAddCategory}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center shadow-sm"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Category
        </button>
      </div>
    </div>
  );
};

export default MainCategoryHeader;