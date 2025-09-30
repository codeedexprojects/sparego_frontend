"use client";
import { Star, Bell } from "lucide-react";

const DashboardHeader = ({ timeFilter, setTimeFilter }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Star className="w-4 h-4 text-white" />
          </div>
        </div>
        <p className="text-gray-600 text-lg">Welcome back, Admin 👋</p>
        <p className="text-sm text-gray-500 mt-1">
          Here's what's happening with your store today
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="1d">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
        
        <button className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
