"use client";
import { useState } from "react";

export const CategoryTabs = ({ tabs, activeTab, setActiveTab, className = "" }) => {
  console.log("=== CATEGORY TABS RENDER DEBUG ===");
  console.log("Tabs prop:", tabs);
  console.log("Active tab prop:", activeTab);
  console.log("setActiveTab prop:", typeof setActiveTab);
  console.log("Tabs length:", tabs?.length);
  console.log("==================================");

  const handleTabClick = (tabId) => {
    console.log("=== TAB CLICK DEBUG ===");
    console.log("Tab clicked:", tabId);
    console.log("Current active tab:", activeTab);
    console.log("setActiveTab function:", typeof setActiveTab);
    console.log("=======================");
    
    if (setActiveTab) {
      setActiveTab(tabId);
    } else {
      console.error("setActiveTab function is not provided");
    }
  };

  if (!tabs || tabs.length === 0) {
    console.error("No tabs provided to CategoryTabs component");
    return null;
  }

  return (
    <div className={`flex border-b border-gray-200 mb-6 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`px-6 py-3 text-sm font-medium transition-all duration-200 relative cursor-pointer ${
            activeTab === tab.id
              ? "text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
          )}
        </button>
      ))}
    </div>
  );
};