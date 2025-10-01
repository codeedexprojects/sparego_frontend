"use client";

import { Bell, Search, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { performLogout } from "../../utils/logout";

export default function Header() {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    performLogout(router);
  };

  return (
    <header className="bg-white border-b border-gray-200 flex items-center justify-between p-4">
      {/* Search */}
      <div className="relative w-64 sm:w-96">
        <input
          type="text"
          placeholder="Search"
          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <div className="absolute left-3 top-2.5 text-gray-400">
          <Search size={20} />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Notification */}
        <button className="relative p-2 text-red-500 bg-red-100 rounded-lg hover:bg-red-200 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center cursor-pointer hover:bg-gray-100 rounded-lg p-1 transition-colors"
          >
            <div className="mr-2 text-right hidden sm:block">
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-semibold">
              A
            </div>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  // Add profile functionality here
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <User size={16} className="mr-3" />
                Profile
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  handleLogout();
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} className="mr-3" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay to close dropdown when clicking outside */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)}
        />
      )}
    </header>
  );
}
