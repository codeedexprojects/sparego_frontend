// components/UserDetail/UserDetail.jsx
"use client";
import { useState, useEffect } from "react";
import UserProfileCard from "./UserProfileCard";
import UserInfoSection from "./UserInfoSection";
import UserActivitySection from "./UserActivitySection";

const UserDetail = ({ 
  userId, 
  user = null,
  loading = false,
  error = null,
  operationSuccess = null,
  onBack, 
  onToggleStatus
}) => {
  // Helper function to safely get string values
  const getStringValue = (value) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value !== null) {
      return value.name || value.title || JSON.stringify(value);
    }
    return String(value || '');
  };

  if (loading) {
    return (
      <div className="p-6 bg-white min-h-screen flex items-center justify-center">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading user data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-red-800">Error Loading User</h3>
            <p className="mt-2 text-sm text-red-700">{error?.message || "Failed to load user details"}</p>
          </div>
          {onBack && (
            <button 
              onClick={onBack}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Back to Users
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">User Not Found</h2>
          <p className="text-gray-600 mb-4">The user you're looking for doesn't exist or has been removed.</p>
          {onBack && (
            <button 
              onClick={onBack}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Back to Users
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="mb-6">
        {onBack && (
          <button 
            onClick={onBack}
            className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Users
          </button>
        )}
        
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">User Details</h1>
          {onToggleStatus && (
            <button 
              onClick={() => onToggleStatus(user)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                user.isActive 
                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {user.isActive ? 'Deactivate' : 'Activate'}
            </button>
          )}
        </div>
      </div>

      {/* Success Message */}
      {operationSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Success</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>{operationSuccess}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UserProfileCard user={user} />
        
        <div className="lg:col-span-2">
          <UserInfoSection user={user} />
          <UserActivitySection user={user} />
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
