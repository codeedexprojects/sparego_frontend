"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { useSelector } from "react-redux";
import { performLogout } from "../../utils/logout";

export default function Header() {
  const router = useRouter();
  const reduxAdmin = useSelector((state) => state.adminAuth.admin);

  const [showDropdown, setShowDropdown] = useState(false);
  const [adminData, setAdminData] = useState({ name: "", role: "" });

  useEffect(() => {
    if (reduxAdmin) {
      setAdminData(reduxAdmin);
    } else if (typeof window !== "undefined") {
      try {
        const storedAdmin = JSON.parse(localStorage.getItem("admin")) || null;
        if (storedAdmin) setAdminData(storedAdmin);
      } catch (err) {
        console.error("Failed to parse admin from localStorage", err);
      }
    }
  }, [reduxAdmin]);

  const handleLogout = () => {
    performLogout(router);
  };

  return (
    <header className="bg-white border-b border-gray-200 flex items-center justify-between p-4">
      {/* Left Section */}
      <div className="flex items-center space-x-4">{/* Add left items here */}</div>

      {/* Right Section: Profile */}
      <div className="relative ml-auto">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center cursor-pointer hover:bg-gray-100 rounded-lg p-1 transition-colors"
        >
          <div className="mr-2 text-right hidden sm:block">
            <p className="text-sm font-bold text-black">{adminData.name || "Admin"}</p>
            <p className="text-xs text-gray-900">{adminData.role || "Administrator"}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-semibold">
            {adminData.name ? adminData.name[0].toUpperCase() : "A"}
          </div>
        </button>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
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

      {/* Overlay to close dropdown */}
      {showDropdown && (
        <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
      )}
    </header>
  );
}
