import React from 'react';

const SubSubCategoryHeader = ({ categoryCount, onAddCategory }) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sub Sub Category Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your Sub Sub Categories ({categoryCount} total)
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={onAddCategory}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubSubCategoryHeader;